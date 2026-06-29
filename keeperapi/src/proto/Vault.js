/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const Vault = $root.Vault = (() => {

    /**
     * Namespace Vault.
     * @exports Vault
     * @namespace
     */
    const Vault = {};

    /**
     * CacheStatus enum.
     * @name Vault.CacheStatus
     * @enum {number}
     * @property {number} KEEP=0 KEEP value
     * @property {number} CLEAR=1 CLEAR value
     */
    Vault.CacheStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "KEEP"] = 0;
        values[valuesById[1] = "CLEAR"] = 1;
        return values;
    })();

    Vault.SyncDownRequest = (function() {

        /**
         * Properties of a SyncDownRequest.
         * @memberof Vault
         * @interface ISyncDownRequest
         * @property {Uint8Array|null} [continuationToken] SyncDownRequest continuationToken
         * @property {number|null} [dataVersion] SyncDownRequest dataVersion
         * @property {boolean|null} [debug] SyncDownRequest debug
         */

        /**
         * Constructs a new SyncDownRequest.
         * @memberof Vault
         * @classdesc Represents a SyncDownRequest.
         * @implements ISyncDownRequest
         * @constructor
         * @param {Vault.ISyncDownRequest=} [properties] Properties to set
         */
        function SyncDownRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SyncDownRequest continuationToken.
         * @member {Uint8Array} continuationToken
         * @memberof Vault.SyncDownRequest
         * @instance
         */
        SyncDownRequest.prototype.continuationToken = $util.newBuffer([]);

        /**
         * SyncDownRequest dataVersion.
         * @member {number} dataVersion
         * @memberof Vault.SyncDownRequest
         * @instance
         */
        SyncDownRequest.prototype.dataVersion = 0;

        /**
         * SyncDownRequest debug.
         * @member {boolean} debug
         * @memberof Vault.SyncDownRequest
         * @instance
         */
        SyncDownRequest.prototype.debug = false;

        /**
         * Creates a new SyncDownRequest instance using the specified properties.
         * @function create
         * @memberof Vault.SyncDownRequest
         * @static
         * @param {Vault.ISyncDownRequest=} [properties] Properties to set
         * @returns {Vault.SyncDownRequest} SyncDownRequest instance
         */
        SyncDownRequest.create = function create(properties) {
            return new SyncDownRequest(properties);
        };

        /**
         * Encodes the specified SyncDownRequest message. Does not implicitly {@link Vault.SyncDownRequest.verify|verify} messages.
         * @function encode
         * @memberof Vault.SyncDownRequest
         * @static
         * @param {Vault.ISyncDownRequest} message SyncDownRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncDownRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.continuationToken != null && Object.hasOwnProperty.call(message, "continuationToken"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.continuationToken);
            if (message.dataVersion != null && Object.hasOwnProperty.call(message, "dataVersion"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.dataVersion);
            if (message.debug != null && Object.hasOwnProperty.call(message, "debug"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.debug);
            return writer;
        };

        /**
         * Decodes a SyncDownRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.SyncDownRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.SyncDownRequest} SyncDownRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncDownRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.SyncDownRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.continuationToken = reader.bytes();
                        break;
                    }
                case 2: {
                        message.dataVersion = reader.int32();
                        break;
                    }
                case 3: {
                        message.debug = reader.bool();
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
         * Creates a SyncDownRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.SyncDownRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.SyncDownRequest} SyncDownRequest
         */
        SyncDownRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.SyncDownRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.SyncDownRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.SyncDownRequest();
            if (object.continuationToken != null)
                if (typeof object.continuationToken === "string")
                    $util.base64.decode(object.continuationToken, message.continuationToken = $util.newBuffer($util.base64.length(object.continuationToken)), 0);
                else if (object.continuationToken.length >= 0)
                    message.continuationToken = object.continuationToken;
            if (object.dataVersion != null)
                message.dataVersion = object.dataVersion | 0;
            if (object.debug != null)
                message.debug = Boolean(object.debug);
            return message;
        };

        /**
         * Creates a plain object from a SyncDownRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.SyncDownRequest
         * @static
         * @param {Vault.SyncDownRequest} message SyncDownRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SyncDownRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.continuationToken = "";
                else {
                    object.continuationToken = [];
                    if (options.bytes !== Array)
                        object.continuationToken = $util.newBuffer(object.continuationToken);
                }
                object.dataVersion = 0;
                object.debug = false;
            }
            if (message.continuationToken != null && Object.hasOwnProperty.call(message, "continuationToken"))
                object.continuationToken = options.bytes === String ? $util.base64.encode(message.continuationToken, 0, message.continuationToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.continuationToken) : message.continuationToken;
            if (message.dataVersion != null && Object.hasOwnProperty.call(message, "dataVersion"))
                object.dataVersion = message.dataVersion;
            if (message.debug != null && Object.hasOwnProperty.call(message, "debug"))
                object.debug = message.debug;
            return object;
        };

        /**
         * Converts this SyncDownRequest to JSON.
         * @function toJSON
         * @memberof Vault.SyncDownRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SyncDownRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SyncDownRequest
         * @function getTypeUrl
         * @memberof Vault.SyncDownRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SyncDownRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.SyncDownRequest";
        };

        return SyncDownRequest;
    })();

    Vault.SyncDownResponse = (function() {

        /**
         * Properties of a SyncDownResponse.
         * @memberof Vault
         * @interface ISyncDownResponse
         * @property {Uint8Array|null} [continuationToken] SyncDownResponse continuationToken
         * @property {boolean|null} [hasMore] SyncDownResponse hasMore
         * @property {Vault.CacheStatus|null} [cacheStatus] SyncDownResponse cacheStatus
         * @property {Array.<Vault.IUserFolder>|null} [userFolders] SyncDownResponse userFolders
         * @property {Array.<Vault.ISharedFolder>|null} [sharedFolders] SyncDownResponse sharedFolders
         * @property {Array.<Vault.IUserFolderSharedFolder>|null} [userFolderSharedFolders] SyncDownResponse userFolderSharedFolders
         * @property {Array.<Vault.ISharedFolderFolder>|null} [sharedFolderFolders] SyncDownResponse sharedFolderFolders
         * @property {Array.<Vault.IRecord>|null} [records] SyncDownResponse records
         * @property {Array.<Vault.IRecordMetaData>|null} [recordMetaData] SyncDownResponse recordMetaData
         * @property {Array.<Vault.INonSharedData>|null} [nonSharedData] SyncDownResponse nonSharedData
         * @property {Array.<Vault.IRecordLink>|null} [recordLinks] SyncDownResponse recordLinks
         * @property {Array.<Vault.IUserFolderRecord>|null} [userFolderRecords] SyncDownResponse userFolderRecords
         * @property {Array.<Vault.ISharedFolderRecord>|null} [sharedFolderRecords] SyncDownResponse sharedFolderRecords
         * @property {Array.<Vault.ISharedFolderFolderRecord>|null} [sharedFolderFolderRecords] SyncDownResponse sharedFolderFolderRecords
         * @property {Array.<Vault.ISharedFolderUser>|null} [sharedFolderUsers] SyncDownResponse sharedFolderUsers
         * @property {Array.<Vault.ISharedFolderTeam>|null} [sharedFolderTeams] SyncDownResponse sharedFolderTeams
         * @property {Array.<Uint8Array>|null} [recordAddAuditData] SyncDownResponse recordAddAuditData
         * @property {Array.<Vault.ITeam>|null} [teams] SyncDownResponse teams
         * @property {Array.<Vault.ISharingChange>|null} [sharingChanges] SyncDownResponse sharingChanges
         * @property {Vault.IProfile|null} [profile] SyncDownResponse profile
         * @property {Vault.IProfilePic|null} [profilePic] SyncDownResponse profilePic
         * @property {Array.<Vault.IPendingTeamMember>|null} [pendingTeamMembers] SyncDownResponse pendingTeamMembers
         * @property {Array.<Vault.IBreachWatchRecord>|null} [breachWatchRecords] SyncDownResponse breachWatchRecords
         * @property {Array.<Vault.IUserAuth>|null} [userAuths] SyncDownResponse userAuths
         * @property {Array.<Vault.IBreachWatchSecurityData>|null} [breachWatchSecurityData] SyncDownResponse breachWatchSecurityData
         * @property {Vault.IReusedPasswords|null} [reusedPasswords] SyncDownResponse reusedPasswords
         * @property {Array.<Uint8Array>|null} [removedUserFolders] SyncDownResponse removedUserFolders
         * @property {Array.<Uint8Array>|null} [removedSharedFolders] SyncDownResponse removedSharedFolders
         * @property {Array.<Vault.IUserFolderSharedFolder>|null} [removedUserFolderSharedFolders] SyncDownResponse removedUserFolderSharedFolders
         * @property {Array.<Vault.ISharedFolderFolder>|null} [removedSharedFolderFolders] SyncDownResponse removedSharedFolderFolders
         * @property {Array.<Uint8Array>|null} [removedRecords] SyncDownResponse removedRecords
         * @property {Array.<Vault.IRecordLink>|null} [removedRecordLinks] SyncDownResponse removedRecordLinks
         * @property {Array.<Vault.IUserFolderRecord>|null} [removedUserFolderRecords] SyncDownResponse removedUserFolderRecords
         * @property {Array.<Vault.ISharedFolderRecord>|null} [removedSharedFolderRecords] SyncDownResponse removedSharedFolderRecords
         * @property {Array.<Vault.ISharedFolderFolderRecord>|null} [removedSharedFolderFolderRecords] SyncDownResponse removedSharedFolderFolderRecords
         * @property {Array.<Vault.ISharedFolderUser>|null} [removedSharedFolderUsers] SyncDownResponse removedSharedFolderUsers
         * @property {Array.<Vault.ISharedFolderTeam>|null} [removedSharedFolderTeams] SyncDownResponse removedSharedFolderTeams
         * @property {Array.<Uint8Array>|null} [removedTeams] SyncDownResponse removedTeams
         * @property {Array.<Vault.IKsmChange>|null} [ksmAppShares] SyncDownResponse ksmAppShares
         * @property {Array.<Vault.IKsmChange>|null} [ksmAppClients] SyncDownResponse ksmAppClients
         * @property {Array.<Vault.IShareInvitation>|null} [shareInvitations] SyncDownResponse shareInvitations
         * @property {Vault.ISyncDiagnostics|null} [diagnostics] SyncDownResponse diagnostics
         * @property {Array.<Vault.IRecordRotation>|null} [recordRotations] SyncDownResponse recordRotations
         * @property {Array.<Vault.IUser>|null} [users] SyncDownResponse users
         * @property {Array.<Uint8Array>|null} [removedUsers] SyncDownResponse removedUsers
         * @property {Array.<Vault.ISecurityScoreData>|null} [securityScoreData] SyncDownResponse securityScoreData
         * @property {Array.<NotificationCenter.INotificationWrapper>|null} [notificationSync] SyncDownResponse notificationSync
         * @property {Vault.IKeeperDriveData|null} [keeperDriveData] SyncDownResponse keeperDriveData
         */

        /**
         * Constructs a new SyncDownResponse.
         * @memberof Vault
         * @classdesc Represents a SyncDownResponse.
         * @implements ISyncDownResponse
         * @constructor
         * @param {Vault.ISyncDownResponse=} [properties] Properties to set
         */
        function SyncDownResponse(properties) {
            this.userFolders = [];
            this.sharedFolders = [];
            this.userFolderSharedFolders = [];
            this.sharedFolderFolders = [];
            this.records = [];
            this.recordMetaData = [];
            this.nonSharedData = [];
            this.recordLinks = [];
            this.userFolderRecords = [];
            this.sharedFolderRecords = [];
            this.sharedFolderFolderRecords = [];
            this.sharedFolderUsers = [];
            this.sharedFolderTeams = [];
            this.recordAddAuditData = [];
            this.teams = [];
            this.sharingChanges = [];
            this.pendingTeamMembers = [];
            this.breachWatchRecords = [];
            this.userAuths = [];
            this.breachWatchSecurityData = [];
            this.removedUserFolders = [];
            this.removedSharedFolders = [];
            this.removedUserFolderSharedFolders = [];
            this.removedSharedFolderFolders = [];
            this.removedRecords = [];
            this.removedRecordLinks = [];
            this.removedUserFolderRecords = [];
            this.removedSharedFolderRecords = [];
            this.removedSharedFolderFolderRecords = [];
            this.removedSharedFolderUsers = [];
            this.removedSharedFolderTeams = [];
            this.removedTeams = [];
            this.ksmAppShares = [];
            this.ksmAppClients = [];
            this.shareInvitations = [];
            this.recordRotations = [];
            this.users = [];
            this.removedUsers = [];
            this.securityScoreData = [];
            this.notificationSync = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SyncDownResponse continuationToken.
         * @member {Uint8Array} continuationToken
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.continuationToken = $util.newBuffer([]);

        /**
         * SyncDownResponse hasMore.
         * @member {boolean} hasMore
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.hasMore = false;

        /**
         * SyncDownResponse cacheStatus.
         * @member {Vault.CacheStatus} cacheStatus
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.cacheStatus = 0;

        /**
         * SyncDownResponse userFolders.
         * @member {Array.<Vault.IUserFolder>} userFolders
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.userFolders = $util.emptyArray;

        /**
         * SyncDownResponse sharedFolders.
         * @member {Array.<Vault.ISharedFolder>} sharedFolders
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.sharedFolders = $util.emptyArray;

        /**
         * SyncDownResponse userFolderSharedFolders.
         * @member {Array.<Vault.IUserFolderSharedFolder>} userFolderSharedFolders
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.userFolderSharedFolders = $util.emptyArray;

        /**
         * SyncDownResponse sharedFolderFolders.
         * @member {Array.<Vault.ISharedFolderFolder>} sharedFolderFolders
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.sharedFolderFolders = $util.emptyArray;

        /**
         * SyncDownResponse records.
         * @member {Array.<Vault.IRecord>} records
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.records = $util.emptyArray;

        /**
         * SyncDownResponse recordMetaData.
         * @member {Array.<Vault.IRecordMetaData>} recordMetaData
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.recordMetaData = $util.emptyArray;

        /**
         * SyncDownResponse nonSharedData.
         * @member {Array.<Vault.INonSharedData>} nonSharedData
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.nonSharedData = $util.emptyArray;

        /**
         * SyncDownResponse recordLinks.
         * @member {Array.<Vault.IRecordLink>} recordLinks
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.recordLinks = $util.emptyArray;

        /**
         * SyncDownResponse userFolderRecords.
         * @member {Array.<Vault.IUserFolderRecord>} userFolderRecords
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.userFolderRecords = $util.emptyArray;

        /**
         * SyncDownResponse sharedFolderRecords.
         * @member {Array.<Vault.ISharedFolderRecord>} sharedFolderRecords
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.sharedFolderRecords = $util.emptyArray;

        /**
         * SyncDownResponse sharedFolderFolderRecords.
         * @member {Array.<Vault.ISharedFolderFolderRecord>} sharedFolderFolderRecords
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.sharedFolderFolderRecords = $util.emptyArray;

        /**
         * SyncDownResponse sharedFolderUsers.
         * @member {Array.<Vault.ISharedFolderUser>} sharedFolderUsers
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.sharedFolderUsers = $util.emptyArray;

        /**
         * SyncDownResponse sharedFolderTeams.
         * @member {Array.<Vault.ISharedFolderTeam>} sharedFolderTeams
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.sharedFolderTeams = $util.emptyArray;

        /**
         * SyncDownResponse recordAddAuditData.
         * @member {Array.<Uint8Array>} recordAddAuditData
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.recordAddAuditData = $util.emptyArray;

        /**
         * SyncDownResponse teams.
         * @member {Array.<Vault.ITeam>} teams
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.teams = $util.emptyArray;

        /**
         * SyncDownResponse sharingChanges.
         * @member {Array.<Vault.ISharingChange>} sharingChanges
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.sharingChanges = $util.emptyArray;

        /**
         * SyncDownResponse profile.
         * @member {Vault.IProfile|null|undefined} profile
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.profile = null;

        /**
         * SyncDownResponse profilePic.
         * @member {Vault.IProfilePic|null|undefined} profilePic
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.profilePic = null;

        /**
         * SyncDownResponse pendingTeamMembers.
         * @member {Array.<Vault.IPendingTeamMember>} pendingTeamMembers
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.pendingTeamMembers = $util.emptyArray;

        /**
         * SyncDownResponse breachWatchRecords.
         * @member {Array.<Vault.IBreachWatchRecord>} breachWatchRecords
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.breachWatchRecords = $util.emptyArray;

        /**
         * SyncDownResponse userAuths.
         * @member {Array.<Vault.IUserAuth>} userAuths
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.userAuths = $util.emptyArray;

        /**
         * SyncDownResponse breachWatchSecurityData.
         * @member {Array.<Vault.IBreachWatchSecurityData>} breachWatchSecurityData
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.breachWatchSecurityData = $util.emptyArray;

        /**
         * SyncDownResponse reusedPasswords.
         * @member {Vault.IReusedPasswords|null|undefined} reusedPasswords
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.reusedPasswords = null;

        /**
         * SyncDownResponse removedUserFolders.
         * @member {Array.<Uint8Array>} removedUserFolders
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.removedUserFolders = $util.emptyArray;

        /**
         * SyncDownResponse removedSharedFolders.
         * @member {Array.<Uint8Array>} removedSharedFolders
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.removedSharedFolders = $util.emptyArray;

        /**
         * SyncDownResponse removedUserFolderSharedFolders.
         * @member {Array.<Vault.IUserFolderSharedFolder>} removedUserFolderSharedFolders
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.removedUserFolderSharedFolders = $util.emptyArray;

        /**
         * SyncDownResponse removedSharedFolderFolders.
         * @member {Array.<Vault.ISharedFolderFolder>} removedSharedFolderFolders
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.removedSharedFolderFolders = $util.emptyArray;

        /**
         * SyncDownResponse removedRecords.
         * @member {Array.<Uint8Array>} removedRecords
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.removedRecords = $util.emptyArray;

        /**
         * SyncDownResponse removedRecordLinks.
         * @member {Array.<Vault.IRecordLink>} removedRecordLinks
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.removedRecordLinks = $util.emptyArray;

        /**
         * SyncDownResponse removedUserFolderRecords.
         * @member {Array.<Vault.IUserFolderRecord>} removedUserFolderRecords
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.removedUserFolderRecords = $util.emptyArray;

        /**
         * SyncDownResponse removedSharedFolderRecords.
         * @member {Array.<Vault.ISharedFolderRecord>} removedSharedFolderRecords
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.removedSharedFolderRecords = $util.emptyArray;

        /**
         * SyncDownResponse removedSharedFolderFolderRecords.
         * @member {Array.<Vault.ISharedFolderFolderRecord>} removedSharedFolderFolderRecords
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.removedSharedFolderFolderRecords = $util.emptyArray;

        /**
         * SyncDownResponse removedSharedFolderUsers.
         * @member {Array.<Vault.ISharedFolderUser>} removedSharedFolderUsers
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.removedSharedFolderUsers = $util.emptyArray;

        /**
         * SyncDownResponse removedSharedFolderTeams.
         * @member {Array.<Vault.ISharedFolderTeam>} removedSharedFolderTeams
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.removedSharedFolderTeams = $util.emptyArray;

        /**
         * SyncDownResponse removedTeams.
         * @member {Array.<Uint8Array>} removedTeams
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.removedTeams = $util.emptyArray;

        /**
         * SyncDownResponse ksmAppShares.
         * @member {Array.<Vault.IKsmChange>} ksmAppShares
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.ksmAppShares = $util.emptyArray;

        /**
         * SyncDownResponse ksmAppClients.
         * @member {Array.<Vault.IKsmChange>} ksmAppClients
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.ksmAppClients = $util.emptyArray;

        /**
         * SyncDownResponse shareInvitations.
         * @member {Array.<Vault.IShareInvitation>} shareInvitations
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.shareInvitations = $util.emptyArray;

        /**
         * SyncDownResponse diagnostics.
         * @member {Vault.ISyncDiagnostics|null|undefined} diagnostics
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.diagnostics = null;

        /**
         * SyncDownResponse recordRotations.
         * @member {Array.<Vault.IRecordRotation>} recordRotations
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.recordRotations = $util.emptyArray;

        /**
         * SyncDownResponse users.
         * @member {Array.<Vault.IUser>} users
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.users = $util.emptyArray;

        /**
         * SyncDownResponse removedUsers.
         * @member {Array.<Uint8Array>} removedUsers
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.removedUsers = $util.emptyArray;

        /**
         * SyncDownResponse securityScoreData.
         * @member {Array.<Vault.ISecurityScoreData>} securityScoreData
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.securityScoreData = $util.emptyArray;

        /**
         * SyncDownResponse notificationSync.
         * @member {Array.<NotificationCenter.INotificationWrapper>} notificationSync
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.notificationSync = $util.emptyArray;

        /**
         * SyncDownResponse keeperDriveData.
         * @member {Vault.IKeeperDriveData|null|undefined} keeperDriveData
         * @memberof Vault.SyncDownResponse
         * @instance
         */
        SyncDownResponse.prototype.keeperDriveData = null;

        /**
         * Creates a new SyncDownResponse instance using the specified properties.
         * @function create
         * @memberof Vault.SyncDownResponse
         * @static
         * @param {Vault.ISyncDownResponse=} [properties] Properties to set
         * @returns {Vault.SyncDownResponse} SyncDownResponse instance
         */
        SyncDownResponse.create = function create(properties) {
            return new SyncDownResponse(properties);
        };

        /**
         * Encodes the specified SyncDownResponse message. Does not implicitly {@link Vault.SyncDownResponse.verify|verify} messages.
         * @function encode
         * @memberof Vault.SyncDownResponse
         * @static
         * @param {Vault.ISyncDownResponse} message SyncDownResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncDownResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.continuationToken != null && Object.hasOwnProperty.call(message, "continuationToken"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.continuationToken);
            if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.hasMore);
            if (message.cacheStatus != null && Object.hasOwnProperty.call(message, "cacheStatus"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.cacheStatus);
            if (message.userFolders != null && message.userFolders.length)
                for (let i = 0; i < message.userFolders.length; ++i)
                    $root.Vault.UserFolder.encode(message.userFolders[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.sharedFolders != null && message.sharedFolders.length)
                for (let i = 0; i < message.sharedFolders.length; ++i)
                    $root.Vault.SharedFolder.encode(message.sharedFolders[i], writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            if (message.userFolderSharedFolders != null && message.userFolderSharedFolders.length)
                for (let i = 0; i < message.userFolderSharedFolders.length; ++i)
                    $root.Vault.UserFolderSharedFolder.encode(message.userFolderSharedFolders[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.sharedFolderFolders != null && message.sharedFolderFolders.length)
                for (let i = 0; i < message.sharedFolderFolders.length; ++i)
                    $root.Vault.SharedFolderFolder.encode(message.sharedFolderFolders[i], writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            if (message.records != null && message.records.length)
                for (let i = 0; i < message.records.length; ++i)
                    $root.Vault.Record.encode(message.records[i], writer.uint32(/* id 8, wireType 2 =*/66).fork(), q + 1).ldelim();
            if (message.recordMetaData != null && message.recordMetaData.length)
                for (let i = 0; i < message.recordMetaData.length; ++i)
                    $root.Vault.RecordMetaData.encode(message.recordMetaData[i], writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
            if (message.nonSharedData != null && message.nonSharedData.length)
                for (let i = 0; i < message.nonSharedData.length; ++i)
                    $root.Vault.NonSharedData.encode(message.nonSharedData[i], writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
            if (message.recordLinks != null && message.recordLinks.length)
                for (let i = 0; i < message.recordLinks.length; ++i)
                    $root.Vault.RecordLink.encode(message.recordLinks[i], writer.uint32(/* id 11, wireType 2 =*/90).fork(), q + 1).ldelim();
            if (message.userFolderRecords != null && message.userFolderRecords.length)
                for (let i = 0; i < message.userFolderRecords.length; ++i)
                    $root.Vault.UserFolderRecord.encode(message.userFolderRecords[i], writer.uint32(/* id 12, wireType 2 =*/98).fork(), q + 1).ldelim();
            if (message.sharedFolderRecords != null && message.sharedFolderRecords.length)
                for (let i = 0; i < message.sharedFolderRecords.length; ++i)
                    $root.Vault.SharedFolderRecord.encode(message.sharedFolderRecords[i], writer.uint32(/* id 13, wireType 2 =*/106).fork(), q + 1).ldelim();
            if (message.sharedFolderFolderRecords != null && message.sharedFolderFolderRecords.length)
                for (let i = 0; i < message.sharedFolderFolderRecords.length; ++i)
                    $root.Vault.SharedFolderFolderRecord.encode(message.sharedFolderFolderRecords[i], writer.uint32(/* id 14, wireType 2 =*/114).fork(), q + 1).ldelim();
            if (message.sharedFolderUsers != null && message.sharedFolderUsers.length)
                for (let i = 0; i < message.sharedFolderUsers.length; ++i)
                    $root.Vault.SharedFolderUser.encode(message.sharedFolderUsers[i], writer.uint32(/* id 15, wireType 2 =*/122).fork(), q + 1).ldelim();
            if (message.sharedFolderTeams != null && message.sharedFolderTeams.length)
                for (let i = 0; i < message.sharedFolderTeams.length; ++i)
                    $root.Vault.SharedFolderTeam.encode(message.sharedFolderTeams[i], writer.uint32(/* id 16, wireType 2 =*/130).fork(), q + 1).ldelim();
            if (message.recordAddAuditData != null && message.recordAddAuditData.length)
                for (let i = 0; i < message.recordAddAuditData.length; ++i)
                    writer.uint32(/* id 17, wireType 2 =*/138).bytes(message.recordAddAuditData[i]);
            if (message.teams != null && message.teams.length)
                for (let i = 0; i < message.teams.length; ++i)
                    $root.Vault.Team.encode(message.teams[i], writer.uint32(/* id 18, wireType 2 =*/146).fork(), q + 1).ldelim();
            if (message.sharingChanges != null && message.sharingChanges.length)
                for (let i = 0; i < message.sharingChanges.length; ++i)
                    $root.Vault.SharingChange.encode(message.sharingChanges[i], writer.uint32(/* id 19, wireType 2 =*/154).fork(), q + 1).ldelim();
            if (message.profile != null && Object.hasOwnProperty.call(message, "profile"))
                $root.Vault.Profile.encode(message.profile, writer.uint32(/* id 20, wireType 2 =*/162).fork(), q + 1).ldelim();
            if (message.profilePic != null && Object.hasOwnProperty.call(message, "profilePic"))
                $root.Vault.ProfilePic.encode(message.profilePic, writer.uint32(/* id 21, wireType 2 =*/170).fork(), q + 1).ldelim();
            if (message.pendingTeamMembers != null && message.pendingTeamMembers.length)
                for (let i = 0; i < message.pendingTeamMembers.length; ++i)
                    $root.Vault.PendingTeamMember.encode(message.pendingTeamMembers[i], writer.uint32(/* id 22, wireType 2 =*/178).fork(), q + 1).ldelim();
            if (message.breachWatchRecords != null && message.breachWatchRecords.length)
                for (let i = 0; i < message.breachWatchRecords.length; ++i)
                    $root.Vault.BreachWatchRecord.encode(message.breachWatchRecords[i], writer.uint32(/* id 23, wireType 2 =*/186).fork(), q + 1).ldelim();
            if (message.userAuths != null && message.userAuths.length)
                for (let i = 0; i < message.userAuths.length; ++i)
                    $root.Vault.UserAuth.encode(message.userAuths[i], writer.uint32(/* id 24, wireType 2 =*/194).fork(), q + 1).ldelim();
            if (message.breachWatchSecurityData != null && message.breachWatchSecurityData.length)
                for (let i = 0; i < message.breachWatchSecurityData.length; ++i)
                    $root.Vault.BreachWatchSecurityData.encode(message.breachWatchSecurityData[i], writer.uint32(/* id 25, wireType 2 =*/202).fork(), q + 1).ldelim();
            if (message.reusedPasswords != null && Object.hasOwnProperty.call(message, "reusedPasswords"))
                $root.Vault.ReusedPasswords.encode(message.reusedPasswords, writer.uint32(/* id 26, wireType 2 =*/210).fork(), q + 1).ldelim();
            if (message.removedUserFolders != null && message.removedUserFolders.length)
                for (let i = 0; i < message.removedUserFolders.length; ++i)
                    writer.uint32(/* id 27, wireType 2 =*/218).bytes(message.removedUserFolders[i]);
            if (message.removedSharedFolders != null && message.removedSharedFolders.length)
                for (let i = 0; i < message.removedSharedFolders.length; ++i)
                    writer.uint32(/* id 28, wireType 2 =*/226).bytes(message.removedSharedFolders[i]);
            if (message.removedUserFolderSharedFolders != null && message.removedUserFolderSharedFolders.length)
                for (let i = 0; i < message.removedUserFolderSharedFolders.length; ++i)
                    $root.Vault.UserFolderSharedFolder.encode(message.removedUserFolderSharedFolders[i], writer.uint32(/* id 29, wireType 2 =*/234).fork(), q + 1).ldelim();
            if (message.removedSharedFolderFolders != null && message.removedSharedFolderFolders.length)
                for (let i = 0; i < message.removedSharedFolderFolders.length; ++i)
                    $root.Vault.SharedFolderFolder.encode(message.removedSharedFolderFolders[i], writer.uint32(/* id 30, wireType 2 =*/242).fork(), q + 1).ldelim();
            if (message.removedRecords != null && message.removedRecords.length)
                for (let i = 0; i < message.removedRecords.length; ++i)
                    writer.uint32(/* id 31, wireType 2 =*/250).bytes(message.removedRecords[i]);
            if (message.removedRecordLinks != null && message.removedRecordLinks.length)
                for (let i = 0; i < message.removedRecordLinks.length; ++i)
                    $root.Vault.RecordLink.encode(message.removedRecordLinks[i], writer.uint32(/* id 32, wireType 2 =*/258).fork(), q + 1).ldelim();
            if (message.removedUserFolderRecords != null && message.removedUserFolderRecords.length)
                for (let i = 0; i < message.removedUserFolderRecords.length; ++i)
                    $root.Vault.UserFolderRecord.encode(message.removedUserFolderRecords[i], writer.uint32(/* id 33, wireType 2 =*/266).fork(), q + 1).ldelim();
            if (message.removedSharedFolderRecords != null && message.removedSharedFolderRecords.length)
                for (let i = 0; i < message.removedSharedFolderRecords.length; ++i)
                    $root.Vault.SharedFolderRecord.encode(message.removedSharedFolderRecords[i], writer.uint32(/* id 34, wireType 2 =*/274).fork(), q + 1).ldelim();
            if (message.removedSharedFolderFolderRecords != null && message.removedSharedFolderFolderRecords.length)
                for (let i = 0; i < message.removedSharedFolderFolderRecords.length; ++i)
                    $root.Vault.SharedFolderFolderRecord.encode(message.removedSharedFolderFolderRecords[i], writer.uint32(/* id 35, wireType 2 =*/282).fork(), q + 1).ldelim();
            if (message.removedSharedFolderUsers != null && message.removedSharedFolderUsers.length)
                for (let i = 0; i < message.removedSharedFolderUsers.length; ++i)
                    $root.Vault.SharedFolderUser.encode(message.removedSharedFolderUsers[i], writer.uint32(/* id 36, wireType 2 =*/290).fork(), q + 1).ldelim();
            if (message.removedSharedFolderTeams != null && message.removedSharedFolderTeams.length)
                for (let i = 0; i < message.removedSharedFolderTeams.length; ++i)
                    $root.Vault.SharedFolderTeam.encode(message.removedSharedFolderTeams[i], writer.uint32(/* id 37, wireType 2 =*/298).fork(), q + 1).ldelim();
            if (message.removedTeams != null && message.removedTeams.length)
                for (let i = 0; i < message.removedTeams.length; ++i)
                    writer.uint32(/* id 38, wireType 2 =*/306).bytes(message.removedTeams[i]);
            if (message.ksmAppShares != null && message.ksmAppShares.length)
                for (let i = 0; i < message.ksmAppShares.length; ++i)
                    $root.Vault.KsmChange.encode(message.ksmAppShares[i], writer.uint32(/* id 39, wireType 2 =*/314).fork(), q + 1).ldelim();
            if (message.ksmAppClients != null && message.ksmAppClients.length)
                for (let i = 0; i < message.ksmAppClients.length; ++i)
                    $root.Vault.KsmChange.encode(message.ksmAppClients[i], writer.uint32(/* id 40, wireType 2 =*/322).fork(), q + 1).ldelim();
            if (message.shareInvitations != null && message.shareInvitations.length)
                for (let i = 0; i < message.shareInvitations.length; ++i)
                    $root.Vault.ShareInvitation.encode(message.shareInvitations[i], writer.uint32(/* id 41, wireType 2 =*/330).fork(), q + 1).ldelim();
            if (message.diagnostics != null && Object.hasOwnProperty.call(message, "diagnostics"))
                $root.Vault.SyncDiagnostics.encode(message.diagnostics, writer.uint32(/* id 42, wireType 2 =*/338).fork(), q + 1).ldelim();
            if (message.recordRotations != null && message.recordRotations.length)
                for (let i = 0; i < message.recordRotations.length; ++i)
                    $root.Vault.RecordRotation.encode(message.recordRotations[i], writer.uint32(/* id 43, wireType 2 =*/346).fork(), q + 1).ldelim();
            if (message.users != null && message.users.length)
                for (let i = 0; i < message.users.length; ++i)
                    $root.Vault.User.encode(message.users[i], writer.uint32(/* id 44, wireType 2 =*/354).fork(), q + 1).ldelim();
            if (message.removedUsers != null && message.removedUsers.length)
                for (let i = 0; i < message.removedUsers.length; ++i)
                    writer.uint32(/* id 45, wireType 2 =*/362).bytes(message.removedUsers[i]);
            if (message.securityScoreData != null && message.securityScoreData.length)
                for (let i = 0; i < message.securityScoreData.length; ++i)
                    $root.Vault.SecurityScoreData.encode(message.securityScoreData[i], writer.uint32(/* id 46, wireType 2 =*/370).fork(), q + 1).ldelim();
            if (message.notificationSync != null && message.notificationSync.length)
                for (let i = 0; i < message.notificationSync.length; ++i)
                    $root.NotificationCenter.NotificationWrapper.encode(message.notificationSync[i], writer.uint32(/* id 47, wireType 2 =*/378).fork(), q + 1).ldelim();
            if (message.keeperDriveData != null && Object.hasOwnProperty.call(message, "keeperDriveData"))
                $root.Vault.KeeperDriveData.encode(message.keeperDriveData, writer.uint32(/* id 48, wireType 2 =*/386).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a SyncDownResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.SyncDownResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.SyncDownResponse} SyncDownResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncDownResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.SyncDownResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.continuationToken = reader.bytes();
                        break;
                    }
                case 2: {
                        message.hasMore = reader.bool();
                        break;
                    }
                case 3: {
                        message.cacheStatus = reader.int32();
                        break;
                    }
                case 4: {
                        if (!(message.userFolders && message.userFolders.length))
                            message.userFolders = [];
                        message.userFolders.push($root.Vault.UserFolder.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 5: {
                        if (!(message.sharedFolders && message.sharedFolders.length))
                            message.sharedFolders = [];
                        message.sharedFolders.push($root.Vault.SharedFolder.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 6: {
                        if (!(message.userFolderSharedFolders && message.userFolderSharedFolders.length))
                            message.userFolderSharedFolders = [];
                        message.userFolderSharedFolders.push($root.Vault.UserFolderSharedFolder.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 7: {
                        if (!(message.sharedFolderFolders && message.sharedFolderFolders.length))
                            message.sharedFolderFolders = [];
                        message.sharedFolderFolders.push($root.Vault.SharedFolderFolder.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 8: {
                        if (!(message.records && message.records.length))
                            message.records = [];
                        message.records.push($root.Vault.Record.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 9: {
                        if (!(message.recordMetaData && message.recordMetaData.length))
                            message.recordMetaData = [];
                        message.recordMetaData.push($root.Vault.RecordMetaData.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 10: {
                        if (!(message.nonSharedData && message.nonSharedData.length))
                            message.nonSharedData = [];
                        message.nonSharedData.push($root.Vault.NonSharedData.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 11: {
                        if (!(message.recordLinks && message.recordLinks.length))
                            message.recordLinks = [];
                        message.recordLinks.push($root.Vault.RecordLink.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 12: {
                        if (!(message.userFolderRecords && message.userFolderRecords.length))
                            message.userFolderRecords = [];
                        message.userFolderRecords.push($root.Vault.UserFolderRecord.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 13: {
                        if (!(message.sharedFolderRecords && message.sharedFolderRecords.length))
                            message.sharedFolderRecords = [];
                        message.sharedFolderRecords.push($root.Vault.SharedFolderRecord.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 14: {
                        if (!(message.sharedFolderFolderRecords && message.sharedFolderFolderRecords.length))
                            message.sharedFolderFolderRecords = [];
                        message.sharedFolderFolderRecords.push($root.Vault.SharedFolderFolderRecord.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 15: {
                        if (!(message.sharedFolderUsers && message.sharedFolderUsers.length))
                            message.sharedFolderUsers = [];
                        message.sharedFolderUsers.push($root.Vault.SharedFolderUser.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 16: {
                        if (!(message.sharedFolderTeams && message.sharedFolderTeams.length))
                            message.sharedFolderTeams = [];
                        message.sharedFolderTeams.push($root.Vault.SharedFolderTeam.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 17: {
                        if (!(message.recordAddAuditData && message.recordAddAuditData.length))
                            message.recordAddAuditData = [];
                        message.recordAddAuditData.push(reader.bytes());
                        break;
                    }
                case 18: {
                        if (!(message.teams && message.teams.length))
                            message.teams = [];
                        message.teams.push($root.Vault.Team.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 19: {
                        if (!(message.sharingChanges && message.sharingChanges.length))
                            message.sharingChanges = [];
                        message.sharingChanges.push($root.Vault.SharingChange.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 20: {
                        message.profile = $root.Vault.Profile.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 21: {
                        message.profilePic = $root.Vault.ProfilePic.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 22: {
                        if (!(message.pendingTeamMembers && message.pendingTeamMembers.length))
                            message.pendingTeamMembers = [];
                        message.pendingTeamMembers.push($root.Vault.PendingTeamMember.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 23: {
                        if (!(message.breachWatchRecords && message.breachWatchRecords.length))
                            message.breachWatchRecords = [];
                        message.breachWatchRecords.push($root.Vault.BreachWatchRecord.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 24: {
                        if (!(message.userAuths && message.userAuths.length))
                            message.userAuths = [];
                        message.userAuths.push($root.Vault.UserAuth.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 25: {
                        if (!(message.breachWatchSecurityData && message.breachWatchSecurityData.length))
                            message.breachWatchSecurityData = [];
                        message.breachWatchSecurityData.push($root.Vault.BreachWatchSecurityData.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 26: {
                        message.reusedPasswords = $root.Vault.ReusedPasswords.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 27: {
                        if (!(message.removedUserFolders && message.removedUserFolders.length))
                            message.removedUserFolders = [];
                        message.removedUserFolders.push(reader.bytes());
                        break;
                    }
                case 28: {
                        if (!(message.removedSharedFolders && message.removedSharedFolders.length))
                            message.removedSharedFolders = [];
                        message.removedSharedFolders.push(reader.bytes());
                        break;
                    }
                case 29: {
                        if (!(message.removedUserFolderSharedFolders && message.removedUserFolderSharedFolders.length))
                            message.removedUserFolderSharedFolders = [];
                        message.removedUserFolderSharedFolders.push($root.Vault.UserFolderSharedFolder.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 30: {
                        if (!(message.removedSharedFolderFolders && message.removedSharedFolderFolders.length))
                            message.removedSharedFolderFolders = [];
                        message.removedSharedFolderFolders.push($root.Vault.SharedFolderFolder.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 31: {
                        if (!(message.removedRecords && message.removedRecords.length))
                            message.removedRecords = [];
                        message.removedRecords.push(reader.bytes());
                        break;
                    }
                case 32: {
                        if (!(message.removedRecordLinks && message.removedRecordLinks.length))
                            message.removedRecordLinks = [];
                        message.removedRecordLinks.push($root.Vault.RecordLink.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 33: {
                        if (!(message.removedUserFolderRecords && message.removedUserFolderRecords.length))
                            message.removedUserFolderRecords = [];
                        message.removedUserFolderRecords.push($root.Vault.UserFolderRecord.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 34: {
                        if (!(message.removedSharedFolderRecords && message.removedSharedFolderRecords.length))
                            message.removedSharedFolderRecords = [];
                        message.removedSharedFolderRecords.push($root.Vault.SharedFolderRecord.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 35: {
                        if (!(message.removedSharedFolderFolderRecords && message.removedSharedFolderFolderRecords.length))
                            message.removedSharedFolderFolderRecords = [];
                        message.removedSharedFolderFolderRecords.push($root.Vault.SharedFolderFolderRecord.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 36: {
                        if (!(message.removedSharedFolderUsers && message.removedSharedFolderUsers.length))
                            message.removedSharedFolderUsers = [];
                        message.removedSharedFolderUsers.push($root.Vault.SharedFolderUser.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 37: {
                        if (!(message.removedSharedFolderTeams && message.removedSharedFolderTeams.length))
                            message.removedSharedFolderTeams = [];
                        message.removedSharedFolderTeams.push($root.Vault.SharedFolderTeam.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 38: {
                        if (!(message.removedTeams && message.removedTeams.length))
                            message.removedTeams = [];
                        message.removedTeams.push(reader.bytes());
                        break;
                    }
                case 39: {
                        if (!(message.ksmAppShares && message.ksmAppShares.length))
                            message.ksmAppShares = [];
                        message.ksmAppShares.push($root.Vault.KsmChange.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 40: {
                        if (!(message.ksmAppClients && message.ksmAppClients.length))
                            message.ksmAppClients = [];
                        message.ksmAppClients.push($root.Vault.KsmChange.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 41: {
                        if (!(message.shareInvitations && message.shareInvitations.length))
                            message.shareInvitations = [];
                        message.shareInvitations.push($root.Vault.ShareInvitation.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 42: {
                        message.diagnostics = $root.Vault.SyncDiagnostics.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 43: {
                        if (!(message.recordRotations && message.recordRotations.length))
                            message.recordRotations = [];
                        message.recordRotations.push($root.Vault.RecordRotation.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 44: {
                        if (!(message.users && message.users.length))
                            message.users = [];
                        message.users.push($root.Vault.User.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 45: {
                        if (!(message.removedUsers && message.removedUsers.length))
                            message.removedUsers = [];
                        message.removedUsers.push(reader.bytes());
                        break;
                    }
                case 46: {
                        if (!(message.securityScoreData && message.securityScoreData.length))
                            message.securityScoreData = [];
                        message.securityScoreData.push($root.Vault.SecurityScoreData.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 47: {
                        if (!(message.notificationSync && message.notificationSync.length))
                            message.notificationSync = [];
                        message.notificationSync.push($root.NotificationCenter.NotificationWrapper.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 48: {
                        message.keeperDriveData = $root.Vault.KeeperDriveData.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates a SyncDownResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.SyncDownResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.SyncDownResponse} SyncDownResponse
         */
        SyncDownResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.SyncDownResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.SyncDownResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.SyncDownResponse();
            if (object.continuationToken != null)
                if (typeof object.continuationToken === "string")
                    $util.base64.decode(object.continuationToken, message.continuationToken = $util.newBuffer($util.base64.length(object.continuationToken)), 0);
                else if (object.continuationToken.length >= 0)
                    message.continuationToken = object.continuationToken;
            if (object.hasMore != null)
                message.hasMore = Boolean(object.hasMore);
            switch (object.cacheStatus) {
            default:
                if (typeof object.cacheStatus === "number") {
                    message.cacheStatus = object.cacheStatus;
                    break;
                }
                break;
            case "KEEP":
            case 0:
                message.cacheStatus = 0;
                break;
            case "CLEAR":
            case 1:
                message.cacheStatus = 1;
                break;
            }
            if (object.userFolders) {
                if (!Array.isArray(object.userFolders))
                    throw TypeError(".Vault.SyncDownResponse.userFolders: array expected");
                message.userFolders = [];
                for (let i = 0; i < object.userFolders.length; ++i) {
                    if (!$util.isObject(object.userFolders[i]))
                        throw TypeError(".Vault.SyncDownResponse.userFolders: object expected");
                    message.userFolders[i] = $root.Vault.UserFolder.fromObject(object.userFolders[i], long + 1);
                }
            }
            if (object.sharedFolders) {
                if (!Array.isArray(object.sharedFolders))
                    throw TypeError(".Vault.SyncDownResponse.sharedFolders: array expected");
                message.sharedFolders = [];
                for (let i = 0; i < object.sharedFolders.length; ++i) {
                    if (!$util.isObject(object.sharedFolders[i]))
                        throw TypeError(".Vault.SyncDownResponse.sharedFolders: object expected");
                    message.sharedFolders[i] = $root.Vault.SharedFolder.fromObject(object.sharedFolders[i], long + 1);
                }
            }
            if (object.userFolderSharedFolders) {
                if (!Array.isArray(object.userFolderSharedFolders))
                    throw TypeError(".Vault.SyncDownResponse.userFolderSharedFolders: array expected");
                message.userFolderSharedFolders = [];
                for (let i = 0; i < object.userFolderSharedFolders.length; ++i) {
                    if (!$util.isObject(object.userFolderSharedFolders[i]))
                        throw TypeError(".Vault.SyncDownResponse.userFolderSharedFolders: object expected");
                    message.userFolderSharedFolders[i] = $root.Vault.UserFolderSharedFolder.fromObject(object.userFolderSharedFolders[i], long + 1);
                }
            }
            if (object.sharedFolderFolders) {
                if (!Array.isArray(object.sharedFolderFolders))
                    throw TypeError(".Vault.SyncDownResponse.sharedFolderFolders: array expected");
                message.sharedFolderFolders = [];
                for (let i = 0; i < object.sharedFolderFolders.length; ++i) {
                    if (!$util.isObject(object.sharedFolderFolders[i]))
                        throw TypeError(".Vault.SyncDownResponse.sharedFolderFolders: object expected");
                    message.sharedFolderFolders[i] = $root.Vault.SharedFolderFolder.fromObject(object.sharedFolderFolders[i], long + 1);
                }
            }
            if (object.records) {
                if (!Array.isArray(object.records))
                    throw TypeError(".Vault.SyncDownResponse.records: array expected");
                message.records = [];
                for (let i = 0; i < object.records.length; ++i) {
                    if (!$util.isObject(object.records[i]))
                        throw TypeError(".Vault.SyncDownResponse.records: object expected");
                    message.records[i] = $root.Vault.Record.fromObject(object.records[i], long + 1);
                }
            }
            if (object.recordMetaData) {
                if (!Array.isArray(object.recordMetaData))
                    throw TypeError(".Vault.SyncDownResponse.recordMetaData: array expected");
                message.recordMetaData = [];
                for (let i = 0; i < object.recordMetaData.length; ++i) {
                    if (!$util.isObject(object.recordMetaData[i]))
                        throw TypeError(".Vault.SyncDownResponse.recordMetaData: object expected");
                    message.recordMetaData[i] = $root.Vault.RecordMetaData.fromObject(object.recordMetaData[i], long + 1);
                }
            }
            if (object.nonSharedData) {
                if (!Array.isArray(object.nonSharedData))
                    throw TypeError(".Vault.SyncDownResponse.nonSharedData: array expected");
                message.nonSharedData = [];
                for (let i = 0; i < object.nonSharedData.length; ++i) {
                    if (!$util.isObject(object.nonSharedData[i]))
                        throw TypeError(".Vault.SyncDownResponse.nonSharedData: object expected");
                    message.nonSharedData[i] = $root.Vault.NonSharedData.fromObject(object.nonSharedData[i], long + 1);
                }
            }
            if (object.recordLinks) {
                if (!Array.isArray(object.recordLinks))
                    throw TypeError(".Vault.SyncDownResponse.recordLinks: array expected");
                message.recordLinks = [];
                for (let i = 0; i < object.recordLinks.length; ++i) {
                    if (!$util.isObject(object.recordLinks[i]))
                        throw TypeError(".Vault.SyncDownResponse.recordLinks: object expected");
                    message.recordLinks[i] = $root.Vault.RecordLink.fromObject(object.recordLinks[i], long + 1);
                }
            }
            if (object.userFolderRecords) {
                if (!Array.isArray(object.userFolderRecords))
                    throw TypeError(".Vault.SyncDownResponse.userFolderRecords: array expected");
                message.userFolderRecords = [];
                for (let i = 0; i < object.userFolderRecords.length; ++i) {
                    if (!$util.isObject(object.userFolderRecords[i]))
                        throw TypeError(".Vault.SyncDownResponse.userFolderRecords: object expected");
                    message.userFolderRecords[i] = $root.Vault.UserFolderRecord.fromObject(object.userFolderRecords[i], long + 1);
                }
            }
            if (object.sharedFolderRecords) {
                if (!Array.isArray(object.sharedFolderRecords))
                    throw TypeError(".Vault.SyncDownResponse.sharedFolderRecords: array expected");
                message.sharedFolderRecords = [];
                for (let i = 0; i < object.sharedFolderRecords.length; ++i) {
                    if (!$util.isObject(object.sharedFolderRecords[i]))
                        throw TypeError(".Vault.SyncDownResponse.sharedFolderRecords: object expected");
                    message.sharedFolderRecords[i] = $root.Vault.SharedFolderRecord.fromObject(object.sharedFolderRecords[i], long + 1);
                }
            }
            if (object.sharedFolderFolderRecords) {
                if (!Array.isArray(object.sharedFolderFolderRecords))
                    throw TypeError(".Vault.SyncDownResponse.sharedFolderFolderRecords: array expected");
                message.sharedFolderFolderRecords = [];
                for (let i = 0; i < object.sharedFolderFolderRecords.length; ++i) {
                    if (!$util.isObject(object.sharedFolderFolderRecords[i]))
                        throw TypeError(".Vault.SyncDownResponse.sharedFolderFolderRecords: object expected");
                    message.sharedFolderFolderRecords[i] = $root.Vault.SharedFolderFolderRecord.fromObject(object.sharedFolderFolderRecords[i], long + 1);
                }
            }
            if (object.sharedFolderUsers) {
                if (!Array.isArray(object.sharedFolderUsers))
                    throw TypeError(".Vault.SyncDownResponse.sharedFolderUsers: array expected");
                message.sharedFolderUsers = [];
                for (let i = 0; i < object.sharedFolderUsers.length; ++i) {
                    if (!$util.isObject(object.sharedFolderUsers[i]))
                        throw TypeError(".Vault.SyncDownResponse.sharedFolderUsers: object expected");
                    message.sharedFolderUsers[i] = $root.Vault.SharedFolderUser.fromObject(object.sharedFolderUsers[i], long + 1);
                }
            }
            if (object.sharedFolderTeams) {
                if (!Array.isArray(object.sharedFolderTeams))
                    throw TypeError(".Vault.SyncDownResponse.sharedFolderTeams: array expected");
                message.sharedFolderTeams = [];
                for (let i = 0; i < object.sharedFolderTeams.length; ++i) {
                    if (!$util.isObject(object.sharedFolderTeams[i]))
                        throw TypeError(".Vault.SyncDownResponse.sharedFolderTeams: object expected");
                    message.sharedFolderTeams[i] = $root.Vault.SharedFolderTeam.fromObject(object.sharedFolderTeams[i], long + 1);
                }
            }
            if (object.recordAddAuditData) {
                if (!Array.isArray(object.recordAddAuditData))
                    throw TypeError(".Vault.SyncDownResponse.recordAddAuditData: array expected");
                message.recordAddAuditData = [];
                for (let i = 0; i < object.recordAddAuditData.length; ++i)
                    if (typeof object.recordAddAuditData[i] === "string")
                        $util.base64.decode(object.recordAddAuditData[i], message.recordAddAuditData[i] = $util.newBuffer($util.base64.length(object.recordAddAuditData[i])), 0);
                    else if (object.recordAddAuditData[i].length >= 0)
                        message.recordAddAuditData[i] = object.recordAddAuditData[i];
            }
            if (object.teams) {
                if (!Array.isArray(object.teams))
                    throw TypeError(".Vault.SyncDownResponse.teams: array expected");
                message.teams = [];
                for (let i = 0; i < object.teams.length; ++i) {
                    if (!$util.isObject(object.teams[i]))
                        throw TypeError(".Vault.SyncDownResponse.teams: object expected");
                    message.teams[i] = $root.Vault.Team.fromObject(object.teams[i], long + 1);
                }
            }
            if (object.sharingChanges) {
                if (!Array.isArray(object.sharingChanges))
                    throw TypeError(".Vault.SyncDownResponse.sharingChanges: array expected");
                message.sharingChanges = [];
                for (let i = 0; i < object.sharingChanges.length; ++i) {
                    if (!$util.isObject(object.sharingChanges[i]))
                        throw TypeError(".Vault.SyncDownResponse.sharingChanges: object expected");
                    message.sharingChanges[i] = $root.Vault.SharingChange.fromObject(object.sharingChanges[i], long + 1);
                }
            }
            if (object.profile != null) {
                if (!$util.isObject(object.profile))
                    throw TypeError(".Vault.SyncDownResponse.profile: object expected");
                message.profile = $root.Vault.Profile.fromObject(object.profile, long + 1);
            }
            if (object.profilePic != null) {
                if (!$util.isObject(object.profilePic))
                    throw TypeError(".Vault.SyncDownResponse.profilePic: object expected");
                message.profilePic = $root.Vault.ProfilePic.fromObject(object.profilePic, long + 1);
            }
            if (object.pendingTeamMembers) {
                if (!Array.isArray(object.pendingTeamMembers))
                    throw TypeError(".Vault.SyncDownResponse.pendingTeamMembers: array expected");
                message.pendingTeamMembers = [];
                for (let i = 0; i < object.pendingTeamMembers.length; ++i) {
                    if (!$util.isObject(object.pendingTeamMembers[i]))
                        throw TypeError(".Vault.SyncDownResponse.pendingTeamMembers: object expected");
                    message.pendingTeamMembers[i] = $root.Vault.PendingTeamMember.fromObject(object.pendingTeamMembers[i], long + 1);
                }
            }
            if (object.breachWatchRecords) {
                if (!Array.isArray(object.breachWatchRecords))
                    throw TypeError(".Vault.SyncDownResponse.breachWatchRecords: array expected");
                message.breachWatchRecords = [];
                for (let i = 0; i < object.breachWatchRecords.length; ++i) {
                    if (!$util.isObject(object.breachWatchRecords[i]))
                        throw TypeError(".Vault.SyncDownResponse.breachWatchRecords: object expected");
                    message.breachWatchRecords[i] = $root.Vault.BreachWatchRecord.fromObject(object.breachWatchRecords[i], long + 1);
                }
            }
            if (object.userAuths) {
                if (!Array.isArray(object.userAuths))
                    throw TypeError(".Vault.SyncDownResponse.userAuths: array expected");
                message.userAuths = [];
                for (let i = 0; i < object.userAuths.length; ++i) {
                    if (!$util.isObject(object.userAuths[i]))
                        throw TypeError(".Vault.SyncDownResponse.userAuths: object expected");
                    message.userAuths[i] = $root.Vault.UserAuth.fromObject(object.userAuths[i], long + 1);
                }
            }
            if (object.breachWatchSecurityData) {
                if (!Array.isArray(object.breachWatchSecurityData))
                    throw TypeError(".Vault.SyncDownResponse.breachWatchSecurityData: array expected");
                message.breachWatchSecurityData = [];
                for (let i = 0; i < object.breachWatchSecurityData.length; ++i) {
                    if (!$util.isObject(object.breachWatchSecurityData[i]))
                        throw TypeError(".Vault.SyncDownResponse.breachWatchSecurityData: object expected");
                    message.breachWatchSecurityData[i] = $root.Vault.BreachWatchSecurityData.fromObject(object.breachWatchSecurityData[i], long + 1);
                }
            }
            if (object.reusedPasswords != null) {
                if (!$util.isObject(object.reusedPasswords))
                    throw TypeError(".Vault.SyncDownResponse.reusedPasswords: object expected");
                message.reusedPasswords = $root.Vault.ReusedPasswords.fromObject(object.reusedPasswords, long + 1);
            }
            if (object.removedUserFolders) {
                if (!Array.isArray(object.removedUserFolders))
                    throw TypeError(".Vault.SyncDownResponse.removedUserFolders: array expected");
                message.removedUserFolders = [];
                for (let i = 0; i < object.removedUserFolders.length; ++i)
                    if (typeof object.removedUserFolders[i] === "string")
                        $util.base64.decode(object.removedUserFolders[i], message.removedUserFolders[i] = $util.newBuffer($util.base64.length(object.removedUserFolders[i])), 0);
                    else if (object.removedUserFolders[i].length >= 0)
                        message.removedUserFolders[i] = object.removedUserFolders[i];
            }
            if (object.removedSharedFolders) {
                if (!Array.isArray(object.removedSharedFolders))
                    throw TypeError(".Vault.SyncDownResponse.removedSharedFolders: array expected");
                message.removedSharedFolders = [];
                for (let i = 0; i < object.removedSharedFolders.length; ++i)
                    if (typeof object.removedSharedFolders[i] === "string")
                        $util.base64.decode(object.removedSharedFolders[i], message.removedSharedFolders[i] = $util.newBuffer($util.base64.length(object.removedSharedFolders[i])), 0);
                    else if (object.removedSharedFolders[i].length >= 0)
                        message.removedSharedFolders[i] = object.removedSharedFolders[i];
            }
            if (object.removedUserFolderSharedFolders) {
                if (!Array.isArray(object.removedUserFolderSharedFolders))
                    throw TypeError(".Vault.SyncDownResponse.removedUserFolderSharedFolders: array expected");
                message.removedUserFolderSharedFolders = [];
                for (let i = 0; i < object.removedUserFolderSharedFolders.length; ++i) {
                    if (!$util.isObject(object.removedUserFolderSharedFolders[i]))
                        throw TypeError(".Vault.SyncDownResponse.removedUserFolderSharedFolders: object expected");
                    message.removedUserFolderSharedFolders[i] = $root.Vault.UserFolderSharedFolder.fromObject(object.removedUserFolderSharedFolders[i], long + 1);
                }
            }
            if (object.removedSharedFolderFolders) {
                if (!Array.isArray(object.removedSharedFolderFolders))
                    throw TypeError(".Vault.SyncDownResponse.removedSharedFolderFolders: array expected");
                message.removedSharedFolderFolders = [];
                for (let i = 0; i < object.removedSharedFolderFolders.length; ++i) {
                    if (!$util.isObject(object.removedSharedFolderFolders[i]))
                        throw TypeError(".Vault.SyncDownResponse.removedSharedFolderFolders: object expected");
                    message.removedSharedFolderFolders[i] = $root.Vault.SharedFolderFolder.fromObject(object.removedSharedFolderFolders[i], long + 1);
                }
            }
            if (object.removedRecords) {
                if (!Array.isArray(object.removedRecords))
                    throw TypeError(".Vault.SyncDownResponse.removedRecords: array expected");
                message.removedRecords = [];
                for (let i = 0; i < object.removedRecords.length; ++i)
                    if (typeof object.removedRecords[i] === "string")
                        $util.base64.decode(object.removedRecords[i], message.removedRecords[i] = $util.newBuffer($util.base64.length(object.removedRecords[i])), 0);
                    else if (object.removedRecords[i].length >= 0)
                        message.removedRecords[i] = object.removedRecords[i];
            }
            if (object.removedRecordLinks) {
                if (!Array.isArray(object.removedRecordLinks))
                    throw TypeError(".Vault.SyncDownResponse.removedRecordLinks: array expected");
                message.removedRecordLinks = [];
                for (let i = 0; i < object.removedRecordLinks.length; ++i) {
                    if (!$util.isObject(object.removedRecordLinks[i]))
                        throw TypeError(".Vault.SyncDownResponse.removedRecordLinks: object expected");
                    message.removedRecordLinks[i] = $root.Vault.RecordLink.fromObject(object.removedRecordLinks[i], long + 1);
                }
            }
            if (object.removedUserFolderRecords) {
                if (!Array.isArray(object.removedUserFolderRecords))
                    throw TypeError(".Vault.SyncDownResponse.removedUserFolderRecords: array expected");
                message.removedUserFolderRecords = [];
                for (let i = 0; i < object.removedUserFolderRecords.length; ++i) {
                    if (!$util.isObject(object.removedUserFolderRecords[i]))
                        throw TypeError(".Vault.SyncDownResponse.removedUserFolderRecords: object expected");
                    message.removedUserFolderRecords[i] = $root.Vault.UserFolderRecord.fromObject(object.removedUserFolderRecords[i], long + 1);
                }
            }
            if (object.removedSharedFolderRecords) {
                if (!Array.isArray(object.removedSharedFolderRecords))
                    throw TypeError(".Vault.SyncDownResponse.removedSharedFolderRecords: array expected");
                message.removedSharedFolderRecords = [];
                for (let i = 0; i < object.removedSharedFolderRecords.length; ++i) {
                    if (!$util.isObject(object.removedSharedFolderRecords[i]))
                        throw TypeError(".Vault.SyncDownResponse.removedSharedFolderRecords: object expected");
                    message.removedSharedFolderRecords[i] = $root.Vault.SharedFolderRecord.fromObject(object.removedSharedFolderRecords[i], long + 1);
                }
            }
            if (object.removedSharedFolderFolderRecords) {
                if (!Array.isArray(object.removedSharedFolderFolderRecords))
                    throw TypeError(".Vault.SyncDownResponse.removedSharedFolderFolderRecords: array expected");
                message.removedSharedFolderFolderRecords = [];
                for (let i = 0; i < object.removedSharedFolderFolderRecords.length; ++i) {
                    if (!$util.isObject(object.removedSharedFolderFolderRecords[i]))
                        throw TypeError(".Vault.SyncDownResponse.removedSharedFolderFolderRecords: object expected");
                    message.removedSharedFolderFolderRecords[i] = $root.Vault.SharedFolderFolderRecord.fromObject(object.removedSharedFolderFolderRecords[i], long + 1);
                }
            }
            if (object.removedSharedFolderUsers) {
                if (!Array.isArray(object.removedSharedFolderUsers))
                    throw TypeError(".Vault.SyncDownResponse.removedSharedFolderUsers: array expected");
                message.removedSharedFolderUsers = [];
                for (let i = 0; i < object.removedSharedFolderUsers.length; ++i) {
                    if (!$util.isObject(object.removedSharedFolderUsers[i]))
                        throw TypeError(".Vault.SyncDownResponse.removedSharedFolderUsers: object expected");
                    message.removedSharedFolderUsers[i] = $root.Vault.SharedFolderUser.fromObject(object.removedSharedFolderUsers[i], long + 1);
                }
            }
            if (object.removedSharedFolderTeams) {
                if (!Array.isArray(object.removedSharedFolderTeams))
                    throw TypeError(".Vault.SyncDownResponse.removedSharedFolderTeams: array expected");
                message.removedSharedFolderTeams = [];
                for (let i = 0; i < object.removedSharedFolderTeams.length; ++i) {
                    if (!$util.isObject(object.removedSharedFolderTeams[i]))
                        throw TypeError(".Vault.SyncDownResponse.removedSharedFolderTeams: object expected");
                    message.removedSharedFolderTeams[i] = $root.Vault.SharedFolderTeam.fromObject(object.removedSharedFolderTeams[i], long + 1);
                }
            }
            if (object.removedTeams) {
                if (!Array.isArray(object.removedTeams))
                    throw TypeError(".Vault.SyncDownResponse.removedTeams: array expected");
                message.removedTeams = [];
                for (let i = 0; i < object.removedTeams.length; ++i)
                    if (typeof object.removedTeams[i] === "string")
                        $util.base64.decode(object.removedTeams[i], message.removedTeams[i] = $util.newBuffer($util.base64.length(object.removedTeams[i])), 0);
                    else if (object.removedTeams[i].length >= 0)
                        message.removedTeams[i] = object.removedTeams[i];
            }
            if (object.ksmAppShares) {
                if (!Array.isArray(object.ksmAppShares))
                    throw TypeError(".Vault.SyncDownResponse.ksmAppShares: array expected");
                message.ksmAppShares = [];
                for (let i = 0; i < object.ksmAppShares.length; ++i) {
                    if (!$util.isObject(object.ksmAppShares[i]))
                        throw TypeError(".Vault.SyncDownResponse.ksmAppShares: object expected");
                    message.ksmAppShares[i] = $root.Vault.KsmChange.fromObject(object.ksmAppShares[i], long + 1);
                }
            }
            if (object.ksmAppClients) {
                if (!Array.isArray(object.ksmAppClients))
                    throw TypeError(".Vault.SyncDownResponse.ksmAppClients: array expected");
                message.ksmAppClients = [];
                for (let i = 0; i < object.ksmAppClients.length; ++i) {
                    if (!$util.isObject(object.ksmAppClients[i]))
                        throw TypeError(".Vault.SyncDownResponse.ksmAppClients: object expected");
                    message.ksmAppClients[i] = $root.Vault.KsmChange.fromObject(object.ksmAppClients[i], long + 1);
                }
            }
            if (object.shareInvitations) {
                if (!Array.isArray(object.shareInvitations))
                    throw TypeError(".Vault.SyncDownResponse.shareInvitations: array expected");
                message.shareInvitations = [];
                for (let i = 0; i < object.shareInvitations.length; ++i) {
                    if (!$util.isObject(object.shareInvitations[i]))
                        throw TypeError(".Vault.SyncDownResponse.shareInvitations: object expected");
                    message.shareInvitations[i] = $root.Vault.ShareInvitation.fromObject(object.shareInvitations[i], long + 1);
                }
            }
            if (object.diagnostics != null) {
                if (!$util.isObject(object.diagnostics))
                    throw TypeError(".Vault.SyncDownResponse.diagnostics: object expected");
                message.diagnostics = $root.Vault.SyncDiagnostics.fromObject(object.diagnostics, long + 1);
            }
            if (object.recordRotations) {
                if (!Array.isArray(object.recordRotations))
                    throw TypeError(".Vault.SyncDownResponse.recordRotations: array expected");
                message.recordRotations = [];
                for (let i = 0; i < object.recordRotations.length; ++i) {
                    if (!$util.isObject(object.recordRotations[i]))
                        throw TypeError(".Vault.SyncDownResponse.recordRotations: object expected");
                    message.recordRotations[i] = $root.Vault.RecordRotation.fromObject(object.recordRotations[i], long + 1);
                }
            }
            if (object.users) {
                if (!Array.isArray(object.users))
                    throw TypeError(".Vault.SyncDownResponse.users: array expected");
                message.users = [];
                for (let i = 0; i < object.users.length; ++i) {
                    if (!$util.isObject(object.users[i]))
                        throw TypeError(".Vault.SyncDownResponse.users: object expected");
                    message.users[i] = $root.Vault.User.fromObject(object.users[i], long + 1);
                }
            }
            if (object.removedUsers) {
                if (!Array.isArray(object.removedUsers))
                    throw TypeError(".Vault.SyncDownResponse.removedUsers: array expected");
                message.removedUsers = [];
                for (let i = 0; i < object.removedUsers.length; ++i)
                    if (typeof object.removedUsers[i] === "string")
                        $util.base64.decode(object.removedUsers[i], message.removedUsers[i] = $util.newBuffer($util.base64.length(object.removedUsers[i])), 0);
                    else if (object.removedUsers[i].length >= 0)
                        message.removedUsers[i] = object.removedUsers[i];
            }
            if (object.securityScoreData) {
                if (!Array.isArray(object.securityScoreData))
                    throw TypeError(".Vault.SyncDownResponse.securityScoreData: array expected");
                message.securityScoreData = [];
                for (let i = 0; i < object.securityScoreData.length; ++i) {
                    if (!$util.isObject(object.securityScoreData[i]))
                        throw TypeError(".Vault.SyncDownResponse.securityScoreData: object expected");
                    message.securityScoreData[i] = $root.Vault.SecurityScoreData.fromObject(object.securityScoreData[i], long + 1);
                }
            }
            if (object.notificationSync) {
                if (!Array.isArray(object.notificationSync))
                    throw TypeError(".Vault.SyncDownResponse.notificationSync: array expected");
                message.notificationSync = [];
                for (let i = 0; i < object.notificationSync.length; ++i) {
                    if (!$util.isObject(object.notificationSync[i]))
                        throw TypeError(".Vault.SyncDownResponse.notificationSync: object expected");
                    message.notificationSync[i] = $root.NotificationCenter.NotificationWrapper.fromObject(object.notificationSync[i], long + 1);
                }
            }
            if (object.keeperDriveData != null) {
                if (!$util.isObject(object.keeperDriveData))
                    throw TypeError(".Vault.SyncDownResponse.keeperDriveData: object expected");
                message.keeperDriveData = $root.Vault.KeeperDriveData.fromObject(object.keeperDriveData, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a SyncDownResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.SyncDownResponse
         * @static
         * @param {Vault.SyncDownResponse} message SyncDownResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SyncDownResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.userFolders = [];
                object.sharedFolders = [];
                object.userFolderSharedFolders = [];
                object.sharedFolderFolders = [];
                object.records = [];
                object.recordMetaData = [];
                object.nonSharedData = [];
                object.recordLinks = [];
                object.userFolderRecords = [];
                object.sharedFolderRecords = [];
                object.sharedFolderFolderRecords = [];
                object.sharedFolderUsers = [];
                object.sharedFolderTeams = [];
                object.recordAddAuditData = [];
                object.teams = [];
                object.sharingChanges = [];
                object.pendingTeamMembers = [];
                object.breachWatchRecords = [];
                object.userAuths = [];
                object.breachWatchSecurityData = [];
                object.removedUserFolders = [];
                object.removedSharedFolders = [];
                object.removedUserFolderSharedFolders = [];
                object.removedSharedFolderFolders = [];
                object.removedRecords = [];
                object.removedRecordLinks = [];
                object.removedUserFolderRecords = [];
                object.removedSharedFolderRecords = [];
                object.removedSharedFolderFolderRecords = [];
                object.removedSharedFolderUsers = [];
                object.removedSharedFolderTeams = [];
                object.removedTeams = [];
                object.ksmAppShares = [];
                object.ksmAppClients = [];
                object.shareInvitations = [];
                object.recordRotations = [];
                object.users = [];
                object.removedUsers = [];
                object.securityScoreData = [];
                object.notificationSync = [];
            }
            if (options.defaults) {
                if (options.bytes === String)
                    object.continuationToken = "";
                else {
                    object.continuationToken = [];
                    if (options.bytes !== Array)
                        object.continuationToken = $util.newBuffer(object.continuationToken);
                }
                object.hasMore = false;
                object.cacheStatus = options.enums === String ? "KEEP" : 0;
                object.profile = null;
                object.profilePic = null;
                object.reusedPasswords = null;
                object.diagnostics = null;
                object.keeperDriveData = null;
            }
            if (message.continuationToken != null && Object.hasOwnProperty.call(message, "continuationToken"))
                object.continuationToken = options.bytes === String ? $util.base64.encode(message.continuationToken, 0, message.continuationToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.continuationToken) : message.continuationToken;
            if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
                object.hasMore = message.hasMore;
            if (message.cacheStatus != null && Object.hasOwnProperty.call(message, "cacheStatus"))
                object.cacheStatus = options.enums === String ? $root.Vault.CacheStatus[message.cacheStatus] === undefined ? message.cacheStatus : $root.Vault.CacheStatus[message.cacheStatus] : message.cacheStatus;
            if (message.userFolders && message.userFolders.length) {
                object.userFolders = [];
                for (let j = 0; j < message.userFolders.length; ++j)
                    object.userFolders[j] = $root.Vault.UserFolder.toObject(message.userFolders[j], options, q + 1);
            }
            if (message.sharedFolders && message.sharedFolders.length) {
                object.sharedFolders = [];
                for (let j = 0; j < message.sharedFolders.length; ++j)
                    object.sharedFolders[j] = $root.Vault.SharedFolder.toObject(message.sharedFolders[j], options, q + 1);
            }
            if (message.userFolderSharedFolders && message.userFolderSharedFolders.length) {
                object.userFolderSharedFolders = [];
                for (let j = 0; j < message.userFolderSharedFolders.length; ++j)
                    object.userFolderSharedFolders[j] = $root.Vault.UserFolderSharedFolder.toObject(message.userFolderSharedFolders[j], options, q + 1);
            }
            if (message.sharedFolderFolders && message.sharedFolderFolders.length) {
                object.sharedFolderFolders = [];
                for (let j = 0; j < message.sharedFolderFolders.length; ++j)
                    object.sharedFolderFolders[j] = $root.Vault.SharedFolderFolder.toObject(message.sharedFolderFolders[j], options, q + 1);
            }
            if (message.records && message.records.length) {
                object.records = [];
                for (let j = 0; j < message.records.length; ++j)
                    object.records[j] = $root.Vault.Record.toObject(message.records[j], options, q + 1);
            }
            if (message.recordMetaData && message.recordMetaData.length) {
                object.recordMetaData = [];
                for (let j = 0; j < message.recordMetaData.length; ++j)
                    object.recordMetaData[j] = $root.Vault.RecordMetaData.toObject(message.recordMetaData[j], options, q + 1);
            }
            if (message.nonSharedData && message.nonSharedData.length) {
                object.nonSharedData = [];
                for (let j = 0; j < message.nonSharedData.length; ++j)
                    object.nonSharedData[j] = $root.Vault.NonSharedData.toObject(message.nonSharedData[j], options, q + 1);
            }
            if (message.recordLinks && message.recordLinks.length) {
                object.recordLinks = [];
                for (let j = 0; j < message.recordLinks.length; ++j)
                    object.recordLinks[j] = $root.Vault.RecordLink.toObject(message.recordLinks[j], options, q + 1);
            }
            if (message.userFolderRecords && message.userFolderRecords.length) {
                object.userFolderRecords = [];
                for (let j = 0; j < message.userFolderRecords.length; ++j)
                    object.userFolderRecords[j] = $root.Vault.UserFolderRecord.toObject(message.userFolderRecords[j], options, q + 1);
            }
            if (message.sharedFolderRecords && message.sharedFolderRecords.length) {
                object.sharedFolderRecords = [];
                for (let j = 0; j < message.sharedFolderRecords.length; ++j)
                    object.sharedFolderRecords[j] = $root.Vault.SharedFolderRecord.toObject(message.sharedFolderRecords[j], options, q + 1);
            }
            if (message.sharedFolderFolderRecords && message.sharedFolderFolderRecords.length) {
                object.sharedFolderFolderRecords = [];
                for (let j = 0; j < message.sharedFolderFolderRecords.length; ++j)
                    object.sharedFolderFolderRecords[j] = $root.Vault.SharedFolderFolderRecord.toObject(message.sharedFolderFolderRecords[j], options, q + 1);
            }
            if (message.sharedFolderUsers && message.sharedFolderUsers.length) {
                object.sharedFolderUsers = [];
                for (let j = 0; j < message.sharedFolderUsers.length; ++j)
                    object.sharedFolderUsers[j] = $root.Vault.SharedFolderUser.toObject(message.sharedFolderUsers[j], options, q + 1);
            }
            if (message.sharedFolderTeams && message.sharedFolderTeams.length) {
                object.sharedFolderTeams = [];
                for (let j = 0; j < message.sharedFolderTeams.length; ++j)
                    object.sharedFolderTeams[j] = $root.Vault.SharedFolderTeam.toObject(message.sharedFolderTeams[j], options, q + 1);
            }
            if (message.recordAddAuditData && message.recordAddAuditData.length) {
                object.recordAddAuditData = [];
                for (let j = 0; j < message.recordAddAuditData.length; ++j)
                    object.recordAddAuditData[j] = options.bytes === String ? $util.base64.encode(message.recordAddAuditData[j], 0, message.recordAddAuditData[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.recordAddAuditData[j]) : message.recordAddAuditData[j];
            }
            if (message.teams && message.teams.length) {
                object.teams = [];
                for (let j = 0; j < message.teams.length; ++j)
                    object.teams[j] = $root.Vault.Team.toObject(message.teams[j], options, q + 1);
            }
            if (message.sharingChanges && message.sharingChanges.length) {
                object.sharingChanges = [];
                for (let j = 0; j < message.sharingChanges.length; ++j)
                    object.sharingChanges[j] = $root.Vault.SharingChange.toObject(message.sharingChanges[j], options, q + 1);
            }
            if (message.profile != null && Object.hasOwnProperty.call(message, "profile"))
                object.profile = $root.Vault.Profile.toObject(message.profile, options, q + 1);
            if (message.profilePic != null && Object.hasOwnProperty.call(message, "profilePic"))
                object.profilePic = $root.Vault.ProfilePic.toObject(message.profilePic, options, q + 1);
            if (message.pendingTeamMembers && message.pendingTeamMembers.length) {
                object.pendingTeamMembers = [];
                for (let j = 0; j < message.pendingTeamMembers.length; ++j)
                    object.pendingTeamMembers[j] = $root.Vault.PendingTeamMember.toObject(message.pendingTeamMembers[j], options, q + 1);
            }
            if (message.breachWatchRecords && message.breachWatchRecords.length) {
                object.breachWatchRecords = [];
                for (let j = 0; j < message.breachWatchRecords.length; ++j)
                    object.breachWatchRecords[j] = $root.Vault.BreachWatchRecord.toObject(message.breachWatchRecords[j], options, q + 1);
            }
            if (message.userAuths && message.userAuths.length) {
                object.userAuths = [];
                for (let j = 0; j < message.userAuths.length; ++j)
                    object.userAuths[j] = $root.Vault.UserAuth.toObject(message.userAuths[j], options, q + 1);
            }
            if (message.breachWatchSecurityData && message.breachWatchSecurityData.length) {
                object.breachWatchSecurityData = [];
                for (let j = 0; j < message.breachWatchSecurityData.length; ++j)
                    object.breachWatchSecurityData[j] = $root.Vault.BreachWatchSecurityData.toObject(message.breachWatchSecurityData[j], options, q + 1);
            }
            if (message.reusedPasswords != null && Object.hasOwnProperty.call(message, "reusedPasswords"))
                object.reusedPasswords = $root.Vault.ReusedPasswords.toObject(message.reusedPasswords, options, q + 1);
            if (message.removedUserFolders && message.removedUserFolders.length) {
                object.removedUserFolders = [];
                for (let j = 0; j < message.removedUserFolders.length; ++j)
                    object.removedUserFolders[j] = options.bytes === String ? $util.base64.encode(message.removedUserFolders[j], 0, message.removedUserFolders[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.removedUserFolders[j]) : message.removedUserFolders[j];
            }
            if (message.removedSharedFolders && message.removedSharedFolders.length) {
                object.removedSharedFolders = [];
                for (let j = 0; j < message.removedSharedFolders.length; ++j)
                    object.removedSharedFolders[j] = options.bytes === String ? $util.base64.encode(message.removedSharedFolders[j], 0, message.removedSharedFolders[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.removedSharedFolders[j]) : message.removedSharedFolders[j];
            }
            if (message.removedUserFolderSharedFolders && message.removedUserFolderSharedFolders.length) {
                object.removedUserFolderSharedFolders = [];
                for (let j = 0; j < message.removedUserFolderSharedFolders.length; ++j)
                    object.removedUserFolderSharedFolders[j] = $root.Vault.UserFolderSharedFolder.toObject(message.removedUserFolderSharedFolders[j], options, q + 1);
            }
            if (message.removedSharedFolderFolders && message.removedSharedFolderFolders.length) {
                object.removedSharedFolderFolders = [];
                for (let j = 0; j < message.removedSharedFolderFolders.length; ++j)
                    object.removedSharedFolderFolders[j] = $root.Vault.SharedFolderFolder.toObject(message.removedSharedFolderFolders[j], options, q + 1);
            }
            if (message.removedRecords && message.removedRecords.length) {
                object.removedRecords = [];
                for (let j = 0; j < message.removedRecords.length; ++j)
                    object.removedRecords[j] = options.bytes === String ? $util.base64.encode(message.removedRecords[j], 0, message.removedRecords[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.removedRecords[j]) : message.removedRecords[j];
            }
            if (message.removedRecordLinks && message.removedRecordLinks.length) {
                object.removedRecordLinks = [];
                for (let j = 0; j < message.removedRecordLinks.length; ++j)
                    object.removedRecordLinks[j] = $root.Vault.RecordLink.toObject(message.removedRecordLinks[j], options, q + 1);
            }
            if (message.removedUserFolderRecords && message.removedUserFolderRecords.length) {
                object.removedUserFolderRecords = [];
                for (let j = 0; j < message.removedUserFolderRecords.length; ++j)
                    object.removedUserFolderRecords[j] = $root.Vault.UserFolderRecord.toObject(message.removedUserFolderRecords[j], options, q + 1);
            }
            if (message.removedSharedFolderRecords && message.removedSharedFolderRecords.length) {
                object.removedSharedFolderRecords = [];
                for (let j = 0; j < message.removedSharedFolderRecords.length; ++j)
                    object.removedSharedFolderRecords[j] = $root.Vault.SharedFolderRecord.toObject(message.removedSharedFolderRecords[j], options, q + 1);
            }
            if (message.removedSharedFolderFolderRecords && message.removedSharedFolderFolderRecords.length) {
                object.removedSharedFolderFolderRecords = [];
                for (let j = 0; j < message.removedSharedFolderFolderRecords.length; ++j)
                    object.removedSharedFolderFolderRecords[j] = $root.Vault.SharedFolderFolderRecord.toObject(message.removedSharedFolderFolderRecords[j], options, q + 1);
            }
            if (message.removedSharedFolderUsers && message.removedSharedFolderUsers.length) {
                object.removedSharedFolderUsers = [];
                for (let j = 0; j < message.removedSharedFolderUsers.length; ++j)
                    object.removedSharedFolderUsers[j] = $root.Vault.SharedFolderUser.toObject(message.removedSharedFolderUsers[j], options, q + 1);
            }
            if (message.removedSharedFolderTeams && message.removedSharedFolderTeams.length) {
                object.removedSharedFolderTeams = [];
                for (let j = 0; j < message.removedSharedFolderTeams.length; ++j)
                    object.removedSharedFolderTeams[j] = $root.Vault.SharedFolderTeam.toObject(message.removedSharedFolderTeams[j], options, q + 1);
            }
            if (message.removedTeams && message.removedTeams.length) {
                object.removedTeams = [];
                for (let j = 0; j < message.removedTeams.length; ++j)
                    object.removedTeams[j] = options.bytes === String ? $util.base64.encode(message.removedTeams[j], 0, message.removedTeams[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.removedTeams[j]) : message.removedTeams[j];
            }
            if (message.ksmAppShares && message.ksmAppShares.length) {
                object.ksmAppShares = [];
                for (let j = 0; j < message.ksmAppShares.length; ++j)
                    object.ksmAppShares[j] = $root.Vault.KsmChange.toObject(message.ksmAppShares[j], options, q + 1);
            }
            if (message.ksmAppClients && message.ksmAppClients.length) {
                object.ksmAppClients = [];
                for (let j = 0; j < message.ksmAppClients.length; ++j)
                    object.ksmAppClients[j] = $root.Vault.KsmChange.toObject(message.ksmAppClients[j], options, q + 1);
            }
            if (message.shareInvitations && message.shareInvitations.length) {
                object.shareInvitations = [];
                for (let j = 0; j < message.shareInvitations.length; ++j)
                    object.shareInvitations[j] = $root.Vault.ShareInvitation.toObject(message.shareInvitations[j], options, q + 1);
            }
            if (message.diagnostics != null && Object.hasOwnProperty.call(message, "diagnostics"))
                object.diagnostics = $root.Vault.SyncDiagnostics.toObject(message.diagnostics, options, q + 1);
            if (message.recordRotations && message.recordRotations.length) {
                object.recordRotations = [];
                for (let j = 0; j < message.recordRotations.length; ++j)
                    object.recordRotations[j] = $root.Vault.RecordRotation.toObject(message.recordRotations[j], options, q + 1);
            }
            if (message.users && message.users.length) {
                object.users = [];
                for (let j = 0; j < message.users.length; ++j)
                    object.users[j] = $root.Vault.User.toObject(message.users[j], options, q + 1);
            }
            if (message.removedUsers && message.removedUsers.length) {
                object.removedUsers = [];
                for (let j = 0; j < message.removedUsers.length; ++j)
                    object.removedUsers[j] = options.bytes === String ? $util.base64.encode(message.removedUsers[j], 0, message.removedUsers[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.removedUsers[j]) : message.removedUsers[j];
            }
            if (message.securityScoreData && message.securityScoreData.length) {
                object.securityScoreData = [];
                for (let j = 0; j < message.securityScoreData.length; ++j)
                    object.securityScoreData[j] = $root.Vault.SecurityScoreData.toObject(message.securityScoreData[j], options, q + 1);
            }
            if (message.notificationSync && message.notificationSync.length) {
                object.notificationSync = [];
                for (let j = 0; j < message.notificationSync.length; ++j)
                    object.notificationSync[j] = $root.NotificationCenter.NotificationWrapper.toObject(message.notificationSync[j], options, q + 1);
            }
            if (message.keeperDriveData != null && Object.hasOwnProperty.call(message, "keeperDriveData"))
                object.keeperDriveData = $root.Vault.KeeperDriveData.toObject(message.keeperDriveData, options, q + 1);
            return object;
        };

        /**
         * Converts this SyncDownResponse to JSON.
         * @function toJSON
         * @memberof Vault.SyncDownResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SyncDownResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SyncDownResponse
         * @function getTypeUrl
         * @memberof Vault.SyncDownResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SyncDownResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.SyncDownResponse";
        };

        return SyncDownResponse;
    })();

    Vault.DriveRecord = (function() {

        /**
         * Properties of a DriveRecord.
         * @memberof Vault
         * @interface IDriveRecord
         * @property {Uint8Array|null} [recordUid] DriveRecord recordUid
         * @property {number|null} [revision] DriveRecord revision
         * @property {number|null} [version] DriveRecord version
         * @property {boolean|null} [shared] DriveRecord shared
         * @property {number|null} [clientModifiedTime] DriveRecord clientModifiedTime
         * @property {number|null} [fileSize] DriveRecord fileSize
         * @property {number|null} [thumbnailSize] DriveRecord thumbnailSize
         */

        /**
         * Constructs a new DriveRecord.
         * @memberof Vault
         * @classdesc Represents a DriveRecord.
         * @implements IDriveRecord
         * @constructor
         * @param {Vault.IDriveRecord=} [properties] Properties to set
         */
        function DriveRecord(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DriveRecord recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Vault.DriveRecord
         * @instance
         */
        DriveRecord.prototype.recordUid = $util.newBuffer([]);

        /**
         * DriveRecord revision.
         * @member {number} revision
         * @memberof Vault.DriveRecord
         * @instance
         */
        DriveRecord.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * DriveRecord version.
         * @member {number} version
         * @memberof Vault.DriveRecord
         * @instance
         */
        DriveRecord.prototype.version = 0;

        /**
         * DriveRecord shared.
         * @member {boolean} shared
         * @memberof Vault.DriveRecord
         * @instance
         */
        DriveRecord.prototype.shared = false;

        /**
         * DriveRecord clientModifiedTime.
         * @member {number} clientModifiedTime
         * @memberof Vault.DriveRecord
         * @instance
         */
        DriveRecord.prototype.clientModifiedTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * DriveRecord fileSize.
         * @member {number} fileSize
         * @memberof Vault.DriveRecord
         * @instance
         */
        DriveRecord.prototype.fileSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * DriveRecord thumbnailSize.
         * @member {number} thumbnailSize
         * @memberof Vault.DriveRecord
         * @instance
         */
        DriveRecord.prototype.thumbnailSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new DriveRecord instance using the specified properties.
         * @function create
         * @memberof Vault.DriveRecord
         * @static
         * @param {Vault.IDriveRecord=} [properties] Properties to set
         * @returns {Vault.DriveRecord} DriveRecord instance
         */
        DriveRecord.create = function create(properties) {
            return new DriveRecord(properties);
        };

        /**
         * Encodes the specified DriveRecord message. Does not implicitly {@link Vault.DriveRecord.verify|verify} messages.
         * @function encode
         * @memberof Vault.DriveRecord
         * @static
         * @param {Vault.IDriveRecord} message DriveRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DriveRecord.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.revision);
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.version);
            if (message.shared != null && Object.hasOwnProperty.call(message, "shared"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.shared);
            if (message.clientModifiedTime != null && Object.hasOwnProperty.call(message, "clientModifiedTime"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.clientModifiedTime);
            if (message.fileSize != null && Object.hasOwnProperty.call(message, "fileSize"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.fileSize);
            if (message.thumbnailSize != null && Object.hasOwnProperty.call(message, "thumbnailSize"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.thumbnailSize);
            return writer;
        };

        /**
         * Decodes a DriveRecord message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.DriveRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.DriveRecord} DriveRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DriveRecord.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.DriveRecord();
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
                        message.revision = reader.int64();
                        break;
                    }
                case 3: {
                        message.version = reader.int32();
                        break;
                    }
                case 4: {
                        message.shared = reader.bool();
                        break;
                    }
                case 5: {
                        message.clientModifiedTime = reader.int64();
                        break;
                    }
                case 6: {
                        message.fileSize = reader.int64();
                        break;
                    }
                case 7: {
                        message.thumbnailSize = reader.int64();
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
         * Creates a DriveRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.DriveRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.DriveRecord} DriveRecord
         */
        DriveRecord.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.DriveRecord)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.DriveRecord: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.DriveRecord();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            if (object.version != null)
                message.version = object.version | 0;
            if (object.shared != null)
                message.shared = Boolean(object.shared);
            if (object.clientModifiedTime != null)
                if ($util.Long)
                    message.clientModifiedTime = $util.Long.fromValue(object.clientModifiedTime, false);
                else if (typeof object.clientModifiedTime === "string")
                    message.clientModifiedTime = parseInt(object.clientModifiedTime, 10);
                else if (typeof object.clientModifiedTime === "number")
                    message.clientModifiedTime = object.clientModifiedTime;
                else if (typeof object.clientModifiedTime === "object")
                    message.clientModifiedTime = new $util.LongBits(object.clientModifiedTime.low >>> 0, object.clientModifiedTime.high >>> 0).toNumber();
            if (object.fileSize != null)
                if ($util.Long)
                    message.fileSize = $util.Long.fromValue(object.fileSize, false);
                else if (typeof object.fileSize === "string")
                    message.fileSize = parseInt(object.fileSize, 10);
                else if (typeof object.fileSize === "number")
                    message.fileSize = object.fileSize;
                else if (typeof object.fileSize === "object")
                    message.fileSize = new $util.LongBits(object.fileSize.low >>> 0, object.fileSize.high >>> 0).toNumber();
            if (object.thumbnailSize != null)
                if ($util.Long)
                    message.thumbnailSize = $util.Long.fromValue(object.thumbnailSize, false);
                else if (typeof object.thumbnailSize === "string")
                    message.thumbnailSize = parseInt(object.thumbnailSize, 10);
                else if (typeof object.thumbnailSize === "number")
                    message.thumbnailSize = object.thumbnailSize;
                else if (typeof object.thumbnailSize === "object")
                    message.thumbnailSize = new $util.LongBits(object.thumbnailSize.low >>> 0, object.thumbnailSize.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a DriveRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.DriveRecord
         * @static
         * @param {Vault.DriveRecord} message DriveRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DriveRecord.toObject = function toObject(message, options, q) {
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
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.version = 0;
                object.shared = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.clientModifiedTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.clientModifiedTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.fileSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.fileSize = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.thumbnailSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.thumbnailSize = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                object.version = message.version;
            if (message.shared != null && Object.hasOwnProperty.call(message, "shared"))
                object.shared = message.shared;
            if (message.clientModifiedTime != null && Object.hasOwnProperty.call(message, "clientModifiedTime"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.clientModifiedTime = typeof message.clientModifiedTime === "number" ? BigInt(message.clientModifiedTime) : $util.Long.fromBits(message.clientModifiedTime.low >>> 0, message.clientModifiedTime.high >>> 0, false).toBigInt();
                else if (typeof message.clientModifiedTime === "number")
                    object.clientModifiedTime = options.longs === String ? String(message.clientModifiedTime) : message.clientModifiedTime;
                else
                    object.clientModifiedTime = options.longs === String ? $util.Long.prototype.toString.call(message.clientModifiedTime) : options.longs === Number ? new $util.LongBits(message.clientModifiedTime.low >>> 0, message.clientModifiedTime.high >>> 0).toNumber() : message.clientModifiedTime;
            if (message.fileSize != null && Object.hasOwnProperty.call(message, "fileSize"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.fileSize = typeof message.fileSize === "number" ? BigInt(message.fileSize) : $util.Long.fromBits(message.fileSize.low >>> 0, message.fileSize.high >>> 0, false).toBigInt();
                else if (typeof message.fileSize === "number")
                    object.fileSize = options.longs === String ? String(message.fileSize) : message.fileSize;
                else
                    object.fileSize = options.longs === String ? $util.Long.prototype.toString.call(message.fileSize) : options.longs === Number ? new $util.LongBits(message.fileSize.low >>> 0, message.fileSize.high >>> 0).toNumber() : message.fileSize;
            if (message.thumbnailSize != null && Object.hasOwnProperty.call(message, "thumbnailSize"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.thumbnailSize = typeof message.thumbnailSize === "number" ? BigInt(message.thumbnailSize) : $util.Long.fromBits(message.thumbnailSize.low >>> 0, message.thumbnailSize.high >>> 0, false).toBigInt();
                else if (typeof message.thumbnailSize === "number")
                    object.thumbnailSize = options.longs === String ? String(message.thumbnailSize) : message.thumbnailSize;
                else
                    object.thumbnailSize = options.longs === String ? $util.Long.prototype.toString.call(message.thumbnailSize) : options.longs === Number ? new $util.LongBits(message.thumbnailSize.low >>> 0, message.thumbnailSize.high >>> 0).toNumber() : message.thumbnailSize;
            return object;
        };

        /**
         * Converts this DriveRecord to JSON.
         * @function toJSON
         * @memberof Vault.DriveRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DriveRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DriveRecord
         * @function getTypeUrl
         * @memberof Vault.DriveRecord
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DriveRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.DriveRecord";
        };

        return DriveRecord;
    })();

    Vault.FolderSharingState = (function() {

        /**
         * Properties of a FolderSharingState.
         * @memberof Vault
         * @interface IFolderSharingState
         * @property {Uint8Array|null} [folderUid] FolderSharingState folderUid
         * @property {boolean|null} [shared] FolderSharingState shared
         * @property {number|null} [count] FolderSharingState count
         */

        /**
         * Constructs a new FolderSharingState.
         * @memberof Vault
         * @classdesc Represents a FolderSharingState.
         * @implements IFolderSharingState
         * @constructor
         * @param {Vault.IFolderSharingState=} [properties] Properties to set
         */
        function FolderSharingState(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FolderSharingState folderUid.
         * @member {Uint8Array} folderUid
         * @memberof Vault.FolderSharingState
         * @instance
         */
        FolderSharingState.prototype.folderUid = $util.newBuffer([]);

        /**
         * FolderSharingState shared.
         * @member {boolean} shared
         * @memberof Vault.FolderSharingState
         * @instance
         */
        FolderSharingState.prototype.shared = false;

        /**
         * FolderSharingState count.
         * @member {number} count
         * @memberof Vault.FolderSharingState
         * @instance
         */
        FolderSharingState.prototype.count = 0;

        /**
         * Creates a new FolderSharingState instance using the specified properties.
         * @function create
         * @memberof Vault.FolderSharingState
         * @static
         * @param {Vault.IFolderSharingState=} [properties] Properties to set
         * @returns {Vault.FolderSharingState} FolderSharingState instance
         */
        FolderSharingState.create = function create(properties) {
            return new FolderSharingState(properties);
        };

        /**
         * Encodes the specified FolderSharingState message. Does not implicitly {@link Vault.FolderSharingState.verify|verify} messages.
         * @function encode
         * @memberof Vault.FolderSharingState
         * @static
         * @param {Vault.IFolderSharingState} message FolderSharingState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FolderSharingState.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.folderUid);
            if (message.shared != null && Object.hasOwnProperty.call(message, "shared"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.shared);
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.count);
            return writer;
        };

        /**
         * Decodes a FolderSharingState message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.FolderSharingState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.FolderSharingState} FolderSharingState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FolderSharingState.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.FolderSharingState();
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
                        message.shared = reader.bool();
                        break;
                    }
                case 3: {
                        message.count = reader.int32();
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
         * Creates a FolderSharingState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.FolderSharingState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.FolderSharingState} FolderSharingState
         */
        FolderSharingState.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.FolderSharingState)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.FolderSharingState: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.FolderSharingState();
            if (object.folderUid != null)
                if (typeof object.folderUid === "string")
                    $util.base64.decode(object.folderUid, message.folderUid = $util.newBuffer($util.base64.length(object.folderUid)), 0);
                else if (object.folderUid.length >= 0)
                    message.folderUid = object.folderUid;
            if (object.shared != null)
                message.shared = Boolean(object.shared);
            if (object.count != null)
                message.count = object.count | 0;
            return message;
        };

        /**
         * Creates a plain object from a FolderSharingState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.FolderSharingState
         * @static
         * @param {Vault.FolderSharingState} message FolderSharingState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FolderSharingState.toObject = function toObject(message, options, q) {
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
                object.shared = false;
                object.count = 0;
            }
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
            if (message.shared != null && Object.hasOwnProperty.call(message, "shared"))
                object.shared = message.shared;
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                object.count = message.count;
            return object;
        };

        /**
         * Converts this FolderSharingState to JSON.
         * @function toJSON
         * @memberof Vault.FolderSharingState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FolderSharingState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for FolderSharingState
         * @function getTypeUrl
         * @memberof Vault.FolderSharingState
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        FolderSharingState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.FolderSharingState";
        };

        return FolderSharingState;
    })();

    Vault.KeeperDriveData = (function() {

        /**
         * Properties of a KeeperDriveData.
         * @memberof Vault
         * @interface IKeeperDriveData
         * @property {Array.<Folder.IFolderData>|null} [folders] KeeperDriveData folders
         * @property {Array.<Folder.IFolderKey>|null} [folderKeys] KeeperDriveData folderKeys
         * @property {Array.<Folder.IFolderAccessData>|null} [folderAccesses] KeeperDriveData folderAccesses
         * @property {Array.<Folder.IRevokedAccess>|null} [revokedFolderAccesses] KeeperDriveData revokedFolderAccesses
         * @property {Array.<Folder.IRecordData>|null} [recordData] KeeperDriveData recordData
         * @property {Array.<Vault.INonSharedData>|null} [nonSharedData] KeeperDriveData nonSharedData
         * @property {Array.<Folder.IRecordAccessData>|null} [recordAccesses] KeeperDriveData recordAccesses
         * @property {Array.<record.v3.sharing.IRevokedAccess>|null} [revokedRecordAccesses] KeeperDriveData revokedRecordAccesses
         * @property {Array.<record.v3.sharing.IRecordSharingState>|null} [recordSharingStates] KeeperDriveData recordSharingStates
         * @property {Array.<Vault.IRecordLink>|null} [recordLinks] KeeperDriveData recordLinks
         * @property {Array.<Vault.IRecordLink>|null} [removedRecordLinks] KeeperDriveData removedRecordLinks
         * @property {Array.<Vault.IBreachWatchRecord>|null} [breachWatchRecords] KeeperDriveData breachWatchRecords
         * @property {Array.<Vault.ISecurityScoreData>|null} [securityScoreData] KeeperDriveData securityScoreData
         * @property {Array.<Vault.IBreachWatchSecurityData>|null} [breachWatchSecurityData] KeeperDriveData breachWatchSecurityData
         * @property {Array.<Folder.IFolderRemoved>|null} [removedFolders] KeeperDriveData removedFolders
         * @property {Array.<Records.IFolderRecordKey>|null} [removedFolderRecords] KeeperDriveData removedFolderRecords
         * @property {Array.<Folder.IFolderRecord>|null} [folderRecords] KeeperDriveData folderRecords
         * @property {Array.<Vault.IRecordRotation>|null} [recordRotationData] KeeperDriveData recordRotationData
         * @property {Array.<Vault.IDriveRecord>|null} [records] KeeperDriveData records
         * @property {Array.<Vault.IFolderSharingState>|null} [folderSharingState] KeeperDriveData folderSharingState
         * @property {Array.<Dag.IDebugData>|null} [rawDagData] KeeperDriveData rawDagData
         */

        /**
         * Constructs a new KeeperDriveData.
         * @memberof Vault
         * @classdesc Represents a KeeperDriveData.
         * @implements IKeeperDriveData
         * @constructor
         * @param {Vault.IKeeperDriveData=} [properties] Properties to set
         */
        function KeeperDriveData(properties) {
            this.folders = [];
            this.folderKeys = [];
            this.folderAccesses = [];
            this.revokedFolderAccesses = [];
            this.recordData = [];
            this.nonSharedData = [];
            this.recordAccesses = [];
            this.revokedRecordAccesses = [];
            this.recordSharingStates = [];
            this.recordLinks = [];
            this.removedRecordLinks = [];
            this.breachWatchRecords = [];
            this.securityScoreData = [];
            this.breachWatchSecurityData = [];
            this.removedFolders = [];
            this.removedFolderRecords = [];
            this.folderRecords = [];
            this.recordRotationData = [];
            this.records = [];
            this.folderSharingState = [];
            this.rawDagData = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KeeperDriveData folders.
         * @member {Array.<Folder.IFolderData>} folders
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.folders = $util.emptyArray;

        /**
         * KeeperDriveData folderKeys.
         * @member {Array.<Folder.IFolderKey>} folderKeys
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.folderKeys = $util.emptyArray;

        /**
         * KeeperDriveData folderAccesses.
         * @member {Array.<Folder.IFolderAccessData>} folderAccesses
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.folderAccesses = $util.emptyArray;

        /**
         * KeeperDriveData revokedFolderAccesses.
         * @member {Array.<Folder.IRevokedAccess>} revokedFolderAccesses
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.revokedFolderAccesses = $util.emptyArray;

        /**
         * KeeperDriveData recordData.
         * @member {Array.<Folder.IRecordData>} recordData
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.recordData = $util.emptyArray;

        /**
         * KeeperDriveData nonSharedData.
         * @member {Array.<Vault.INonSharedData>} nonSharedData
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.nonSharedData = $util.emptyArray;

        /**
         * KeeperDriveData recordAccesses.
         * @member {Array.<Folder.IRecordAccessData>} recordAccesses
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.recordAccesses = $util.emptyArray;

        /**
         * KeeperDriveData revokedRecordAccesses.
         * @member {Array.<record.v3.sharing.IRevokedAccess>} revokedRecordAccesses
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.revokedRecordAccesses = $util.emptyArray;

        /**
         * KeeperDriveData recordSharingStates.
         * @member {Array.<record.v3.sharing.IRecordSharingState>} recordSharingStates
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.recordSharingStates = $util.emptyArray;

        /**
         * KeeperDriveData recordLinks.
         * @member {Array.<Vault.IRecordLink>} recordLinks
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.recordLinks = $util.emptyArray;

        /**
         * KeeperDriveData removedRecordLinks.
         * @member {Array.<Vault.IRecordLink>} removedRecordLinks
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.removedRecordLinks = $util.emptyArray;

        /**
         * KeeperDriveData breachWatchRecords.
         * @member {Array.<Vault.IBreachWatchRecord>} breachWatchRecords
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.breachWatchRecords = $util.emptyArray;

        /**
         * KeeperDriveData securityScoreData.
         * @member {Array.<Vault.ISecurityScoreData>} securityScoreData
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.securityScoreData = $util.emptyArray;

        /**
         * KeeperDriveData breachWatchSecurityData.
         * @member {Array.<Vault.IBreachWatchSecurityData>} breachWatchSecurityData
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.breachWatchSecurityData = $util.emptyArray;

        /**
         * KeeperDriveData removedFolders.
         * @member {Array.<Folder.IFolderRemoved>} removedFolders
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.removedFolders = $util.emptyArray;

        /**
         * KeeperDriveData removedFolderRecords.
         * @member {Array.<Records.IFolderRecordKey>} removedFolderRecords
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.removedFolderRecords = $util.emptyArray;

        /**
         * KeeperDriveData folderRecords.
         * @member {Array.<Folder.IFolderRecord>} folderRecords
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.folderRecords = $util.emptyArray;

        /**
         * KeeperDriveData recordRotationData.
         * @member {Array.<Vault.IRecordRotation>} recordRotationData
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.recordRotationData = $util.emptyArray;

        /**
         * KeeperDriveData records.
         * @member {Array.<Vault.IDriveRecord>} records
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.records = $util.emptyArray;

        /**
         * KeeperDriveData folderSharingState.
         * @member {Array.<Vault.IFolderSharingState>} folderSharingState
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.folderSharingState = $util.emptyArray;

        /**
         * KeeperDriveData rawDagData.
         * @member {Array.<Dag.IDebugData>} rawDagData
         * @memberof Vault.KeeperDriveData
         * @instance
         */
        KeeperDriveData.prototype.rawDagData = $util.emptyArray;

        /**
         * Creates a new KeeperDriveData instance using the specified properties.
         * @function create
         * @memberof Vault.KeeperDriveData
         * @static
         * @param {Vault.IKeeperDriveData=} [properties] Properties to set
         * @returns {Vault.KeeperDriveData} KeeperDriveData instance
         */
        KeeperDriveData.create = function create(properties) {
            return new KeeperDriveData(properties);
        };

        /**
         * Encodes the specified KeeperDriveData message. Does not implicitly {@link Vault.KeeperDriveData.verify|verify} messages.
         * @function encode
         * @memberof Vault.KeeperDriveData
         * @static
         * @param {Vault.IKeeperDriveData} message KeeperDriveData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeeperDriveData.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.folders != null && message.folders.length)
                for (let i = 0; i < message.folders.length; ++i)
                    $root.Folder.FolderData.encode(message.folders[i], writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
            if (message.folderKeys != null && message.folderKeys.length)
                for (let i = 0; i < message.folderKeys.length; ++i)
                    $root.Folder.FolderKey.encode(message.folderKeys[i], writer.uint32(/* id 13, wireType 2 =*/106).fork(), q + 1).ldelim();
            if (message.folderAccesses != null && message.folderAccesses.length)
                for (let i = 0; i < message.folderAccesses.length; ++i)
                    $root.Folder.FolderAccessData.encode(message.folderAccesses[i], writer.uint32(/* id 15, wireType 2 =*/122).fork(), q + 1).ldelim();
            if (message.revokedFolderAccesses != null && message.revokedFolderAccesses.length)
                for (let i = 0; i < message.revokedFolderAccesses.length; ++i)
                    $root.Folder.RevokedAccess.encode(message.revokedFolderAccesses[i], writer.uint32(/* id 17, wireType 2 =*/138).fork(), q + 1).ldelim();
            if (message.recordData != null && message.recordData.length)
                for (let i = 0; i < message.recordData.length; ++i)
                    $root.Folder.RecordData.encode(message.recordData[i], writer.uint32(/* id 20, wireType 2 =*/162).fork(), q + 1).ldelim();
            if (message.nonSharedData != null && message.nonSharedData.length)
                for (let i = 0; i < message.nonSharedData.length; ++i)
                    $root.Vault.NonSharedData.encode(message.nonSharedData[i], writer.uint32(/* id 21, wireType 2 =*/170).fork(), q + 1).ldelim();
            if (message.recordAccesses != null && message.recordAccesses.length)
                for (let i = 0; i < message.recordAccesses.length; ++i)
                    $root.Folder.RecordAccessData.encode(message.recordAccesses[i], writer.uint32(/* id 25, wireType 2 =*/202).fork(), q + 1).ldelim();
            if (message.revokedRecordAccesses != null && message.revokedRecordAccesses.length)
                for (let i = 0; i < message.revokedRecordAccesses.length; ++i)
                    $root.record.v3.sharing.RevokedAccess.encode(message.revokedRecordAccesses[i], writer.uint32(/* id 27, wireType 2 =*/218).fork(), q + 1).ldelim();
            if (message.recordSharingStates != null && message.recordSharingStates.length)
                for (let i = 0; i < message.recordSharingStates.length; ++i)
                    $root.record.v3.sharing.RecordSharingState.encode(message.recordSharingStates[i], writer.uint32(/* id 28, wireType 2 =*/226).fork(), q + 1).ldelim();
            if (message.recordLinks != null && message.recordLinks.length)
                for (let i = 0; i < message.recordLinks.length; ++i)
                    $root.Vault.RecordLink.encode(message.recordLinks[i], writer.uint32(/* id 30, wireType 2 =*/242).fork(), q + 1).ldelim();
            if (message.removedRecordLinks != null && message.removedRecordLinks.length)
                for (let i = 0; i < message.removedRecordLinks.length; ++i)
                    $root.Vault.RecordLink.encode(message.removedRecordLinks[i], writer.uint32(/* id 32, wireType 2 =*/258).fork(), q + 1).ldelim();
            if (message.breachWatchRecords != null && message.breachWatchRecords.length)
                for (let i = 0; i < message.breachWatchRecords.length; ++i)
                    $root.Vault.BreachWatchRecord.encode(message.breachWatchRecords[i], writer.uint32(/* id 40, wireType 2 =*/322).fork(), q + 1).ldelim();
            if (message.securityScoreData != null && message.securityScoreData.length)
                for (let i = 0; i < message.securityScoreData.length; ++i)
                    $root.Vault.SecurityScoreData.encode(message.securityScoreData[i], writer.uint32(/* id 41, wireType 2 =*/330).fork(), q + 1).ldelim();
            if (message.breachWatchSecurityData != null && message.breachWatchSecurityData.length)
                for (let i = 0; i < message.breachWatchSecurityData.length; ++i)
                    $root.Vault.BreachWatchSecurityData.encode(message.breachWatchSecurityData[i], writer.uint32(/* id 42, wireType 2 =*/338).fork(), q + 1).ldelim();
            if (message.removedFolders != null && message.removedFolders.length)
                for (let i = 0; i < message.removedFolders.length; ++i)
                    $root.Folder.FolderRemoved.encode(message.removedFolders[i], writer.uint32(/* id 48, wireType 2 =*/386).fork(), q + 1).ldelim();
            if (message.removedFolderRecords != null && message.removedFolderRecords.length)
                for (let i = 0; i < message.removedFolderRecords.length; ++i)
                    $root.Records.FolderRecordKey.encode(message.removedFolderRecords[i], writer.uint32(/* id 52, wireType 2 =*/418).fork(), q + 1).ldelim();
            if (message.folderRecords != null && message.folderRecords.length)
                for (let i = 0; i < message.folderRecords.length; ++i)
                    $root.Folder.FolderRecord.encode(message.folderRecords[i], writer.uint32(/* id 54, wireType 2 =*/434).fork(), q + 1).ldelim();
            if (message.recordRotationData != null && message.recordRotationData.length)
                for (let i = 0; i < message.recordRotationData.length; ++i)
                    $root.Vault.RecordRotation.encode(message.recordRotationData[i], writer.uint32(/* id 56, wireType 2 =*/450).fork(), q + 1).ldelim();
            if (message.records != null && message.records.length)
                for (let i = 0; i < message.records.length; ++i)
                    $root.Vault.DriveRecord.encode(message.records[i], writer.uint32(/* id 58, wireType 2 =*/466).fork(), q + 1).ldelim();
            if (message.folderSharingState != null && message.folderSharingState.length)
                for (let i = 0; i < message.folderSharingState.length; ++i)
                    $root.Vault.FolderSharingState.encode(message.folderSharingState[i], writer.uint32(/* id 60, wireType 2 =*/482).fork(), q + 1).ldelim();
            if (message.rawDagData != null && message.rawDagData.length)
                for (let i = 0; i < message.rawDagData.length; ++i)
                    $root.Dag.DebugData.encode(message.rawDagData[i], writer.uint32(/* id 101, wireType 2 =*/810).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a KeeperDriveData message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.KeeperDriveData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.KeeperDriveData} KeeperDriveData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeeperDriveData.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.KeeperDriveData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 10: {
                        if (!(message.folders && message.folders.length))
                            message.folders = [];
                        message.folders.push($root.Folder.FolderData.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 13: {
                        if (!(message.folderKeys && message.folderKeys.length))
                            message.folderKeys = [];
                        message.folderKeys.push($root.Folder.FolderKey.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 15: {
                        if (!(message.folderAccesses && message.folderAccesses.length))
                            message.folderAccesses = [];
                        message.folderAccesses.push($root.Folder.FolderAccessData.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 17: {
                        if (!(message.revokedFolderAccesses && message.revokedFolderAccesses.length))
                            message.revokedFolderAccesses = [];
                        message.revokedFolderAccesses.push($root.Folder.RevokedAccess.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 20: {
                        if (!(message.recordData && message.recordData.length))
                            message.recordData = [];
                        message.recordData.push($root.Folder.RecordData.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 21: {
                        if (!(message.nonSharedData && message.nonSharedData.length))
                            message.nonSharedData = [];
                        message.nonSharedData.push($root.Vault.NonSharedData.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 25: {
                        if (!(message.recordAccesses && message.recordAccesses.length))
                            message.recordAccesses = [];
                        message.recordAccesses.push($root.Folder.RecordAccessData.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 27: {
                        if (!(message.revokedRecordAccesses && message.revokedRecordAccesses.length))
                            message.revokedRecordAccesses = [];
                        message.revokedRecordAccesses.push($root.record.v3.sharing.RevokedAccess.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 28: {
                        if (!(message.recordSharingStates && message.recordSharingStates.length))
                            message.recordSharingStates = [];
                        message.recordSharingStates.push($root.record.v3.sharing.RecordSharingState.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 30: {
                        if (!(message.recordLinks && message.recordLinks.length))
                            message.recordLinks = [];
                        message.recordLinks.push($root.Vault.RecordLink.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 32: {
                        if (!(message.removedRecordLinks && message.removedRecordLinks.length))
                            message.removedRecordLinks = [];
                        message.removedRecordLinks.push($root.Vault.RecordLink.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 40: {
                        if (!(message.breachWatchRecords && message.breachWatchRecords.length))
                            message.breachWatchRecords = [];
                        message.breachWatchRecords.push($root.Vault.BreachWatchRecord.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 41: {
                        if (!(message.securityScoreData && message.securityScoreData.length))
                            message.securityScoreData = [];
                        message.securityScoreData.push($root.Vault.SecurityScoreData.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 42: {
                        if (!(message.breachWatchSecurityData && message.breachWatchSecurityData.length))
                            message.breachWatchSecurityData = [];
                        message.breachWatchSecurityData.push($root.Vault.BreachWatchSecurityData.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 48: {
                        if (!(message.removedFolders && message.removedFolders.length))
                            message.removedFolders = [];
                        message.removedFolders.push($root.Folder.FolderRemoved.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 52: {
                        if (!(message.removedFolderRecords && message.removedFolderRecords.length))
                            message.removedFolderRecords = [];
                        message.removedFolderRecords.push($root.Records.FolderRecordKey.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 54: {
                        if (!(message.folderRecords && message.folderRecords.length))
                            message.folderRecords = [];
                        message.folderRecords.push($root.Folder.FolderRecord.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 56: {
                        if (!(message.recordRotationData && message.recordRotationData.length))
                            message.recordRotationData = [];
                        message.recordRotationData.push($root.Vault.RecordRotation.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 58: {
                        if (!(message.records && message.records.length))
                            message.records = [];
                        message.records.push($root.Vault.DriveRecord.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 60: {
                        if (!(message.folderSharingState && message.folderSharingState.length))
                            message.folderSharingState = [];
                        message.folderSharingState.push($root.Vault.FolderSharingState.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 101: {
                        if (!(message.rawDagData && message.rawDagData.length))
                            message.rawDagData = [];
                        message.rawDagData.push($root.Dag.DebugData.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a KeeperDriveData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.KeeperDriveData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.KeeperDriveData} KeeperDriveData
         */
        KeeperDriveData.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.KeeperDriveData)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.KeeperDriveData: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.KeeperDriveData();
            if (object.folders) {
                if (!Array.isArray(object.folders))
                    throw TypeError(".Vault.KeeperDriveData.folders: array expected");
                message.folders = [];
                for (let i = 0; i < object.folders.length; ++i) {
                    if (!$util.isObject(object.folders[i]))
                        throw TypeError(".Vault.KeeperDriveData.folders: object expected");
                    message.folders[i] = $root.Folder.FolderData.fromObject(object.folders[i], long + 1);
                }
            }
            if (object.folderKeys) {
                if (!Array.isArray(object.folderKeys))
                    throw TypeError(".Vault.KeeperDriveData.folderKeys: array expected");
                message.folderKeys = [];
                for (let i = 0; i < object.folderKeys.length; ++i) {
                    if (!$util.isObject(object.folderKeys[i]))
                        throw TypeError(".Vault.KeeperDriveData.folderKeys: object expected");
                    message.folderKeys[i] = $root.Folder.FolderKey.fromObject(object.folderKeys[i], long + 1);
                }
            }
            if (object.folderAccesses) {
                if (!Array.isArray(object.folderAccesses))
                    throw TypeError(".Vault.KeeperDriveData.folderAccesses: array expected");
                message.folderAccesses = [];
                for (let i = 0; i < object.folderAccesses.length; ++i) {
                    if (!$util.isObject(object.folderAccesses[i]))
                        throw TypeError(".Vault.KeeperDriveData.folderAccesses: object expected");
                    message.folderAccesses[i] = $root.Folder.FolderAccessData.fromObject(object.folderAccesses[i], long + 1);
                }
            }
            if (object.revokedFolderAccesses) {
                if (!Array.isArray(object.revokedFolderAccesses))
                    throw TypeError(".Vault.KeeperDriveData.revokedFolderAccesses: array expected");
                message.revokedFolderAccesses = [];
                for (let i = 0; i < object.revokedFolderAccesses.length; ++i) {
                    if (!$util.isObject(object.revokedFolderAccesses[i]))
                        throw TypeError(".Vault.KeeperDriveData.revokedFolderAccesses: object expected");
                    message.revokedFolderAccesses[i] = $root.Folder.RevokedAccess.fromObject(object.revokedFolderAccesses[i], long + 1);
                }
            }
            if (object.recordData) {
                if (!Array.isArray(object.recordData))
                    throw TypeError(".Vault.KeeperDriveData.recordData: array expected");
                message.recordData = [];
                for (let i = 0; i < object.recordData.length; ++i) {
                    if (!$util.isObject(object.recordData[i]))
                        throw TypeError(".Vault.KeeperDriveData.recordData: object expected");
                    message.recordData[i] = $root.Folder.RecordData.fromObject(object.recordData[i], long + 1);
                }
            }
            if (object.nonSharedData) {
                if (!Array.isArray(object.nonSharedData))
                    throw TypeError(".Vault.KeeperDriveData.nonSharedData: array expected");
                message.nonSharedData = [];
                for (let i = 0; i < object.nonSharedData.length; ++i) {
                    if (!$util.isObject(object.nonSharedData[i]))
                        throw TypeError(".Vault.KeeperDriveData.nonSharedData: object expected");
                    message.nonSharedData[i] = $root.Vault.NonSharedData.fromObject(object.nonSharedData[i], long + 1);
                }
            }
            if (object.recordAccesses) {
                if (!Array.isArray(object.recordAccesses))
                    throw TypeError(".Vault.KeeperDriveData.recordAccesses: array expected");
                message.recordAccesses = [];
                for (let i = 0; i < object.recordAccesses.length; ++i) {
                    if (!$util.isObject(object.recordAccesses[i]))
                        throw TypeError(".Vault.KeeperDriveData.recordAccesses: object expected");
                    message.recordAccesses[i] = $root.Folder.RecordAccessData.fromObject(object.recordAccesses[i], long + 1);
                }
            }
            if (object.revokedRecordAccesses) {
                if (!Array.isArray(object.revokedRecordAccesses))
                    throw TypeError(".Vault.KeeperDriveData.revokedRecordAccesses: array expected");
                message.revokedRecordAccesses = [];
                for (let i = 0; i < object.revokedRecordAccesses.length; ++i) {
                    if (!$util.isObject(object.revokedRecordAccesses[i]))
                        throw TypeError(".Vault.KeeperDriveData.revokedRecordAccesses: object expected");
                    message.revokedRecordAccesses[i] = $root.record.v3.sharing.RevokedAccess.fromObject(object.revokedRecordAccesses[i], long + 1);
                }
            }
            if (object.recordSharingStates) {
                if (!Array.isArray(object.recordSharingStates))
                    throw TypeError(".Vault.KeeperDriveData.recordSharingStates: array expected");
                message.recordSharingStates = [];
                for (let i = 0; i < object.recordSharingStates.length; ++i) {
                    if (!$util.isObject(object.recordSharingStates[i]))
                        throw TypeError(".Vault.KeeperDriveData.recordSharingStates: object expected");
                    message.recordSharingStates[i] = $root.record.v3.sharing.RecordSharingState.fromObject(object.recordSharingStates[i], long + 1);
                }
            }
            if (object.recordLinks) {
                if (!Array.isArray(object.recordLinks))
                    throw TypeError(".Vault.KeeperDriveData.recordLinks: array expected");
                message.recordLinks = [];
                for (let i = 0; i < object.recordLinks.length; ++i) {
                    if (!$util.isObject(object.recordLinks[i]))
                        throw TypeError(".Vault.KeeperDriveData.recordLinks: object expected");
                    message.recordLinks[i] = $root.Vault.RecordLink.fromObject(object.recordLinks[i], long + 1);
                }
            }
            if (object.removedRecordLinks) {
                if (!Array.isArray(object.removedRecordLinks))
                    throw TypeError(".Vault.KeeperDriveData.removedRecordLinks: array expected");
                message.removedRecordLinks = [];
                for (let i = 0; i < object.removedRecordLinks.length; ++i) {
                    if (!$util.isObject(object.removedRecordLinks[i]))
                        throw TypeError(".Vault.KeeperDriveData.removedRecordLinks: object expected");
                    message.removedRecordLinks[i] = $root.Vault.RecordLink.fromObject(object.removedRecordLinks[i], long + 1);
                }
            }
            if (object.breachWatchRecords) {
                if (!Array.isArray(object.breachWatchRecords))
                    throw TypeError(".Vault.KeeperDriveData.breachWatchRecords: array expected");
                message.breachWatchRecords = [];
                for (let i = 0; i < object.breachWatchRecords.length; ++i) {
                    if (!$util.isObject(object.breachWatchRecords[i]))
                        throw TypeError(".Vault.KeeperDriveData.breachWatchRecords: object expected");
                    message.breachWatchRecords[i] = $root.Vault.BreachWatchRecord.fromObject(object.breachWatchRecords[i], long + 1);
                }
            }
            if (object.securityScoreData) {
                if (!Array.isArray(object.securityScoreData))
                    throw TypeError(".Vault.KeeperDriveData.securityScoreData: array expected");
                message.securityScoreData = [];
                for (let i = 0; i < object.securityScoreData.length; ++i) {
                    if (!$util.isObject(object.securityScoreData[i]))
                        throw TypeError(".Vault.KeeperDriveData.securityScoreData: object expected");
                    message.securityScoreData[i] = $root.Vault.SecurityScoreData.fromObject(object.securityScoreData[i], long + 1);
                }
            }
            if (object.breachWatchSecurityData) {
                if (!Array.isArray(object.breachWatchSecurityData))
                    throw TypeError(".Vault.KeeperDriveData.breachWatchSecurityData: array expected");
                message.breachWatchSecurityData = [];
                for (let i = 0; i < object.breachWatchSecurityData.length; ++i) {
                    if (!$util.isObject(object.breachWatchSecurityData[i]))
                        throw TypeError(".Vault.KeeperDriveData.breachWatchSecurityData: object expected");
                    message.breachWatchSecurityData[i] = $root.Vault.BreachWatchSecurityData.fromObject(object.breachWatchSecurityData[i], long + 1);
                }
            }
            if (object.removedFolders) {
                if (!Array.isArray(object.removedFolders))
                    throw TypeError(".Vault.KeeperDriveData.removedFolders: array expected");
                message.removedFolders = [];
                for (let i = 0; i < object.removedFolders.length; ++i) {
                    if (!$util.isObject(object.removedFolders[i]))
                        throw TypeError(".Vault.KeeperDriveData.removedFolders: object expected");
                    message.removedFolders[i] = $root.Folder.FolderRemoved.fromObject(object.removedFolders[i], long + 1);
                }
            }
            if (object.removedFolderRecords) {
                if (!Array.isArray(object.removedFolderRecords))
                    throw TypeError(".Vault.KeeperDriveData.removedFolderRecords: array expected");
                message.removedFolderRecords = [];
                for (let i = 0; i < object.removedFolderRecords.length; ++i) {
                    if (!$util.isObject(object.removedFolderRecords[i]))
                        throw TypeError(".Vault.KeeperDriveData.removedFolderRecords: object expected");
                    message.removedFolderRecords[i] = $root.Records.FolderRecordKey.fromObject(object.removedFolderRecords[i], long + 1);
                }
            }
            if (object.folderRecords) {
                if (!Array.isArray(object.folderRecords))
                    throw TypeError(".Vault.KeeperDriveData.folderRecords: array expected");
                message.folderRecords = [];
                for (let i = 0; i < object.folderRecords.length; ++i) {
                    if (!$util.isObject(object.folderRecords[i]))
                        throw TypeError(".Vault.KeeperDriveData.folderRecords: object expected");
                    message.folderRecords[i] = $root.Folder.FolderRecord.fromObject(object.folderRecords[i], long + 1);
                }
            }
            if (object.recordRotationData) {
                if (!Array.isArray(object.recordRotationData))
                    throw TypeError(".Vault.KeeperDriveData.recordRotationData: array expected");
                message.recordRotationData = [];
                for (let i = 0; i < object.recordRotationData.length; ++i) {
                    if (!$util.isObject(object.recordRotationData[i]))
                        throw TypeError(".Vault.KeeperDriveData.recordRotationData: object expected");
                    message.recordRotationData[i] = $root.Vault.RecordRotation.fromObject(object.recordRotationData[i], long + 1);
                }
            }
            if (object.records) {
                if (!Array.isArray(object.records))
                    throw TypeError(".Vault.KeeperDriveData.records: array expected");
                message.records = [];
                for (let i = 0; i < object.records.length; ++i) {
                    if (!$util.isObject(object.records[i]))
                        throw TypeError(".Vault.KeeperDriveData.records: object expected");
                    message.records[i] = $root.Vault.DriveRecord.fromObject(object.records[i], long + 1);
                }
            }
            if (object.folderSharingState) {
                if (!Array.isArray(object.folderSharingState))
                    throw TypeError(".Vault.KeeperDriveData.folderSharingState: array expected");
                message.folderSharingState = [];
                for (let i = 0; i < object.folderSharingState.length; ++i) {
                    if (!$util.isObject(object.folderSharingState[i]))
                        throw TypeError(".Vault.KeeperDriveData.folderSharingState: object expected");
                    message.folderSharingState[i] = $root.Vault.FolderSharingState.fromObject(object.folderSharingState[i], long + 1);
                }
            }
            if (object.rawDagData) {
                if (!Array.isArray(object.rawDagData))
                    throw TypeError(".Vault.KeeperDriveData.rawDagData: array expected");
                message.rawDagData = [];
                for (let i = 0; i < object.rawDagData.length; ++i) {
                    if (!$util.isObject(object.rawDagData[i]))
                        throw TypeError(".Vault.KeeperDriveData.rawDagData: object expected");
                    message.rawDagData[i] = $root.Dag.DebugData.fromObject(object.rawDagData[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a KeeperDriveData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.KeeperDriveData
         * @static
         * @param {Vault.KeeperDriveData} message KeeperDriveData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KeeperDriveData.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.folders = [];
                object.folderKeys = [];
                object.folderAccesses = [];
                object.revokedFolderAccesses = [];
                object.recordData = [];
                object.nonSharedData = [];
                object.recordAccesses = [];
                object.revokedRecordAccesses = [];
                object.recordSharingStates = [];
                object.recordLinks = [];
                object.removedRecordLinks = [];
                object.breachWatchRecords = [];
                object.securityScoreData = [];
                object.breachWatchSecurityData = [];
                object.removedFolders = [];
                object.removedFolderRecords = [];
                object.folderRecords = [];
                object.recordRotationData = [];
                object.records = [];
                object.folderSharingState = [];
                object.rawDagData = [];
            }
            if (message.folders && message.folders.length) {
                object.folders = [];
                for (let j = 0; j < message.folders.length; ++j)
                    object.folders[j] = $root.Folder.FolderData.toObject(message.folders[j], options, q + 1);
            }
            if (message.folderKeys && message.folderKeys.length) {
                object.folderKeys = [];
                for (let j = 0; j < message.folderKeys.length; ++j)
                    object.folderKeys[j] = $root.Folder.FolderKey.toObject(message.folderKeys[j], options, q + 1);
            }
            if (message.folderAccesses && message.folderAccesses.length) {
                object.folderAccesses = [];
                for (let j = 0; j < message.folderAccesses.length; ++j)
                    object.folderAccesses[j] = $root.Folder.FolderAccessData.toObject(message.folderAccesses[j], options, q + 1);
            }
            if (message.revokedFolderAccesses && message.revokedFolderAccesses.length) {
                object.revokedFolderAccesses = [];
                for (let j = 0; j < message.revokedFolderAccesses.length; ++j)
                    object.revokedFolderAccesses[j] = $root.Folder.RevokedAccess.toObject(message.revokedFolderAccesses[j], options, q + 1);
            }
            if (message.recordData && message.recordData.length) {
                object.recordData = [];
                for (let j = 0; j < message.recordData.length; ++j)
                    object.recordData[j] = $root.Folder.RecordData.toObject(message.recordData[j], options, q + 1);
            }
            if (message.nonSharedData && message.nonSharedData.length) {
                object.nonSharedData = [];
                for (let j = 0; j < message.nonSharedData.length; ++j)
                    object.nonSharedData[j] = $root.Vault.NonSharedData.toObject(message.nonSharedData[j], options, q + 1);
            }
            if (message.recordAccesses && message.recordAccesses.length) {
                object.recordAccesses = [];
                for (let j = 0; j < message.recordAccesses.length; ++j)
                    object.recordAccesses[j] = $root.Folder.RecordAccessData.toObject(message.recordAccesses[j], options, q + 1);
            }
            if (message.revokedRecordAccesses && message.revokedRecordAccesses.length) {
                object.revokedRecordAccesses = [];
                for (let j = 0; j < message.revokedRecordAccesses.length; ++j)
                    object.revokedRecordAccesses[j] = $root.record.v3.sharing.RevokedAccess.toObject(message.revokedRecordAccesses[j], options, q + 1);
            }
            if (message.recordSharingStates && message.recordSharingStates.length) {
                object.recordSharingStates = [];
                for (let j = 0; j < message.recordSharingStates.length; ++j)
                    object.recordSharingStates[j] = $root.record.v3.sharing.RecordSharingState.toObject(message.recordSharingStates[j], options, q + 1);
            }
            if (message.recordLinks && message.recordLinks.length) {
                object.recordLinks = [];
                for (let j = 0; j < message.recordLinks.length; ++j)
                    object.recordLinks[j] = $root.Vault.RecordLink.toObject(message.recordLinks[j], options, q + 1);
            }
            if (message.removedRecordLinks && message.removedRecordLinks.length) {
                object.removedRecordLinks = [];
                for (let j = 0; j < message.removedRecordLinks.length; ++j)
                    object.removedRecordLinks[j] = $root.Vault.RecordLink.toObject(message.removedRecordLinks[j], options, q + 1);
            }
            if (message.breachWatchRecords && message.breachWatchRecords.length) {
                object.breachWatchRecords = [];
                for (let j = 0; j < message.breachWatchRecords.length; ++j)
                    object.breachWatchRecords[j] = $root.Vault.BreachWatchRecord.toObject(message.breachWatchRecords[j], options, q + 1);
            }
            if (message.securityScoreData && message.securityScoreData.length) {
                object.securityScoreData = [];
                for (let j = 0; j < message.securityScoreData.length; ++j)
                    object.securityScoreData[j] = $root.Vault.SecurityScoreData.toObject(message.securityScoreData[j], options, q + 1);
            }
            if (message.breachWatchSecurityData && message.breachWatchSecurityData.length) {
                object.breachWatchSecurityData = [];
                for (let j = 0; j < message.breachWatchSecurityData.length; ++j)
                    object.breachWatchSecurityData[j] = $root.Vault.BreachWatchSecurityData.toObject(message.breachWatchSecurityData[j], options, q + 1);
            }
            if (message.removedFolders && message.removedFolders.length) {
                object.removedFolders = [];
                for (let j = 0; j < message.removedFolders.length; ++j)
                    object.removedFolders[j] = $root.Folder.FolderRemoved.toObject(message.removedFolders[j], options, q + 1);
            }
            if (message.removedFolderRecords && message.removedFolderRecords.length) {
                object.removedFolderRecords = [];
                for (let j = 0; j < message.removedFolderRecords.length; ++j)
                    object.removedFolderRecords[j] = $root.Records.FolderRecordKey.toObject(message.removedFolderRecords[j], options, q + 1);
            }
            if (message.folderRecords && message.folderRecords.length) {
                object.folderRecords = [];
                for (let j = 0; j < message.folderRecords.length; ++j)
                    object.folderRecords[j] = $root.Folder.FolderRecord.toObject(message.folderRecords[j], options, q + 1);
            }
            if (message.recordRotationData && message.recordRotationData.length) {
                object.recordRotationData = [];
                for (let j = 0; j < message.recordRotationData.length; ++j)
                    object.recordRotationData[j] = $root.Vault.RecordRotation.toObject(message.recordRotationData[j], options, q + 1);
            }
            if (message.records && message.records.length) {
                object.records = [];
                for (let j = 0; j < message.records.length; ++j)
                    object.records[j] = $root.Vault.DriveRecord.toObject(message.records[j], options, q + 1);
            }
            if (message.folderSharingState && message.folderSharingState.length) {
                object.folderSharingState = [];
                for (let j = 0; j < message.folderSharingState.length; ++j)
                    object.folderSharingState[j] = $root.Vault.FolderSharingState.toObject(message.folderSharingState[j], options, q + 1);
            }
            if (message.rawDagData && message.rawDagData.length) {
                object.rawDagData = [];
                for (let j = 0; j < message.rawDagData.length; ++j)
                    object.rawDagData[j] = $root.Dag.DebugData.toObject(message.rawDagData[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this KeeperDriveData to JSON.
         * @function toJSON
         * @memberof Vault.KeeperDriveData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KeeperDriveData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for KeeperDriveData
         * @function getTypeUrl
         * @memberof Vault.KeeperDriveData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        KeeperDriveData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.KeeperDriveData";
        };

        return KeeperDriveData;
    })();

    Vault.UserFolder = (function() {

        /**
         * Properties of a UserFolder.
         * @memberof Vault
         * @interface IUserFolder
         * @property {Uint8Array|null} [folderUid] UserFolder folderUid
         * @property {Uint8Array|null} [parentUid] UserFolder parentUid
         * @property {Uint8Array|null} [userFolderKey] UserFolder userFolderKey
         * @property {Records.RecordKeyType|null} [keyType] UserFolder keyType
         * @property {number|null} [revision] UserFolder revision
         * @property {Uint8Array|null} [data] UserFolder data
         */

        /**
         * Constructs a new UserFolder.
         * @memberof Vault
         * @classdesc Represents a UserFolder.
         * @implements IUserFolder
         * @constructor
         * @param {Vault.IUserFolder=} [properties] Properties to set
         */
        function UserFolder(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserFolder folderUid.
         * @member {Uint8Array} folderUid
         * @memberof Vault.UserFolder
         * @instance
         */
        UserFolder.prototype.folderUid = $util.newBuffer([]);

        /**
         * UserFolder parentUid.
         * @member {Uint8Array} parentUid
         * @memberof Vault.UserFolder
         * @instance
         */
        UserFolder.prototype.parentUid = $util.newBuffer([]);

        /**
         * UserFolder userFolderKey.
         * @member {Uint8Array} userFolderKey
         * @memberof Vault.UserFolder
         * @instance
         */
        UserFolder.prototype.userFolderKey = $util.newBuffer([]);

        /**
         * UserFolder keyType.
         * @member {Records.RecordKeyType} keyType
         * @memberof Vault.UserFolder
         * @instance
         */
        UserFolder.prototype.keyType = 0;

        /**
         * UserFolder revision.
         * @member {number} revision
         * @memberof Vault.UserFolder
         * @instance
         */
        UserFolder.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserFolder data.
         * @member {Uint8Array} data
         * @memberof Vault.UserFolder
         * @instance
         */
        UserFolder.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new UserFolder instance using the specified properties.
         * @function create
         * @memberof Vault.UserFolder
         * @static
         * @param {Vault.IUserFolder=} [properties] Properties to set
         * @returns {Vault.UserFolder} UserFolder instance
         */
        UserFolder.create = function create(properties) {
            return new UserFolder(properties);
        };

        /**
         * Encodes the specified UserFolder message. Does not implicitly {@link Vault.UserFolder.verify|verify} messages.
         * @function encode
         * @memberof Vault.UserFolder
         * @static
         * @param {Vault.IUserFolder} message UserFolder message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserFolder.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.folderUid);
            if (message.parentUid != null && Object.hasOwnProperty.call(message, "parentUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.parentUid);
            if (message.userFolderKey != null && Object.hasOwnProperty.call(message, "userFolderKey"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.userFolderKey);
            if (message.keyType != null && Object.hasOwnProperty.call(message, "keyType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.keyType);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.revision);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.data);
            return writer;
        };

        /**
         * Decodes a UserFolder message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.UserFolder
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.UserFolder} UserFolder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserFolder.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.UserFolder();
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
                        message.parentUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.userFolderKey = reader.bytes();
                        break;
                    }
                case 4: {
                        message.keyType = reader.int32();
                        break;
                    }
                case 5: {
                        message.revision = reader.int64();
                        break;
                    }
                case 6: {
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
         * Creates a UserFolder message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.UserFolder
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.UserFolder} UserFolder
         */
        UserFolder.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.UserFolder)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.UserFolder: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.UserFolder();
            if (object.folderUid != null)
                if (typeof object.folderUid === "string")
                    $util.base64.decode(object.folderUid, message.folderUid = $util.newBuffer($util.base64.length(object.folderUid)), 0);
                else if (object.folderUid.length >= 0)
                    message.folderUid = object.folderUid;
            if (object.parentUid != null)
                if (typeof object.parentUid === "string")
                    $util.base64.decode(object.parentUid, message.parentUid = $util.newBuffer($util.base64.length(object.parentUid)), 0);
                else if (object.parentUid.length >= 0)
                    message.parentUid = object.parentUid;
            if (object.userFolderKey != null)
                if (typeof object.userFolderKey === "string")
                    $util.base64.decode(object.userFolderKey, message.userFolderKey = $util.newBuffer($util.base64.length(object.userFolderKey)), 0);
                else if (object.userFolderKey.length >= 0)
                    message.userFolderKey = object.userFolderKey;
            switch (object.keyType) {
            default:
                if (typeof object.keyType === "number") {
                    message.keyType = object.keyType;
                    break;
                }
                break;
            case "NO_KEY":
            case 0:
                message.keyType = 0;
                break;
            case "ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.keyType = 1;
                break;
            case "ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.keyType = 2;
                break;
            case "ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.keyType = 3;
                break;
            case "ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.keyType = 4;
                break;
            case "ENCRYPTED_BY_ROOT_KEY_CBC":
            case 5:
                message.keyType = 5;
                break;
            case "ENCRYPTED_BY_ROOT_KEY_GCM":
            case 6:
                message.keyType = 6;
                break;
            }
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a UserFolder message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.UserFolder
         * @static
         * @param {Vault.UserFolder} message UserFolder
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserFolder.toObject = function toObject(message, options, q) {
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
                    object.parentUid = "";
                else {
                    object.parentUid = [];
                    if (options.bytes !== Array)
                        object.parentUid = $util.newBuffer(object.parentUid);
                }
                if (options.bytes === String)
                    object.userFolderKey = "";
                else {
                    object.userFolderKey = [];
                    if (options.bytes !== Array)
                        object.userFolderKey = $util.newBuffer(object.userFolderKey);
                }
                object.keyType = options.enums === String ? "NO_KEY" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
            if (message.parentUid != null && Object.hasOwnProperty.call(message, "parentUid"))
                object.parentUid = options.bytes === String ? $util.base64.encode(message.parentUid, 0, message.parentUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.parentUid) : message.parentUid;
            if (message.userFolderKey != null && Object.hasOwnProperty.call(message, "userFolderKey"))
                object.userFolderKey = options.bytes === String ? $util.base64.encode(message.userFolderKey, 0, message.userFolderKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.userFolderKey) : message.userFolderKey;
            if (message.keyType != null && Object.hasOwnProperty.call(message, "keyType"))
                object.keyType = options.enums === String ? $root.Records.RecordKeyType[message.keyType] === undefined ? message.keyType : $root.Records.RecordKeyType[message.keyType] : message.keyType;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this UserFolder to JSON.
         * @function toJSON
         * @memberof Vault.UserFolder
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserFolder.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserFolder
         * @function getTypeUrl
         * @memberof Vault.UserFolder
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserFolder.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.UserFolder";
        };

        return UserFolder;
    })();

    Vault.SharedFolder = (function() {

        /**
         * Properties of a SharedFolder.
         * @memberof Vault
         * @interface ISharedFolder
         * @property {Uint8Array|null} [sharedFolderUid] SharedFolder sharedFolderUid
         * @property {number|null} [revision] SharedFolder revision
         * @property {Uint8Array|null} [sharedFolderKey] SharedFolder sharedFolderKey
         * @property {Records.RecordKeyType|null} [keyType] SharedFolder keyType
         * @property {Uint8Array|null} [data] SharedFolder data
         * @property {boolean|null} [defaultManageRecords] SharedFolder defaultManageRecords
         * @property {boolean|null} [defaultManageUsers] SharedFolder defaultManageUsers
         * @property {boolean|null} [defaultCanEdit] SharedFolder defaultCanEdit
         * @property {boolean|null} [defaultCanReshare] SharedFolder defaultCanReshare
         * @property {Vault.CacheStatus|null} [cacheStatus] SharedFolder cacheStatus
         * @property {string|null} [owner] SharedFolder owner
         * @property {Uint8Array|null} [ownerAccountUid] SharedFolder ownerAccountUid
         * @property {Uint8Array|null} [name] SharedFolder name
         */

        /**
         * Constructs a new SharedFolder.
         * @memberof Vault
         * @classdesc Represents a SharedFolder.
         * @implements ISharedFolder
         * @constructor
         * @param {Vault.ISharedFolder=} [properties] Properties to set
         */
        function SharedFolder(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SharedFolder sharedFolderUid.
         * @member {Uint8Array} sharedFolderUid
         * @memberof Vault.SharedFolder
         * @instance
         */
        SharedFolder.prototype.sharedFolderUid = $util.newBuffer([]);

        /**
         * SharedFolder revision.
         * @member {number} revision
         * @memberof Vault.SharedFolder
         * @instance
         */
        SharedFolder.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SharedFolder sharedFolderKey.
         * @member {Uint8Array} sharedFolderKey
         * @memberof Vault.SharedFolder
         * @instance
         */
        SharedFolder.prototype.sharedFolderKey = $util.newBuffer([]);

        /**
         * SharedFolder keyType.
         * @member {Records.RecordKeyType} keyType
         * @memberof Vault.SharedFolder
         * @instance
         */
        SharedFolder.prototype.keyType = 0;

        /**
         * SharedFolder data.
         * @member {Uint8Array} data
         * @memberof Vault.SharedFolder
         * @instance
         */
        SharedFolder.prototype.data = $util.newBuffer([]);

        /**
         * SharedFolder defaultManageRecords.
         * @member {boolean} defaultManageRecords
         * @memberof Vault.SharedFolder
         * @instance
         */
        SharedFolder.prototype.defaultManageRecords = false;

        /**
         * SharedFolder defaultManageUsers.
         * @member {boolean} defaultManageUsers
         * @memberof Vault.SharedFolder
         * @instance
         */
        SharedFolder.prototype.defaultManageUsers = false;

        /**
         * SharedFolder defaultCanEdit.
         * @member {boolean} defaultCanEdit
         * @memberof Vault.SharedFolder
         * @instance
         */
        SharedFolder.prototype.defaultCanEdit = false;

        /**
         * SharedFolder defaultCanReshare.
         * @member {boolean} defaultCanReshare
         * @memberof Vault.SharedFolder
         * @instance
         */
        SharedFolder.prototype.defaultCanReshare = false;

        /**
         * SharedFolder cacheStatus.
         * @member {Vault.CacheStatus} cacheStatus
         * @memberof Vault.SharedFolder
         * @instance
         */
        SharedFolder.prototype.cacheStatus = 0;

        /**
         * SharedFolder owner.
         * @member {string} owner
         * @memberof Vault.SharedFolder
         * @instance
         */
        SharedFolder.prototype.owner = "";

        /**
         * SharedFolder ownerAccountUid.
         * @member {Uint8Array} ownerAccountUid
         * @memberof Vault.SharedFolder
         * @instance
         */
        SharedFolder.prototype.ownerAccountUid = $util.newBuffer([]);

        /**
         * SharedFolder name.
         * @member {Uint8Array} name
         * @memberof Vault.SharedFolder
         * @instance
         */
        SharedFolder.prototype.name = $util.newBuffer([]);

        /**
         * Creates a new SharedFolder instance using the specified properties.
         * @function create
         * @memberof Vault.SharedFolder
         * @static
         * @param {Vault.ISharedFolder=} [properties] Properties to set
         * @returns {Vault.SharedFolder} SharedFolder instance
         */
        SharedFolder.create = function create(properties) {
            return new SharedFolder(properties);
        };

        /**
         * Encodes the specified SharedFolder message. Does not implicitly {@link Vault.SharedFolder.verify|verify} messages.
         * @function encode
         * @memberof Vault.SharedFolder
         * @static
         * @param {Vault.ISharedFolder} message SharedFolder message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedFolder.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.sharedFolderUid);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.revision);
            if (message.sharedFolderKey != null && Object.hasOwnProperty.call(message, "sharedFolderKey"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.sharedFolderKey);
            if (message.keyType != null && Object.hasOwnProperty.call(message, "keyType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.keyType);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.data);
            if (message.defaultManageRecords != null && Object.hasOwnProperty.call(message, "defaultManageRecords"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.defaultManageRecords);
            if (message.defaultManageUsers != null && Object.hasOwnProperty.call(message, "defaultManageUsers"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.defaultManageUsers);
            if (message.defaultCanEdit != null && Object.hasOwnProperty.call(message, "defaultCanEdit"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.defaultCanEdit);
            if (message.defaultCanReshare != null && Object.hasOwnProperty.call(message, "defaultCanReshare"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.defaultCanReshare);
            if (message.cacheStatus != null && Object.hasOwnProperty.call(message, "cacheStatus"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.cacheStatus);
            if (message.owner != null && Object.hasOwnProperty.call(message, "owner"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.owner);
            if (message.ownerAccountUid != null && Object.hasOwnProperty.call(message, "ownerAccountUid"))
                writer.uint32(/* id 12, wireType 2 =*/98).bytes(message.ownerAccountUid);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 13, wireType 2 =*/106).bytes(message.name);
            return writer;
        };

        /**
         * Decodes a SharedFolder message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.SharedFolder
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.SharedFolder} SharedFolder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedFolder.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.SharedFolder();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sharedFolderUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.revision = reader.int64();
                        break;
                    }
                case 3: {
                        message.sharedFolderKey = reader.bytes();
                        break;
                    }
                case 4: {
                        message.keyType = reader.int32();
                        break;
                    }
                case 5: {
                        message.data = reader.bytes();
                        break;
                    }
                case 6: {
                        message.defaultManageRecords = reader.bool();
                        break;
                    }
                case 7: {
                        message.defaultManageUsers = reader.bool();
                        break;
                    }
                case 8: {
                        message.defaultCanEdit = reader.bool();
                        break;
                    }
                case 9: {
                        message.defaultCanReshare = reader.bool();
                        break;
                    }
                case 10: {
                        message.cacheStatus = reader.int32();
                        break;
                    }
                case 11: {
                        message.owner = reader.string();
                        break;
                    }
                case 12: {
                        message.ownerAccountUid = reader.bytes();
                        break;
                    }
                case 13: {
                        message.name = reader.bytes();
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
         * Creates a SharedFolder message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.SharedFolder
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.SharedFolder} SharedFolder
         */
        SharedFolder.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.SharedFolder)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.SharedFolder: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.SharedFolder();
            if (object.sharedFolderUid != null)
                if (typeof object.sharedFolderUid === "string")
                    $util.base64.decode(object.sharedFolderUid, message.sharedFolderUid = $util.newBuffer($util.base64.length(object.sharedFolderUid)), 0);
                else if (object.sharedFolderUid.length >= 0)
                    message.sharedFolderUid = object.sharedFolderUid;
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            if (object.sharedFolderKey != null)
                if (typeof object.sharedFolderKey === "string")
                    $util.base64.decode(object.sharedFolderKey, message.sharedFolderKey = $util.newBuffer($util.base64.length(object.sharedFolderKey)), 0);
                else if (object.sharedFolderKey.length >= 0)
                    message.sharedFolderKey = object.sharedFolderKey;
            switch (object.keyType) {
            default:
                if (typeof object.keyType === "number") {
                    message.keyType = object.keyType;
                    break;
                }
                break;
            case "NO_KEY":
            case 0:
                message.keyType = 0;
                break;
            case "ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.keyType = 1;
                break;
            case "ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.keyType = 2;
                break;
            case "ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.keyType = 3;
                break;
            case "ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.keyType = 4;
                break;
            case "ENCRYPTED_BY_ROOT_KEY_CBC":
            case 5:
                message.keyType = 5;
                break;
            case "ENCRYPTED_BY_ROOT_KEY_GCM":
            case 6:
                message.keyType = 6;
                break;
            }
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            if (object.defaultManageRecords != null)
                message.defaultManageRecords = Boolean(object.defaultManageRecords);
            if (object.defaultManageUsers != null)
                message.defaultManageUsers = Boolean(object.defaultManageUsers);
            if (object.defaultCanEdit != null)
                message.defaultCanEdit = Boolean(object.defaultCanEdit);
            if (object.defaultCanReshare != null)
                message.defaultCanReshare = Boolean(object.defaultCanReshare);
            switch (object.cacheStatus) {
            default:
                if (typeof object.cacheStatus === "number") {
                    message.cacheStatus = object.cacheStatus;
                    break;
                }
                break;
            case "KEEP":
            case 0:
                message.cacheStatus = 0;
                break;
            case "CLEAR":
            case 1:
                message.cacheStatus = 1;
                break;
            }
            if (object.owner != null)
                message.owner = String(object.owner);
            if (object.ownerAccountUid != null)
                if (typeof object.ownerAccountUid === "string")
                    $util.base64.decode(object.ownerAccountUid, message.ownerAccountUid = $util.newBuffer($util.base64.length(object.ownerAccountUid)), 0);
                else if (object.ownerAccountUid.length >= 0)
                    message.ownerAccountUid = object.ownerAccountUid;
            if (object.name != null)
                if (typeof object.name === "string")
                    $util.base64.decode(object.name, message.name = $util.newBuffer($util.base64.length(object.name)), 0);
                else if (object.name.length >= 0)
                    message.name = object.name;
            return message;
        };

        /**
         * Creates a plain object from a SharedFolder message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.SharedFolder
         * @static
         * @param {Vault.SharedFolder} message SharedFolder
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SharedFolder.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.sharedFolderUid = "";
                else {
                    object.sharedFolderUid = [];
                    if (options.bytes !== Array)
                        object.sharedFolderUid = $util.newBuffer(object.sharedFolderUid);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.sharedFolderKey = "";
                else {
                    object.sharedFolderKey = [];
                    if (options.bytes !== Array)
                        object.sharedFolderKey = $util.newBuffer(object.sharedFolderKey);
                }
                object.keyType = options.enums === String ? "NO_KEY" : 0;
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
                object.defaultManageRecords = false;
                object.defaultManageUsers = false;
                object.defaultCanEdit = false;
                object.defaultCanReshare = false;
                object.cacheStatus = options.enums === String ? "KEEP" : 0;
                object.owner = "";
                if (options.bytes === String)
                    object.ownerAccountUid = "";
                else {
                    object.ownerAccountUid = [];
                    if (options.bytes !== Array)
                        object.ownerAccountUid = $util.newBuffer(object.ownerAccountUid);
                }
                if (options.bytes === String)
                    object.name = "";
                else {
                    object.name = [];
                    if (options.bytes !== Array)
                        object.name = $util.newBuffer(object.name);
                }
            }
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                object.sharedFolderUid = options.bytes === String ? $util.base64.encode(message.sharedFolderUid, 0, message.sharedFolderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedFolderUid) : message.sharedFolderUid;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            if (message.sharedFolderKey != null && Object.hasOwnProperty.call(message, "sharedFolderKey"))
                object.sharedFolderKey = options.bytes === String ? $util.base64.encode(message.sharedFolderKey, 0, message.sharedFolderKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedFolderKey) : message.sharedFolderKey;
            if (message.keyType != null && Object.hasOwnProperty.call(message, "keyType"))
                object.keyType = options.enums === String ? $root.Records.RecordKeyType[message.keyType] === undefined ? message.keyType : $root.Records.RecordKeyType[message.keyType] : message.keyType;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.defaultManageRecords != null && Object.hasOwnProperty.call(message, "defaultManageRecords"))
                object.defaultManageRecords = message.defaultManageRecords;
            if (message.defaultManageUsers != null && Object.hasOwnProperty.call(message, "defaultManageUsers"))
                object.defaultManageUsers = message.defaultManageUsers;
            if (message.defaultCanEdit != null && Object.hasOwnProperty.call(message, "defaultCanEdit"))
                object.defaultCanEdit = message.defaultCanEdit;
            if (message.defaultCanReshare != null && Object.hasOwnProperty.call(message, "defaultCanReshare"))
                object.defaultCanReshare = message.defaultCanReshare;
            if (message.cacheStatus != null && Object.hasOwnProperty.call(message, "cacheStatus"))
                object.cacheStatus = options.enums === String ? $root.Vault.CacheStatus[message.cacheStatus] === undefined ? message.cacheStatus : $root.Vault.CacheStatus[message.cacheStatus] : message.cacheStatus;
            if (message.owner != null && Object.hasOwnProperty.call(message, "owner"))
                object.owner = message.owner;
            if (message.ownerAccountUid != null && Object.hasOwnProperty.call(message, "ownerAccountUid"))
                object.ownerAccountUid = options.bytes === String ? $util.base64.encode(message.ownerAccountUid, 0, message.ownerAccountUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.ownerAccountUid) : message.ownerAccountUid;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = options.bytes === String ? $util.base64.encode(message.name, 0, message.name.length) : options.bytes === Array ? Array.prototype.slice.call(message.name) : message.name;
            return object;
        };

        /**
         * Converts this SharedFolder to JSON.
         * @function toJSON
         * @memberof Vault.SharedFolder
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SharedFolder.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SharedFolder
         * @function getTypeUrl
         * @memberof Vault.SharedFolder
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SharedFolder.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.SharedFolder";
        };

        return SharedFolder;
    })();

    Vault.UserFolderSharedFolder = (function() {

        /**
         * Properties of a UserFolderSharedFolder.
         * @memberof Vault
         * @interface IUserFolderSharedFolder
         * @property {Uint8Array|null} [folderUid] UserFolderSharedFolder folderUid
         * @property {Uint8Array|null} [sharedFolderUid] UserFolderSharedFolder sharedFolderUid
         * @property {number|null} [revision] UserFolderSharedFolder revision
         */

        /**
         * Constructs a new UserFolderSharedFolder.
         * @memberof Vault
         * @classdesc Represents a UserFolderSharedFolder.
         * @implements IUserFolderSharedFolder
         * @constructor
         * @param {Vault.IUserFolderSharedFolder=} [properties] Properties to set
         */
        function UserFolderSharedFolder(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserFolderSharedFolder folderUid.
         * @member {Uint8Array} folderUid
         * @memberof Vault.UserFolderSharedFolder
         * @instance
         */
        UserFolderSharedFolder.prototype.folderUid = $util.newBuffer([]);

        /**
         * UserFolderSharedFolder sharedFolderUid.
         * @member {Uint8Array} sharedFolderUid
         * @memberof Vault.UserFolderSharedFolder
         * @instance
         */
        UserFolderSharedFolder.prototype.sharedFolderUid = $util.newBuffer([]);

        /**
         * UserFolderSharedFolder revision.
         * @member {number} revision
         * @memberof Vault.UserFolderSharedFolder
         * @instance
         */
        UserFolderSharedFolder.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new UserFolderSharedFolder instance using the specified properties.
         * @function create
         * @memberof Vault.UserFolderSharedFolder
         * @static
         * @param {Vault.IUserFolderSharedFolder=} [properties] Properties to set
         * @returns {Vault.UserFolderSharedFolder} UserFolderSharedFolder instance
         */
        UserFolderSharedFolder.create = function create(properties) {
            return new UserFolderSharedFolder(properties);
        };

        /**
         * Encodes the specified UserFolderSharedFolder message. Does not implicitly {@link Vault.UserFolderSharedFolder.verify|verify} messages.
         * @function encode
         * @memberof Vault.UserFolderSharedFolder
         * @static
         * @param {Vault.IUserFolderSharedFolder} message UserFolderSharedFolder message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserFolderSharedFolder.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.folderUid);
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.sharedFolderUid);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.revision);
            return writer;
        };

        /**
         * Decodes a UserFolderSharedFolder message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.UserFolderSharedFolder
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.UserFolderSharedFolder} UserFolderSharedFolder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserFolderSharedFolder.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.UserFolderSharedFolder();
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
                        message.sharedFolderUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.revision = reader.int64();
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
         * Creates a UserFolderSharedFolder message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.UserFolderSharedFolder
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.UserFolderSharedFolder} UserFolderSharedFolder
         */
        UserFolderSharedFolder.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.UserFolderSharedFolder)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.UserFolderSharedFolder: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.UserFolderSharedFolder();
            if (object.folderUid != null)
                if (typeof object.folderUid === "string")
                    $util.base64.decode(object.folderUid, message.folderUid = $util.newBuffer($util.base64.length(object.folderUid)), 0);
                else if (object.folderUid.length >= 0)
                    message.folderUid = object.folderUid;
            if (object.sharedFolderUid != null)
                if (typeof object.sharedFolderUid === "string")
                    $util.base64.decode(object.sharedFolderUid, message.sharedFolderUid = $util.newBuffer($util.base64.length(object.sharedFolderUid)), 0);
                else if (object.sharedFolderUid.length >= 0)
                    message.sharedFolderUid = object.sharedFolderUid;
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a UserFolderSharedFolder message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.UserFolderSharedFolder
         * @static
         * @param {Vault.UserFolderSharedFolder} message UserFolderSharedFolder
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserFolderSharedFolder.toObject = function toObject(message, options, q) {
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
                    object.sharedFolderUid = "";
                else {
                    object.sharedFolderUid = [];
                    if (options.bytes !== Array)
                        object.sharedFolderUid = $util.newBuffer(object.sharedFolderUid);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                object.sharedFolderUid = options.bytes === String ? $util.base64.encode(message.sharedFolderUid, 0, message.sharedFolderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedFolderUid) : message.sharedFolderUid;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            return object;
        };

        /**
         * Converts this UserFolderSharedFolder to JSON.
         * @function toJSON
         * @memberof Vault.UserFolderSharedFolder
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserFolderSharedFolder.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserFolderSharedFolder
         * @function getTypeUrl
         * @memberof Vault.UserFolderSharedFolder
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserFolderSharedFolder.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.UserFolderSharedFolder";
        };

        return UserFolderSharedFolder;
    })();

    Vault.SharedFolderFolder = (function() {

        /**
         * Properties of a SharedFolderFolder.
         * @memberof Vault
         * @interface ISharedFolderFolder
         * @property {Uint8Array|null} [sharedFolderUid] SharedFolderFolder sharedFolderUid
         * @property {Uint8Array|null} [folderUid] SharedFolderFolder folderUid
         * @property {Uint8Array|null} [parentUid] SharedFolderFolder parentUid
         * @property {Uint8Array|null} [sharedFolderFolderKey] SharedFolderFolder sharedFolderFolderKey
         * @property {Records.RecordKeyType|null} [keyType] SharedFolderFolder keyType
         * @property {number|null} [revision] SharedFolderFolder revision
         * @property {Uint8Array|null} [data] SharedFolderFolder data
         */

        /**
         * Constructs a new SharedFolderFolder.
         * @memberof Vault
         * @classdesc Represents a SharedFolderFolder.
         * @implements ISharedFolderFolder
         * @constructor
         * @param {Vault.ISharedFolderFolder=} [properties] Properties to set
         */
        function SharedFolderFolder(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SharedFolderFolder sharedFolderUid.
         * @member {Uint8Array} sharedFolderUid
         * @memberof Vault.SharedFolderFolder
         * @instance
         */
        SharedFolderFolder.prototype.sharedFolderUid = $util.newBuffer([]);

        /**
         * SharedFolderFolder folderUid.
         * @member {Uint8Array} folderUid
         * @memberof Vault.SharedFolderFolder
         * @instance
         */
        SharedFolderFolder.prototype.folderUid = $util.newBuffer([]);

        /**
         * SharedFolderFolder parentUid.
         * @member {Uint8Array} parentUid
         * @memberof Vault.SharedFolderFolder
         * @instance
         */
        SharedFolderFolder.prototype.parentUid = $util.newBuffer([]);

        /**
         * SharedFolderFolder sharedFolderFolderKey.
         * @member {Uint8Array} sharedFolderFolderKey
         * @memberof Vault.SharedFolderFolder
         * @instance
         */
        SharedFolderFolder.prototype.sharedFolderFolderKey = $util.newBuffer([]);

        /**
         * SharedFolderFolder keyType.
         * @member {Records.RecordKeyType} keyType
         * @memberof Vault.SharedFolderFolder
         * @instance
         */
        SharedFolderFolder.prototype.keyType = 0;

        /**
         * SharedFolderFolder revision.
         * @member {number} revision
         * @memberof Vault.SharedFolderFolder
         * @instance
         */
        SharedFolderFolder.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SharedFolderFolder data.
         * @member {Uint8Array} data
         * @memberof Vault.SharedFolderFolder
         * @instance
         */
        SharedFolderFolder.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new SharedFolderFolder instance using the specified properties.
         * @function create
         * @memberof Vault.SharedFolderFolder
         * @static
         * @param {Vault.ISharedFolderFolder=} [properties] Properties to set
         * @returns {Vault.SharedFolderFolder} SharedFolderFolder instance
         */
        SharedFolderFolder.create = function create(properties) {
            return new SharedFolderFolder(properties);
        };

        /**
         * Encodes the specified SharedFolderFolder message. Does not implicitly {@link Vault.SharedFolderFolder.verify|verify} messages.
         * @function encode
         * @memberof Vault.SharedFolderFolder
         * @static
         * @param {Vault.ISharedFolderFolder} message SharedFolderFolder message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedFolderFolder.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.sharedFolderUid);
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.folderUid);
            if (message.parentUid != null && Object.hasOwnProperty.call(message, "parentUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.parentUid);
            if (message.sharedFolderFolderKey != null && Object.hasOwnProperty.call(message, "sharedFolderFolderKey"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.sharedFolderFolderKey);
            if (message.keyType != null && Object.hasOwnProperty.call(message, "keyType"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.keyType);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.revision);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.data);
            return writer;
        };

        /**
         * Decodes a SharedFolderFolder message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.SharedFolderFolder
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.SharedFolderFolder} SharedFolderFolder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedFolderFolder.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.SharedFolderFolder();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sharedFolderUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.folderUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.parentUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.sharedFolderFolderKey = reader.bytes();
                        break;
                    }
                case 5: {
                        message.keyType = reader.int32();
                        break;
                    }
                case 6: {
                        message.revision = reader.int64();
                        break;
                    }
                case 7: {
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
         * Creates a SharedFolderFolder message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.SharedFolderFolder
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.SharedFolderFolder} SharedFolderFolder
         */
        SharedFolderFolder.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.SharedFolderFolder)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.SharedFolderFolder: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.SharedFolderFolder();
            if (object.sharedFolderUid != null)
                if (typeof object.sharedFolderUid === "string")
                    $util.base64.decode(object.sharedFolderUid, message.sharedFolderUid = $util.newBuffer($util.base64.length(object.sharedFolderUid)), 0);
                else if (object.sharedFolderUid.length >= 0)
                    message.sharedFolderUid = object.sharedFolderUid;
            if (object.folderUid != null)
                if (typeof object.folderUid === "string")
                    $util.base64.decode(object.folderUid, message.folderUid = $util.newBuffer($util.base64.length(object.folderUid)), 0);
                else if (object.folderUid.length >= 0)
                    message.folderUid = object.folderUid;
            if (object.parentUid != null)
                if (typeof object.parentUid === "string")
                    $util.base64.decode(object.parentUid, message.parentUid = $util.newBuffer($util.base64.length(object.parentUid)), 0);
                else if (object.parentUid.length >= 0)
                    message.parentUid = object.parentUid;
            if (object.sharedFolderFolderKey != null)
                if (typeof object.sharedFolderFolderKey === "string")
                    $util.base64.decode(object.sharedFolderFolderKey, message.sharedFolderFolderKey = $util.newBuffer($util.base64.length(object.sharedFolderFolderKey)), 0);
                else if (object.sharedFolderFolderKey.length >= 0)
                    message.sharedFolderFolderKey = object.sharedFolderFolderKey;
            switch (object.keyType) {
            default:
                if (typeof object.keyType === "number") {
                    message.keyType = object.keyType;
                    break;
                }
                break;
            case "NO_KEY":
            case 0:
                message.keyType = 0;
                break;
            case "ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.keyType = 1;
                break;
            case "ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.keyType = 2;
                break;
            case "ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.keyType = 3;
                break;
            case "ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.keyType = 4;
                break;
            case "ENCRYPTED_BY_ROOT_KEY_CBC":
            case 5:
                message.keyType = 5;
                break;
            case "ENCRYPTED_BY_ROOT_KEY_GCM":
            case 6:
                message.keyType = 6;
                break;
            }
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a SharedFolderFolder message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.SharedFolderFolder
         * @static
         * @param {Vault.SharedFolderFolder} message SharedFolderFolder
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SharedFolderFolder.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.sharedFolderUid = "";
                else {
                    object.sharedFolderUid = [];
                    if (options.bytes !== Array)
                        object.sharedFolderUid = $util.newBuffer(object.sharedFolderUid);
                }
                if (options.bytes === String)
                    object.folderUid = "";
                else {
                    object.folderUid = [];
                    if (options.bytes !== Array)
                        object.folderUid = $util.newBuffer(object.folderUid);
                }
                if (options.bytes === String)
                    object.parentUid = "";
                else {
                    object.parentUid = [];
                    if (options.bytes !== Array)
                        object.parentUid = $util.newBuffer(object.parentUid);
                }
                if (options.bytes === String)
                    object.sharedFolderFolderKey = "";
                else {
                    object.sharedFolderFolderKey = [];
                    if (options.bytes !== Array)
                        object.sharedFolderFolderKey = $util.newBuffer(object.sharedFolderFolderKey);
                }
                object.keyType = options.enums === String ? "NO_KEY" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                object.sharedFolderUid = options.bytes === String ? $util.base64.encode(message.sharedFolderUid, 0, message.sharedFolderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedFolderUid) : message.sharedFolderUid;
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
            if (message.parentUid != null && Object.hasOwnProperty.call(message, "parentUid"))
                object.parentUid = options.bytes === String ? $util.base64.encode(message.parentUid, 0, message.parentUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.parentUid) : message.parentUid;
            if (message.sharedFolderFolderKey != null && Object.hasOwnProperty.call(message, "sharedFolderFolderKey"))
                object.sharedFolderFolderKey = options.bytes === String ? $util.base64.encode(message.sharedFolderFolderKey, 0, message.sharedFolderFolderKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedFolderFolderKey) : message.sharedFolderFolderKey;
            if (message.keyType != null && Object.hasOwnProperty.call(message, "keyType"))
                object.keyType = options.enums === String ? $root.Records.RecordKeyType[message.keyType] === undefined ? message.keyType : $root.Records.RecordKeyType[message.keyType] : message.keyType;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this SharedFolderFolder to JSON.
         * @function toJSON
         * @memberof Vault.SharedFolderFolder
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SharedFolderFolder.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SharedFolderFolder
         * @function getTypeUrl
         * @memberof Vault.SharedFolderFolder
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SharedFolderFolder.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.SharedFolderFolder";
        };

        return SharedFolderFolder;
    })();

    Vault.SharedFolderKey = (function() {

        /**
         * Properties of a SharedFolderKey.
         * @memberof Vault
         * @interface ISharedFolderKey
         * @property {Uint8Array|null} [sharedFolderUid] SharedFolderKey sharedFolderUid
         * @property {Uint8Array|null} [sharedFolderKey] SharedFolderKey sharedFolderKey
         * @property {Records.RecordKeyType|null} [keyType] SharedFolderKey keyType
         */

        /**
         * Constructs a new SharedFolderKey.
         * @memberof Vault
         * @classdesc Represents a SharedFolderKey.
         * @implements ISharedFolderKey
         * @constructor
         * @param {Vault.ISharedFolderKey=} [properties] Properties to set
         */
        function SharedFolderKey(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SharedFolderKey sharedFolderUid.
         * @member {Uint8Array} sharedFolderUid
         * @memberof Vault.SharedFolderKey
         * @instance
         */
        SharedFolderKey.prototype.sharedFolderUid = $util.newBuffer([]);

        /**
         * SharedFolderKey sharedFolderKey.
         * @member {Uint8Array} sharedFolderKey
         * @memberof Vault.SharedFolderKey
         * @instance
         */
        SharedFolderKey.prototype.sharedFolderKey = $util.newBuffer([]);

        /**
         * SharedFolderKey keyType.
         * @member {Records.RecordKeyType} keyType
         * @memberof Vault.SharedFolderKey
         * @instance
         */
        SharedFolderKey.prototype.keyType = 0;

        /**
         * Creates a new SharedFolderKey instance using the specified properties.
         * @function create
         * @memberof Vault.SharedFolderKey
         * @static
         * @param {Vault.ISharedFolderKey=} [properties] Properties to set
         * @returns {Vault.SharedFolderKey} SharedFolderKey instance
         */
        SharedFolderKey.create = function create(properties) {
            return new SharedFolderKey(properties);
        };

        /**
         * Encodes the specified SharedFolderKey message. Does not implicitly {@link Vault.SharedFolderKey.verify|verify} messages.
         * @function encode
         * @memberof Vault.SharedFolderKey
         * @static
         * @param {Vault.ISharedFolderKey} message SharedFolderKey message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedFolderKey.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.sharedFolderUid);
            if (message.sharedFolderKey != null && Object.hasOwnProperty.call(message, "sharedFolderKey"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.sharedFolderKey);
            if (message.keyType != null && Object.hasOwnProperty.call(message, "keyType"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.keyType);
            return writer;
        };

        /**
         * Decodes a SharedFolderKey message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.SharedFolderKey
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.SharedFolderKey} SharedFolderKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedFolderKey.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.SharedFolderKey();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sharedFolderUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.sharedFolderKey = reader.bytes();
                        break;
                    }
                case 3: {
                        message.keyType = reader.int32();
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
         * Creates a SharedFolderKey message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.SharedFolderKey
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.SharedFolderKey} SharedFolderKey
         */
        SharedFolderKey.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.SharedFolderKey)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.SharedFolderKey: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.SharedFolderKey();
            if (object.sharedFolderUid != null)
                if (typeof object.sharedFolderUid === "string")
                    $util.base64.decode(object.sharedFolderUid, message.sharedFolderUid = $util.newBuffer($util.base64.length(object.sharedFolderUid)), 0);
                else if (object.sharedFolderUid.length >= 0)
                    message.sharedFolderUid = object.sharedFolderUid;
            if (object.sharedFolderKey != null)
                if (typeof object.sharedFolderKey === "string")
                    $util.base64.decode(object.sharedFolderKey, message.sharedFolderKey = $util.newBuffer($util.base64.length(object.sharedFolderKey)), 0);
                else if (object.sharedFolderKey.length >= 0)
                    message.sharedFolderKey = object.sharedFolderKey;
            switch (object.keyType) {
            default:
                if (typeof object.keyType === "number") {
                    message.keyType = object.keyType;
                    break;
                }
                break;
            case "NO_KEY":
            case 0:
                message.keyType = 0;
                break;
            case "ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.keyType = 1;
                break;
            case "ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.keyType = 2;
                break;
            case "ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.keyType = 3;
                break;
            case "ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.keyType = 4;
                break;
            case "ENCRYPTED_BY_ROOT_KEY_CBC":
            case 5:
                message.keyType = 5;
                break;
            case "ENCRYPTED_BY_ROOT_KEY_GCM":
            case 6:
                message.keyType = 6;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a SharedFolderKey message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.SharedFolderKey
         * @static
         * @param {Vault.SharedFolderKey} message SharedFolderKey
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SharedFolderKey.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.sharedFolderUid = "";
                else {
                    object.sharedFolderUid = [];
                    if (options.bytes !== Array)
                        object.sharedFolderUid = $util.newBuffer(object.sharedFolderUid);
                }
                if (options.bytes === String)
                    object.sharedFolderKey = "";
                else {
                    object.sharedFolderKey = [];
                    if (options.bytes !== Array)
                        object.sharedFolderKey = $util.newBuffer(object.sharedFolderKey);
                }
                object.keyType = options.enums === String ? "NO_KEY" : 0;
            }
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                object.sharedFolderUid = options.bytes === String ? $util.base64.encode(message.sharedFolderUid, 0, message.sharedFolderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedFolderUid) : message.sharedFolderUid;
            if (message.sharedFolderKey != null && Object.hasOwnProperty.call(message, "sharedFolderKey"))
                object.sharedFolderKey = options.bytes === String ? $util.base64.encode(message.sharedFolderKey, 0, message.sharedFolderKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedFolderKey) : message.sharedFolderKey;
            if (message.keyType != null && Object.hasOwnProperty.call(message, "keyType"))
                object.keyType = options.enums === String ? $root.Records.RecordKeyType[message.keyType] === undefined ? message.keyType : $root.Records.RecordKeyType[message.keyType] : message.keyType;
            return object;
        };

        /**
         * Converts this SharedFolderKey to JSON.
         * @function toJSON
         * @memberof Vault.SharedFolderKey
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SharedFolderKey.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SharedFolderKey
         * @function getTypeUrl
         * @memberof Vault.SharedFolderKey
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SharedFolderKey.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.SharedFolderKey";
        };

        return SharedFolderKey;
    })();

    Vault.Team = (function() {

        /**
         * Properties of a Team.
         * @memberof Vault
         * @interface ITeam
         * @property {Uint8Array|null} [teamUid] Team teamUid
         * @property {string|null} [name] Team name
         * @property {Uint8Array|null} [teamKey] Team teamKey
         * @property {Records.RecordKeyType|null} [teamKeyType] Team teamKeyType
         * @property {Uint8Array|null} [teamPrivateKey] Team teamPrivateKey
         * @property {boolean|null} [restrictEdit] Team restrictEdit
         * @property {boolean|null} [restrictShare] Team restrictShare
         * @property {boolean|null} [restrictView] Team restrictView
         * @property {Array.<Uint8Array>|null} [removedSharedFolders] Team removedSharedFolders
         * @property {Array.<Vault.ISharedFolderKey>|null} [sharedFolderKeys] Team sharedFolderKeys
         * @property {Uint8Array|null} [teamEccPrivateKey] Team teamEccPrivateKey
         * @property {Uint8Array|null} [teamEccPublicKey] Team teamEccPublicKey
         */

        /**
         * Constructs a new Team.
         * @memberof Vault
         * @classdesc Represents a Team.
         * @implements ITeam
         * @constructor
         * @param {Vault.ITeam=} [properties] Properties to set
         */
        function Team(properties) {
            this.removedSharedFolders = [];
            this.sharedFolderKeys = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Team teamUid.
         * @member {Uint8Array} teamUid
         * @memberof Vault.Team
         * @instance
         */
        Team.prototype.teamUid = $util.newBuffer([]);

        /**
         * Team name.
         * @member {string} name
         * @memberof Vault.Team
         * @instance
         */
        Team.prototype.name = "";

        /**
         * Team teamKey.
         * @member {Uint8Array} teamKey
         * @memberof Vault.Team
         * @instance
         */
        Team.prototype.teamKey = $util.newBuffer([]);

        /**
         * Team teamKeyType.
         * @member {Records.RecordKeyType} teamKeyType
         * @memberof Vault.Team
         * @instance
         */
        Team.prototype.teamKeyType = 0;

        /**
         * Team teamPrivateKey.
         * @member {Uint8Array} teamPrivateKey
         * @memberof Vault.Team
         * @instance
         */
        Team.prototype.teamPrivateKey = $util.newBuffer([]);

        /**
         * Team restrictEdit.
         * @member {boolean} restrictEdit
         * @memberof Vault.Team
         * @instance
         */
        Team.prototype.restrictEdit = false;

        /**
         * Team restrictShare.
         * @member {boolean} restrictShare
         * @memberof Vault.Team
         * @instance
         */
        Team.prototype.restrictShare = false;

        /**
         * Team restrictView.
         * @member {boolean} restrictView
         * @memberof Vault.Team
         * @instance
         */
        Team.prototype.restrictView = false;

        /**
         * Team removedSharedFolders.
         * @member {Array.<Uint8Array>} removedSharedFolders
         * @memberof Vault.Team
         * @instance
         */
        Team.prototype.removedSharedFolders = $util.emptyArray;

        /**
         * Team sharedFolderKeys.
         * @member {Array.<Vault.ISharedFolderKey>} sharedFolderKeys
         * @memberof Vault.Team
         * @instance
         */
        Team.prototype.sharedFolderKeys = $util.emptyArray;

        /**
         * Team teamEccPrivateKey.
         * @member {Uint8Array} teamEccPrivateKey
         * @memberof Vault.Team
         * @instance
         */
        Team.prototype.teamEccPrivateKey = $util.newBuffer([]);

        /**
         * Team teamEccPublicKey.
         * @member {Uint8Array} teamEccPublicKey
         * @memberof Vault.Team
         * @instance
         */
        Team.prototype.teamEccPublicKey = $util.newBuffer([]);

        /**
         * Creates a new Team instance using the specified properties.
         * @function create
         * @memberof Vault.Team
         * @static
         * @param {Vault.ITeam=} [properties] Properties to set
         * @returns {Vault.Team} Team instance
         */
        Team.create = function create(properties) {
            return new Team(properties);
        };

        /**
         * Encodes the specified Team message. Does not implicitly {@link Vault.Team.verify|verify} messages.
         * @function encode
         * @memberof Vault.Team
         * @static
         * @param {Vault.ITeam} message Team message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Team.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.teamUid);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.teamKey != null && Object.hasOwnProperty.call(message, "teamKey"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.teamKey);
            if (message.teamKeyType != null && Object.hasOwnProperty.call(message, "teamKeyType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.teamKeyType);
            if (message.teamPrivateKey != null && Object.hasOwnProperty.call(message, "teamPrivateKey"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.teamPrivateKey);
            if (message.restrictEdit != null && Object.hasOwnProperty.call(message, "restrictEdit"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.restrictEdit);
            if (message.restrictShare != null && Object.hasOwnProperty.call(message, "restrictShare"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.restrictShare);
            if (message.restrictView != null && Object.hasOwnProperty.call(message, "restrictView"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.restrictView);
            if (message.removedSharedFolders != null && message.removedSharedFolders.length)
                for (let i = 0; i < message.removedSharedFolders.length; ++i)
                    writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.removedSharedFolders[i]);
            if (message.sharedFolderKeys != null && message.sharedFolderKeys.length)
                for (let i = 0; i < message.sharedFolderKeys.length; ++i)
                    $root.Vault.SharedFolderKey.encode(message.sharedFolderKeys[i], writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
            if (message.teamEccPrivateKey != null && Object.hasOwnProperty.call(message, "teamEccPrivateKey"))
                writer.uint32(/* id 11, wireType 2 =*/90).bytes(message.teamEccPrivateKey);
            if (message.teamEccPublicKey != null && Object.hasOwnProperty.call(message, "teamEccPublicKey"))
                writer.uint32(/* id 12, wireType 2 =*/98).bytes(message.teamEccPublicKey);
            return writer;
        };

        /**
         * Decodes a Team message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.Team
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.Team} Team
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Team.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.Team();
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
                        message.name = reader.string();
                        break;
                    }
                case 3: {
                        message.teamKey = reader.bytes();
                        break;
                    }
                case 4: {
                        message.teamKeyType = reader.int32();
                        break;
                    }
                case 5: {
                        message.teamPrivateKey = reader.bytes();
                        break;
                    }
                case 6: {
                        message.restrictEdit = reader.bool();
                        break;
                    }
                case 7: {
                        message.restrictShare = reader.bool();
                        break;
                    }
                case 8: {
                        message.restrictView = reader.bool();
                        break;
                    }
                case 9: {
                        if (!(message.removedSharedFolders && message.removedSharedFolders.length))
                            message.removedSharedFolders = [];
                        message.removedSharedFolders.push(reader.bytes());
                        break;
                    }
                case 10: {
                        if (!(message.sharedFolderKeys && message.sharedFolderKeys.length))
                            message.sharedFolderKeys = [];
                        message.sharedFolderKeys.push($root.Vault.SharedFolderKey.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 11: {
                        message.teamEccPrivateKey = reader.bytes();
                        break;
                    }
                case 12: {
                        message.teamEccPublicKey = reader.bytes();
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
         * Creates a Team message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.Team
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.Team} Team
         */
        Team.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.Team)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.Team: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.Team();
            if (object.teamUid != null)
                if (typeof object.teamUid === "string")
                    $util.base64.decode(object.teamUid, message.teamUid = $util.newBuffer($util.base64.length(object.teamUid)), 0);
                else if (object.teamUid.length >= 0)
                    message.teamUid = object.teamUid;
            if (object.name != null)
                message.name = String(object.name);
            if (object.teamKey != null)
                if (typeof object.teamKey === "string")
                    $util.base64.decode(object.teamKey, message.teamKey = $util.newBuffer($util.base64.length(object.teamKey)), 0);
                else if (object.teamKey.length >= 0)
                    message.teamKey = object.teamKey;
            switch (object.teamKeyType) {
            default:
                if (typeof object.teamKeyType === "number") {
                    message.teamKeyType = object.teamKeyType;
                    break;
                }
                break;
            case "NO_KEY":
            case 0:
                message.teamKeyType = 0;
                break;
            case "ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.teamKeyType = 1;
                break;
            case "ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.teamKeyType = 2;
                break;
            case "ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.teamKeyType = 3;
                break;
            case "ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.teamKeyType = 4;
                break;
            case "ENCRYPTED_BY_ROOT_KEY_CBC":
            case 5:
                message.teamKeyType = 5;
                break;
            case "ENCRYPTED_BY_ROOT_KEY_GCM":
            case 6:
                message.teamKeyType = 6;
                break;
            }
            if (object.teamPrivateKey != null)
                if (typeof object.teamPrivateKey === "string")
                    $util.base64.decode(object.teamPrivateKey, message.teamPrivateKey = $util.newBuffer($util.base64.length(object.teamPrivateKey)), 0);
                else if (object.teamPrivateKey.length >= 0)
                    message.teamPrivateKey = object.teamPrivateKey;
            if (object.restrictEdit != null)
                message.restrictEdit = Boolean(object.restrictEdit);
            if (object.restrictShare != null)
                message.restrictShare = Boolean(object.restrictShare);
            if (object.restrictView != null)
                message.restrictView = Boolean(object.restrictView);
            if (object.removedSharedFolders) {
                if (!Array.isArray(object.removedSharedFolders))
                    throw TypeError(".Vault.Team.removedSharedFolders: array expected");
                message.removedSharedFolders = [];
                for (let i = 0; i < object.removedSharedFolders.length; ++i)
                    if (typeof object.removedSharedFolders[i] === "string")
                        $util.base64.decode(object.removedSharedFolders[i], message.removedSharedFolders[i] = $util.newBuffer($util.base64.length(object.removedSharedFolders[i])), 0);
                    else if (object.removedSharedFolders[i].length >= 0)
                        message.removedSharedFolders[i] = object.removedSharedFolders[i];
            }
            if (object.sharedFolderKeys) {
                if (!Array.isArray(object.sharedFolderKeys))
                    throw TypeError(".Vault.Team.sharedFolderKeys: array expected");
                message.sharedFolderKeys = [];
                for (let i = 0; i < object.sharedFolderKeys.length; ++i) {
                    if (!$util.isObject(object.sharedFolderKeys[i]))
                        throw TypeError(".Vault.Team.sharedFolderKeys: object expected");
                    message.sharedFolderKeys[i] = $root.Vault.SharedFolderKey.fromObject(object.sharedFolderKeys[i], long + 1);
                }
            }
            if (object.teamEccPrivateKey != null)
                if (typeof object.teamEccPrivateKey === "string")
                    $util.base64.decode(object.teamEccPrivateKey, message.teamEccPrivateKey = $util.newBuffer($util.base64.length(object.teamEccPrivateKey)), 0);
                else if (object.teamEccPrivateKey.length >= 0)
                    message.teamEccPrivateKey = object.teamEccPrivateKey;
            if (object.teamEccPublicKey != null)
                if (typeof object.teamEccPublicKey === "string")
                    $util.base64.decode(object.teamEccPublicKey, message.teamEccPublicKey = $util.newBuffer($util.base64.length(object.teamEccPublicKey)), 0);
                else if (object.teamEccPublicKey.length >= 0)
                    message.teamEccPublicKey = object.teamEccPublicKey;
            return message;
        };

        /**
         * Creates a plain object from a Team message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.Team
         * @static
         * @param {Vault.Team} message Team
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Team.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.removedSharedFolders = [];
                object.sharedFolderKeys = [];
            }
            if (options.defaults) {
                if (options.bytes === String)
                    object.teamUid = "";
                else {
                    object.teamUid = [];
                    if (options.bytes !== Array)
                        object.teamUid = $util.newBuffer(object.teamUid);
                }
                object.name = "";
                if (options.bytes === String)
                    object.teamKey = "";
                else {
                    object.teamKey = [];
                    if (options.bytes !== Array)
                        object.teamKey = $util.newBuffer(object.teamKey);
                }
                object.teamKeyType = options.enums === String ? "NO_KEY" : 0;
                if (options.bytes === String)
                    object.teamPrivateKey = "";
                else {
                    object.teamPrivateKey = [];
                    if (options.bytes !== Array)
                        object.teamPrivateKey = $util.newBuffer(object.teamPrivateKey);
                }
                object.restrictEdit = false;
                object.restrictShare = false;
                object.restrictView = false;
                if (options.bytes === String)
                    object.teamEccPrivateKey = "";
                else {
                    object.teamEccPrivateKey = [];
                    if (options.bytes !== Array)
                        object.teamEccPrivateKey = $util.newBuffer(object.teamEccPrivateKey);
                }
                if (options.bytes === String)
                    object.teamEccPublicKey = "";
                else {
                    object.teamEccPublicKey = [];
                    if (options.bytes !== Array)
                        object.teamEccPublicKey = $util.newBuffer(object.teamEccPublicKey);
                }
            }
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid"))
                object.teamUid = options.bytes === String ? $util.base64.encode(message.teamUid, 0, message.teamUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.teamUid) : message.teamUid;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.teamKey != null && Object.hasOwnProperty.call(message, "teamKey"))
                object.teamKey = options.bytes === String ? $util.base64.encode(message.teamKey, 0, message.teamKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.teamKey) : message.teamKey;
            if (message.teamKeyType != null && Object.hasOwnProperty.call(message, "teamKeyType"))
                object.teamKeyType = options.enums === String ? $root.Records.RecordKeyType[message.teamKeyType] === undefined ? message.teamKeyType : $root.Records.RecordKeyType[message.teamKeyType] : message.teamKeyType;
            if (message.teamPrivateKey != null && Object.hasOwnProperty.call(message, "teamPrivateKey"))
                object.teamPrivateKey = options.bytes === String ? $util.base64.encode(message.teamPrivateKey, 0, message.teamPrivateKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.teamPrivateKey) : message.teamPrivateKey;
            if (message.restrictEdit != null && Object.hasOwnProperty.call(message, "restrictEdit"))
                object.restrictEdit = message.restrictEdit;
            if (message.restrictShare != null && Object.hasOwnProperty.call(message, "restrictShare"))
                object.restrictShare = message.restrictShare;
            if (message.restrictView != null && Object.hasOwnProperty.call(message, "restrictView"))
                object.restrictView = message.restrictView;
            if (message.removedSharedFolders && message.removedSharedFolders.length) {
                object.removedSharedFolders = [];
                for (let j = 0; j < message.removedSharedFolders.length; ++j)
                    object.removedSharedFolders[j] = options.bytes === String ? $util.base64.encode(message.removedSharedFolders[j], 0, message.removedSharedFolders[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.removedSharedFolders[j]) : message.removedSharedFolders[j];
            }
            if (message.sharedFolderKeys && message.sharedFolderKeys.length) {
                object.sharedFolderKeys = [];
                for (let j = 0; j < message.sharedFolderKeys.length; ++j)
                    object.sharedFolderKeys[j] = $root.Vault.SharedFolderKey.toObject(message.sharedFolderKeys[j], options, q + 1);
            }
            if (message.teamEccPrivateKey != null && Object.hasOwnProperty.call(message, "teamEccPrivateKey"))
                object.teamEccPrivateKey = options.bytes === String ? $util.base64.encode(message.teamEccPrivateKey, 0, message.teamEccPrivateKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.teamEccPrivateKey) : message.teamEccPrivateKey;
            if (message.teamEccPublicKey != null && Object.hasOwnProperty.call(message, "teamEccPublicKey"))
                object.teamEccPublicKey = options.bytes === String ? $util.base64.encode(message.teamEccPublicKey, 0, message.teamEccPublicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.teamEccPublicKey) : message.teamEccPublicKey;
            return object;
        };

        /**
         * Converts this Team to JSON.
         * @function toJSON
         * @memberof Vault.Team
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Team.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Team
         * @function getTypeUrl
         * @memberof Vault.Team
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Team.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.Team";
        };

        return Team;
    })();

    Vault.Record = (function() {

        /**
         * Properties of a Record.
         * @memberof Vault
         * @interface IRecord
         * @property {Uint8Array|null} [recordUid] Record recordUid
         * @property {number|null} [revision] Record revision
         * @property {number|null} [version] Record version
         * @property {boolean|null} [shared] Record shared
         * @property {number|null} [clientModifiedTime] Record clientModifiedTime
         * @property {Uint8Array|null} [data] Record data
         * @property {Uint8Array|null} [extra] Record extra
         * @property {string|null} [udata] Record udata
         * @property {number|null} [fileSize] Record fileSize
         * @property {number|null} [thumbnailSize] Record thumbnailSize
         */

        /**
         * Constructs a new Record.
         * @memberof Vault
         * @classdesc Represents a Record.
         * @implements IRecord
         * @constructor
         * @param {Vault.IRecord=} [properties] Properties to set
         */
        function Record(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Record recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Vault.Record
         * @instance
         */
        Record.prototype.recordUid = $util.newBuffer([]);

        /**
         * Record revision.
         * @member {number} revision
         * @memberof Vault.Record
         * @instance
         */
        Record.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Record version.
         * @member {number} version
         * @memberof Vault.Record
         * @instance
         */
        Record.prototype.version = 0;

        /**
         * Record shared.
         * @member {boolean} shared
         * @memberof Vault.Record
         * @instance
         */
        Record.prototype.shared = false;

        /**
         * Record clientModifiedTime.
         * @member {number} clientModifiedTime
         * @memberof Vault.Record
         * @instance
         */
        Record.prototype.clientModifiedTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Record data.
         * @member {Uint8Array} data
         * @memberof Vault.Record
         * @instance
         */
        Record.prototype.data = $util.newBuffer([]);

        /**
         * Record extra.
         * @member {Uint8Array} extra
         * @memberof Vault.Record
         * @instance
         */
        Record.prototype.extra = $util.newBuffer([]);

        /**
         * Record udata.
         * @member {string} udata
         * @memberof Vault.Record
         * @instance
         */
        Record.prototype.udata = "";

        /**
         * Record fileSize.
         * @member {number} fileSize
         * @memberof Vault.Record
         * @instance
         */
        Record.prototype.fileSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Record thumbnailSize.
         * @member {number} thumbnailSize
         * @memberof Vault.Record
         * @instance
         */
        Record.prototype.thumbnailSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Record instance using the specified properties.
         * @function create
         * @memberof Vault.Record
         * @static
         * @param {Vault.IRecord=} [properties] Properties to set
         * @returns {Vault.Record} Record instance
         */
        Record.create = function create(properties) {
            return new Record(properties);
        };

        /**
         * Encodes the specified Record message. Does not implicitly {@link Vault.Record.verify|verify} messages.
         * @function encode
         * @memberof Vault.Record
         * @static
         * @param {Vault.IRecord} message Record message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Record.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.revision);
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.version);
            if (message.shared != null && Object.hasOwnProperty.call(message, "shared"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.shared);
            if (message.clientModifiedTime != null && Object.hasOwnProperty.call(message, "clientModifiedTime"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.clientModifiedTime);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.data);
            if (message.extra != null && Object.hasOwnProperty.call(message, "extra"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.extra);
            if (message.udata != null && Object.hasOwnProperty.call(message, "udata"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.udata);
            if (message.fileSize != null && Object.hasOwnProperty.call(message, "fileSize"))
                writer.uint32(/* id 9, wireType 0 =*/72).int64(message.fileSize);
            if (message.thumbnailSize != null && Object.hasOwnProperty.call(message, "thumbnailSize"))
                writer.uint32(/* id 10, wireType 0 =*/80).int64(message.thumbnailSize);
            return writer;
        };

        /**
         * Decodes a Record message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.Record
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.Record} Record
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Record.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.Record();
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
                        message.revision = reader.int64();
                        break;
                    }
                case 3: {
                        message.version = reader.int32();
                        break;
                    }
                case 4: {
                        message.shared = reader.bool();
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
                        message.extra = reader.bytes();
                        break;
                    }
                case 8: {
                        message.udata = reader.string();
                        break;
                    }
                case 9: {
                        message.fileSize = reader.int64();
                        break;
                    }
                case 10: {
                        message.thumbnailSize = reader.int64();
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
         * Creates a Record message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.Record
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.Record} Record
         */
        Record.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.Record)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.Record: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.Record();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            if (object.version != null)
                message.version = object.version | 0;
            if (object.shared != null)
                message.shared = Boolean(object.shared);
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
            if (object.extra != null)
                if (typeof object.extra === "string")
                    $util.base64.decode(object.extra, message.extra = $util.newBuffer($util.base64.length(object.extra)), 0);
                else if (object.extra.length >= 0)
                    message.extra = object.extra;
            if (object.udata != null)
                message.udata = String(object.udata);
            if (object.fileSize != null)
                if ($util.Long)
                    message.fileSize = $util.Long.fromValue(object.fileSize, false);
                else if (typeof object.fileSize === "string")
                    message.fileSize = parseInt(object.fileSize, 10);
                else if (typeof object.fileSize === "number")
                    message.fileSize = object.fileSize;
                else if (typeof object.fileSize === "object")
                    message.fileSize = new $util.LongBits(object.fileSize.low >>> 0, object.fileSize.high >>> 0).toNumber();
            if (object.thumbnailSize != null)
                if ($util.Long)
                    message.thumbnailSize = $util.Long.fromValue(object.thumbnailSize, false);
                else if (typeof object.thumbnailSize === "string")
                    message.thumbnailSize = parseInt(object.thumbnailSize, 10);
                else if (typeof object.thumbnailSize === "number")
                    message.thumbnailSize = object.thumbnailSize;
                else if (typeof object.thumbnailSize === "object")
                    message.thumbnailSize = new $util.LongBits(object.thumbnailSize.low >>> 0, object.thumbnailSize.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a Record message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.Record
         * @static
         * @param {Vault.Record} message Record
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Record.toObject = function toObject(message, options, q) {
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
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.version = 0;
                object.shared = false;
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
                    object.extra = "";
                else {
                    object.extra = [];
                    if (options.bytes !== Array)
                        object.extra = $util.newBuffer(object.extra);
                }
                object.udata = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.fileSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.fileSize = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.thumbnailSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.thumbnailSize = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                object.version = message.version;
            if (message.shared != null && Object.hasOwnProperty.call(message, "shared"))
                object.shared = message.shared;
            if (message.clientModifiedTime != null && Object.hasOwnProperty.call(message, "clientModifiedTime"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.clientModifiedTime = typeof message.clientModifiedTime === "number" ? BigInt(message.clientModifiedTime) : $util.Long.fromBits(message.clientModifiedTime.low >>> 0, message.clientModifiedTime.high >>> 0, false).toBigInt();
                else if (typeof message.clientModifiedTime === "number")
                    object.clientModifiedTime = options.longs === String ? String(message.clientModifiedTime) : message.clientModifiedTime;
                else
                    object.clientModifiedTime = options.longs === String ? $util.Long.prototype.toString.call(message.clientModifiedTime) : options.longs === Number ? new $util.LongBits(message.clientModifiedTime.low >>> 0, message.clientModifiedTime.high >>> 0).toNumber() : message.clientModifiedTime;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.extra != null && Object.hasOwnProperty.call(message, "extra"))
                object.extra = options.bytes === String ? $util.base64.encode(message.extra, 0, message.extra.length) : options.bytes === Array ? Array.prototype.slice.call(message.extra) : message.extra;
            if (message.udata != null && Object.hasOwnProperty.call(message, "udata"))
                object.udata = message.udata;
            if (message.fileSize != null && Object.hasOwnProperty.call(message, "fileSize"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.fileSize = typeof message.fileSize === "number" ? BigInt(message.fileSize) : $util.Long.fromBits(message.fileSize.low >>> 0, message.fileSize.high >>> 0, false).toBigInt();
                else if (typeof message.fileSize === "number")
                    object.fileSize = options.longs === String ? String(message.fileSize) : message.fileSize;
                else
                    object.fileSize = options.longs === String ? $util.Long.prototype.toString.call(message.fileSize) : options.longs === Number ? new $util.LongBits(message.fileSize.low >>> 0, message.fileSize.high >>> 0).toNumber() : message.fileSize;
            if (message.thumbnailSize != null && Object.hasOwnProperty.call(message, "thumbnailSize"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.thumbnailSize = typeof message.thumbnailSize === "number" ? BigInt(message.thumbnailSize) : $util.Long.fromBits(message.thumbnailSize.low >>> 0, message.thumbnailSize.high >>> 0, false).toBigInt();
                else if (typeof message.thumbnailSize === "number")
                    object.thumbnailSize = options.longs === String ? String(message.thumbnailSize) : message.thumbnailSize;
                else
                    object.thumbnailSize = options.longs === String ? $util.Long.prototype.toString.call(message.thumbnailSize) : options.longs === Number ? new $util.LongBits(message.thumbnailSize.low >>> 0, message.thumbnailSize.high >>> 0).toNumber() : message.thumbnailSize;
            return object;
        };

        /**
         * Converts this Record to JSON.
         * @function toJSON
         * @memberof Vault.Record
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Record.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Record
         * @function getTypeUrl
         * @memberof Vault.Record
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Record.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.Record";
        };

        return Record;
    })();

    Vault.RecordLink = (function() {

        /**
         * Properties of a RecordLink.
         * @memberof Vault
         * @interface IRecordLink
         * @property {Uint8Array|null} [parentRecordUid] RecordLink parentRecordUid
         * @property {Uint8Array|null} [childRecordUid] RecordLink childRecordUid
         * @property {Uint8Array|null} [recordKey] RecordLink recordKey
         * @property {number|null} [revision] RecordLink revision
         */

        /**
         * Constructs a new RecordLink.
         * @memberof Vault
         * @classdesc Represents a RecordLink.
         * @implements IRecordLink
         * @constructor
         * @param {Vault.IRecordLink=} [properties] Properties to set
         */
        function RecordLink(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RecordLink parentRecordUid.
         * @member {Uint8Array} parentRecordUid
         * @memberof Vault.RecordLink
         * @instance
         */
        RecordLink.prototype.parentRecordUid = $util.newBuffer([]);

        /**
         * RecordLink childRecordUid.
         * @member {Uint8Array} childRecordUid
         * @memberof Vault.RecordLink
         * @instance
         */
        RecordLink.prototype.childRecordUid = $util.newBuffer([]);

        /**
         * RecordLink recordKey.
         * @member {Uint8Array} recordKey
         * @memberof Vault.RecordLink
         * @instance
         */
        RecordLink.prototype.recordKey = $util.newBuffer([]);

        /**
         * RecordLink revision.
         * @member {number} revision
         * @memberof Vault.RecordLink
         * @instance
         */
        RecordLink.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new RecordLink instance using the specified properties.
         * @function create
         * @memberof Vault.RecordLink
         * @static
         * @param {Vault.IRecordLink=} [properties] Properties to set
         * @returns {Vault.RecordLink} RecordLink instance
         */
        RecordLink.create = function create(properties) {
            return new RecordLink(properties);
        };

        /**
         * Encodes the specified RecordLink message. Does not implicitly {@link Vault.RecordLink.verify|verify} messages.
         * @function encode
         * @memberof Vault.RecordLink
         * @static
         * @param {Vault.IRecordLink} message RecordLink message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RecordLink.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.parentRecordUid != null && Object.hasOwnProperty.call(message, "parentRecordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.parentRecordUid);
            if (message.childRecordUid != null && Object.hasOwnProperty.call(message, "childRecordUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.childRecordUid);
            if (message.recordKey != null && Object.hasOwnProperty.call(message, "recordKey"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.recordKey);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.revision);
            return writer;
        };

        /**
         * Decodes a RecordLink message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.RecordLink
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.RecordLink} RecordLink
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RecordLink.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.RecordLink();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.parentRecordUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.childRecordUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.recordKey = reader.bytes();
                        break;
                    }
                case 4: {
                        message.revision = reader.int64();
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
         * Creates a RecordLink message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.RecordLink
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.RecordLink} RecordLink
         */
        RecordLink.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.RecordLink)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.RecordLink: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.RecordLink();
            if (object.parentRecordUid != null)
                if (typeof object.parentRecordUid === "string")
                    $util.base64.decode(object.parentRecordUid, message.parentRecordUid = $util.newBuffer($util.base64.length(object.parentRecordUid)), 0);
                else if (object.parentRecordUid.length >= 0)
                    message.parentRecordUid = object.parentRecordUid;
            if (object.childRecordUid != null)
                if (typeof object.childRecordUid === "string")
                    $util.base64.decode(object.childRecordUid, message.childRecordUid = $util.newBuffer($util.base64.length(object.childRecordUid)), 0);
                else if (object.childRecordUid.length >= 0)
                    message.childRecordUid = object.childRecordUid;
            if (object.recordKey != null)
                if (typeof object.recordKey === "string")
                    $util.base64.decode(object.recordKey, message.recordKey = $util.newBuffer($util.base64.length(object.recordKey)), 0);
                else if (object.recordKey.length >= 0)
                    message.recordKey = object.recordKey;
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a RecordLink message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.RecordLink
         * @static
         * @param {Vault.RecordLink} message RecordLink
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RecordLink.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.parentRecordUid = "";
                else {
                    object.parentRecordUid = [];
                    if (options.bytes !== Array)
                        object.parentRecordUid = $util.newBuffer(object.parentRecordUid);
                }
                if (options.bytes === String)
                    object.childRecordUid = "";
                else {
                    object.childRecordUid = [];
                    if (options.bytes !== Array)
                        object.childRecordUid = $util.newBuffer(object.childRecordUid);
                }
                if (options.bytes === String)
                    object.recordKey = "";
                else {
                    object.recordKey = [];
                    if (options.bytes !== Array)
                        object.recordKey = $util.newBuffer(object.recordKey);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.parentRecordUid != null && Object.hasOwnProperty.call(message, "parentRecordUid"))
                object.parentRecordUid = options.bytes === String ? $util.base64.encode(message.parentRecordUid, 0, message.parentRecordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.parentRecordUid) : message.parentRecordUid;
            if (message.childRecordUid != null && Object.hasOwnProperty.call(message, "childRecordUid"))
                object.childRecordUid = options.bytes === String ? $util.base64.encode(message.childRecordUid, 0, message.childRecordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.childRecordUid) : message.childRecordUid;
            if (message.recordKey != null && Object.hasOwnProperty.call(message, "recordKey"))
                object.recordKey = options.bytes === String ? $util.base64.encode(message.recordKey, 0, message.recordKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordKey) : message.recordKey;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            return object;
        };

        /**
         * Converts this RecordLink to JSON.
         * @function toJSON
         * @memberof Vault.RecordLink
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RecordLink.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RecordLink
         * @function getTypeUrl
         * @memberof Vault.RecordLink
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RecordLink.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.RecordLink";
        };

        return RecordLink;
    })();

    Vault.UserFolderRecord = (function() {

        /**
         * Properties of a UserFolderRecord.
         * @memberof Vault
         * @interface IUserFolderRecord
         * @property {Uint8Array|null} [folderUid] UserFolderRecord folderUid
         * @property {Uint8Array|null} [recordUid] UserFolderRecord recordUid
         * @property {number|null} [revision] UserFolderRecord revision
         */

        /**
         * Constructs a new UserFolderRecord.
         * @memberof Vault
         * @classdesc Represents a UserFolderRecord.
         * @implements IUserFolderRecord
         * @constructor
         * @param {Vault.IUserFolderRecord=} [properties] Properties to set
         */
        function UserFolderRecord(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserFolderRecord folderUid.
         * @member {Uint8Array} folderUid
         * @memberof Vault.UserFolderRecord
         * @instance
         */
        UserFolderRecord.prototype.folderUid = $util.newBuffer([]);

        /**
         * UserFolderRecord recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Vault.UserFolderRecord
         * @instance
         */
        UserFolderRecord.prototype.recordUid = $util.newBuffer([]);

        /**
         * UserFolderRecord revision.
         * @member {number} revision
         * @memberof Vault.UserFolderRecord
         * @instance
         */
        UserFolderRecord.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new UserFolderRecord instance using the specified properties.
         * @function create
         * @memberof Vault.UserFolderRecord
         * @static
         * @param {Vault.IUserFolderRecord=} [properties] Properties to set
         * @returns {Vault.UserFolderRecord} UserFolderRecord instance
         */
        UserFolderRecord.create = function create(properties) {
            return new UserFolderRecord(properties);
        };

        /**
         * Encodes the specified UserFolderRecord message. Does not implicitly {@link Vault.UserFolderRecord.verify|verify} messages.
         * @function encode
         * @memberof Vault.UserFolderRecord
         * @static
         * @param {Vault.IUserFolderRecord} message UserFolderRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserFolderRecord.encode = function encode(message, writer, q) {
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
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.revision);
            return writer;
        };

        /**
         * Decodes a UserFolderRecord message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.UserFolderRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.UserFolderRecord} UserFolderRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserFolderRecord.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.UserFolderRecord();
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
                        message.revision = reader.int64();
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
         * Creates a UserFolderRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.UserFolderRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.UserFolderRecord} UserFolderRecord
         */
        UserFolderRecord.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.UserFolderRecord)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.UserFolderRecord: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.UserFolderRecord();
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
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a UserFolderRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.UserFolderRecord
         * @static
         * @param {Vault.UserFolderRecord} message UserFolderRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserFolderRecord.toObject = function toObject(message, options, q) {
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
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            return object;
        };

        /**
         * Converts this UserFolderRecord to JSON.
         * @function toJSON
         * @memberof Vault.UserFolderRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserFolderRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserFolderRecord
         * @function getTypeUrl
         * @memberof Vault.UserFolderRecord
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserFolderRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.UserFolderRecord";
        };

        return UserFolderRecord;
    })();

    Vault.SharedFolderFolderRecord = (function() {

        /**
         * Properties of a SharedFolderFolderRecord.
         * @memberof Vault
         * @interface ISharedFolderFolderRecord
         * @property {Uint8Array|null} [sharedFolderUid] SharedFolderFolderRecord sharedFolderUid
         * @property {Uint8Array|null} [folderUid] SharedFolderFolderRecord folderUid
         * @property {Uint8Array|null} [recordUid] SharedFolderFolderRecord recordUid
         * @property {number|null} [revision] SharedFolderFolderRecord revision
         */

        /**
         * Constructs a new SharedFolderFolderRecord.
         * @memberof Vault
         * @classdesc Represents a SharedFolderFolderRecord.
         * @implements ISharedFolderFolderRecord
         * @constructor
         * @param {Vault.ISharedFolderFolderRecord=} [properties] Properties to set
         */
        function SharedFolderFolderRecord(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SharedFolderFolderRecord sharedFolderUid.
         * @member {Uint8Array} sharedFolderUid
         * @memberof Vault.SharedFolderFolderRecord
         * @instance
         */
        SharedFolderFolderRecord.prototype.sharedFolderUid = $util.newBuffer([]);

        /**
         * SharedFolderFolderRecord folderUid.
         * @member {Uint8Array} folderUid
         * @memberof Vault.SharedFolderFolderRecord
         * @instance
         */
        SharedFolderFolderRecord.prototype.folderUid = $util.newBuffer([]);

        /**
         * SharedFolderFolderRecord recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Vault.SharedFolderFolderRecord
         * @instance
         */
        SharedFolderFolderRecord.prototype.recordUid = $util.newBuffer([]);

        /**
         * SharedFolderFolderRecord revision.
         * @member {number} revision
         * @memberof Vault.SharedFolderFolderRecord
         * @instance
         */
        SharedFolderFolderRecord.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new SharedFolderFolderRecord instance using the specified properties.
         * @function create
         * @memberof Vault.SharedFolderFolderRecord
         * @static
         * @param {Vault.ISharedFolderFolderRecord=} [properties] Properties to set
         * @returns {Vault.SharedFolderFolderRecord} SharedFolderFolderRecord instance
         */
        SharedFolderFolderRecord.create = function create(properties) {
            return new SharedFolderFolderRecord(properties);
        };

        /**
         * Encodes the specified SharedFolderFolderRecord message. Does not implicitly {@link Vault.SharedFolderFolderRecord.verify|verify} messages.
         * @function encode
         * @memberof Vault.SharedFolderFolderRecord
         * @static
         * @param {Vault.ISharedFolderFolderRecord} message SharedFolderFolderRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedFolderFolderRecord.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.sharedFolderUid);
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.folderUid);
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.recordUid);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.revision);
            return writer;
        };

        /**
         * Decodes a SharedFolderFolderRecord message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.SharedFolderFolderRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.SharedFolderFolderRecord} SharedFolderFolderRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedFolderFolderRecord.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.SharedFolderFolderRecord();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sharedFolderUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.folderUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.recordUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.revision = reader.int64();
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
         * Creates a SharedFolderFolderRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.SharedFolderFolderRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.SharedFolderFolderRecord} SharedFolderFolderRecord
         */
        SharedFolderFolderRecord.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.SharedFolderFolderRecord)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.SharedFolderFolderRecord: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.SharedFolderFolderRecord();
            if (object.sharedFolderUid != null)
                if (typeof object.sharedFolderUid === "string")
                    $util.base64.decode(object.sharedFolderUid, message.sharedFolderUid = $util.newBuffer($util.base64.length(object.sharedFolderUid)), 0);
                else if (object.sharedFolderUid.length >= 0)
                    message.sharedFolderUid = object.sharedFolderUid;
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
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a SharedFolderFolderRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.SharedFolderFolderRecord
         * @static
         * @param {Vault.SharedFolderFolderRecord} message SharedFolderFolderRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SharedFolderFolderRecord.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.sharedFolderUid = "";
                else {
                    object.sharedFolderUid = [];
                    if (options.bytes !== Array)
                        object.sharedFolderUid = $util.newBuffer(object.sharedFolderUid);
                }
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
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                object.sharedFolderUid = options.bytes === String ? $util.base64.encode(message.sharedFolderUid, 0, message.sharedFolderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedFolderUid) : message.sharedFolderUid;
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            return object;
        };

        /**
         * Converts this SharedFolderFolderRecord to JSON.
         * @function toJSON
         * @memberof Vault.SharedFolderFolderRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SharedFolderFolderRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SharedFolderFolderRecord
         * @function getTypeUrl
         * @memberof Vault.SharedFolderFolderRecord
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SharedFolderFolderRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.SharedFolderFolderRecord";
        };

        return SharedFolderFolderRecord;
    })();

    Vault.NonSharedData = (function() {

        /**
         * Properties of a NonSharedData.
         * @memberof Vault
         * @interface INonSharedData
         * @property {Uint8Array|null} [recordUid] NonSharedData recordUid
         * @property {Uint8Array|null} [data] NonSharedData data
         */

        /**
         * Constructs a new NonSharedData.
         * @memberof Vault
         * @classdesc Represents a NonSharedData.
         * @implements INonSharedData
         * @constructor
         * @param {Vault.INonSharedData=} [properties] Properties to set
         */
        function NonSharedData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NonSharedData recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Vault.NonSharedData
         * @instance
         */
        NonSharedData.prototype.recordUid = $util.newBuffer([]);

        /**
         * NonSharedData data.
         * @member {Uint8Array} data
         * @memberof Vault.NonSharedData
         * @instance
         */
        NonSharedData.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new NonSharedData instance using the specified properties.
         * @function create
         * @memberof Vault.NonSharedData
         * @static
         * @param {Vault.INonSharedData=} [properties] Properties to set
         * @returns {Vault.NonSharedData} NonSharedData instance
         */
        NonSharedData.create = function create(properties) {
            return new NonSharedData(properties);
        };

        /**
         * Encodes the specified NonSharedData message. Does not implicitly {@link Vault.NonSharedData.verify|verify} messages.
         * @function encode
         * @memberof Vault.NonSharedData
         * @static
         * @param {Vault.INonSharedData} message NonSharedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NonSharedData.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            return writer;
        };

        /**
         * Decodes a NonSharedData message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.NonSharedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.NonSharedData} NonSharedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NonSharedData.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.NonSharedData();
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
         * Creates a NonSharedData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.NonSharedData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.NonSharedData} NonSharedData
         */
        NonSharedData.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.NonSharedData)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.NonSharedData: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.NonSharedData();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a NonSharedData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.NonSharedData
         * @static
         * @param {Vault.NonSharedData} message NonSharedData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NonSharedData.toObject = function toObject(message, options, q) {
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
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this NonSharedData to JSON.
         * @function toJSON
         * @memberof Vault.NonSharedData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NonSharedData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NonSharedData
         * @function getTypeUrl
         * @memberof Vault.NonSharedData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NonSharedData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.NonSharedData";
        };

        return NonSharedData;
    })();

    Vault.RecordMetaData = (function() {

        /**
         * Properties of a RecordMetaData.
         * @memberof Vault
         * @interface IRecordMetaData
         * @property {Uint8Array|null} [recordUid] RecordMetaData recordUid
         * @property {boolean|null} [owner] RecordMetaData owner
         * @property {Uint8Array|null} [recordKey] RecordMetaData recordKey
         * @property {Records.RecordKeyType|null} [recordKeyType] RecordMetaData recordKeyType
         * @property {boolean|null} [canShare] RecordMetaData canShare
         * @property {boolean|null} [canEdit] RecordMetaData canEdit
         * @property {Uint8Array|null} [ownerAccountUid] RecordMetaData ownerAccountUid
         * @property {number|null} [expiration] RecordMetaData expiration
         * @property {Records.TimerNotificationType|null} [expirationNotificationType] RecordMetaData expirationNotificationType
         * @property {string|null} [ownerUsername] RecordMetaData ownerUsername
         */

        /**
         * Constructs a new RecordMetaData.
         * @memberof Vault
         * @classdesc Represents a RecordMetaData.
         * @implements IRecordMetaData
         * @constructor
         * @param {Vault.IRecordMetaData=} [properties] Properties to set
         */
        function RecordMetaData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RecordMetaData recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Vault.RecordMetaData
         * @instance
         */
        RecordMetaData.prototype.recordUid = $util.newBuffer([]);

        /**
         * RecordMetaData owner.
         * @member {boolean} owner
         * @memberof Vault.RecordMetaData
         * @instance
         */
        RecordMetaData.prototype.owner = false;

        /**
         * RecordMetaData recordKey.
         * @member {Uint8Array} recordKey
         * @memberof Vault.RecordMetaData
         * @instance
         */
        RecordMetaData.prototype.recordKey = $util.newBuffer([]);

        /**
         * RecordMetaData recordKeyType.
         * @member {Records.RecordKeyType} recordKeyType
         * @memberof Vault.RecordMetaData
         * @instance
         */
        RecordMetaData.prototype.recordKeyType = 0;

        /**
         * RecordMetaData canShare.
         * @member {boolean} canShare
         * @memberof Vault.RecordMetaData
         * @instance
         */
        RecordMetaData.prototype.canShare = false;

        /**
         * RecordMetaData canEdit.
         * @member {boolean} canEdit
         * @memberof Vault.RecordMetaData
         * @instance
         */
        RecordMetaData.prototype.canEdit = false;

        /**
         * RecordMetaData ownerAccountUid.
         * @member {Uint8Array} ownerAccountUid
         * @memberof Vault.RecordMetaData
         * @instance
         */
        RecordMetaData.prototype.ownerAccountUid = $util.newBuffer([]);

        /**
         * RecordMetaData expiration.
         * @member {number} expiration
         * @memberof Vault.RecordMetaData
         * @instance
         */
        RecordMetaData.prototype.expiration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RecordMetaData expirationNotificationType.
         * @member {Records.TimerNotificationType} expirationNotificationType
         * @memberof Vault.RecordMetaData
         * @instance
         */
        RecordMetaData.prototype.expirationNotificationType = 0;

        /**
         * RecordMetaData ownerUsername.
         * @member {string} ownerUsername
         * @memberof Vault.RecordMetaData
         * @instance
         */
        RecordMetaData.prototype.ownerUsername = "";

        /**
         * Creates a new RecordMetaData instance using the specified properties.
         * @function create
         * @memberof Vault.RecordMetaData
         * @static
         * @param {Vault.IRecordMetaData=} [properties] Properties to set
         * @returns {Vault.RecordMetaData} RecordMetaData instance
         */
        RecordMetaData.create = function create(properties) {
            return new RecordMetaData(properties);
        };

        /**
         * Encodes the specified RecordMetaData message. Does not implicitly {@link Vault.RecordMetaData.verify|verify} messages.
         * @function encode
         * @memberof Vault.RecordMetaData
         * @static
         * @param {Vault.IRecordMetaData} message RecordMetaData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RecordMetaData.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.owner != null && Object.hasOwnProperty.call(message, "owner"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.owner);
            if (message.recordKey != null && Object.hasOwnProperty.call(message, "recordKey"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.recordKey);
            if (message.recordKeyType != null && Object.hasOwnProperty.call(message, "recordKeyType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.recordKeyType);
            if (message.canShare != null && Object.hasOwnProperty.call(message, "canShare"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.canShare);
            if (message.canEdit != null && Object.hasOwnProperty.call(message, "canEdit"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.canEdit);
            if (message.ownerAccountUid != null && Object.hasOwnProperty.call(message, "ownerAccountUid"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.ownerAccountUid);
            if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                writer.uint32(/* id 8, wireType 0 =*/64).int64(message.expiration);
            if (message.expirationNotificationType != null && Object.hasOwnProperty.call(message, "expirationNotificationType"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.expirationNotificationType);
            if (message.ownerUsername != null && Object.hasOwnProperty.call(message, "ownerUsername"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.ownerUsername);
            return writer;
        };

        /**
         * Decodes a RecordMetaData message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.RecordMetaData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.RecordMetaData} RecordMetaData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RecordMetaData.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.RecordMetaData();
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
                        message.owner = reader.bool();
                        break;
                    }
                case 3: {
                        message.recordKey = reader.bytes();
                        break;
                    }
                case 4: {
                        message.recordKeyType = reader.int32();
                        break;
                    }
                case 5: {
                        message.canShare = reader.bool();
                        break;
                    }
                case 6: {
                        message.canEdit = reader.bool();
                        break;
                    }
                case 7: {
                        message.ownerAccountUid = reader.bytes();
                        break;
                    }
                case 8: {
                        message.expiration = reader.int64();
                        break;
                    }
                case 9: {
                        message.expirationNotificationType = reader.int32();
                        break;
                    }
                case 10: {
                        message.ownerUsername = reader.string();
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
         * Creates a RecordMetaData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.RecordMetaData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.RecordMetaData} RecordMetaData
         */
        RecordMetaData.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.RecordMetaData)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.RecordMetaData: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.RecordMetaData();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.owner != null)
                message.owner = Boolean(object.owner);
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
            case "NO_KEY":
            case 0:
                message.recordKeyType = 0;
                break;
            case "ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.recordKeyType = 1;
                break;
            case "ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.recordKeyType = 2;
                break;
            case "ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.recordKeyType = 3;
                break;
            case "ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.recordKeyType = 4;
                break;
            case "ENCRYPTED_BY_ROOT_KEY_CBC":
            case 5:
                message.recordKeyType = 5;
                break;
            case "ENCRYPTED_BY_ROOT_KEY_GCM":
            case 6:
                message.recordKeyType = 6;
                break;
            }
            if (object.canShare != null)
                message.canShare = Boolean(object.canShare);
            if (object.canEdit != null)
                message.canEdit = Boolean(object.canEdit);
            if (object.ownerAccountUid != null)
                if (typeof object.ownerAccountUid === "string")
                    $util.base64.decode(object.ownerAccountUid, message.ownerAccountUid = $util.newBuffer($util.base64.length(object.ownerAccountUid)), 0);
                else if (object.ownerAccountUid.length >= 0)
                    message.ownerAccountUid = object.ownerAccountUid;
            if (object.expiration != null)
                if ($util.Long)
                    message.expiration = $util.Long.fromValue(object.expiration, false);
                else if (typeof object.expiration === "string")
                    message.expiration = parseInt(object.expiration, 10);
                else if (typeof object.expiration === "number")
                    message.expiration = object.expiration;
                else if (typeof object.expiration === "object")
                    message.expiration = new $util.LongBits(object.expiration.low >>> 0, object.expiration.high >>> 0).toNumber();
            switch (object.expirationNotificationType) {
            default:
                if (typeof object.expirationNotificationType === "number") {
                    message.expirationNotificationType = object.expirationNotificationType;
                    break;
                }
                break;
            case "NOTIFICATION_OFF":
            case 0:
                message.expirationNotificationType = 0;
                break;
            case "NOTIFY_OWNER":
            case 1:
                message.expirationNotificationType = 1;
                break;
            case "NOTIFY_PRIVILEGED_USERS":
            case 2:
                message.expirationNotificationType = 2;
                break;
            }
            if (object.ownerUsername != null)
                message.ownerUsername = String(object.ownerUsername);
            return message;
        };

        /**
         * Creates a plain object from a RecordMetaData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.RecordMetaData
         * @static
         * @param {Vault.RecordMetaData} message RecordMetaData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RecordMetaData.toObject = function toObject(message, options, q) {
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
                object.owner = false;
                if (options.bytes === String)
                    object.recordKey = "";
                else {
                    object.recordKey = [];
                    if (options.bytes !== Array)
                        object.recordKey = $util.newBuffer(object.recordKey);
                }
                object.recordKeyType = options.enums === String ? "NO_KEY" : 0;
                object.canShare = false;
                object.canEdit = false;
                if (options.bytes === String)
                    object.ownerAccountUid = "";
                else {
                    object.ownerAccountUid = [];
                    if (options.bytes !== Array)
                        object.ownerAccountUid = $util.newBuffer(object.ownerAccountUid);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.expiration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.expiration = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.expirationNotificationType = options.enums === String ? "NOTIFICATION_OFF" : 0;
                object.ownerUsername = "";
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.owner != null && Object.hasOwnProperty.call(message, "owner"))
                object.owner = message.owner;
            if (message.recordKey != null && Object.hasOwnProperty.call(message, "recordKey"))
                object.recordKey = options.bytes === String ? $util.base64.encode(message.recordKey, 0, message.recordKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordKey) : message.recordKey;
            if (message.recordKeyType != null && Object.hasOwnProperty.call(message, "recordKeyType"))
                object.recordKeyType = options.enums === String ? $root.Records.RecordKeyType[message.recordKeyType] === undefined ? message.recordKeyType : $root.Records.RecordKeyType[message.recordKeyType] : message.recordKeyType;
            if (message.canShare != null && Object.hasOwnProperty.call(message, "canShare"))
                object.canShare = message.canShare;
            if (message.canEdit != null && Object.hasOwnProperty.call(message, "canEdit"))
                object.canEdit = message.canEdit;
            if (message.ownerAccountUid != null && Object.hasOwnProperty.call(message, "ownerAccountUid"))
                object.ownerAccountUid = options.bytes === String ? $util.base64.encode(message.ownerAccountUid, 0, message.ownerAccountUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.ownerAccountUid) : message.ownerAccountUid;
            if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.expiration = typeof message.expiration === "number" ? BigInt(message.expiration) : $util.Long.fromBits(message.expiration.low >>> 0, message.expiration.high >>> 0, false).toBigInt();
                else if (typeof message.expiration === "number")
                    object.expiration = options.longs === String ? String(message.expiration) : message.expiration;
                else
                    object.expiration = options.longs === String ? $util.Long.prototype.toString.call(message.expiration) : options.longs === Number ? new $util.LongBits(message.expiration.low >>> 0, message.expiration.high >>> 0).toNumber() : message.expiration;
            if (message.expirationNotificationType != null && Object.hasOwnProperty.call(message, "expirationNotificationType"))
                object.expirationNotificationType = options.enums === String ? $root.Records.TimerNotificationType[message.expirationNotificationType] === undefined ? message.expirationNotificationType : $root.Records.TimerNotificationType[message.expirationNotificationType] : message.expirationNotificationType;
            if (message.ownerUsername != null && Object.hasOwnProperty.call(message, "ownerUsername"))
                object.ownerUsername = message.ownerUsername;
            return object;
        };

        /**
         * Converts this RecordMetaData to JSON.
         * @function toJSON
         * @memberof Vault.RecordMetaData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RecordMetaData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RecordMetaData
         * @function getTypeUrl
         * @memberof Vault.RecordMetaData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RecordMetaData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.RecordMetaData";
        };

        return RecordMetaData;
    })();

    Vault.SharingChange = (function() {

        /**
         * Properties of a SharingChange.
         * @memberof Vault
         * @interface ISharingChange
         * @property {Uint8Array|null} [recordUid] SharingChange recordUid
         * @property {boolean|null} [shared] SharingChange shared
         */

        /**
         * Constructs a new SharingChange.
         * @memberof Vault
         * @classdesc Represents a SharingChange.
         * @implements ISharingChange
         * @constructor
         * @param {Vault.ISharingChange=} [properties] Properties to set
         */
        function SharingChange(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SharingChange recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Vault.SharingChange
         * @instance
         */
        SharingChange.prototype.recordUid = $util.newBuffer([]);

        /**
         * SharingChange shared.
         * @member {boolean} shared
         * @memberof Vault.SharingChange
         * @instance
         */
        SharingChange.prototype.shared = false;

        /**
         * Creates a new SharingChange instance using the specified properties.
         * @function create
         * @memberof Vault.SharingChange
         * @static
         * @param {Vault.ISharingChange=} [properties] Properties to set
         * @returns {Vault.SharingChange} SharingChange instance
         */
        SharingChange.create = function create(properties) {
            return new SharingChange(properties);
        };

        /**
         * Encodes the specified SharingChange message. Does not implicitly {@link Vault.SharingChange.verify|verify} messages.
         * @function encode
         * @memberof Vault.SharingChange
         * @static
         * @param {Vault.ISharingChange} message SharingChange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharingChange.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.shared != null && Object.hasOwnProperty.call(message, "shared"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.shared);
            return writer;
        };

        /**
         * Decodes a SharingChange message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.SharingChange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.SharingChange} SharingChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharingChange.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.SharingChange();
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
                        message.shared = reader.bool();
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
         * Creates a SharingChange message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.SharingChange
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.SharingChange} SharingChange
         */
        SharingChange.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.SharingChange)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.SharingChange: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.SharingChange();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.shared != null)
                message.shared = Boolean(object.shared);
            return message;
        };

        /**
         * Creates a plain object from a SharingChange message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.SharingChange
         * @static
         * @param {Vault.SharingChange} message SharingChange
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SharingChange.toObject = function toObject(message, options, q) {
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
                object.shared = false;
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.shared != null && Object.hasOwnProperty.call(message, "shared"))
                object.shared = message.shared;
            return object;
        };

        /**
         * Converts this SharingChange to JSON.
         * @function toJSON
         * @memberof Vault.SharingChange
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SharingChange.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SharingChange
         * @function getTypeUrl
         * @memberof Vault.SharingChange
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SharingChange.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.SharingChange";
        };

        return SharingChange;
    })();

    Vault.Profile = (function() {

        /**
         * Properties of a Profile.
         * @memberof Vault
         * @interface IProfile
         * @property {Uint8Array|null} [data] Profile data
         * @property {string|null} [profileName] Profile profileName
         * @property {number|null} [revision] Profile revision
         */

        /**
         * Constructs a new Profile.
         * @memberof Vault
         * @classdesc Represents a Profile.
         * @implements IProfile
         * @constructor
         * @param {Vault.IProfile=} [properties] Properties to set
         */
        function Profile(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Profile data.
         * @member {Uint8Array} data
         * @memberof Vault.Profile
         * @instance
         */
        Profile.prototype.data = $util.newBuffer([]);

        /**
         * Profile profileName.
         * @member {string} profileName
         * @memberof Vault.Profile
         * @instance
         */
        Profile.prototype.profileName = "";

        /**
         * Profile revision.
         * @member {number} revision
         * @memberof Vault.Profile
         * @instance
         */
        Profile.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Profile instance using the specified properties.
         * @function create
         * @memberof Vault.Profile
         * @static
         * @param {Vault.IProfile=} [properties] Properties to set
         * @returns {Vault.Profile} Profile instance
         */
        Profile.create = function create(properties) {
            return new Profile(properties);
        };

        /**
         * Encodes the specified Profile message. Does not implicitly {@link Vault.Profile.verify|verify} messages.
         * @function encode
         * @memberof Vault.Profile
         * @static
         * @param {Vault.IProfile} message Profile message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Profile.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
            if (message.profileName != null && Object.hasOwnProperty.call(message, "profileName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.profileName);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.revision);
            return writer;
        };

        /**
         * Decodes a Profile message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.Profile
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.Profile} Profile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Profile.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.Profile();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.data = reader.bytes();
                        break;
                    }
                case 2: {
                        message.profileName = reader.string();
                        break;
                    }
                case 3: {
                        message.revision = reader.int64();
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
         * Creates a Profile message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.Profile
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.Profile} Profile
         */
        Profile.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.Profile)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.Profile: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.Profile();
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            if (object.profileName != null)
                message.profileName = String(object.profileName);
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a Profile message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.Profile
         * @static
         * @param {Vault.Profile} message Profile
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Profile.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
                object.profileName = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.profileName != null && Object.hasOwnProperty.call(message, "profileName"))
                object.profileName = message.profileName;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            return object;
        };

        /**
         * Converts this Profile to JSON.
         * @function toJSON
         * @memberof Vault.Profile
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Profile.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Profile
         * @function getTypeUrl
         * @memberof Vault.Profile
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Profile.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.Profile";
        };

        return Profile;
    })();

    Vault.ProfilePic = (function() {

        /**
         * Properties of a ProfilePic.
         * @memberof Vault
         * @interface IProfilePic
         * @property {string|null} [url] ProfilePic url
         * @property {number|null} [revision] ProfilePic revision
         */

        /**
         * Constructs a new ProfilePic.
         * @memberof Vault
         * @classdesc Represents a ProfilePic.
         * @implements IProfilePic
         * @constructor
         * @param {Vault.IProfilePic=} [properties] Properties to set
         */
        function ProfilePic(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ProfilePic url.
         * @member {string} url
         * @memberof Vault.ProfilePic
         * @instance
         */
        ProfilePic.prototype.url = "";

        /**
         * ProfilePic revision.
         * @member {number} revision
         * @memberof Vault.ProfilePic
         * @instance
         */
        ProfilePic.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new ProfilePic instance using the specified properties.
         * @function create
         * @memberof Vault.ProfilePic
         * @static
         * @param {Vault.IProfilePic=} [properties] Properties to set
         * @returns {Vault.ProfilePic} ProfilePic instance
         */
        ProfilePic.create = function create(properties) {
            return new ProfilePic(properties);
        };

        /**
         * Encodes the specified ProfilePic message. Does not implicitly {@link Vault.ProfilePic.verify|verify} messages.
         * @function encode
         * @memberof Vault.ProfilePic
         * @static
         * @param {Vault.IProfilePic} message ProfilePic message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ProfilePic.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.url);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.revision);
            return writer;
        };

        /**
         * Decodes a ProfilePic message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.ProfilePic
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.ProfilePic} ProfilePic
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ProfilePic.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.ProfilePic();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.url = reader.string();
                        break;
                    }
                case 2: {
                        message.revision = reader.int64();
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
         * Creates a ProfilePic message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.ProfilePic
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.ProfilePic} ProfilePic
         */
        ProfilePic.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.ProfilePic)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.ProfilePic: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.ProfilePic();
            if (object.url != null)
                message.url = String(object.url);
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a ProfilePic message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.ProfilePic
         * @static
         * @param {Vault.ProfilePic} message ProfilePic
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ProfilePic.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.url = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                object.url = message.url;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            return object;
        };

        /**
         * Converts this ProfilePic to JSON.
         * @function toJSON
         * @memberof Vault.ProfilePic
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ProfilePic.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ProfilePic
         * @function getTypeUrl
         * @memberof Vault.ProfilePic
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ProfilePic.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.ProfilePic";
        };

        return ProfilePic;
    })();

    Vault.PendingTeamMember = (function() {

        /**
         * Properties of a PendingTeamMember.
         * @memberof Vault
         * @interface IPendingTeamMember
         * @property {number|null} [enterpriseUserId] PendingTeamMember enterpriseUserId
         * @property {Uint8Array|null} [userPublicKey] PendingTeamMember userPublicKey
         * @property {Array.<Uint8Array>|null} [teamUids] PendingTeamMember teamUids
         * @property {Uint8Array|null} [userEccPublicKey] PendingTeamMember userEccPublicKey
         */

        /**
         * Constructs a new PendingTeamMember.
         * @memberof Vault
         * @classdesc Represents a PendingTeamMember.
         * @implements IPendingTeamMember
         * @constructor
         * @param {Vault.IPendingTeamMember=} [properties] Properties to set
         */
        function PendingTeamMember(properties) {
            this.teamUids = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PendingTeamMember enterpriseUserId.
         * @member {number} enterpriseUserId
         * @memberof Vault.PendingTeamMember
         * @instance
         */
        PendingTeamMember.prototype.enterpriseUserId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PendingTeamMember userPublicKey.
         * @member {Uint8Array} userPublicKey
         * @memberof Vault.PendingTeamMember
         * @instance
         */
        PendingTeamMember.prototype.userPublicKey = $util.newBuffer([]);

        /**
         * PendingTeamMember teamUids.
         * @member {Array.<Uint8Array>} teamUids
         * @memberof Vault.PendingTeamMember
         * @instance
         */
        PendingTeamMember.prototype.teamUids = $util.emptyArray;

        /**
         * PendingTeamMember userEccPublicKey.
         * @member {Uint8Array} userEccPublicKey
         * @memberof Vault.PendingTeamMember
         * @instance
         */
        PendingTeamMember.prototype.userEccPublicKey = $util.newBuffer([]);

        /**
         * Creates a new PendingTeamMember instance using the specified properties.
         * @function create
         * @memberof Vault.PendingTeamMember
         * @static
         * @param {Vault.IPendingTeamMember=} [properties] Properties to set
         * @returns {Vault.PendingTeamMember} PendingTeamMember instance
         */
        PendingTeamMember.create = function create(properties) {
            return new PendingTeamMember(properties);
        };

        /**
         * Encodes the specified PendingTeamMember message. Does not implicitly {@link Vault.PendingTeamMember.verify|verify} messages.
         * @function encode
         * @memberof Vault.PendingTeamMember
         * @static
         * @param {Vault.IPendingTeamMember} message PendingTeamMember message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PendingTeamMember.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.enterpriseUserId);
            if (message.userPublicKey != null && Object.hasOwnProperty.call(message, "userPublicKey"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.userPublicKey);
            if (message.teamUids != null && message.teamUids.length)
                for (let i = 0; i < message.teamUids.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.teamUids[i]);
            if (message.userEccPublicKey != null && Object.hasOwnProperty.call(message, "userEccPublicKey"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.userEccPublicKey);
            return writer;
        };

        /**
         * Decodes a PendingTeamMember message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.PendingTeamMember
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.PendingTeamMember} PendingTeamMember
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PendingTeamMember.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.PendingTeamMember();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.enterpriseUserId = reader.int64();
                        break;
                    }
                case 2: {
                        message.userPublicKey = reader.bytes();
                        break;
                    }
                case 3: {
                        if (!(message.teamUids && message.teamUids.length))
                            message.teamUids = [];
                        message.teamUids.push(reader.bytes());
                        break;
                    }
                case 4: {
                        message.userEccPublicKey = reader.bytes();
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
         * Creates a PendingTeamMember message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.PendingTeamMember
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.PendingTeamMember} PendingTeamMember
         */
        PendingTeamMember.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.PendingTeamMember)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.PendingTeamMember: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.PendingTeamMember();
            if (object.enterpriseUserId != null)
                if ($util.Long)
                    message.enterpriseUserId = $util.Long.fromValue(object.enterpriseUserId, false);
                else if (typeof object.enterpriseUserId === "string")
                    message.enterpriseUserId = parseInt(object.enterpriseUserId, 10);
                else if (typeof object.enterpriseUserId === "number")
                    message.enterpriseUserId = object.enterpriseUserId;
                else if (typeof object.enterpriseUserId === "object")
                    message.enterpriseUserId = new $util.LongBits(object.enterpriseUserId.low >>> 0, object.enterpriseUserId.high >>> 0).toNumber();
            if (object.userPublicKey != null)
                if (typeof object.userPublicKey === "string")
                    $util.base64.decode(object.userPublicKey, message.userPublicKey = $util.newBuffer($util.base64.length(object.userPublicKey)), 0);
                else if (object.userPublicKey.length >= 0)
                    message.userPublicKey = object.userPublicKey;
            if (object.teamUids) {
                if (!Array.isArray(object.teamUids))
                    throw TypeError(".Vault.PendingTeamMember.teamUids: array expected");
                message.teamUids = [];
                for (let i = 0; i < object.teamUids.length; ++i)
                    if (typeof object.teamUids[i] === "string")
                        $util.base64.decode(object.teamUids[i], message.teamUids[i] = $util.newBuffer($util.base64.length(object.teamUids[i])), 0);
                    else if (object.teamUids[i].length >= 0)
                        message.teamUids[i] = object.teamUids[i];
            }
            if (object.userEccPublicKey != null)
                if (typeof object.userEccPublicKey === "string")
                    $util.base64.decode(object.userEccPublicKey, message.userEccPublicKey = $util.newBuffer($util.base64.length(object.userEccPublicKey)), 0);
                else if (object.userEccPublicKey.length >= 0)
                    message.userEccPublicKey = object.userEccPublicKey;
            return message;
        };

        /**
         * Creates a plain object from a PendingTeamMember message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.PendingTeamMember
         * @static
         * @param {Vault.PendingTeamMember} message PendingTeamMember
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PendingTeamMember.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.teamUids = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.enterpriseUserId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.enterpriseUserId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.userPublicKey = "";
                else {
                    object.userPublicKey = [];
                    if (options.bytes !== Array)
                        object.userPublicKey = $util.newBuffer(object.userPublicKey);
                }
                if (options.bytes === String)
                    object.userEccPublicKey = "";
                else {
                    object.userEccPublicKey = [];
                    if (options.bytes !== Array)
                        object.userEccPublicKey = $util.newBuffer(object.userEccPublicKey);
                }
            }
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.enterpriseUserId = typeof message.enterpriseUserId === "number" ? BigInt(message.enterpriseUserId) : $util.Long.fromBits(message.enterpriseUserId.low >>> 0, message.enterpriseUserId.high >>> 0, false).toBigInt();
                else if (typeof message.enterpriseUserId === "number")
                    object.enterpriseUserId = options.longs === String ? String(message.enterpriseUserId) : message.enterpriseUserId;
                else
                    object.enterpriseUserId = options.longs === String ? $util.Long.prototype.toString.call(message.enterpriseUserId) : options.longs === Number ? new $util.LongBits(message.enterpriseUserId.low >>> 0, message.enterpriseUserId.high >>> 0).toNumber() : message.enterpriseUserId;
            if (message.userPublicKey != null && Object.hasOwnProperty.call(message, "userPublicKey"))
                object.userPublicKey = options.bytes === String ? $util.base64.encode(message.userPublicKey, 0, message.userPublicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.userPublicKey) : message.userPublicKey;
            if (message.teamUids && message.teamUids.length) {
                object.teamUids = [];
                for (let j = 0; j < message.teamUids.length; ++j)
                    object.teamUids[j] = options.bytes === String ? $util.base64.encode(message.teamUids[j], 0, message.teamUids[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.teamUids[j]) : message.teamUids[j];
            }
            if (message.userEccPublicKey != null && Object.hasOwnProperty.call(message, "userEccPublicKey"))
                object.userEccPublicKey = options.bytes === String ? $util.base64.encode(message.userEccPublicKey, 0, message.userEccPublicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.userEccPublicKey) : message.userEccPublicKey;
            return object;
        };

        /**
         * Converts this PendingTeamMember to JSON.
         * @function toJSON
         * @memberof Vault.PendingTeamMember
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PendingTeamMember.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PendingTeamMember
         * @function getTypeUrl
         * @memberof Vault.PendingTeamMember
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PendingTeamMember.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.PendingTeamMember";
        };

        return PendingTeamMember;
    })();

    Vault.BreachWatchRecord = (function() {

        /**
         * Properties of a BreachWatchRecord.
         * @memberof Vault
         * @interface IBreachWatchRecord
         * @property {Uint8Array|null} [recordUid] BreachWatchRecord recordUid
         * @property {Uint8Array|null} [data] BreachWatchRecord data
         * @property {BreachWatch.BreachWatchInfoType|null} [type] BreachWatchRecord type
         * @property {string|null} [scannedBy] BreachWatchRecord scannedBy
         * @property {number|null} [revision] BreachWatchRecord revision
         * @property {Uint8Array|null} [scannedByAccountUid] BreachWatchRecord scannedByAccountUid
         */

        /**
         * Constructs a new BreachWatchRecord.
         * @memberof Vault
         * @classdesc Represents a BreachWatchRecord.
         * @implements IBreachWatchRecord
         * @constructor
         * @param {Vault.IBreachWatchRecord=} [properties] Properties to set
         */
        function BreachWatchRecord(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BreachWatchRecord recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Vault.BreachWatchRecord
         * @instance
         */
        BreachWatchRecord.prototype.recordUid = $util.newBuffer([]);

        /**
         * BreachWatchRecord data.
         * @member {Uint8Array} data
         * @memberof Vault.BreachWatchRecord
         * @instance
         */
        BreachWatchRecord.prototype.data = $util.newBuffer([]);

        /**
         * BreachWatchRecord type.
         * @member {BreachWatch.BreachWatchInfoType} type
         * @memberof Vault.BreachWatchRecord
         * @instance
         */
        BreachWatchRecord.prototype.type = 0;

        /**
         * BreachWatchRecord scannedBy.
         * @member {string} scannedBy
         * @memberof Vault.BreachWatchRecord
         * @instance
         */
        BreachWatchRecord.prototype.scannedBy = "";

        /**
         * BreachWatchRecord revision.
         * @member {number} revision
         * @memberof Vault.BreachWatchRecord
         * @instance
         */
        BreachWatchRecord.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * BreachWatchRecord scannedByAccountUid.
         * @member {Uint8Array} scannedByAccountUid
         * @memberof Vault.BreachWatchRecord
         * @instance
         */
        BreachWatchRecord.prototype.scannedByAccountUid = $util.newBuffer([]);

        /**
         * Creates a new BreachWatchRecord instance using the specified properties.
         * @function create
         * @memberof Vault.BreachWatchRecord
         * @static
         * @param {Vault.IBreachWatchRecord=} [properties] Properties to set
         * @returns {Vault.BreachWatchRecord} BreachWatchRecord instance
         */
        BreachWatchRecord.create = function create(properties) {
            return new BreachWatchRecord(properties);
        };

        /**
         * Encodes the specified BreachWatchRecord message. Does not implicitly {@link Vault.BreachWatchRecord.verify|verify} messages.
         * @function encode
         * @memberof Vault.BreachWatchRecord
         * @static
         * @param {Vault.IBreachWatchRecord} message BreachWatchRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BreachWatchRecord.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.type);
            if (message.scannedBy != null && Object.hasOwnProperty.call(message, "scannedBy"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.scannedBy);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.revision);
            if (message.scannedByAccountUid != null && Object.hasOwnProperty.call(message, "scannedByAccountUid"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.scannedByAccountUid);
            return writer;
        };

        /**
         * Decodes a BreachWatchRecord message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.BreachWatchRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.BreachWatchRecord} BreachWatchRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BreachWatchRecord.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.BreachWatchRecord();
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
                        message.data = reader.bytes();
                        break;
                    }
                case 3: {
                        message.type = reader.int32();
                        break;
                    }
                case 4: {
                        message.scannedBy = reader.string();
                        break;
                    }
                case 5: {
                        message.revision = reader.int64();
                        break;
                    }
                case 6: {
                        message.scannedByAccountUid = reader.bytes();
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
         * Creates a BreachWatchRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.BreachWatchRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.BreachWatchRecord} BreachWatchRecord
         */
        BreachWatchRecord.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.BreachWatchRecord)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.BreachWatchRecord: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.BreachWatchRecord();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "RECORD":
            case 0:
                message.type = 0;
                break;
            case "ALTERNATE_PASSWORD":
            case 1:
                message.type = 1;
                break;
            }
            if (object.scannedBy != null)
                message.scannedBy = String(object.scannedBy);
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            if (object.scannedByAccountUid != null)
                if (typeof object.scannedByAccountUid === "string")
                    $util.base64.decode(object.scannedByAccountUid, message.scannedByAccountUid = $util.newBuffer($util.base64.length(object.scannedByAccountUid)), 0);
                else if (object.scannedByAccountUid.length >= 0)
                    message.scannedByAccountUid = object.scannedByAccountUid;
            return message;
        };

        /**
         * Creates a plain object from a BreachWatchRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.BreachWatchRecord
         * @static
         * @param {Vault.BreachWatchRecord} message BreachWatchRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BreachWatchRecord.toObject = function toObject(message, options, q) {
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
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
                object.type = options.enums === String ? "RECORD" : 0;
                object.scannedBy = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.scannedByAccountUid = "";
                else {
                    object.scannedByAccountUid = [];
                    if (options.bytes !== Array)
                        object.scannedByAccountUid = $util.newBuffer(object.scannedByAccountUid);
                }
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                object.type = options.enums === String ? $root.BreachWatch.BreachWatchInfoType[message.type] === undefined ? message.type : $root.BreachWatch.BreachWatchInfoType[message.type] : message.type;
            if (message.scannedBy != null && Object.hasOwnProperty.call(message, "scannedBy"))
                object.scannedBy = message.scannedBy;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            if (message.scannedByAccountUid != null && Object.hasOwnProperty.call(message, "scannedByAccountUid"))
                object.scannedByAccountUid = options.bytes === String ? $util.base64.encode(message.scannedByAccountUid, 0, message.scannedByAccountUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.scannedByAccountUid) : message.scannedByAccountUid;
            return object;
        };

        /**
         * Converts this BreachWatchRecord to JSON.
         * @function toJSON
         * @memberof Vault.BreachWatchRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BreachWatchRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BreachWatchRecord
         * @function getTypeUrl
         * @memberof Vault.BreachWatchRecord
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BreachWatchRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.BreachWatchRecord";
        };

        return BreachWatchRecord;
    })();

    Vault.UserAuth = (function() {

        /**
         * Properties of a UserAuth.
         * @memberof Vault
         * @interface IUserAuth
         * @property {Uint8Array|null} [uid] UserAuth uid
         * @property {Authentication.LoginType|null} [loginType] UserAuth loginType
         * @property {boolean|null} [deleted] UserAuth deleted
         * @property {number|null} [iterations] UserAuth iterations
         * @property {Uint8Array|null} [salt] UserAuth salt
         * @property {Uint8Array|null} [encryptedClientKey] UserAuth encryptedClientKey
         * @property {number|null} [revision] UserAuth revision
         * @property {string|null} [name] UserAuth name
         */

        /**
         * Constructs a new UserAuth.
         * @memberof Vault
         * @classdesc Represents a UserAuth.
         * @implements IUserAuth
         * @constructor
         * @param {Vault.IUserAuth=} [properties] Properties to set
         */
        function UserAuth(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserAuth uid.
         * @member {Uint8Array} uid
         * @memberof Vault.UserAuth
         * @instance
         */
        UserAuth.prototype.uid = $util.newBuffer([]);

        /**
         * UserAuth loginType.
         * @member {Authentication.LoginType} loginType
         * @memberof Vault.UserAuth
         * @instance
         */
        UserAuth.prototype.loginType = 0;

        /**
         * UserAuth deleted.
         * @member {boolean} deleted
         * @memberof Vault.UserAuth
         * @instance
         */
        UserAuth.prototype.deleted = false;

        /**
         * UserAuth iterations.
         * @member {number} iterations
         * @memberof Vault.UserAuth
         * @instance
         */
        UserAuth.prototype.iterations = 0;

        /**
         * UserAuth salt.
         * @member {Uint8Array} salt
         * @memberof Vault.UserAuth
         * @instance
         */
        UserAuth.prototype.salt = $util.newBuffer([]);

        /**
         * UserAuth encryptedClientKey.
         * @member {Uint8Array} encryptedClientKey
         * @memberof Vault.UserAuth
         * @instance
         */
        UserAuth.prototype.encryptedClientKey = $util.newBuffer([]);

        /**
         * UserAuth revision.
         * @member {number} revision
         * @memberof Vault.UserAuth
         * @instance
         */
        UserAuth.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserAuth name.
         * @member {string} name
         * @memberof Vault.UserAuth
         * @instance
         */
        UserAuth.prototype.name = "";

        /**
         * Creates a new UserAuth instance using the specified properties.
         * @function create
         * @memberof Vault.UserAuth
         * @static
         * @param {Vault.IUserAuth=} [properties] Properties to set
         * @returns {Vault.UserAuth} UserAuth instance
         */
        UserAuth.create = function create(properties) {
            return new UserAuth(properties);
        };

        /**
         * Encodes the specified UserAuth message. Does not implicitly {@link Vault.UserAuth.verify|verify} messages.
         * @function encode
         * @memberof Vault.UserAuth
         * @static
         * @param {Vault.IUserAuth} message UserAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserAuth.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.uid);
            if (message.loginType != null && Object.hasOwnProperty.call(message, "loginType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.loginType);
            if (message.deleted != null && Object.hasOwnProperty.call(message, "deleted"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.deleted);
            if (message.iterations != null && Object.hasOwnProperty.call(message, "iterations"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.iterations);
            if (message.salt != null && Object.hasOwnProperty.call(message, "salt"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.salt);
            if (message.encryptedClientKey != null && Object.hasOwnProperty.call(message, "encryptedClientKey"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.encryptedClientKey);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.revision);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.name);
            return writer;
        };

        /**
         * Decodes a UserAuth message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.UserAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.UserAuth} UserAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserAuth.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.UserAuth();
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
                        message.loginType = reader.int32();
                        break;
                    }
                case 3: {
                        message.deleted = reader.bool();
                        break;
                    }
                case 4: {
                        message.iterations = reader.int32();
                        break;
                    }
                case 5: {
                        message.salt = reader.bytes();
                        break;
                    }
                case 6: {
                        message.encryptedClientKey = reader.bytes();
                        break;
                    }
                case 7: {
                        message.revision = reader.int64();
                        break;
                    }
                case 8: {
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
         * Creates a UserAuth message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.UserAuth
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.UserAuth} UserAuth
         */
        UserAuth.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.UserAuth)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.UserAuth: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.UserAuth();
            if (object.uid != null)
                if (typeof object.uid === "string")
                    $util.base64.decode(object.uid, message.uid = $util.newBuffer($util.base64.length(object.uid)), 0);
                else if (object.uid.length >= 0)
                    message.uid = object.uid;
            switch (object.loginType) {
            default:
                if (typeof object.loginType === "number") {
                    message.loginType = object.loginType;
                    break;
                }
                break;
            case "NORMAL":
            case 0:
                message.loginType = 0;
                break;
            case "SSO":
            case 1:
                message.loginType = 1;
                break;
            case "BIO":
            case 2:
                message.loginType = 2;
                break;
            case "ALTERNATE":
            case 3:
                message.loginType = 3;
                break;
            case "OFFLINE":
            case 4:
                message.loginType = 4;
                break;
            case "FORGOT_PASSWORD":
            case 5:
                message.loginType = 5;
                break;
            case "PASSKEY_BIO":
            case 6:
                message.loginType = 6;
                break;
            }
            if (object.deleted != null)
                message.deleted = Boolean(object.deleted);
            if (object.iterations != null)
                message.iterations = object.iterations | 0;
            if (object.salt != null)
                if (typeof object.salt === "string")
                    $util.base64.decode(object.salt, message.salt = $util.newBuffer($util.base64.length(object.salt)), 0);
                else if (object.salt.length >= 0)
                    message.salt = object.salt;
            if (object.encryptedClientKey != null)
                if (typeof object.encryptedClientKey === "string")
                    $util.base64.decode(object.encryptedClientKey, message.encryptedClientKey = $util.newBuffer($util.base64.length(object.encryptedClientKey)), 0);
                else if (object.encryptedClientKey.length >= 0)
                    message.encryptedClientKey = object.encryptedClientKey;
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a UserAuth message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.UserAuth
         * @static
         * @param {Vault.UserAuth} message UserAuth
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserAuth.toObject = function toObject(message, options, q) {
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
                object.loginType = options.enums === String ? "NORMAL" : 0;
                object.deleted = false;
                object.iterations = 0;
                if (options.bytes === String)
                    object.salt = "";
                else {
                    object.salt = [];
                    if (options.bytes !== Array)
                        object.salt = $util.newBuffer(object.salt);
                }
                if (options.bytes === String)
                    object.encryptedClientKey = "";
                else {
                    object.encryptedClientKey = [];
                    if (options.bytes !== Array)
                        object.encryptedClientKey = $util.newBuffer(object.encryptedClientKey);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.name = "";
            }
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                object.uid = options.bytes === String ? $util.base64.encode(message.uid, 0, message.uid.length) : options.bytes === Array ? Array.prototype.slice.call(message.uid) : message.uid;
            if (message.loginType != null && Object.hasOwnProperty.call(message, "loginType"))
                object.loginType = options.enums === String ? $root.Authentication.LoginType[message.loginType] === undefined ? message.loginType : $root.Authentication.LoginType[message.loginType] : message.loginType;
            if (message.deleted != null && Object.hasOwnProperty.call(message, "deleted"))
                object.deleted = message.deleted;
            if (message.iterations != null && Object.hasOwnProperty.call(message, "iterations"))
                object.iterations = message.iterations;
            if (message.salt != null && Object.hasOwnProperty.call(message, "salt"))
                object.salt = options.bytes === String ? $util.base64.encode(message.salt, 0, message.salt.length) : options.bytes === Array ? Array.prototype.slice.call(message.salt) : message.salt;
            if (message.encryptedClientKey != null && Object.hasOwnProperty.call(message, "encryptedClientKey"))
                object.encryptedClientKey = options.bytes === String ? $util.base64.encode(message.encryptedClientKey, 0, message.encryptedClientKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedClientKey) : message.encryptedClientKey;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this UserAuth to JSON.
         * @function toJSON
         * @memberof Vault.UserAuth
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserAuth.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserAuth
         * @function getTypeUrl
         * @memberof Vault.UserAuth
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserAuth.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.UserAuth";
        };

        return UserAuth;
    })();

    Vault.BreachWatchSecurityData = (function() {

        /**
         * Properties of a BreachWatchSecurityData.
         * @memberof Vault
         * @interface IBreachWatchSecurityData
         * @property {Uint8Array|null} [recordUid] BreachWatchSecurityData recordUid
         * @property {number|null} [revision] BreachWatchSecurityData revision
         * @property {boolean|null} [removed] BreachWatchSecurityData removed
         */

        /**
         * Constructs a new BreachWatchSecurityData.
         * @memberof Vault
         * @classdesc Represents a BreachWatchSecurityData.
         * @implements IBreachWatchSecurityData
         * @constructor
         * @param {Vault.IBreachWatchSecurityData=} [properties] Properties to set
         */
        function BreachWatchSecurityData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BreachWatchSecurityData recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Vault.BreachWatchSecurityData
         * @instance
         */
        BreachWatchSecurityData.prototype.recordUid = $util.newBuffer([]);

        /**
         * BreachWatchSecurityData revision.
         * @member {number} revision
         * @memberof Vault.BreachWatchSecurityData
         * @instance
         */
        BreachWatchSecurityData.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * BreachWatchSecurityData removed.
         * @member {boolean} removed
         * @memberof Vault.BreachWatchSecurityData
         * @instance
         */
        BreachWatchSecurityData.prototype.removed = false;

        /**
         * Creates a new BreachWatchSecurityData instance using the specified properties.
         * @function create
         * @memberof Vault.BreachWatchSecurityData
         * @static
         * @param {Vault.IBreachWatchSecurityData=} [properties] Properties to set
         * @returns {Vault.BreachWatchSecurityData} BreachWatchSecurityData instance
         */
        BreachWatchSecurityData.create = function create(properties) {
            return new BreachWatchSecurityData(properties);
        };

        /**
         * Encodes the specified BreachWatchSecurityData message. Does not implicitly {@link Vault.BreachWatchSecurityData.verify|verify} messages.
         * @function encode
         * @memberof Vault.BreachWatchSecurityData
         * @static
         * @param {Vault.IBreachWatchSecurityData} message BreachWatchSecurityData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BreachWatchSecurityData.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.revision);
            if (message.removed != null && Object.hasOwnProperty.call(message, "removed"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.removed);
            return writer;
        };

        /**
         * Decodes a BreachWatchSecurityData message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.BreachWatchSecurityData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.BreachWatchSecurityData} BreachWatchSecurityData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BreachWatchSecurityData.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.BreachWatchSecurityData();
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
                        message.revision = reader.int64();
                        break;
                    }
                case 3: {
                        message.removed = reader.bool();
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
         * Creates a BreachWatchSecurityData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.BreachWatchSecurityData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.BreachWatchSecurityData} BreachWatchSecurityData
         */
        BreachWatchSecurityData.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.BreachWatchSecurityData)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.BreachWatchSecurityData: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.BreachWatchSecurityData();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            if (object.removed != null)
                message.removed = Boolean(object.removed);
            return message;
        };

        /**
         * Creates a plain object from a BreachWatchSecurityData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.BreachWatchSecurityData
         * @static
         * @param {Vault.BreachWatchSecurityData} message BreachWatchSecurityData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BreachWatchSecurityData.toObject = function toObject(message, options, q) {
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
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.removed = false;
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            if (message.removed != null && Object.hasOwnProperty.call(message, "removed"))
                object.removed = message.removed;
            return object;
        };

        /**
         * Converts this BreachWatchSecurityData to JSON.
         * @function toJSON
         * @memberof Vault.BreachWatchSecurityData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BreachWatchSecurityData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BreachWatchSecurityData
         * @function getTypeUrl
         * @memberof Vault.BreachWatchSecurityData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BreachWatchSecurityData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.BreachWatchSecurityData";
        };

        return BreachWatchSecurityData;
    })();

    Vault.ReusedPasswords = (function() {

        /**
         * Properties of a ReusedPasswords.
         * @memberof Vault
         * @interface IReusedPasswords
         * @property {number|null} [count] ReusedPasswords count
         * @property {number|null} [revision] ReusedPasswords revision
         */

        /**
         * Constructs a new ReusedPasswords.
         * @memberof Vault
         * @classdesc Represents a ReusedPasswords.
         * @implements IReusedPasswords
         * @constructor
         * @param {Vault.IReusedPasswords=} [properties] Properties to set
         */
        function ReusedPasswords(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReusedPasswords count.
         * @member {number} count
         * @memberof Vault.ReusedPasswords
         * @instance
         */
        ReusedPasswords.prototype.count = 0;

        /**
         * ReusedPasswords revision.
         * @member {number} revision
         * @memberof Vault.ReusedPasswords
         * @instance
         */
        ReusedPasswords.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new ReusedPasswords instance using the specified properties.
         * @function create
         * @memberof Vault.ReusedPasswords
         * @static
         * @param {Vault.IReusedPasswords=} [properties] Properties to set
         * @returns {Vault.ReusedPasswords} ReusedPasswords instance
         */
        ReusedPasswords.create = function create(properties) {
            return new ReusedPasswords(properties);
        };

        /**
         * Encodes the specified ReusedPasswords message. Does not implicitly {@link Vault.ReusedPasswords.verify|verify} messages.
         * @function encode
         * @memberof Vault.ReusedPasswords
         * @static
         * @param {Vault.IReusedPasswords} message ReusedPasswords message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReusedPasswords.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.count);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.revision);
            return writer;
        };

        /**
         * Decodes a ReusedPasswords message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.ReusedPasswords
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.ReusedPasswords} ReusedPasswords
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReusedPasswords.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.ReusedPasswords();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.count = reader.int32();
                        break;
                    }
                case 2: {
                        message.revision = reader.int64();
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
         * Creates a ReusedPasswords message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.ReusedPasswords
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.ReusedPasswords} ReusedPasswords
         */
        ReusedPasswords.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.ReusedPasswords)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.ReusedPasswords: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.ReusedPasswords();
            if (object.count != null)
                message.count = object.count | 0;
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a ReusedPasswords message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.ReusedPasswords
         * @static
         * @param {Vault.ReusedPasswords} message ReusedPasswords
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReusedPasswords.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.count = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                object.count = message.count;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            return object;
        };

        /**
         * Converts this ReusedPasswords to JSON.
         * @function toJSON
         * @memberof Vault.ReusedPasswords
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReusedPasswords.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ReusedPasswords
         * @function getTypeUrl
         * @memberof Vault.ReusedPasswords
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ReusedPasswords.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.ReusedPasswords";
        };

        return ReusedPasswords;
    })();

    Vault.SharedFolderRecord = (function() {

        /**
         * Properties of a SharedFolderRecord.
         * @memberof Vault
         * @interface ISharedFolderRecord
         * @property {Uint8Array|null} [sharedFolderUid] SharedFolderRecord sharedFolderUid
         * @property {Uint8Array|null} [recordUid] SharedFolderRecord recordUid
         * @property {Uint8Array|null} [recordKey] SharedFolderRecord recordKey
         * @property {boolean|null} [canShare] SharedFolderRecord canShare
         * @property {boolean|null} [canEdit] SharedFolderRecord canEdit
         * @property {Uint8Array|null} [ownerAccountUid] SharedFolderRecord ownerAccountUid
         * @property {number|null} [expiration] SharedFolderRecord expiration
         * @property {boolean|null} [owner] SharedFolderRecord owner
         * @property {Records.TimerNotificationType|null} [expirationNotificationType] SharedFolderRecord expirationNotificationType
         * @property {string|null} [ownerUsername] SharedFolderRecord ownerUsername
         * @property {boolean|null} [rotateOnExpiration] SharedFolderRecord rotateOnExpiration
         */

        /**
         * Constructs a new SharedFolderRecord.
         * @memberof Vault
         * @classdesc Represents a SharedFolderRecord.
         * @implements ISharedFolderRecord
         * @constructor
         * @param {Vault.ISharedFolderRecord=} [properties] Properties to set
         */
        function SharedFolderRecord(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SharedFolderRecord sharedFolderUid.
         * @member {Uint8Array} sharedFolderUid
         * @memberof Vault.SharedFolderRecord
         * @instance
         */
        SharedFolderRecord.prototype.sharedFolderUid = $util.newBuffer([]);

        /**
         * SharedFolderRecord recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Vault.SharedFolderRecord
         * @instance
         */
        SharedFolderRecord.prototype.recordUid = $util.newBuffer([]);

        /**
         * SharedFolderRecord recordKey.
         * @member {Uint8Array} recordKey
         * @memberof Vault.SharedFolderRecord
         * @instance
         */
        SharedFolderRecord.prototype.recordKey = $util.newBuffer([]);

        /**
         * SharedFolderRecord canShare.
         * @member {boolean} canShare
         * @memberof Vault.SharedFolderRecord
         * @instance
         */
        SharedFolderRecord.prototype.canShare = false;

        /**
         * SharedFolderRecord canEdit.
         * @member {boolean} canEdit
         * @memberof Vault.SharedFolderRecord
         * @instance
         */
        SharedFolderRecord.prototype.canEdit = false;

        /**
         * SharedFolderRecord ownerAccountUid.
         * @member {Uint8Array} ownerAccountUid
         * @memberof Vault.SharedFolderRecord
         * @instance
         */
        SharedFolderRecord.prototype.ownerAccountUid = $util.newBuffer([]);

        /**
         * SharedFolderRecord expiration.
         * @member {number} expiration
         * @memberof Vault.SharedFolderRecord
         * @instance
         */
        SharedFolderRecord.prototype.expiration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SharedFolderRecord owner.
         * @member {boolean} owner
         * @memberof Vault.SharedFolderRecord
         * @instance
         */
        SharedFolderRecord.prototype.owner = false;

        /**
         * SharedFolderRecord expirationNotificationType.
         * @member {Records.TimerNotificationType} expirationNotificationType
         * @memberof Vault.SharedFolderRecord
         * @instance
         */
        SharedFolderRecord.prototype.expirationNotificationType = 0;

        /**
         * SharedFolderRecord ownerUsername.
         * @member {string} ownerUsername
         * @memberof Vault.SharedFolderRecord
         * @instance
         */
        SharedFolderRecord.prototype.ownerUsername = "";

        /**
         * SharedFolderRecord rotateOnExpiration.
         * @member {boolean} rotateOnExpiration
         * @memberof Vault.SharedFolderRecord
         * @instance
         */
        SharedFolderRecord.prototype.rotateOnExpiration = false;

        /**
         * Creates a new SharedFolderRecord instance using the specified properties.
         * @function create
         * @memberof Vault.SharedFolderRecord
         * @static
         * @param {Vault.ISharedFolderRecord=} [properties] Properties to set
         * @returns {Vault.SharedFolderRecord} SharedFolderRecord instance
         */
        SharedFolderRecord.create = function create(properties) {
            return new SharedFolderRecord(properties);
        };

        /**
         * Encodes the specified SharedFolderRecord message. Does not implicitly {@link Vault.SharedFolderRecord.verify|verify} messages.
         * @function encode
         * @memberof Vault.SharedFolderRecord
         * @static
         * @param {Vault.ISharedFolderRecord} message SharedFolderRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedFolderRecord.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.sharedFolderUid);
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.recordUid);
            if (message.recordKey != null && Object.hasOwnProperty.call(message, "recordKey"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.recordKey);
            if (message.canShare != null && Object.hasOwnProperty.call(message, "canShare"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.canShare);
            if (message.canEdit != null && Object.hasOwnProperty.call(message, "canEdit"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.canEdit);
            if (message.ownerAccountUid != null && Object.hasOwnProperty.call(message, "ownerAccountUid"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.ownerAccountUid);
            if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.expiration);
            if (message.owner != null && Object.hasOwnProperty.call(message, "owner"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.owner);
            if (message.expirationNotificationType != null && Object.hasOwnProperty.call(message, "expirationNotificationType"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.expirationNotificationType);
            if (message.ownerUsername != null && Object.hasOwnProperty.call(message, "ownerUsername"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.ownerUsername);
            if (message.rotateOnExpiration != null && Object.hasOwnProperty.call(message, "rotateOnExpiration"))
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.rotateOnExpiration);
            return writer;
        };

        /**
         * Decodes a SharedFolderRecord message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.SharedFolderRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.SharedFolderRecord} SharedFolderRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedFolderRecord.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.SharedFolderRecord();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sharedFolderUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.recordUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.recordKey = reader.bytes();
                        break;
                    }
                case 4: {
                        message.canShare = reader.bool();
                        break;
                    }
                case 5: {
                        message.canEdit = reader.bool();
                        break;
                    }
                case 6: {
                        message.ownerAccountUid = reader.bytes();
                        break;
                    }
                case 7: {
                        message.expiration = reader.int64();
                        break;
                    }
                case 8: {
                        message.owner = reader.bool();
                        break;
                    }
                case 9: {
                        message.expirationNotificationType = reader.int32();
                        break;
                    }
                case 10: {
                        message.ownerUsername = reader.string();
                        break;
                    }
                case 11: {
                        message.rotateOnExpiration = reader.bool();
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
         * Creates a SharedFolderRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.SharedFolderRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.SharedFolderRecord} SharedFolderRecord
         */
        SharedFolderRecord.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.SharedFolderRecord)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.SharedFolderRecord: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.SharedFolderRecord();
            if (object.sharedFolderUid != null)
                if (typeof object.sharedFolderUid === "string")
                    $util.base64.decode(object.sharedFolderUid, message.sharedFolderUid = $util.newBuffer($util.base64.length(object.sharedFolderUid)), 0);
                else if (object.sharedFolderUid.length >= 0)
                    message.sharedFolderUid = object.sharedFolderUid;
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
            if (object.canShare != null)
                message.canShare = Boolean(object.canShare);
            if (object.canEdit != null)
                message.canEdit = Boolean(object.canEdit);
            if (object.ownerAccountUid != null)
                if (typeof object.ownerAccountUid === "string")
                    $util.base64.decode(object.ownerAccountUid, message.ownerAccountUid = $util.newBuffer($util.base64.length(object.ownerAccountUid)), 0);
                else if (object.ownerAccountUid.length >= 0)
                    message.ownerAccountUid = object.ownerAccountUid;
            if (object.expiration != null)
                if ($util.Long)
                    message.expiration = $util.Long.fromValue(object.expiration, false);
                else if (typeof object.expiration === "string")
                    message.expiration = parseInt(object.expiration, 10);
                else if (typeof object.expiration === "number")
                    message.expiration = object.expiration;
                else if (typeof object.expiration === "object")
                    message.expiration = new $util.LongBits(object.expiration.low >>> 0, object.expiration.high >>> 0).toNumber();
            if (object.owner != null)
                message.owner = Boolean(object.owner);
            switch (object.expirationNotificationType) {
            default:
                if (typeof object.expirationNotificationType === "number") {
                    message.expirationNotificationType = object.expirationNotificationType;
                    break;
                }
                break;
            case "NOTIFICATION_OFF":
            case 0:
                message.expirationNotificationType = 0;
                break;
            case "NOTIFY_OWNER":
            case 1:
                message.expirationNotificationType = 1;
                break;
            case "NOTIFY_PRIVILEGED_USERS":
            case 2:
                message.expirationNotificationType = 2;
                break;
            }
            if (object.ownerUsername != null)
                message.ownerUsername = String(object.ownerUsername);
            if (object.rotateOnExpiration != null)
                message.rotateOnExpiration = Boolean(object.rotateOnExpiration);
            return message;
        };

        /**
         * Creates a plain object from a SharedFolderRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.SharedFolderRecord
         * @static
         * @param {Vault.SharedFolderRecord} message SharedFolderRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SharedFolderRecord.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.sharedFolderUid = "";
                else {
                    object.sharedFolderUid = [];
                    if (options.bytes !== Array)
                        object.sharedFolderUid = $util.newBuffer(object.sharedFolderUid);
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
                object.canShare = false;
                object.canEdit = false;
                if (options.bytes === String)
                    object.ownerAccountUid = "";
                else {
                    object.ownerAccountUid = [];
                    if (options.bytes !== Array)
                        object.ownerAccountUid = $util.newBuffer(object.ownerAccountUid);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.expiration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.expiration = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.owner = false;
                object.expirationNotificationType = options.enums === String ? "NOTIFICATION_OFF" : 0;
                object.ownerUsername = "";
                object.rotateOnExpiration = false;
            }
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                object.sharedFolderUid = options.bytes === String ? $util.base64.encode(message.sharedFolderUid, 0, message.sharedFolderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedFolderUid) : message.sharedFolderUid;
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.recordKey != null && Object.hasOwnProperty.call(message, "recordKey"))
                object.recordKey = options.bytes === String ? $util.base64.encode(message.recordKey, 0, message.recordKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordKey) : message.recordKey;
            if (message.canShare != null && Object.hasOwnProperty.call(message, "canShare"))
                object.canShare = message.canShare;
            if (message.canEdit != null && Object.hasOwnProperty.call(message, "canEdit"))
                object.canEdit = message.canEdit;
            if (message.ownerAccountUid != null && Object.hasOwnProperty.call(message, "ownerAccountUid"))
                object.ownerAccountUid = options.bytes === String ? $util.base64.encode(message.ownerAccountUid, 0, message.ownerAccountUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.ownerAccountUid) : message.ownerAccountUid;
            if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.expiration = typeof message.expiration === "number" ? BigInt(message.expiration) : $util.Long.fromBits(message.expiration.low >>> 0, message.expiration.high >>> 0, false).toBigInt();
                else if (typeof message.expiration === "number")
                    object.expiration = options.longs === String ? String(message.expiration) : message.expiration;
                else
                    object.expiration = options.longs === String ? $util.Long.prototype.toString.call(message.expiration) : options.longs === Number ? new $util.LongBits(message.expiration.low >>> 0, message.expiration.high >>> 0).toNumber() : message.expiration;
            if (message.owner != null && Object.hasOwnProperty.call(message, "owner"))
                object.owner = message.owner;
            if (message.expirationNotificationType != null && Object.hasOwnProperty.call(message, "expirationNotificationType"))
                object.expirationNotificationType = options.enums === String ? $root.Records.TimerNotificationType[message.expirationNotificationType] === undefined ? message.expirationNotificationType : $root.Records.TimerNotificationType[message.expirationNotificationType] : message.expirationNotificationType;
            if (message.ownerUsername != null && Object.hasOwnProperty.call(message, "ownerUsername"))
                object.ownerUsername = message.ownerUsername;
            if (message.rotateOnExpiration != null && Object.hasOwnProperty.call(message, "rotateOnExpiration"))
                object.rotateOnExpiration = message.rotateOnExpiration;
            return object;
        };

        /**
         * Converts this SharedFolderRecord to JSON.
         * @function toJSON
         * @memberof Vault.SharedFolderRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SharedFolderRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SharedFolderRecord
         * @function getTypeUrl
         * @memberof Vault.SharedFolderRecord
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SharedFolderRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.SharedFolderRecord";
        };

        return SharedFolderRecord;
    })();

    Vault.SharedFolderUser = (function() {

        /**
         * Properties of a SharedFolderUser.
         * @memberof Vault
         * @interface ISharedFolderUser
         * @property {Uint8Array|null} [sharedFolderUid] SharedFolderUser sharedFolderUid
         * @property {string|null} [username] SharedFolderUser username
         * @property {boolean|null} [manageRecords] SharedFolderUser manageRecords
         * @property {boolean|null} [manageUsers] SharedFolderUser manageUsers
         * @property {Uint8Array|null} [accountUid] SharedFolderUser accountUid
         * @property {number|null} [expiration] SharedFolderUser expiration
         * @property {Records.TimerNotificationType|null} [expirationNotificationType] SharedFolderUser expirationNotificationType
         * @property {boolean|null} [rotateOnExpiration] SharedFolderUser rotateOnExpiration
         */

        /**
         * Constructs a new SharedFolderUser.
         * @memberof Vault
         * @classdesc Represents a SharedFolderUser.
         * @implements ISharedFolderUser
         * @constructor
         * @param {Vault.ISharedFolderUser=} [properties] Properties to set
         */
        function SharedFolderUser(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SharedFolderUser sharedFolderUid.
         * @member {Uint8Array} sharedFolderUid
         * @memberof Vault.SharedFolderUser
         * @instance
         */
        SharedFolderUser.prototype.sharedFolderUid = $util.newBuffer([]);

        /**
         * SharedFolderUser username.
         * @member {string} username
         * @memberof Vault.SharedFolderUser
         * @instance
         */
        SharedFolderUser.prototype.username = "";

        /**
         * SharedFolderUser manageRecords.
         * @member {boolean} manageRecords
         * @memberof Vault.SharedFolderUser
         * @instance
         */
        SharedFolderUser.prototype.manageRecords = false;

        /**
         * SharedFolderUser manageUsers.
         * @member {boolean} manageUsers
         * @memberof Vault.SharedFolderUser
         * @instance
         */
        SharedFolderUser.prototype.manageUsers = false;

        /**
         * SharedFolderUser accountUid.
         * @member {Uint8Array} accountUid
         * @memberof Vault.SharedFolderUser
         * @instance
         */
        SharedFolderUser.prototype.accountUid = $util.newBuffer([]);

        /**
         * SharedFolderUser expiration.
         * @member {number} expiration
         * @memberof Vault.SharedFolderUser
         * @instance
         */
        SharedFolderUser.prototype.expiration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SharedFolderUser expirationNotificationType.
         * @member {Records.TimerNotificationType} expirationNotificationType
         * @memberof Vault.SharedFolderUser
         * @instance
         */
        SharedFolderUser.prototype.expirationNotificationType = 0;

        /**
         * SharedFolderUser rotateOnExpiration.
         * @member {boolean} rotateOnExpiration
         * @memberof Vault.SharedFolderUser
         * @instance
         */
        SharedFolderUser.prototype.rotateOnExpiration = false;

        /**
         * Creates a new SharedFolderUser instance using the specified properties.
         * @function create
         * @memberof Vault.SharedFolderUser
         * @static
         * @param {Vault.ISharedFolderUser=} [properties] Properties to set
         * @returns {Vault.SharedFolderUser} SharedFolderUser instance
         */
        SharedFolderUser.create = function create(properties) {
            return new SharedFolderUser(properties);
        };

        /**
         * Encodes the specified SharedFolderUser message. Does not implicitly {@link Vault.SharedFolderUser.verify|verify} messages.
         * @function encode
         * @memberof Vault.SharedFolderUser
         * @static
         * @param {Vault.ISharedFolderUser} message SharedFolderUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedFolderUser.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.sharedFolderUid);
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
            if (message.manageRecords != null && Object.hasOwnProperty.call(message, "manageRecords"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.manageRecords);
            if (message.manageUsers != null && Object.hasOwnProperty.call(message, "manageUsers"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.manageUsers);
            if (message.accountUid != null && Object.hasOwnProperty.call(message, "accountUid"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.accountUid);
            if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.expiration);
            if (message.expirationNotificationType != null && Object.hasOwnProperty.call(message, "expirationNotificationType"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.expirationNotificationType);
            if (message.rotateOnExpiration != null && Object.hasOwnProperty.call(message, "rotateOnExpiration"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.rotateOnExpiration);
            return writer;
        };

        /**
         * Decodes a SharedFolderUser message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.SharedFolderUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.SharedFolderUser} SharedFolderUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedFolderUser.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.SharedFolderUser();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sharedFolderUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.username = reader.string();
                        break;
                    }
                case 3: {
                        message.manageRecords = reader.bool();
                        break;
                    }
                case 4: {
                        message.manageUsers = reader.bool();
                        break;
                    }
                case 5: {
                        message.accountUid = reader.bytes();
                        break;
                    }
                case 6: {
                        message.expiration = reader.int64();
                        break;
                    }
                case 7: {
                        message.expirationNotificationType = reader.int32();
                        break;
                    }
                case 8: {
                        message.rotateOnExpiration = reader.bool();
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
         * Creates a SharedFolderUser message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.SharedFolderUser
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.SharedFolderUser} SharedFolderUser
         */
        SharedFolderUser.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.SharedFolderUser)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.SharedFolderUser: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.SharedFolderUser();
            if (object.sharedFolderUid != null)
                if (typeof object.sharedFolderUid === "string")
                    $util.base64.decode(object.sharedFolderUid, message.sharedFolderUid = $util.newBuffer($util.base64.length(object.sharedFolderUid)), 0);
                else if (object.sharedFolderUid.length >= 0)
                    message.sharedFolderUid = object.sharedFolderUid;
            if (object.username != null)
                message.username = String(object.username);
            if (object.manageRecords != null)
                message.manageRecords = Boolean(object.manageRecords);
            if (object.manageUsers != null)
                message.manageUsers = Boolean(object.manageUsers);
            if (object.accountUid != null)
                if (typeof object.accountUid === "string")
                    $util.base64.decode(object.accountUid, message.accountUid = $util.newBuffer($util.base64.length(object.accountUid)), 0);
                else if (object.accountUid.length >= 0)
                    message.accountUid = object.accountUid;
            if (object.expiration != null)
                if ($util.Long)
                    message.expiration = $util.Long.fromValue(object.expiration, false);
                else if (typeof object.expiration === "string")
                    message.expiration = parseInt(object.expiration, 10);
                else if (typeof object.expiration === "number")
                    message.expiration = object.expiration;
                else if (typeof object.expiration === "object")
                    message.expiration = new $util.LongBits(object.expiration.low >>> 0, object.expiration.high >>> 0).toNumber();
            switch (object.expirationNotificationType) {
            default:
                if (typeof object.expirationNotificationType === "number") {
                    message.expirationNotificationType = object.expirationNotificationType;
                    break;
                }
                break;
            case "NOTIFICATION_OFF":
            case 0:
                message.expirationNotificationType = 0;
                break;
            case "NOTIFY_OWNER":
            case 1:
                message.expirationNotificationType = 1;
                break;
            case "NOTIFY_PRIVILEGED_USERS":
            case 2:
                message.expirationNotificationType = 2;
                break;
            }
            if (object.rotateOnExpiration != null)
                message.rotateOnExpiration = Boolean(object.rotateOnExpiration);
            return message;
        };

        /**
         * Creates a plain object from a SharedFolderUser message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.SharedFolderUser
         * @static
         * @param {Vault.SharedFolderUser} message SharedFolderUser
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SharedFolderUser.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.sharedFolderUid = "";
                else {
                    object.sharedFolderUid = [];
                    if (options.bytes !== Array)
                        object.sharedFolderUid = $util.newBuffer(object.sharedFolderUid);
                }
                object.username = "";
                object.manageRecords = false;
                object.manageUsers = false;
                if (options.bytes === String)
                    object.accountUid = "";
                else {
                    object.accountUid = [];
                    if (options.bytes !== Array)
                        object.accountUid = $util.newBuffer(object.accountUid);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.expiration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.expiration = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.expirationNotificationType = options.enums === String ? "NOTIFICATION_OFF" : 0;
                object.rotateOnExpiration = false;
            }
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                object.sharedFolderUid = options.bytes === String ? $util.base64.encode(message.sharedFolderUid, 0, message.sharedFolderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedFolderUid) : message.sharedFolderUid;
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                object.username = message.username;
            if (message.manageRecords != null && Object.hasOwnProperty.call(message, "manageRecords"))
                object.manageRecords = message.manageRecords;
            if (message.manageUsers != null && Object.hasOwnProperty.call(message, "manageUsers"))
                object.manageUsers = message.manageUsers;
            if (message.accountUid != null && Object.hasOwnProperty.call(message, "accountUid"))
                object.accountUid = options.bytes === String ? $util.base64.encode(message.accountUid, 0, message.accountUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.accountUid) : message.accountUid;
            if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.expiration = typeof message.expiration === "number" ? BigInt(message.expiration) : $util.Long.fromBits(message.expiration.low >>> 0, message.expiration.high >>> 0, false).toBigInt();
                else if (typeof message.expiration === "number")
                    object.expiration = options.longs === String ? String(message.expiration) : message.expiration;
                else
                    object.expiration = options.longs === String ? $util.Long.prototype.toString.call(message.expiration) : options.longs === Number ? new $util.LongBits(message.expiration.low >>> 0, message.expiration.high >>> 0).toNumber() : message.expiration;
            if (message.expirationNotificationType != null && Object.hasOwnProperty.call(message, "expirationNotificationType"))
                object.expirationNotificationType = options.enums === String ? $root.Records.TimerNotificationType[message.expirationNotificationType] === undefined ? message.expirationNotificationType : $root.Records.TimerNotificationType[message.expirationNotificationType] : message.expirationNotificationType;
            if (message.rotateOnExpiration != null && Object.hasOwnProperty.call(message, "rotateOnExpiration"))
                object.rotateOnExpiration = message.rotateOnExpiration;
            return object;
        };

        /**
         * Converts this SharedFolderUser to JSON.
         * @function toJSON
         * @memberof Vault.SharedFolderUser
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SharedFolderUser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SharedFolderUser
         * @function getTypeUrl
         * @memberof Vault.SharedFolderUser
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SharedFolderUser.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.SharedFolderUser";
        };

        return SharedFolderUser;
    })();

    Vault.SharedFolderTeam = (function() {

        /**
         * Properties of a SharedFolderTeam.
         * @memberof Vault
         * @interface ISharedFolderTeam
         * @property {Uint8Array|null} [sharedFolderUid] SharedFolderTeam sharedFolderUid
         * @property {Uint8Array|null} [teamUid] SharedFolderTeam teamUid
         * @property {string|null} [name] SharedFolderTeam name
         * @property {boolean|null} [manageRecords] SharedFolderTeam manageRecords
         * @property {boolean|null} [manageUsers] SharedFolderTeam manageUsers
         * @property {number|null} [expiration] SharedFolderTeam expiration
         * @property {Records.TimerNotificationType|null} [expirationNotificationType] SharedFolderTeam expirationNotificationType
         * @property {boolean|null} [rotateOnExpiration] SharedFolderTeam rotateOnExpiration
         */

        /**
         * Constructs a new SharedFolderTeam.
         * @memberof Vault
         * @classdesc Represents a SharedFolderTeam.
         * @implements ISharedFolderTeam
         * @constructor
         * @param {Vault.ISharedFolderTeam=} [properties] Properties to set
         */
        function SharedFolderTeam(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SharedFolderTeam sharedFolderUid.
         * @member {Uint8Array} sharedFolderUid
         * @memberof Vault.SharedFolderTeam
         * @instance
         */
        SharedFolderTeam.prototype.sharedFolderUid = $util.newBuffer([]);

        /**
         * SharedFolderTeam teamUid.
         * @member {Uint8Array} teamUid
         * @memberof Vault.SharedFolderTeam
         * @instance
         */
        SharedFolderTeam.prototype.teamUid = $util.newBuffer([]);

        /**
         * SharedFolderTeam name.
         * @member {string} name
         * @memberof Vault.SharedFolderTeam
         * @instance
         */
        SharedFolderTeam.prototype.name = "";

        /**
         * SharedFolderTeam manageRecords.
         * @member {boolean} manageRecords
         * @memberof Vault.SharedFolderTeam
         * @instance
         */
        SharedFolderTeam.prototype.manageRecords = false;

        /**
         * SharedFolderTeam manageUsers.
         * @member {boolean} manageUsers
         * @memberof Vault.SharedFolderTeam
         * @instance
         */
        SharedFolderTeam.prototype.manageUsers = false;

        /**
         * SharedFolderTeam expiration.
         * @member {number} expiration
         * @memberof Vault.SharedFolderTeam
         * @instance
         */
        SharedFolderTeam.prototype.expiration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SharedFolderTeam expirationNotificationType.
         * @member {Records.TimerNotificationType} expirationNotificationType
         * @memberof Vault.SharedFolderTeam
         * @instance
         */
        SharedFolderTeam.prototype.expirationNotificationType = 0;

        /**
         * SharedFolderTeam rotateOnExpiration.
         * @member {boolean} rotateOnExpiration
         * @memberof Vault.SharedFolderTeam
         * @instance
         */
        SharedFolderTeam.prototype.rotateOnExpiration = false;

        /**
         * Creates a new SharedFolderTeam instance using the specified properties.
         * @function create
         * @memberof Vault.SharedFolderTeam
         * @static
         * @param {Vault.ISharedFolderTeam=} [properties] Properties to set
         * @returns {Vault.SharedFolderTeam} SharedFolderTeam instance
         */
        SharedFolderTeam.create = function create(properties) {
            return new SharedFolderTeam(properties);
        };

        /**
         * Encodes the specified SharedFolderTeam message. Does not implicitly {@link Vault.SharedFolderTeam.verify|verify} messages.
         * @function encode
         * @memberof Vault.SharedFolderTeam
         * @static
         * @param {Vault.ISharedFolderTeam} message SharedFolderTeam message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedFolderTeam.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.sharedFolderUid);
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.teamUid);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            if (message.manageRecords != null && Object.hasOwnProperty.call(message, "manageRecords"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.manageRecords);
            if (message.manageUsers != null && Object.hasOwnProperty.call(message, "manageUsers"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.manageUsers);
            if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.expiration);
            if (message.expirationNotificationType != null && Object.hasOwnProperty.call(message, "expirationNotificationType"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.expirationNotificationType);
            if (message.rotateOnExpiration != null && Object.hasOwnProperty.call(message, "rotateOnExpiration"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.rotateOnExpiration);
            return writer;
        };

        /**
         * Decodes a SharedFolderTeam message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.SharedFolderTeam
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.SharedFolderTeam} SharedFolderTeam
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedFolderTeam.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.SharedFolderTeam();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sharedFolderUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.teamUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.name = reader.string();
                        break;
                    }
                case 4: {
                        message.manageRecords = reader.bool();
                        break;
                    }
                case 5: {
                        message.manageUsers = reader.bool();
                        break;
                    }
                case 6: {
                        message.expiration = reader.int64();
                        break;
                    }
                case 7: {
                        message.expirationNotificationType = reader.int32();
                        break;
                    }
                case 8: {
                        message.rotateOnExpiration = reader.bool();
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
         * Creates a SharedFolderTeam message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.SharedFolderTeam
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.SharedFolderTeam} SharedFolderTeam
         */
        SharedFolderTeam.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.SharedFolderTeam)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.SharedFolderTeam: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.SharedFolderTeam();
            if (object.sharedFolderUid != null)
                if (typeof object.sharedFolderUid === "string")
                    $util.base64.decode(object.sharedFolderUid, message.sharedFolderUid = $util.newBuffer($util.base64.length(object.sharedFolderUid)), 0);
                else if (object.sharedFolderUid.length >= 0)
                    message.sharedFolderUid = object.sharedFolderUid;
            if (object.teamUid != null)
                if (typeof object.teamUid === "string")
                    $util.base64.decode(object.teamUid, message.teamUid = $util.newBuffer($util.base64.length(object.teamUid)), 0);
                else if (object.teamUid.length >= 0)
                    message.teamUid = object.teamUid;
            if (object.name != null)
                message.name = String(object.name);
            if (object.manageRecords != null)
                message.manageRecords = Boolean(object.manageRecords);
            if (object.manageUsers != null)
                message.manageUsers = Boolean(object.manageUsers);
            if (object.expiration != null)
                if ($util.Long)
                    message.expiration = $util.Long.fromValue(object.expiration, false);
                else if (typeof object.expiration === "string")
                    message.expiration = parseInt(object.expiration, 10);
                else if (typeof object.expiration === "number")
                    message.expiration = object.expiration;
                else if (typeof object.expiration === "object")
                    message.expiration = new $util.LongBits(object.expiration.low >>> 0, object.expiration.high >>> 0).toNumber();
            switch (object.expirationNotificationType) {
            default:
                if (typeof object.expirationNotificationType === "number") {
                    message.expirationNotificationType = object.expirationNotificationType;
                    break;
                }
                break;
            case "NOTIFICATION_OFF":
            case 0:
                message.expirationNotificationType = 0;
                break;
            case "NOTIFY_OWNER":
            case 1:
                message.expirationNotificationType = 1;
                break;
            case "NOTIFY_PRIVILEGED_USERS":
            case 2:
                message.expirationNotificationType = 2;
                break;
            }
            if (object.rotateOnExpiration != null)
                message.rotateOnExpiration = Boolean(object.rotateOnExpiration);
            return message;
        };

        /**
         * Creates a plain object from a SharedFolderTeam message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.SharedFolderTeam
         * @static
         * @param {Vault.SharedFolderTeam} message SharedFolderTeam
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SharedFolderTeam.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.sharedFolderUid = "";
                else {
                    object.sharedFolderUid = [];
                    if (options.bytes !== Array)
                        object.sharedFolderUid = $util.newBuffer(object.sharedFolderUid);
                }
                if (options.bytes === String)
                    object.teamUid = "";
                else {
                    object.teamUid = [];
                    if (options.bytes !== Array)
                        object.teamUid = $util.newBuffer(object.teamUid);
                }
                object.name = "";
                object.manageRecords = false;
                object.manageUsers = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.expiration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.expiration = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.expirationNotificationType = options.enums === String ? "NOTIFICATION_OFF" : 0;
                object.rotateOnExpiration = false;
            }
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                object.sharedFolderUid = options.bytes === String ? $util.base64.encode(message.sharedFolderUid, 0, message.sharedFolderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedFolderUid) : message.sharedFolderUid;
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid"))
                object.teamUid = options.bytes === String ? $util.base64.encode(message.teamUid, 0, message.teamUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.teamUid) : message.teamUid;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.manageRecords != null && Object.hasOwnProperty.call(message, "manageRecords"))
                object.manageRecords = message.manageRecords;
            if (message.manageUsers != null && Object.hasOwnProperty.call(message, "manageUsers"))
                object.manageUsers = message.manageUsers;
            if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.expiration = typeof message.expiration === "number" ? BigInt(message.expiration) : $util.Long.fromBits(message.expiration.low >>> 0, message.expiration.high >>> 0, false).toBigInt();
                else if (typeof message.expiration === "number")
                    object.expiration = options.longs === String ? String(message.expiration) : message.expiration;
                else
                    object.expiration = options.longs === String ? $util.Long.prototype.toString.call(message.expiration) : options.longs === Number ? new $util.LongBits(message.expiration.low >>> 0, message.expiration.high >>> 0).toNumber() : message.expiration;
            if (message.expirationNotificationType != null && Object.hasOwnProperty.call(message, "expirationNotificationType"))
                object.expirationNotificationType = options.enums === String ? $root.Records.TimerNotificationType[message.expirationNotificationType] === undefined ? message.expirationNotificationType : $root.Records.TimerNotificationType[message.expirationNotificationType] : message.expirationNotificationType;
            if (message.rotateOnExpiration != null && Object.hasOwnProperty.call(message, "rotateOnExpiration"))
                object.rotateOnExpiration = message.rotateOnExpiration;
            return object;
        };

        /**
         * Converts this SharedFolderTeam to JSON.
         * @function toJSON
         * @memberof Vault.SharedFolderTeam
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SharedFolderTeam.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SharedFolderTeam
         * @function getTypeUrl
         * @memberof Vault.SharedFolderTeam
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SharedFolderTeam.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.SharedFolderTeam";
        };

        return SharedFolderTeam;
    })();

    Vault.KsmChange = (function() {

        /**
         * Properties of a KsmChange.
         * @memberof Vault
         * @interface IKsmChange
         * @property {Uint8Array|null} [appRecordUid] KsmChange appRecordUid
         * @property {Uint8Array|null} [detailId] KsmChange detailId
         * @property {boolean|null} [removed] KsmChange removed
         * @property {Enterprise.AppClientType|null} [appClientType] KsmChange appClientType
         * @property {number|null} [expiration] KsmChange expiration
         */

        /**
         * Constructs a new KsmChange.
         * @memberof Vault
         * @classdesc Represents a KsmChange.
         * @implements IKsmChange
         * @constructor
         * @param {Vault.IKsmChange=} [properties] Properties to set
         */
        function KsmChange(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KsmChange appRecordUid.
         * @member {Uint8Array} appRecordUid
         * @memberof Vault.KsmChange
         * @instance
         */
        KsmChange.prototype.appRecordUid = $util.newBuffer([]);

        /**
         * KsmChange detailId.
         * @member {Uint8Array} detailId
         * @memberof Vault.KsmChange
         * @instance
         */
        KsmChange.prototype.detailId = $util.newBuffer([]);

        /**
         * KsmChange removed.
         * @member {boolean} removed
         * @memberof Vault.KsmChange
         * @instance
         */
        KsmChange.prototype.removed = false;

        /**
         * KsmChange appClientType.
         * @member {Enterprise.AppClientType} appClientType
         * @memberof Vault.KsmChange
         * @instance
         */
        KsmChange.prototype.appClientType = 0;

        /**
         * KsmChange expiration.
         * @member {number} expiration
         * @memberof Vault.KsmChange
         * @instance
         */
        KsmChange.prototype.expiration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new KsmChange instance using the specified properties.
         * @function create
         * @memberof Vault.KsmChange
         * @static
         * @param {Vault.IKsmChange=} [properties] Properties to set
         * @returns {Vault.KsmChange} KsmChange instance
         */
        KsmChange.create = function create(properties) {
            return new KsmChange(properties);
        };

        /**
         * Encodes the specified KsmChange message. Does not implicitly {@link Vault.KsmChange.verify|verify} messages.
         * @function encode
         * @memberof Vault.KsmChange
         * @static
         * @param {Vault.IKsmChange} message KsmChange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KsmChange.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.appRecordUid != null && Object.hasOwnProperty.call(message, "appRecordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.appRecordUid);
            if (message.detailId != null && Object.hasOwnProperty.call(message, "detailId"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.detailId);
            if (message.removed != null && Object.hasOwnProperty.call(message, "removed"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.removed);
            if (message.appClientType != null && Object.hasOwnProperty.call(message, "appClientType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.appClientType);
            if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.expiration);
            return writer;
        };

        /**
         * Decodes a KsmChange message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.KsmChange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.KsmChange} KsmChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KsmChange.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.KsmChange();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.appRecordUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.detailId = reader.bytes();
                        break;
                    }
                case 3: {
                        message.removed = reader.bool();
                        break;
                    }
                case 4: {
                        message.appClientType = reader.int32();
                        break;
                    }
                case 5: {
                        message.expiration = reader.int64();
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
         * Creates a KsmChange message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.KsmChange
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.KsmChange} KsmChange
         */
        KsmChange.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.KsmChange)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.KsmChange: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.KsmChange();
            if (object.appRecordUid != null)
                if (typeof object.appRecordUid === "string")
                    $util.base64.decode(object.appRecordUid, message.appRecordUid = $util.newBuffer($util.base64.length(object.appRecordUid)), 0);
                else if (object.appRecordUid.length >= 0)
                    message.appRecordUid = object.appRecordUid;
            if (object.detailId != null)
                if (typeof object.detailId === "string")
                    $util.base64.decode(object.detailId, message.detailId = $util.newBuffer($util.base64.length(object.detailId)), 0);
                else if (object.detailId.length >= 0)
                    message.detailId = object.detailId;
            if (object.removed != null)
                message.removed = Boolean(object.removed);
            switch (object.appClientType) {
            default:
                if (typeof object.appClientType === "number") {
                    message.appClientType = object.appClientType;
                    break;
                }
                break;
            case "NOT_USED":
            case 0:
                message.appClientType = 0;
                break;
            case "GENERAL":
            case 1:
                message.appClientType = 1;
                break;
            case "DISCOVERY_AND_ROTATION_CONTROLLER":
            case 2:
                message.appClientType = 2;
                break;
            case "KCM_CONTROLLER":
            case 3:
                message.appClientType = 3;
                break;
            case "SELF_DESTRUCT":
            case 4:
                message.appClientType = 4;
                break;
            }
            if (object.expiration != null)
                if ($util.Long)
                    message.expiration = $util.Long.fromValue(object.expiration, false);
                else if (typeof object.expiration === "string")
                    message.expiration = parseInt(object.expiration, 10);
                else if (typeof object.expiration === "number")
                    message.expiration = object.expiration;
                else if (typeof object.expiration === "object")
                    message.expiration = new $util.LongBits(object.expiration.low >>> 0, object.expiration.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a KsmChange message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.KsmChange
         * @static
         * @param {Vault.KsmChange} message KsmChange
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KsmChange.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.appRecordUid = "";
                else {
                    object.appRecordUid = [];
                    if (options.bytes !== Array)
                        object.appRecordUid = $util.newBuffer(object.appRecordUid);
                }
                if (options.bytes === String)
                    object.detailId = "";
                else {
                    object.detailId = [];
                    if (options.bytes !== Array)
                        object.detailId = $util.newBuffer(object.detailId);
                }
                object.removed = false;
                object.appClientType = options.enums === String ? "NOT_USED" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.expiration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.expiration = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.appRecordUid != null && Object.hasOwnProperty.call(message, "appRecordUid"))
                object.appRecordUid = options.bytes === String ? $util.base64.encode(message.appRecordUid, 0, message.appRecordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.appRecordUid) : message.appRecordUid;
            if (message.detailId != null && Object.hasOwnProperty.call(message, "detailId"))
                object.detailId = options.bytes === String ? $util.base64.encode(message.detailId, 0, message.detailId.length) : options.bytes === Array ? Array.prototype.slice.call(message.detailId) : message.detailId;
            if (message.removed != null && Object.hasOwnProperty.call(message, "removed"))
                object.removed = message.removed;
            if (message.appClientType != null && Object.hasOwnProperty.call(message, "appClientType"))
                object.appClientType = options.enums === String ? $root.Enterprise.AppClientType[message.appClientType] === undefined ? message.appClientType : $root.Enterprise.AppClientType[message.appClientType] : message.appClientType;
            if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.expiration = typeof message.expiration === "number" ? BigInt(message.expiration) : $util.Long.fromBits(message.expiration.low >>> 0, message.expiration.high >>> 0, false).toBigInt();
                else if (typeof message.expiration === "number")
                    object.expiration = options.longs === String ? String(message.expiration) : message.expiration;
                else
                    object.expiration = options.longs === String ? $util.Long.prototype.toString.call(message.expiration) : options.longs === Number ? new $util.LongBits(message.expiration.low >>> 0, message.expiration.high >>> 0).toNumber() : message.expiration;
            return object;
        };

        /**
         * Converts this KsmChange to JSON.
         * @function toJSON
         * @memberof Vault.KsmChange
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KsmChange.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for KsmChange
         * @function getTypeUrl
         * @memberof Vault.KsmChange
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        KsmChange.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.KsmChange";
        };

        return KsmChange;
    })();

    Vault.ShareInvitation = (function() {

        /**
         * Properties of a ShareInvitation.
         * @memberof Vault
         * @interface IShareInvitation
         * @property {string|null} [username] ShareInvitation username
         */

        /**
         * Constructs a new ShareInvitation.
         * @memberof Vault
         * @classdesc Represents a ShareInvitation.
         * @implements IShareInvitation
         * @constructor
         * @param {Vault.IShareInvitation=} [properties] Properties to set
         */
        function ShareInvitation(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ShareInvitation username.
         * @member {string} username
         * @memberof Vault.ShareInvitation
         * @instance
         */
        ShareInvitation.prototype.username = "";

        /**
         * Creates a new ShareInvitation instance using the specified properties.
         * @function create
         * @memberof Vault.ShareInvitation
         * @static
         * @param {Vault.IShareInvitation=} [properties] Properties to set
         * @returns {Vault.ShareInvitation} ShareInvitation instance
         */
        ShareInvitation.create = function create(properties) {
            return new ShareInvitation(properties);
        };

        /**
         * Encodes the specified ShareInvitation message. Does not implicitly {@link Vault.ShareInvitation.verify|verify} messages.
         * @function encode
         * @memberof Vault.ShareInvitation
         * @static
         * @param {Vault.IShareInvitation} message ShareInvitation message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ShareInvitation.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
            return writer;
        };

        /**
         * Decodes a ShareInvitation message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.ShareInvitation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.ShareInvitation} ShareInvitation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ShareInvitation.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.ShareInvitation();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.username = reader.string();
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
         * Creates a ShareInvitation message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.ShareInvitation
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.ShareInvitation} ShareInvitation
         */
        ShareInvitation.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.ShareInvitation)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.ShareInvitation: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.ShareInvitation();
            if (object.username != null)
                message.username = String(object.username);
            return message;
        };

        /**
         * Creates a plain object from a ShareInvitation message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.ShareInvitation
         * @static
         * @param {Vault.ShareInvitation} message ShareInvitation
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ShareInvitation.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.username = "";
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                object.username = message.username;
            return object;
        };

        /**
         * Converts this ShareInvitation to JSON.
         * @function toJSON
         * @memberof Vault.ShareInvitation
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ShareInvitation.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ShareInvitation
         * @function getTypeUrl
         * @memberof Vault.ShareInvitation
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ShareInvitation.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.ShareInvitation";
        };

        return ShareInvitation;
    })();

    Vault.User = (function() {

        /**
         * Properties of a User.
         * @memberof Vault
         * @interface IUser
         * @property {Uint8Array|null} [accountUid] User accountUid
         * @property {string|null} [username] User username
         */

        /**
         * Constructs a new User.
         * @memberof Vault
         * @classdesc Represents a User.
         * @implements IUser
         * @constructor
         * @param {Vault.IUser=} [properties] Properties to set
         */
        function User(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * User accountUid.
         * @member {Uint8Array} accountUid
         * @memberof Vault.User
         * @instance
         */
        User.prototype.accountUid = $util.newBuffer([]);

        /**
         * User username.
         * @member {string} username
         * @memberof Vault.User
         * @instance
         */
        User.prototype.username = "";

        /**
         * Creates a new User instance using the specified properties.
         * @function create
         * @memberof Vault.User
         * @static
         * @param {Vault.IUser=} [properties] Properties to set
         * @returns {Vault.User} User instance
         */
        User.create = function create(properties) {
            return new User(properties);
        };

        /**
         * Encodes the specified User message. Does not implicitly {@link Vault.User.verify|verify} messages.
         * @function encode
         * @memberof Vault.User
         * @static
         * @param {Vault.IUser} message User message or plain object to encode
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
            if (message.accountUid != null && Object.hasOwnProperty.call(message, "accountUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.accountUid);
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
            return writer;
        };

        /**
         * Decodes a User message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.User} User
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
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.User();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.accountUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.username = reader.string();
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
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.User
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.User} User
         */
        User.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.User)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.User: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.User();
            if (object.accountUid != null)
                if (typeof object.accountUid === "string")
                    $util.base64.decode(object.accountUid, message.accountUid = $util.newBuffer($util.base64.length(object.accountUid)), 0);
                else if (object.accountUid.length >= 0)
                    message.accountUid = object.accountUid;
            if (object.username != null)
                message.username = String(object.username);
            return message;
        };

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.User
         * @static
         * @param {Vault.User} message User
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
                if (options.bytes === String)
                    object.accountUid = "";
                else {
                    object.accountUid = [];
                    if (options.bytes !== Array)
                        object.accountUid = $util.newBuffer(object.accountUid);
                }
                object.username = "";
            }
            if (message.accountUid != null && Object.hasOwnProperty.call(message, "accountUid"))
                object.accountUid = options.bytes === String ? $util.base64.encode(message.accountUid, 0, message.accountUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.accountUid) : message.accountUid;
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                object.username = message.username;
            return object;
        };

        /**
         * Converts this User to JSON.
         * @function toJSON
         * @memberof Vault.User
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        User.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for User
         * @function getTypeUrl
         * @memberof Vault.User
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        User.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.User";
        };

        return User;
    })();

    Vault.SyncDiagnostics = (function() {

        /**
         * Properties of a SyncDiagnostics.
         * @memberof Vault
         * @interface ISyncDiagnostics
         * @property {Uint8Array|null} [continuationToken] SyncDiagnostics continuationToken
         * @property {number|null} [userId] SyncDiagnostics userId
         * @property {number|null} [enterpriseUserId] SyncDiagnostics enterpriseUserId
         * @property {number|null} [syncedTo] SyncDiagnostics syncedTo
         * @property {number|null} [syncingTo] SyncDiagnostics syncingTo
         */

        /**
         * Constructs a new SyncDiagnostics.
         * @memberof Vault
         * @classdesc Represents a SyncDiagnostics.
         * @implements ISyncDiagnostics
         * @constructor
         * @param {Vault.ISyncDiagnostics=} [properties] Properties to set
         */
        function SyncDiagnostics(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SyncDiagnostics continuationToken.
         * @member {Uint8Array} continuationToken
         * @memberof Vault.SyncDiagnostics
         * @instance
         */
        SyncDiagnostics.prototype.continuationToken = $util.newBuffer([]);

        /**
         * SyncDiagnostics userId.
         * @member {number} userId
         * @memberof Vault.SyncDiagnostics
         * @instance
         */
        SyncDiagnostics.prototype.userId = 0;

        /**
         * SyncDiagnostics enterpriseUserId.
         * @member {number} enterpriseUserId
         * @memberof Vault.SyncDiagnostics
         * @instance
         */
        SyncDiagnostics.prototype.enterpriseUserId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SyncDiagnostics syncedTo.
         * @member {number} syncedTo
         * @memberof Vault.SyncDiagnostics
         * @instance
         */
        SyncDiagnostics.prototype.syncedTo = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SyncDiagnostics syncingTo.
         * @member {number} syncingTo
         * @memberof Vault.SyncDiagnostics
         * @instance
         */
        SyncDiagnostics.prototype.syncingTo = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new SyncDiagnostics instance using the specified properties.
         * @function create
         * @memberof Vault.SyncDiagnostics
         * @static
         * @param {Vault.ISyncDiagnostics=} [properties] Properties to set
         * @returns {Vault.SyncDiagnostics} SyncDiagnostics instance
         */
        SyncDiagnostics.create = function create(properties) {
            return new SyncDiagnostics(properties);
        };

        /**
         * Encodes the specified SyncDiagnostics message. Does not implicitly {@link Vault.SyncDiagnostics.verify|verify} messages.
         * @function encode
         * @memberof Vault.SyncDiagnostics
         * @static
         * @param {Vault.ISyncDiagnostics} message SyncDiagnostics message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncDiagnostics.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.continuationToken != null && Object.hasOwnProperty.call(message, "continuationToken"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.continuationToken);
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.userId);
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.enterpriseUserId);
            if (message.syncedTo != null && Object.hasOwnProperty.call(message, "syncedTo"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.syncedTo);
            if (message.syncingTo != null && Object.hasOwnProperty.call(message, "syncingTo"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.syncingTo);
            return writer;
        };

        /**
         * Decodes a SyncDiagnostics message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.SyncDiagnostics
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.SyncDiagnostics} SyncDiagnostics
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncDiagnostics.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.SyncDiagnostics();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.continuationToken = reader.bytes();
                        break;
                    }
                case 2: {
                        message.userId = reader.int32();
                        break;
                    }
                case 3: {
                        message.enterpriseUserId = reader.int64();
                        break;
                    }
                case 4: {
                        message.syncedTo = reader.int64();
                        break;
                    }
                case 5: {
                        message.syncingTo = reader.int64();
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
         * Creates a SyncDiagnostics message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.SyncDiagnostics
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.SyncDiagnostics} SyncDiagnostics
         */
        SyncDiagnostics.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.SyncDiagnostics)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.SyncDiagnostics: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.SyncDiagnostics();
            if (object.continuationToken != null)
                if (typeof object.continuationToken === "string")
                    $util.base64.decode(object.continuationToken, message.continuationToken = $util.newBuffer($util.base64.length(object.continuationToken)), 0);
                else if (object.continuationToken.length >= 0)
                    message.continuationToken = object.continuationToken;
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.enterpriseUserId != null)
                if ($util.Long)
                    message.enterpriseUserId = $util.Long.fromValue(object.enterpriseUserId, false);
                else if (typeof object.enterpriseUserId === "string")
                    message.enterpriseUserId = parseInt(object.enterpriseUserId, 10);
                else if (typeof object.enterpriseUserId === "number")
                    message.enterpriseUserId = object.enterpriseUserId;
                else if (typeof object.enterpriseUserId === "object")
                    message.enterpriseUserId = new $util.LongBits(object.enterpriseUserId.low >>> 0, object.enterpriseUserId.high >>> 0).toNumber();
            if (object.syncedTo != null)
                if ($util.Long)
                    message.syncedTo = $util.Long.fromValue(object.syncedTo, false);
                else if (typeof object.syncedTo === "string")
                    message.syncedTo = parseInt(object.syncedTo, 10);
                else if (typeof object.syncedTo === "number")
                    message.syncedTo = object.syncedTo;
                else if (typeof object.syncedTo === "object")
                    message.syncedTo = new $util.LongBits(object.syncedTo.low >>> 0, object.syncedTo.high >>> 0).toNumber();
            if (object.syncingTo != null)
                if ($util.Long)
                    message.syncingTo = $util.Long.fromValue(object.syncingTo, false);
                else if (typeof object.syncingTo === "string")
                    message.syncingTo = parseInt(object.syncingTo, 10);
                else if (typeof object.syncingTo === "number")
                    message.syncingTo = object.syncingTo;
                else if (typeof object.syncingTo === "object")
                    message.syncingTo = new $util.LongBits(object.syncingTo.low >>> 0, object.syncingTo.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a SyncDiagnostics message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.SyncDiagnostics
         * @static
         * @param {Vault.SyncDiagnostics} message SyncDiagnostics
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SyncDiagnostics.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.continuationToken = "";
                else {
                    object.continuationToken = [];
                    if (options.bytes !== Array)
                        object.continuationToken = $util.newBuffer(object.continuationToken);
                }
                object.userId = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.enterpriseUserId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.enterpriseUserId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.syncedTo = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.syncedTo = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.syncingTo = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.syncingTo = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.continuationToken != null && Object.hasOwnProperty.call(message, "continuationToken"))
                object.continuationToken = options.bytes === String ? $util.base64.encode(message.continuationToken, 0, message.continuationToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.continuationToken) : message.continuationToken;
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                object.userId = message.userId;
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.enterpriseUserId = typeof message.enterpriseUserId === "number" ? BigInt(message.enterpriseUserId) : $util.Long.fromBits(message.enterpriseUserId.low >>> 0, message.enterpriseUserId.high >>> 0, false).toBigInt();
                else if (typeof message.enterpriseUserId === "number")
                    object.enterpriseUserId = options.longs === String ? String(message.enterpriseUserId) : message.enterpriseUserId;
                else
                    object.enterpriseUserId = options.longs === String ? $util.Long.prototype.toString.call(message.enterpriseUserId) : options.longs === Number ? new $util.LongBits(message.enterpriseUserId.low >>> 0, message.enterpriseUserId.high >>> 0).toNumber() : message.enterpriseUserId;
            if (message.syncedTo != null && Object.hasOwnProperty.call(message, "syncedTo"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.syncedTo = typeof message.syncedTo === "number" ? BigInt(message.syncedTo) : $util.Long.fromBits(message.syncedTo.low >>> 0, message.syncedTo.high >>> 0, false).toBigInt();
                else if (typeof message.syncedTo === "number")
                    object.syncedTo = options.longs === String ? String(message.syncedTo) : message.syncedTo;
                else
                    object.syncedTo = options.longs === String ? $util.Long.prototype.toString.call(message.syncedTo) : options.longs === Number ? new $util.LongBits(message.syncedTo.low >>> 0, message.syncedTo.high >>> 0).toNumber() : message.syncedTo;
            if (message.syncingTo != null && Object.hasOwnProperty.call(message, "syncingTo"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.syncingTo = typeof message.syncingTo === "number" ? BigInt(message.syncingTo) : $util.Long.fromBits(message.syncingTo.low >>> 0, message.syncingTo.high >>> 0, false).toBigInt();
                else if (typeof message.syncingTo === "number")
                    object.syncingTo = options.longs === String ? String(message.syncingTo) : message.syncingTo;
                else
                    object.syncingTo = options.longs === String ? $util.Long.prototype.toString.call(message.syncingTo) : options.longs === Number ? new $util.LongBits(message.syncingTo.low >>> 0, message.syncingTo.high >>> 0).toNumber() : message.syncingTo;
            return object;
        };

        /**
         * Converts this SyncDiagnostics to JSON.
         * @function toJSON
         * @memberof Vault.SyncDiagnostics
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SyncDiagnostics.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SyncDiagnostics
         * @function getTypeUrl
         * @memberof Vault.SyncDiagnostics
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SyncDiagnostics.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.SyncDiagnostics";
        };

        return SyncDiagnostics;
    })();

    /**
     * RecordRotationStatus enum.
     * @name Vault.RecordRotationStatus
     * @enum {number}
     * @property {number} RRST_NOT_ROTATED=0 RRST_NOT_ROTATED value
     * @property {number} RRST_IN_PROGRESS=1 RRST_IN_PROGRESS value
     * @property {number} RRST_SUCCESS=2 RRST_SUCCESS value
     * @property {number} RRST_FAILURE=3 RRST_FAILURE value
     */
    Vault.RecordRotationStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "RRST_NOT_ROTATED"] = 0;
        values[valuesById[1] = "RRST_IN_PROGRESS"] = 1;
        values[valuesById[2] = "RRST_SUCCESS"] = 2;
        values[valuesById[3] = "RRST_FAILURE"] = 3;
        return values;
    })();

    Vault.RecordRotation = (function() {

        /**
         * Properties of a RecordRotation.
         * @memberof Vault
         * @interface IRecordRotation
         * @property {Uint8Array|null} [recordUid] RecordRotation recordUid
         * @property {number|null} [revision] RecordRotation revision
         * @property {Uint8Array|null} [configurationUid] RecordRotation configurationUid
         * @property {string|null} [schedule] RecordRotation schedule
         * @property {Uint8Array|null} [pwdComplexity] RecordRotation pwdComplexity
         * @property {boolean|null} [disabled] RecordRotation disabled
         * @property {Uint8Array|null} [resourceUid] RecordRotation resourceUid
         * @property {number|null} [lastRotation] RecordRotation lastRotation
         * @property {Vault.RecordRotationStatus|null} [lastRotationStatus] RecordRotation lastRotationStatus
         */

        /**
         * Constructs a new RecordRotation.
         * @memberof Vault
         * @classdesc Represents a RecordRotation.
         * @implements IRecordRotation
         * @constructor
         * @param {Vault.IRecordRotation=} [properties] Properties to set
         */
        function RecordRotation(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RecordRotation recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Vault.RecordRotation
         * @instance
         */
        RecordRotation.prototype.recordUid = $util.newBuffer([]);

        /**
         * RecordRotation revision.
         * @member {number} revision
         * @memberof Vault.RecordRotation
         * @instance
         */
        RecordRotation.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RecordRotation configurationUid.
         * @member {Uint8Array} configurationUid
         * @memberof Vault.RecordRotation
         * @instance
         */
        RecordRotation.prototype.configurationUid = $util.newBuffer([]);

        /**
         * RecordRotation schedule.
         * @member {string} schedule
         * @memberof Vault.RecordRotation
         * @instance
         */
        RecordRotation.prototype.schedule = "";

        /**
         * RecordRotation pwdComplexity.
         * @member {Uint8Array} pwdComplexity
         * @memberof Vault.RecordRotation
         * @instance
         */
        RecordRotation.prototype.pwdComplexity = $util.newBuffer([]);

        /**
         * RecordRotation disabled.
         * @member {boolean} disabled
         * @memberof Vault.RecordRotation
         * @instance
         */
        RecordRotation.prototype.disabled = false;

        /**
         * RecordRotation resourceUid.
         * @member {Uint8Array} resourceUid
         * @memberof Vault.RecordRotation
         * @instance
         */
        RecordRotation.prototype.resourceUid = $util.newBuffer([]);

        /**
         * RecordRotation lastRotation.
         * @member {number} lastRotation
         * @memberof Vault.RecordRotation
         * @instance
         */
        RecordRotation.prototype.lastRotation = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RecordRotation lastRotationStatus.
         * @member {Vault.RecordRotationStatus} lastRotationStatus
         * @memberof Vault.RecordRotation
         * @instance
         */
        RecordRotation.prototype.lastRotationStatus = 0;

        /**
         * Creates a new RecordRotation instance using the specified properties.
         * @function create
         * @memberof Vault.RecordRotation
         * @static
         * @param {Vault.IRecordRotation=} [properties] Properties to set
         * @returns {Vault.RecordRotation} RecordRotation instance
         */
        RecordRotation.create = function create(properties) {
            return new RecordRotation(properties);
        };

        /**
         * Encodes the specified RecordRotation message. Does not implicitly {@link Vault.RecordRotation.verify|verify} messages.
         * @function encode
         * @memberof Vault.RecordRotation
         * @static
         * @param {Vault.IRecordRotation} message RecordRotation message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RecordRotation.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.revision);
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.configurationUid);
            if (message.schedule != null && Object.hasOwnProperty.call(message, "schedule"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.schedule);
            if (message.pwdComplexity != null && Object.hasOwnProperty.call(message, "pwdComplexity"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.pwdComplexity);
            if (message.disabled != null && Object.hasOwnProperty.call(message, "disabled"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.disabled);
            if (message.resourceUid != null && Object.hasOwnProperty.call(message, "resourceUid"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.resourceUid);
            if (message.lastRotation != null && Object.hasOwnProperty.call(message, "lastRotation"))
                writer.uint32(/* id 8, wireType 0 =*/64).int64(message.lastRotation);
            if (message.lastRotationStatus != null && Object.hasOwnProperty.call(message, "lastRotationStatus"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.lastRotationStatus);
            return writer;
        };

        /**
         * Decodes a RecordRotation message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.RecordRotation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.RecordRotation} RecordRotation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RecordRotation.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.RecordRotation();
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
                        message.revision = reader.int64();
                        break;
                    }
                case 3: {
                        message.configurationUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.schedule = reader.string();
                        break;
                    }
                case 5: {
                        message.pwdComplexity = reader.bytes();
                        break;
                    }
                case 6: {
                        message.disabled = reader.bool();
                        break;
                    }
                case 7: {
                        message.resourceUid = reader.bytes();
                        break;
                    }
                case 8: {
                        message.lastRotation = reader.int64();
                        break;
                    }
                case 9: {
                        message.lastRotationStatus = reader.int32();
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
         * Creates a RecordRotation message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.RecordRotation
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.RecordRotation} RecordRotation
         */
        RecordRotation.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.RecordRotation)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.RecordRotation: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.RecordRotation();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            if (object.configurationUid != null)
                if (typeof object.configurationUid === "string")
                    $util.base64.decode(object.configurationUid, message.configurationUid = $util.newBuffer($util.base64.length(object.configurationUid)), 0);
                else if (object.configurationUid.length >= 0)
                    message.configurationUid = object.configurationUid;
            if (object.schedule != null)
                message.schedule = String(object.schedule);
            if (object.pwdComplexity != null)
                if (typeof object.pwdComplexity === "string")
                    $util.base64.decode(object.pwdComplexity, message.pwdComplexity = $util.newBuffer($util.base64.length(object.pwdComplexity)), 0);
                else if (object.pwdComplexity.length >= 0)
                    message.pwdComplexity = object.pwdComplexity;
            if (object.disabled != null)
                message.disabled = Boolean(object.disabled);
            if (object.resourceUid != null)
                if (typeof object.resourceUid === "string")
                    $util.base64.decode(object.resourceUid, message.resourceUid = $util.newBuffer($util.base64.length(object.resourceUid)), 0);
                else if (object.resourceUid.length >= 0)
                    message.resourceUid = object.resourceUid;
            if (object.lastRotation != null)
                if ($util.Long)
                    message.lastRotation = $util.Long.fromValue(object.lastRotation, false);
                else if (typeof object.lastRotation === "string")
                    message.lastRotation = parseInt(object.lastRotation, 10);
                else if (typeof object.lastRotation === "number")
                    message.lastRotation = object.lastRotation;
                else if (typeof object.lastRotation === "object")
                    message.lastRotation = new $util.LongBits(object.lastRotation.low >>> 0, object.lastRotation.high >>> 0).toNumber();
            switch (object.lastRotationStatus) {
            default:
                if (typeof object.lastRotationStatus === "number") {
                    message.lastRotationStatus = object.lastRotationStatus;
                    break;
                }
                break;
            case "RRST_NOT_ROTATED":
            case 0:
                message.lastRotationStatus = 0;
                break;
            case "RRST_IN_PROGRESS":
            case 1:
                message.lastRotationStatus = 1;
                break;
            case "RRST_SUCCESS":
            case 2:
                message.lastRotationStatus = 2;
                break;
            case "RRST_FAILURE":
            case 3:
                message.lastRotationStatus = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a RecordRotation message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.RecordRotation
         * @static
         * @param {Vault.RecordRotation} message RecordRotation
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RecordRotation.toObject = function toObject(message, options, q) {
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
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.configurationUid = "";
                else {
                    object.configurationUid = [];
                    if (options.bytes !== Array)
                        object.configurationUid = $util.newBuffer(object.configurationUid);
                }
                object.schedule = "";
                if (options.bytes === String)
                    object.pwdComplexity = "";
                else {
                    object.pwdComplexity = [];
                    if (options.bytes !== Array)
                        object.pwdComplexity = $util.newBuffer(object.pwdComplexity);
                }
                object.disabled = false;
                if (options.bytes === String)
                    object.resourceUid = "";
                else {
                    object.resourceUid = [];
                    if (options.bytes !== Array)
                        object.resourceUid = $util.newBuffer(object.resourceUid);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.lastRotation = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.lastRotation = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.lastRotationStatus = options.enums === String ? "RRST_NOT_ROTATED" : 0;
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                object.configurationUid = options.bytes === String ? $util.base64.encode(message.configurationUid, 0, message.configurationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.configurationUid) : message.configurationUid;
            if (message.schedule != null && Object.hasOwnProperty.call(message, "schedule"))
                object.schedule = message.schedule;
            if (message.pwdComplexity != null && Object.hasOwnProperty.call(message, "pwdComplexity"))
                object.pwdComplexity = options.bytes === String ? $util.base64.encode(message.pwdComplexity, 0, message.pwdComplexity.length) : options.bytes === Array ? Array.prototype.slice.call(message.pwdComplexity) : message.pwdComplexity;
            if (message.disabled != null && Object.hasOwnProperty.call(message, "disabled"))
                object.disabled = message.disabled;
            if (message.resourceUid != null && Object.hasOwnProperty.call(message, "resourceUid"))
                object.resourceUid = options.bytes === String ? $util.base64.encode(message.resourceUid, 0, message.resourceUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.resourceUid) : message.resourceUid;
            if (message.lastRotation != null && Object.hasOwnProperty.call(message, "lastRotation"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.lastRotation = typeof message.lastRotation === "number" ? BigInt(message.lastRotation) : $util.Long.fromBits(message.lastRotation.low >>> 0, message.lastRotation.high >>> 0, false).toBigInt();
                else if (typeof message.lastRotation === "number")
                    object.lastRotation = options.longs === String ? String(message.lastRotation) : message.lastRotation;
                else
                    object.lastRotation = options.longs === String ? $util.Long.prototype.toString.call(message.lastRotation) : options.longs === Number ? new $util.LongBits(message.lastRotation.low >>> 0, message.lastRotation.high >>> 0).toNumber() : message.lastRotation;
            if (message.lastRotationStatus != null && Object.hasOwnProperty.call(message, "lastRotationStatus"))
                object.lastRotationStatus = options.enums === String ? $root.Vault.RecordRotationStatus[message.lastRotationStatus] === undefined ? message.lastRotationStatus : $root.Vault.RecordRotationStatus[message.lastRotationStatus] : message.lastRotationStatus;
            return object;
        };

        /**
         * Converts this RecordRotation to JSON.
         * @function toJSON
         * @memberof Vault.RecordRotation
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RecordRotation.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RecordRotation
         * @function getTypeUrl
         * @memberof Vault.RecordRotation
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RecordRotation.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.RecordRotation";
        };

        return RecordRotation;
    })();

    Vault.SecurityScoreData = (function() {

        /**
         * Properties of a SecurityScoreData.
         * @memberof Vault
         * @interface ISecurityScoreData
         * @property {Uint8Array|null} [recordUid] SecurityScoreData recordUid
         * @property {Uint8Array|null} [data] SecurityScoreData data
         * @property {number|null} [revision] SecurityScoreData revision
         */

        /**
         * Constructs a new SecurityScoreData.
         * @memberof Vault
         * @classdesc Represents a SecurityScoreData.
         * @implements ISecurityScoreData
         * @constructor
         * @param {Vault.ISecurityScoreData=} [properties] Properties to set
         */
        function SecurityScoreData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SecurityScoreData recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Vault.SecurityScoreData
         * @instance
         */
        SecurityScoreData.prototype.recordUid = $util.newBuffer([]);

        /**
         * SecurityScoreData data.
         * @member {Uint8Array} data
         * @memberof Vault.SecurityScoreData
         * @instance
         */
        SecurityScoreData.prototype.data = $util.newBuffer([]);

        /**
         * SecurityScoreData revision.
         * @member {number} revision
         * @memberof Vault.SecurityScoreData
         * @instance
         */
        SecurityScoreData.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new SecurityScoreData instance using the specified properties.
         * @function create
         * @memberof Vault.SecurityScoreData
         * @static
         * @param {Vault.ISecurityScoreData=} [properties] Properties to set
         * @returns {Vault.SecurityScoreData} SecurityScoreData instance
         */
        SecurityScoreData.create = function create(properties) {
            return new SecurityScoreData(properties);
        };

        /**
         * Encodes the specified SecurityScoreData message. Does not implicitly {@link Vault.SecurityScoreData.verify|verify} messages.
         * @function encode
         * @memberof Vault.SecurityScoreData
         * @static
         * @param {Vault.ISecurityScoreData} message SecurityScoreData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityScoreData.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.revision);
            return writer;
        };

        /**
         * Decodes a SecurityScoreData message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.SecurityScoreData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.SecurityScoreData} SecurityScoreData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityScoreData.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.SecurityScoreData();
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
                        message.data = reader.bytes();
                        break;
                    }
                case 3: {
                        message.revision = reader.int64();
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
         * Creates a SecurityScoreData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.SecurityScoreData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.SecurityScoreData} SecurityScoreData
         */
        SecurityScoreData.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.SecurityScoreData)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.SecurityScoreData: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.SecurityScoreData();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a SecurityScoreData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.SecurityScoreData
         * @static
         * @param {Vault.SecurityScoreData} message SecurityScoreData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SecurityScoreData.toObject = function toObject(message, options, q) {
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
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            return object;
        };

        /**
         * Converts this SecurityScoreData to JSON.
         * @function toJSON
         * @memberof Vault.SecurityScoreData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SecurityScoreData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SecurityScoreData
         * @function getTypeUrl
         * @memberof Vault.SecurityScoreData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SecurityScoreData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.SecurityScoreData";
        };

        return SecurityScoreData;
    })();

    Vault.BreachWatchGetSyncDataRequest = (function() {

        /**
         * Properties of a BreachWatchGetSyncDataRequest.
         * @memberof Vault
         * @interface IBreachWatchGetSyncDataRequest
         * @property {Array.<Uint8Array>|null} [recordUids] BreachWatchGetSyncDataRequest recordUids
         */

        /**
         * Constructs a new BreachWatchGetSyncDataRequest.
         * @memberof Vault
         * @classdesc Represents a BreachWatchGetSyncDataRequest.
         * @implements IBreachWatchGetSyncDataRequest
         * @constructor
         * @param {Vault.IBreachWatchGetSyncDataRequest=} [properties] Properties to set
         */
        function BreachWatchGetSyncDataRequest(properties) {
            this.recordUids = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BreachWatchGetSyncDataRequest recordUids.
         * @member {Array.<Uint8Array>} recordUids
         * @memberof Vault.BreachWatchGetSyncDataRequest
         * @instance
         */
        BreachWatchGetSyncDataRequest.prototype.recordUids = $util.emptyArray;

        /**
         * Creates a new BreachWatchGetSyncDataRequest instance using the specified properties.
         * @function create
         * @memberof Vault.BreachWatchGetSyncDataRequest
         * @static
         * @param {Vault.IBreachWatchGetSyncDataRequest=} [properties] Properties to set
         * @returns {Vault.BreachWatchGetSyncDataRequest} BreachWatchGetSyncDataRequest instance
         */
        BreachWatchGetSyncDataRequest.create = function create(properties) {
            return new BreachWatchGetSyncDataRequest(properties);
        };

        /**
         * Encodes the specified BreachWatchGetSyncDataRequest message. Does not implicitly {@link Vault.BreachWatchGetSyncDataRequest.verify|verify} messages.
         * @function encode
         * @memberof Vault.BreachWatchGetSyncDataRequest
         * @static
         * @param {Vault.IBreachWatchGetSyncDataRequest} message BreachWatchGetSyncDataRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BreachWatchGetSyncDataRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUids != null && message.recordUids.length)
                for (let i = 0; i < message.recordUids.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUids[i]);
            return writer;
        };

        /**
         * Decodes a BreachWatchGetSyncDataRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.BreachWatchGetSyncDataRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.BreachWatchGetSyncDataRequest} BreachWatchGetSyncDataRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BreachWatchGetSyncDataRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.BreachWatchGetSyncDataRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.recordUids && message.recordUids.length))
                            message.recordUids = [];
                        message.recordUids.push(reader.bytes());
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
         * Creates a BreachWatchGetSyncDataRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.BreachWatchGetSyncDataRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.BreachWatchGetSyncDataRequest} BreachWatchGetSyncDataRequest
         */
        BreachWatchGetSyncDataRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.BreachWatchGetSyncDataRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.BreachWatchGetSyncDataRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.BreachWatchGetSyncDataRequest();
            if (object.recordUids) {
                if (!Array.isArray(object.recordUids))
                    throw TypeError(".Vault.BreachWatchGetSyncDataRequest.recordUids: array expected");
                message.recordUids = [];
                for (let i = 0; i < object.recordUids.length; ++i)
                    if (typeof object.recordUids[i] === "string")
                        $util.base64.decode(object.recordUids[i], message.recordUids[i] = $util.newBuffer($util.base64.length(object.recordUids[i])), 0);
                    else if (object.recordUids[i].length >= 0)
                        message.recordUids[i] = object.recordUids[i];
            }
            return message;
        };

        /**
         * Creates a plain object from a BreachWatchGetSyncDataRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.BreachWatchGetSyncDataRequest
         * @static
         * @param {Vault.BreachWatchGetSyncDataRequest} message BreachWatchGetSyncDataRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BreachWatchGetSyncDataRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.recordUids = [];
            if (message.recordUids && message.recordUids.length) {
                object.recordUids = [];
                for (let j = 0; j < message.recordUids.length; ++j)
                    object.recordUids[j] = options.bytes === String ? $util.base64.encode(message.recordUids[j], 0, message.recordUids[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUids[j]) : message.recordUids[j];
            }
            return object;
        };

        /**
         * Converts this BreachWatchGetSyncDataRequest to JSON.
         * @function toJSON
         * @memberof Vault.BreachWatchGetSyncDataRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BreachWatchGetSyncDataRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BreachWatchGetSyncDataRequest
         * @function getTypeUrl
         * @memberof Vault.BreachWatchGetSyncDataRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BreachWatchGetSyncDataRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.BreachWatchGetSyncDataRequest";
        };

        return BreachWatchGetSyncDataRequest;
    })();

    Vault.BreachWatchGetSyncDataResponse = (function() {

        /**
         * Properties of a BreachWatchGetSyncDataResponse.
         * @memberof Vault
         * @interface IBreachWatchGetSyncDataResponse
         * @property {Array.<Vault.IBreachWatchRecord>|null} [breachWatchRecords] BreachWatchGetSyncDataResponse breachWatchRecords
         * @property {Array.<Vault.IBreachWatchSecurityData>|null} [breachWatchSecurityData] BreachWatchGetSyncDataResponse breachWatchSecurityData
         * @property {Array.<Vault.IUser>|null} [users] BreachWatchGetSyncDataResponse users
         */

        /**
         * Constructs a new BreachWatchGetSyncDataResponse.
         * @memberof Vault
         * @classdesc Represents a BreachWatchGetSyncDataResponse.
         * @implements IBreachWatchGetSyncDataResponse
         * @constructor
         * @param {Vault.IBreachWatchGetSyncDataResponse=} [properties] Properties to set
         */
        function BreachWatchGetSyncDataResponse(properties) {
            this.breachWatchRecords = [];
            this.breachWatchSecurityData = [];
            this.users = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BreachWatchGetSyncDataResponse breachWatchRecords.
         * @member {Array.<Vault.IBreachWatchRecord>} breachWatchRecords
         * @memberof Vault.BreachWatchGetSyncDataResponse
         * @instance
         */
        BreachWatchGetSyncDataResponse.prototype.breachWatchRecords = $util.emptyArray;

        /**
         * BreachWatchGetSyncDataResponse breachWatchSecurityData.
         * @member {Array.<Vault.IBreachWatchSecurityData>} breachWatchSecurityData
         * @memberof Vault.BreachWatchGetSyncDataResponse
         * @instance
         */
        BreachWatchGetSyncDataResponse.prototype.breachWatchSecurityData = $util.emptyArray;

        /**
         * BreachWatchGetSyncDataResponse users.
         * @member {Array.<Vault.IUser>} users
         * @memberof Vault.BreachWatchGetSyncDataResponse
         * @instance
         */
        BreachWatchGetSyncDataResponse.prototype.users = $util.emptyArray;

        /**
         * Creates a new BreachWatchGetSyncDataResponse instance using the specified properties.
         * @function create
         * @memberof Vault.BreachWatchGetSyncDataResponse
         * @static
         * @param {Vault.IBreachWatchGetSyncDataResponse=} [properties] Properties to set
         * @returns {Vault.BreachWatchGetSyncDataResponse} BreachWatchGetSyncDataResponse instance
         */
        BreachWatchGetSyncDataResponse.create = function create(properties) {
            return new BreachWatchGetSyncDataResponse(properties);
        };

        /**
         * Encodes the specified BreachWatchGetSyncDataResponse message. Does not implicitly {@link Vault.BreachWatchGetSyncDataResponse.verify|verify} messages.
         * @function encode
         * @memberof Vault.BreachWatchGetSyncDataResponse
         * @static
         * @param {Vault.IBreachWatchGetSyncDataResponse} message BreachWatchGetSyncDataResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BreachWatchGetSyncDataResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.breachWatchRecords != null && message.breachWatchRecords.length)
                for (let i = 0; i < message.breachWatchRecords.length; ++i)
                    $root.Vault.BreachWatchRecord.encode(message.breachWatchRecords[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.breachWatchSecurityData != null && message.breachWatchSecurityData.length)
                for (let i = 0; i < message.breachWatchSecurityData.length; ++i)
                    $root.Vault.BreachWatchSecurityData.encode(message.breachWatchSecurityData[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.users != null && message.users.length)
                for (let i = 0; i < message.users.length; ++i)
                    $root.Vault.User.encode(message.users[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a BreachWatchGetSyncDataResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.BreachWatchGetSyncDataResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.BreachWatchGetSyncDataResponse} BreachWatchGetSyncDataResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BreachWatchGetSyncDataResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.BreachWatchGetSyncDataResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.breachWatchRecords && message.breachWatchRecords.length))
                            message.breachWatchRecords = [];
                        message.breachWatchRecords.push($root.Vault.BreachWatchRecord.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        if (!(message.breachWatchSecurityData && message.breachWatchSecurityData.length))
                            message.breachWatchSecurityData = [];
                        message.breachWatchSecurityData.push($root.Vault.BreachWatchSecurityData.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 3: {
                        if (!(message.users && message.users.length))
                            message.users = [];
                        message.users.push($root.Vault.User.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a BreachWatchGetSyncDataResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.BreachWatchGetSyncDataResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.BreachWatchGetSyncDataResponse} BreachWatchGetSyncDataResponse
         */
        BreachWatchGetSyncDataResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.BreachWatchGetSyncDataResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.BreachWatchGetSyncDataResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.BreachWatchGetSyncDataResponse();
            if (object.breachWatchRecords) {
                if (!Array.isArray(object.breachWatchRecords))
                    throw TypeError(".Vault.BreachWatchGetSyncDataResponse.breachWatchRecords: array expected");
                message.breachWatchRecords = [];
                for (let i = 0; i < object.breachWatchRecords.length; ++i) {
                    if (!$util.isObject(object.breachWatchRecords[i]))
                        throw TypeError(".Vault.BreachWatchGetSyncDataResponse.breachWatchRecords: object expected");
                    message.breachWatchRecords[i] = $root.Vault.BreachWatchRecord.fromObject(object.breachWatchRecords[i], long + 1);
                }
            }
            if (object.breachWatchSecurityData) {
                if (!Array.isArray(object.breachWatchSecurityData))
                    throw TypeError(".Vault.BreachWatchGetSyncDataResponse.breachWatchSecurityData: array expected");
                message.breachWatchSecurityData = [];
                for (let i = 0; i < object.breachWatchSecurityData.length; ++i) {
                    if (!$util.isObject(object.breachWatchSecurityData[i]))
                        throw TypeError(".Vault.BreachWatchGetSyncDataResponse.breachWatchSecurityData: object expected");
                    message.breachWatchSecurityData[i] = $root.Vault.BreachWatchSecurityData.fromObject(object.breachWatchSecurityData[i], long + 1);
                }
            }
            if (object.users) {
                if (!Array.isArray(object.users))
                    throw TypeError(".Vault.BreachWatchGetSyncDataResponse.users: array expected");
                message.users = [];
                for (let i = 0; i < object.users.length; ++i) {
                    if (!$util.isObject(object.users[i]))
                        throw TypeError(".Vault.BreachWatchGetSyncDataResponse.users: object expected");
                    message.users[i] = $root.Vault.User.fromObject(object.users[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a BreachWatchGetSyncDataResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.BreachWatchGetSyncDataResponse
         * @static
         * @param {Vault.BreachWatchGetSyncDataResponse} message BreachWatchGetSyncDataResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BreachWatchGetSyncDataResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.breachWatchRecords = [];
                object.breachWatchSecurityData = [];
                object.users = [];
            }
            if (message.breachWatchRecords && message.breachWatchRecords.length) {
                object.breachWatchRecords = [];
                for (let j = 0; j < message.breachWatchRecords.length; ++j)
                    object.breachWatchRecords[j] = $root.Vault.BreachWatchRecord.toObject(message.breachWatchRecords[j], options, q + 1);
            }
            if (message.breachWatchSecurityData && message.breachWatchSecurityData.length) {
                object.breachWatchSecurityData = [];
                for (let j = 0; j < message.breachWatchSecurityData.length; ++j)
                    object.breachWatchSecurityData[j] = $root.Vault.BreachWatchSecurityData.toObject(message.breachWatchSecurityData[j], options, q + 1);
            }
            if (message.users && message.users.length) {
                object.users = [];
                for (let j = 0; j < message.users.length; ++j)
                    object.users[j] = $root.Vault.User.toObject(message.users[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this BreachWatchGetSyncDataResponse to JSON.
         * @function toJSON
         * @memberof Vault.BreachWatchGetSyncDataResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BreachWatchGetSyncDataResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BreachWatchGetSyncDataResponse
         * @function getTypeUrl
         * @memberof Vault.BreachWatchGetSyncDataResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BreachWatchGetSyncDataResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.BreachWatchGetSyncDataResponse";
        };

        return BreachWatchGetSyncDataResponse;
    })();

    Vault.GetAccountUidMapResponse = (function() {

        /**
         * Properties of a GetAccountUidMapResponse.
         * @memberof Vault
         * @interface IGetAccountUidMapResponse
         * @property {Array.<Vault.IUser>|null} [users] GetAccountUidMapResponse users
         */

        /**
         * Constructs a new GetAccountUidMapResponse.
         * @memberof Vault
         * @classdesc Represents a GetAccountUidMapResponse.
         * @implements IGetAccountUidMapResponse
         * @constructor
         * @param {Vault.IGetAccountUidMapResponse=} [properties] Properties to set
         */
        function GetAccountUidMapResponse(properties) {
            this.users = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetAccountUidMapResponse users.
         * @member {Array.<Vault.IUser>} users
         * @memberof Vault.GetAccountUidMapResponse
         * @instance
         */
        GetAccountUidMapResponse.prototype.users = $util.emptyArray;

        /**
         * Creates a new GetAccountUidMapResponse instance using the specified properties.
         * @function create
         * @memberof Vault.GetAccountUidMapResponse
         * @static
         * @param {Vault.IGetAccountUidMapResponse=} [properties] Properties to set
         * @returns {Vault.GetAccountUidMapResponse} GetAccountUidMapResponse instance
         */
        GetAccountUidMapResponse.create = function create(properties) {
            return new GetAccountUidMapResponse(properties);
        };

        /**
         * Encodes the specified GetAccountUidMapResponse message. Does not implicitly {@link Vault.GetAccountUidMapResponse.verify|verify} messages.
         * @function encode
         * @memberof Vault.GetAccountUidMapResponse
         * @static
         * @param {Vault.IGetAccountUidMapResponse} message GetAccountUidMapResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetAccountUidMapResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.users != null && message.users.length)
                for (let i = 0; i < message.users.length; ++i)
                    $root.Vault.User.encode(message.users[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a GetAccountUidMapResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Vault.GetAccountUidMapResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Vault.GetAccountUidMapResponse} GetAccountUidMapResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetAccountUidMapResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Vault.GetAccountUidMapResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.users && message.users.length))
                            message.users = [];
                        message.users.push($root.Vault.User.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a GetAccountUidMapResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Vault.GetAccountUidMapResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Vault.GetAccountUidMapResponse} GetAccountUidMapResponse
         */
        GetAccountUidMapResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Vault.GetAccountUidMapResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Vault.GetAccountUidMapResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Vault.GetAccountUidMapResponse();
            if (object.users) {
                if (!Array.isArray(object.users))
                    throw TypeError(".Vault.GetAccountUidMapResponse.users: array expected");
                message.users = [];
                for (let i = 0; i < object.users.length; ++i) {
                    if (!$util.isObject(object.users[i]))
                        throw TypeError(".Vault.GetAccountUidMapResponse.users: object expected");
                    message.users[i] = $root.Vault.User.fromObject(object.users[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GetAccountUidMapResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Vault.GetAccountUidMapResponse
         * @static
         * @param {Vault.GetAccountUidMapResponse} message GetAccountUidMapResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetAccountUidMapResponse.toObject = function toObject(message, options, q) {
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
                    object.users[j] = $root.Vault.User.toObject(message.users[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this GetAccountUidMapResponse to JSON.
         * @function toJSON
         * @memberof Vault.GetAccountUidMapResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetAccountUidMapResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetAccountUidMapResponse
         * @function getTypeUrl
         * @memberof Vault.GetAccountUidMapResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetAccountUidMapResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Vault.GetAccountUidMapResponse";
        };

        return GetAccountUidMapResponse;
    })();

    return Vault;
})();

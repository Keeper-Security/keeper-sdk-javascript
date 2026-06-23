/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const AccountSummary = $root.AccountSummary = (() => {

    /**
     * Namespace AccountSummary.
     * @exports AccountSummary
     * @namespace
     */
    const AccountSummary = {};

    AccountSummary.AccountSummaryRequest = (function() {

        /**
         * Properties of an AccountSummaryRequest.
         * @memberof AccountSummary
         * @interface IAccountSummaryRequest
         * @property {number|null} [summaryVersion] AccountSummaryRequest summaryVersion
         * @property {boolean|null} [includeRecentActivity] AccountSummaryRequest includeRecentActivity
         */

        /**
         * Constructs a new AccountSummaryRequest.
         * @memberof AccountSummary
         * @classdesc Represents an AccountSummaryRequest.
         * @implements IAccountSummaryRequest
         * @constructor
         * @param {AccountSummary.IAccountSummaryRequest=} [properties] Properties to set
         */
        function AccountSummaryRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AccountSummaryRequest summaryVersion.
         * @member {number} summaryVersion
         * @memberof AccountSummary.AccountSummaryRequest
         * @instance
         */
        AccountSummaryRequest.prototype.summaryVersion = 0;

        /**
         * AccountSummaryRequest includeRecentActivity.
         * @member {boolean} includeRecentActivity
         * @memberof AccountSummary.AccountSummaryRequest
         * @instance
         */
        AccountSummaryRequest.prototype.includeRecentActivity = false;

        /**
         * Creates a new AccountSummaryRequest instance using the specified properties.
         * @function create
         * @memberof AccountSummary.AccountSummaryRequest
         * @static
         * @param {AccountSummary.IAccountSummaryRequest=} [properties] Properties to set
         * @returns {AccountSummary.AccountSummaryRequest} AccountSummaryRequest instance
         */
        AccountSummaryRequest.create = function create(properties) {
            return new AccountSummaryRequest(properties);
        };

        /**
         * Encodes the specified AccountSummaryRequest message. Does not implicitly {@link AccountSummary.AccountSummaryRequest.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.AccountSummaryRequest
         * @static
         * @param {AccountSummary.IAccountSummaryRequest} message AccountSummaryRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AccountSummaryRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.summaryVersion != null && Object.hasOwnProperty.call(message, "summaryVersion"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.summaryVersion);
            if (message.includeRecentActivity != null && Object.hasOwnProperty.call(message, "includeRecentActivity"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.includeRecentActivity);
            return writer;
        };

        /**
         * Encodes the specified AccountSummaryRequest message, length delimited. Does not implicitly {@link AccountSummary.AccountSummaryRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.AccountSummaryRequest
         * @static
         * @param {AccountSummary.IAccountSummaryRequest} message AccountSummaryRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AccountSummaryRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AccountSummaryRequest message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.AccountSummaryRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.AccountSummaryRequest} AccountSummaryRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AccountSummaryRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.AccountSummaryRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.summaryVersion = reader.int32();
                        break;
                    }
                case 2: {
                        message.includeRecentActivity = reader.bool();
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
         * Decodes an AccountSummaryRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.AccountSummaryRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.AccountSummaryRequest} AccountSummaryRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AccountSummaryRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AccountSummaryRequest message.
         * @function verify
         * @memberof AccountSummary.AccountSummaryRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AccountSummaryRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.summaryVersion != null && Object.hasOwnProperty.call(message, "summaryVersion"))
                if (!$util.isInteger(message.summaryVersion))
                    return "summaryVersion: integer expected";
            if (message.includeRecentActivity != null && Object.hasOwnProperty.call(message, "includeRecentActivity"))
                if (typeof message.includeRecentActivity !== "boolean")
                    return "includeRecentActivity: boolean expected";
            return null;
        };

        /**
         * Creates an AccountSummaryRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.AccountSummaryRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.AccountSummaryRequest} AccountSummaryRequest
         */
        AccountSummaryRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.AccountSummaryRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.AccountSummaryRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.AccountSummaryRequest();
            if (object.summaryVersion != null)
                message.summaryVersion = object.summaryVersion | 0;
            if (object.includeRecentActivity != null)
                message.includeRecentActivity = Boolean(object.includeRecentActivity);
            return message;
        };

        /**
         * Creates a plain object from an AccountSummaryRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.AccountSummaryRequest
         * @static
         * @param {AccountSummary.AccountSummaryRequest} message AccountSummaryRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AccountSummaryRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.summaryVersion = 0;
                object.includeRecentActivity = false;
            }
            if (message.summaryVersion != null && Object.hasOwnProperty.call(message, "summaryVersion"))
                object.summaryVersion = message.summaryVersion;
            if (message.includeRecentActivity != null && Object.hasOwnProperty.call(message, "includeRecentActivity"))
                object.includeRecentActivity = message.includeRecentActivity;
            return object;
        };

        /**
         * Converts this AccountSummaryRequest to JSON.
         * @function toJSON
         * @memberof AccountSummary.AccountSummaryRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AccountSummaryRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AccountSummaryRequest
         * @function getTypeUrl
         * @memberof AccountSummary.AccountSummaryRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AccountSummaryRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.AccountSummaryRequest";
        };

        return AccountSummaryRequest;
    })();

    AccountSummary.AccountSummaryElements = (function() {

        /**
         * Properties of an AccountSummaryElements.
         * @memberof AccountSummary
         * @interface IAccountSummaryElements
         * @property {Uint8Array|null} [clientKey] AccountSummaryElements clientKey
         * @property {AccountSummary.ISettings|null} [settings] AccountSummaryElements settings
         * @property {AccountSummary.IKeysInfo|null} [keysInfo] AccountSummaryElements keysInfo
         * @property {Array.<AccountSummary.ISyncLog>|null} [syncLogs] AccountSummaryElements syncLogs
         * @property {boolean|null} [isEnterpriseAdmin] AccountSummaryElements isEnterpriseAdmin
         * @property {AccountSummary.ILicense|null} [license] AccountSummaryElements license
         * @property {AccountSummary.IGroup|null} [group] AccountSummaryElements group
         * @property {AccountSummary.IEnforcements|null} [Enforcements] AccountSummaryElements Enforcements
         * @property {Array.<AccountSummary.IKeyValue>|null} [Images] AccountSummaryElements Images
         * @property {AccountSummary.ILicense|null} [personalLicense] AccountSummaryElements personalLicense
         * @property {boolean|null} [fixSharedFolderRecords] AccountSummaryElements fixSharedFolderRecords
         * @property {Array.<string>|null} [usernames] AccountSummaryElements usernames
         * @property {Array.<AccountSummary.IDeviceInfo>|null} [devices] AccountSummaryElements devices
         * @property {boolean|null} [isShareAdmin] AccountSummaryElements isShareAdmin
         * @property {boolean|null} [accountRecovery] AccountSummaryElements accountRecovery
         * @property {boolean|null} [accountRecoveryPrompt] AccountSummaryElements accountRecoveryPrompt
         * @property {number|null} [minMasterPasswordLengthNoPrompt] AccountSummaryElements minMasterPasswordLengthNoPrompt
         * @property {boolean|null} [forbidKeyType2] AccountSummaryElements forbidKeyType2
         * @property {boolean|null} [forbidKeyType1] AccountSummaryElements forbidKeyType1
         * @property {Array.<string>|null} [disallowedFeatures] AccountSummaryElements disallowedFeatures
         */

        /**
         * Constructs a new AccountSummaryElements.
         * @memberof AccountSummary
         * @classdesc Represents an AccountSummaryElements.
         * @implements IAccountSummaryElements
         * @constructor
         * @param {AccountSummary.IAccountSummaryElements=} [properties] Properties to set
         */
        function AccountSummaryElements(properties) {
            this.syncLogs = [];
            this.Images = [];
            this.usernames = [];
            this.devices = [];
            this.disallowedFeatures = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AccountSummaryElements clientKey.
         * @member {Uint8Array} clientKey
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.clientKey = $util.newBuffer([]);

        /**
         * AccountSummaryElements settings.
         * @member {AccountSummary.ISettings|null|undefined} settings
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.settings = null;

        /**
         * AccountSummaryElements keysInfo.
         * @member {AccountSummary.IKeysInfo|null|undefined} keysInfo
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.keysInfo = null;

        /**
         * AccountSummaryElements syncLogs.
         * @member {Array.<AccountSummary.ISyncLog>} syncLogs
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.syncLogs = $util.emptyArray;

        /**
         * AccountSummaryElements isEnterpriseAdmin.
         * @member {boolean} isEnterpriseAdmin
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.isEnterpriseAdmin = false;

        /**
         * AccountSummaryElements license.
         * @member {AccountSummary.ILicense|null|undefined} license
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.license = null;

        /**
         * AccountSummaryElements group.
         * @member {AccountSummary.IGroup|null|undefined} group
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.group = null;

        /**
         * AccountSummaryElements Enforcements.
         * @member {AccountSummary.IEnforcements|null|undefined} Enforcements
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.Enforcements = null;

        /**
         * AccountSummaryElements Images.
         * @member {Array.<AccountSummary.IKeyValue>} Images
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.Images = $util.emptyArray;

        /**
         * AccountSummaryElements personalLicense.
         * @member {AccountSummary.ILicense|null|undefined} personalLicense
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.personalLicense = null;

        /**
         * AccountSummaryElements fixSharedFolderRecords.
         * @member {boolean} fixSharedFolderRecords
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.fixSharedFolderRecords = false;

        /**
         * AccountSummaryElements usernames.
         * @member {Array.<string>} usernames
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.usernames = $util.emptyArray;

        /**
         * AccountSummaryElements devices.
         * @member {Array.<AccountSummary.IDeviceInfo>} devices
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.devices = $util.emptyArray;

        /**
         * AccountSummaryElements isShareAdmin.
         * @member {boolean} isShareAdmin
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.isShareAdmin = false;

        /**
         * AccountSummaryElements accountRecovery.
         * @member {boolean} accountRecovery
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.accountRecovery = false;

        /**
         * AccountSummaryElements accountRecoveryPrompt.
         * @member {boolean} accountRecoveryPrompt
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.accountRecoveryPrompt = false;

        /**
         * AccountSummaryElements minMasterPasswordLengthNoPrompt.
         * @member {number} minMasterPasswordLengthNoPrompt
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.minMasterPasswordLengthNoPrompt = 0;

        /**
         * AccountSummaryElements forbidKeyType2.
         * @member {boolean} forbidKeyType2
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.forbidKeyType2 = false;

        /**
         * AccountSummaryElements forbidKeyType1.
         * @member {boolean} forbidKeyType1
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.forbidKeyType1 = false;

        /**
         * AccountSummaryElements disallowedFeatures.
         * @member {Array.<string>} disallowedFeatures
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         */
        AccountSummaryElements.prototype.disallowedFeatures = $util.emptyArray;

        /**
         * Creates a new AccountSummaryElements instance using the specified properties.
         * @function create
         * @memberof AccountSummary.AccountSummaryElements
         * @static
         * @param {AccountSummary.IAccountSummaryElements=} [properties] Properties to set
         * @returns {AccountSummary.AccountSummaryElements} AccountSummaryElements instance
         */
        AccountSummaryElements.create = function create(properties) {
            return new AccountSummaryElements(properties);
        };

        /**
         * Encodes the specified AccountSummaryElements message. Does not implicitly {@link AccountSummary.AccountSummaryElements.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.AccountSummaryElements
         * @static
         * @param {AccountSummary.IAccountSummaryElements} message AccountSummaryElements message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AccountSummaryElements.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.clientKey != null && Object.hasOwnProperty.call(message, "clientKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.clientKey);
            if (message.settings != null && Object.hasOwnProperty.call(message, "settings"))
                $root.AccountSummary.Settings.encode(message.settings, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.keysInfo != null && Object.hasOwnProperty.call(message, "keysInfo"))
                $root.AccountSummary.KeysInfo.encode(message.keysInfo, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.syncLogs != null && message.syncLogs.length)
                for (let i = 0; i < message.syncLogs.length; ++i)
                    $root.AccountSummary.SyncLog.encode(message.syncLogs[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.isEnterpriseAdmin != null && Object.hasOwnProperty.call(message, "isEnterpriseAdmin"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isEnterpriseAdmin);
            if (message.license != null && Object.hasOwnProperty.call(message, "license"))
                $root.AccountSummary.License.encode(message.license, writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                $root.AccountSummary.Group.encode(message.group, writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            if (message.Enforcements != null && Object.hasOwnProperty.call(message, "Enforcements"))
                $root.AccountSummary.Enforcements.encode(message.Enforcements, writer.uint32(/* id 8, wireType 2 =*/66).fork(), q + 1).ldelim();
            if (message.Images != null && message.Images.length)
                for (let i = 0; i < message.Images.length; ++i)
                    $root.AccountSummary.KeyValue.encode(message.Images[i], writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
            if (message.personalLicense != null && Object.hasOwnProperty.call(message, "personalLicense"))
                $root.AccountSummary.License.encode(message.personalLicense, writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
            if (message.fixSharedFolderRecords != null && Object.hasOwnProperty.call(message, "fixSharedFolderRecords"))
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.fixSharedFolderRecords);
            if (message.usernames != null && message.usernames.length)
                for (let i = 0; i < message.usernames.length; ++i)
                    writer.uint32(/* id 12, wireType 2 =*/98).string(message.usernames[i]);
            if (message.devices != null && message.devices.length)
                for (let i = 0; i < message.devices.length; ++i)
                    $root.AccountSummary.DeviceInfo.encode(message.devices[i], writer.uint32(/* id 13, wireType 2 =*/106).fork(), q + 1).ldelim();
            if (message.isShareAdmin != null && Object.hasOwnProperty.call(message, "isShareAdmin"))
                writer.uint32(/* id 14, wireType 0 =*/112).bool(message.isShareAdmin);
            if (message.accountRecovery != null && Object.hasOwnProperty.call(message, "accountRecovery"))
                writer.uint32(/* id 15, wireType 0 =*/120).bool(message.accountRecovery);
            if (message.accountRecoveryPrompt != null && Object.hasOwnProperty.call(message, "accountRecoveryPrompt"))
                writer.uint32(/* id 16, wireType 0 =*/128).bool(message.accountRecoveryPrompt);
            if (message.minMasterPasswordLengthNoPrompt != null && Object.hasOwnProperty.call(message, "minMasterPasswordLengthNoPrompt"))
                writer.uint32(/* id 17, wireType 0 =*/136).int32(message.minMasterPasswordLengthNoPrompt);
            if (message.forbidKeyType2 != null && Object.hasOwnProperty.call(message, "forbidKeyType2"))
                writer.uint32(/* id 18, wireType 0 =*/144).bool(message.forbidKeyType2);
            if (message.forbidKeyType1 != null && Object.hasOwnProperty.call(message, "forbidKeyType1"))
                writer.uint32(/* id 19, wireType 0 =*/152).bool(message.forbidKeyType1);
            if (message.disallowedFeatures != null && message.disallowedFeatures.length)
                for (let i = 0; i < message.disallowedFeatures.length; ++i)
                    writer.uint32(/* id 20, wireType 2 =*/162).string(message.disallowedFeatures[i]);
            return writer;
        };

        /**
         * Encodes the specified AccountSummaryElements message, length delimited. Does not implicitly {@link AccountSummary.AccountSummaryElements.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.AccountSummaryElements
         * @static
         * @param {AccountSummary.IAccountSummaryElements} message AccountSummaryElements message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AccountSummaryElements.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AccountSummaryElements message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.AccountSummaryElements
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.AccountSummaryElements} AccountSummaryElements
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AccountSummaryElements.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.AccountSummaryElements();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.clientKey = reader.bytes();
                        break;
                    }
                case 2: {
                        message.settings = $root.AccountSummary.Settings.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.keysInfo = $root.AccountSummary.KeysInfo.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        if (!(message.syncLogs && message.syncLogs.length))
                            message.syncLogs = [];
                        message.syncLogs.push($root.AccountSummary.SyncLog.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 5: {
                        message.isEnterpriseAdmin = reader.bool();
                        break;
                    }
                case 6: {
                        message.license = $root.AccountSummary.License.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 7: {
                        message.group = $root.AccountSummary.Group.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 8: {
                        message.Enforcements = $root.AccountSummary.Enforcements.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 9: {
                        if (!(message.Images && message.Images.length))
                            message.Images = [];
                        message.Images.push($root.AccountSummary.KeyValue.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 10: {
                        message.personalLicense = $root.AccountSummary.License.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 11: {
                        message.fixSharedFolderRecords = reader.bool();
                        break;
                    }
                case 12: {
                        if (!(message.usernames && message.usernames.length))
                            message.usernames = [];
                        message.usernames.push(reader.string());
                        break;
                    }
                case 13: {
                        if (!(message.devices && message.devices.length))
                            message.devices = [];
                        message.devices.push($root.AccountSummary.DeviceInfo.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 14: {
                        message.isShareAdmin = reader.bool();
                        break;
                    }
                case 15: {
                        message.accountRecovery = reader.bool();
                        break;
                    }
                case 16: {
                        message.accountRecoveryPrompt = reader.bool();
                        break;
                    }
                case 17: {
                        message.minMasterPasswordLengthNoPrompt = reader.int32();
                        break;
                    }
                case 18: {
                        message.forbidKeyType2 = reader.bool();
                        break;
                    }
                case 19: {
                        message.forbidKeyType1 = reader.bool();
                        break;
                    }
                case 20: {
                        if (!(message.disallowedFeatures && message.disallowedFeatures.length))
                            message.disallowedFeatures = [];
                        message.disallowedFeatures.push(reader.string());
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
         * Decodes an AccountSummaryElements message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.AccountSummaryElements
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.AccountSummaryElements} AccountSummaryElements
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AccountSummaryElements.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AccountSummaryElements message.
         * @function verify
         * @memberof AccountSummary.AccountSummaryElements
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AccountSummaryElements.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.clientKey != null && Object.hasOwnProperty.call(message, "clientKey"))
                if (!(message.clientKey && typeof message.clientKey.length === "number" || $util.isString(message.clientKey)))
                    return "clientKey: buffer expected";
            if (message.settings != null && Object.hasOwnProperty.call(message, "settings")) {
                let error = $root.AccountSummary.Settings.verify(message.settings, long + 1);
                if (error)
                    return "settings." + error;
            }
            if (message.keysInfo != null && Object.hasOwnProperty.call(message, "keysInfo")) {
                let error = $root.AccountSummary.KeysInfo.verify(message.keysInfo, long + 1);
                if (error)
                    return "keysInfo." + error;
            }
            if (message.syncLogs != null && Object.hasOwnProperty.call(message, "syncLogs")) {
                if (!Array.isArray(message.syncLogs))
                    return "syncLogs: array expected";
                for (let i = 0; i < message.syncLogs.length; ++i) {
                    let error = $root.AccountSummary.SyncLog.verify(message.syncLogs[i], long + 1);
                    if (error)
                        return "syncLogs." + error;
                }
            }
            if (message.isEnterpriseAdmin != null && Object.hasOwnProperty.call(message, "isEnterpriseAdmin"))
                if (typeof message.isEnterpriseAdmin !== "boolean")
                    return "isEnterpriseAdmin: boolean expected";
            if (message.license != null && Object.hasOwnProperty.call(message, "license")) {
                let error = $root.AccountSummary.License.verify(message.license, long + 1);
                if (error)
                    return "license." + error;
            }
            if (message.group != null && Object.hasOwnProperty.call(message, "group")) {
                let error = $root.AccountSummary.Group.verify(message.group, long + 1);
                if (error)
                    return "group." + error;
            }
            if (message.Enforcements != null && Object.hasOwnProperty.call(message, "Enforcements")) {
                let error = $root.AccountSummary.Enforcements.verify(message.Enforcements, long + 1);
                if (error)
                    return "Enforcements." + error;
            }
            if (message.Images != null && Object.hasOwnProperty.call(message, "Images")) {
                if (!Array.isArray(message.Images))
                    return "Images: array expected";
                for (let i = 0; i < message.Images.length; ++i) {
                    let error = $root.AccountSummary.KeyValue.verify(message.Images[i], long + 1);
                    if (error)
                        return "Images." + error;
                }
            }
            if (message.personalLicense != null && Object.hasOwnProperty.call(message, "personalLicense")) {
                let error = $root.AccountSummary.License.verify(message.personalLicense, long + 1);
                if (error)
                    return "personalLicense." + error;
            }
            if (message.fixSharedFolderRecords != null && Object.hasOwnProperty.call(message, "fixSharedFolderRecords"))
                if (typeof message.fixSharedFolderRecords !== "boolean")
                    return "fixSharedFolderRecords: boolean expected";
            if (message.usernames != null && Object.hasOwnProperty.call(message, "usernames")) {
                if (!Array.isArray(message.usernames))
                    return "usernames: array expected";
                for (let i = 0; i < message.usernames.length; ++i)
                    if (!$util.isString(message.usernames[i]))
                        return "usernames: string[] expected";
            }
            if (message.devices != null && Object.hasOwnProperty.call(message, "devices")) {
                if (!Array.isArray(message.devices))
                    return "devices: array expected";
                for (let i = 0; i < message.devices.length; ++i) {
                    let error = $root.AccountSummary.DeviceInfo.verify(message.devices[i], long + 1);
                    if (error)
                        return "devices." + error;
                }
            }
            if (message.isShareAdmin != null && Object.hasOwnProperty.call(message, "isShareAdmin"))
                if (typeof message.isShareAdmin !== "boolean")
                    return "isShareAdmin: boolean expected";
            if (message.accountRecovery != null && Object.hasOwnProperty.call(message, "accountRecovery"))
                if (typeof message.accountRecovery !== "boolean")
                    return "accountRecovery: boolean expected";
            if (message.accountRecoveryPrompt != null && Object.hasOwnProperty.call(message, "accountRecoveryPrompt"))
                if (typeof message.accountRecoveryPrompt !== "boolean")
                    return "accountRecoveryPrompt: boolean expected";
            if (message.minMasterPasswordLengthNoPrompt != null && Object.hasOwnProperty.call(message, "minMasterPasswordLengthNoPrompt"))
                if (!$util.isInteger(message.minMasterPasswordLengthNoPrompt))
                    return "minMasterPasswordLengthNoPrompt: integer expected";
            if (message.forbidKeyType2 != null && Object.hasOwnProperty.call(message, "forbidKeyType2"))
                if (typeof message.forbidKeyType2 !== "boolean")
                    return "forbidKeyType2: boolean expected";
            if (message.forbidKeyType1 != null && Object.hasOwnProperty.call(message, "forbidKeyType1"))
                if (typeof message.forbidKeyType1 !== "boolean")
                    return "forbidKeyType1: boolean expected";
            if (message.disallowedFeatures != null && Object.hasOwnProperty.call(message, "disallowedFeatures")) {
                if (!Array.isArray(message.disallowedFeatures))
                    return "disallowedFeatures: array expected";
                for (let i = 0; i < message.disallowedFeatures.length; ++i)
                    if (!$util.isString(message.disallowedFeatures[i]))
                        return "disallowedFeatures: string[] expected";
            }
            return null;
        };

        /**
         * Creates an AccountSummaryElements message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.AccountSummaryElements
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.AccountSummaryElements} AccountSummaryElements
         */
        AccountSummaryElements.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.AccountSummaryElements)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.AccountSummaryElements: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.AccountSummaryElements();
            if (object.clientKey != null)
                if (typeof object.clientKey === "string")
                    $util.base64.decode(object.clientKey, message.clientKey = $util.newBuffer($util.base64.length(object.clientKey)), 0);
                else if (object.clientKey.length >= 0)
                    message.clientKey = object.clientKey;
            if (object.settings != null) {
                if (!$util.isObject(object.settings))
                    throw TypeError(".AccountSummary.AccountSummaryElements.settings: object expected");
                message.settings = $root.AccountSummary.Settings.fromObject(object.settings, long + 1);
            }
            if (object.keysInfo != null) {
                if (!$util.isObject(object.keysInfo))
                    throw TypeError(".AccountSummary.AccountSummaryElements.keysInfo: object expected");
                message.keysInfo = $root.AccountSummary.KeysInfo.fromObject(object.keysInfo, long + 1);
            }
            if (object.syncLogs) {
                if (!Array.isArray(object.syncLogs))
                    throw TypeError(".AccountSummary.AccountSummaryElements.syncLogs: array expected");
                message.syncLogs = [];
                for (let i = 0; i < object.syncLogs.length; ++i) {
                    if (!$util.isObject(object.syncLogs[i]))
                        throw TypeError(".AccountSummary.AccountSummaryElements.syncLogs: object expected");
                    message.syncLogs[i] = $root.AccountSummary.SyncLog.fromObject(object.syncLogs[i], long + 1);
                }
            }
            if (object.isEnterpriseAdmin != null)
                message.isEnterpriseAdmin = Boolean(object.isEnterpriseAdmin);
            if (object.license != null) {
                if (!$util.isObject(object.license))
                    throw TypeError(".AccountSummary.AccountSummaryElements.license: object expected");
                message.license = $root.AccountSummary.License.fromObject(object.license, long + 1);
            }
            if (object.group != null) {
                if (!$util.isObject(object.group))
                    throw TypeError(".AccountSummary.AccountSummaryElements.group: object expected");
                message.group = $root.AccountSummary.Group.fromObject(object.group, long + 1);
            }
            if (object.Enforcements != null) {
                if (!$util.isObject(object.Enforcements))
                    throw TypeError(".AccountSummary.AccountSummaryElements.Enforcements: object expected");
                message.Enforcements = $root.AccountSummary.Enforcements.fromObject(object.Enforcements, long + 1);
            }
            if (object.Images) {
                if (!Array.isArray(object.Images))
                    throw TypeError(".AccountSummary.AccountSummaryElements.Images: array expected");
                message.Images = [];
                for (let i = 0; i < object.Images.length; ++i) {
                    if (!$util.isObject(object.Images[i]))
                        throw TypeError(".AccountSummary.AccountSummaryElements.Images: object expected");
                    message.Images[i] = $root.AccountSummary.KeyValue.fromObject(object.Images[i], long + 1);
                }
            }
            if (object.personalLicense != null) {
                if (!$util.isObject(object.personalLicense))
                    throw TypeError(".AccountSummary.AccountSummaryElements.personalLicense: object expected");
                message.personalLicense = $root.AccountSummary.License.fromObject(object.personalLicense, long + 1);
            }
            if (object.fixSharedFolderRecords != null)
                message.fixSharedFolderRecords = Boolean(object.fixSharedFolderRecords);
            if (object.usernames) {
                if (!Array.isArray(object.usernames))
                    throw TypeError(".AccountSummary.AccountSummaryElements.usernames: array expected");
                message.usernames = [];
                for (let i = 0; i < object.usernames.length; ++i)
                    message.usernames[i] = String(object.usernames[i]);
            }
            if (object.devices) {
                if (!Array.isArray(object.devices))
                    throw TypeError(".AccountSummary.AccountSummaryElements.devices: array expected");
                message.devices = [];
                for (let i = 0; i < object.devices.length; ++i) {
                    if (!$util.isObject(object.devices[i]))
                        throw TypeError(".AccountSummary.AccountSummaryElements.devices: object expected");
                    message.devices[i] = $root.AccountSummary.DeviceInfo.fromObject(object.devices[i], long + 1);
                }
            }
            if (object.isShareAdmin != null)
                message.isShareAdmin = Boolean(object.isShareAdmin);
            if (object.accountRecovery != null)
                message.accountRecovery = Boolean(object.accountRecovery);
            if (object.accountRecoveryPrompt != null)
                message.accountRecoveryPrompt = Boolean(object.accountRecoveryPrompt);
            if (object.minMasterPasswordLengthNoPrompt != null)
                message.minMasterPasswordLengthNoPrompt = object.minMasterPasswordLengthNoPrompt | 0;
            if (object.forbidKeyType2 != null)
                message.forbidKeyType2 = Boolean(object.forbidKeyType2);
            if (object.forbidKeyType1 != null)
                message.forbidKeyType1 = Boolean(object.forbidKeyType1);
            if (object.disallowedFeatures) {
                if (!Array.isArray(object.disallowedFeatures))
                    throw TypeError(".AccountSummary.AccountSummaryElements.disallowedFeatures: array expected");
                message.disallowedFeatures = [];
                for (let i = 0; i < object.disallowedFeatures.length; ++i)
                    message.disallowedFeatures[i] = String(object.disallowedFeatures[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from an AccountSummaryElements message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.AccountSummaryElements
         * @static
         * @param {AccountSummary.AccountSummaryElements} message AccountSummaryElements
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AccountSummaryElements.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.syncLogs = [];
                object.Images = [];
                object.usernames = [];
                object.devices = [];
                object.disallowedFeatures = [];
            }
            if (options.defaults) {
                if (options.bytes === String)
                    object.clientKey = "";
                else {
                    object.clientKey = [];
                    if (options.bytes !== Array)
                        object.clientKey = $util.newBuffer(object.clientKey);
                }
                object.settings = null;
                object.keysInfo = null;
                object.isEnterpriseAdmin = false;
                object.license = null;
                object.group = null;
                object.Enforcements = null;
                object.personalLicense = null;
                object.fixSharedFolderRecords = false;
                object.isShareAdmin = false;
                object.accountRecovery = false;
                object.accountRecoveryPrompt = false;
                object.minMasterPasswordLengthNoPrompt = 0;
                object.forbidKeyType2 = false;
                object.forbidKeyType1 = false;
            }
            if (message.clientKey != null && Object.hasOwnProperty.call(message, "clientKey"))
                object.clientKey = options.bytes === String ? $util.base64.encode(message.clientKey, 0, message.clientKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.clientKey) : message.clientKey;
            if (message.settings != null && Object.hasOwnProperty.call(message, "settings"))
                object.settings = $root.AccountSummary.Settings.toObject(message.settings, options, q + 1);
            if (message.keysInfo != null && Object.hasOwnProperty.call(message, "keysInfo"))
                object.keysInfo = $root.AccountSummary.KeysInfo.toObject(message.keysInfo, options, q + 1);
            if (message.syncLogs && message.syncLogs.length) {
                object.syncLogs = [];
                for (let j = 0; j < message.syncLogs.length; ++j)
                    object.syncLogs[j] = $root.AccountSummary.SyncLog.toObject(message.syncLogs[j], options, q + 1);
            }
            if (message.isEnterpriseAdmin != null && Object.hasOwnProperty.call(message, "isEnterpriseAdmin"))
                object.isEnterpriseAdmin = message.isEnterpriseAdmin;
            if (message.license != null && Object.hasOwnProperty.call(message, "license"))
                object.license = $root.AccountSummary.License.toObject(message.license, options, q + 1);
            if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                object.group = $root.AccountSummary.Group.toObject(message.group, options, q + 1);
            if (message.Enforcements != null && Object.hasOwnProperty.call(message, "Enforcements"))
                object.Enforcements = $root.AccountSummary.Enforcements.toObject(message.Enforcements, options, q + 1);
            if (message.Images && message.Images.length) {
                object.Images = [];
                for (let j = 0; j < message.Images.length; ++j)
                    object.Images[j] = $root.AccountSummary.KeyValue.toObject(message.Images[j], options, q + 1);
            }
            if (message.personalLicense != null && Object.hasOwnProperty.call(message, "personalLicense"))
                object.personalLicense = $root.AccountSummary.License.toObject(message.personalLicense, options, q + 1);
            if (message.fixSharedFolderRecords != null && Object.hasOwnProperty.call(message, "fixSharedFolderRecords"))
                object.fixSharedFolderRecords = message.fixSharedFolderRecords;
            if (message.usernames && message.usernames.length) {
                object.usernames = [];
                for (let j = 0; j < message.usernames.length; ++j)
                    object.usernames[j] = message.usernames[j];
            }
            if (message.devices && message.devices.length) {
                object.devices = [];
                for (let j = 0; j < message.devices.length; ++j)
                    object.devices[j] = $root.AccountSummary.DeviceInfo.toObject(message.devices[j], options, q + 1);
            }
            if (message.isShareAdmin != null && Object.hasOwnProperty.call(message, "isShareAdmin"))
                object.isShareAdmin = message.isShareAdmin;
            if (message.accountRecovery != null && Object.hasOwnProperty.call(message, "accountRecovery"))
                object.accountRecovery = message.accountRecovery;
            if (message.accountRecoveryPrompt != null && Object.hasOwnProperty.call(message, "accountRecoveryPrompt"))
                object.accountRecoveryPrompt = message.accountRecoveryPrompt;
            if (message.minMasterPasswordLengthNoPrompt != null && Object.hasOwnProperty.call(message, "minMasterPasswordLengthNoPrompt"))
                object.minMasterPasswordLengthNoPrompt = message.minMasterPasswordLengthNoPrompt;
            if (message.forbidKeyType2 != null && Object.hasOwnProperty.call(message, "forbidKeyType2"))
                object.forbidKeyType2 = message.forbidKeyType2;
            if (message.forbidKeyType1 != null && Object.hasOwnProperty.call(message, "forbidKeyType1"))
                object.forbidKeyType1 = message.forbidKeyType1;
            if (message.disallowedFeatures && message.disallowedFeatures.length) {
                object.disallowedFeatures = [];
                for (let j = 0; j < message.disallowedFeatures.length; ++j)
                    object.disallowedFeatures[j] = message.disallowedFeatures[j];
            }
            return object;
        };

        /**
         * Converts this AccountSummaryElements to JSON.
         * @function toJSON
         * @memberof AccountSummary.AccountSummaryElements
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AccountSummaryElements.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AccountSummaryElements
         * @function getTypeUrl
         * @memberof AccountSummary.AccountSummaryElements
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AccountSummaryElements.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.AccountSummaryElements";
        };

        return AccountSummaryElements;
    })();

    AccountSummary.DeviceInfo = (function() {

        /**
         * Properties of a DeviceInfo.
         * @memberof AccountSummary
         * @interface IDeviceInfo
         * @property {Uint8Array|null} [encryptedDeviceToken] DeviceInfo encryptedDeviceToken
         * @property {string|null} [deviceName] DeviceInfo deviceName
         * @property {Authentication.DeviceStatus|null} [deviceStatus] DeviceInfo deviceStatus
         * @property {Uint8Array|null} [devicePublicKey] DeviceInfo devicePublicKey
         * @property {Uint8Array|null} [encryptedDataKeyDoNotUse] DeviceInfo encryptedDataKeyDoNotUse
         * @property {string|null} [clientVersion] DeviceInfo clientVersion
         * @property {string|null} [username] DeviceInfo username
         * @property {string|null} [ipAddress] DeviceInfo ipAddress
         * @property {number|null} [approveRequestTime] DeviceInfo approveRequestTime
         * @property {boolean|null} [encryptedDataKeyPresent] DeviceInfo encryptedDataKeyPresent
         * @property {number|null} [groupId] DeviceInfo groupId
         * @property {string|null} [devicePlatform] DeviceInfo devicePlatform
         * @property {Authentication.ClientFormFactor|null} [clientFormFactor] DeviceInfo clientFormFactor
         */

        /**
         * Constructs a new DeviceInfo.
         * @memberof AccountSummary
         * @classdesc Represents a DeviceInfo.
         * @implements IDeviceInfo
         * @constructor
         * @param {AccountSummary.IDeviceInfo=} [properties] Properties to set
         */
        function DeviceInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeviceInfo encryptedDeviceToken.
         * @member {Uint8Array} encryptedDeviceToken
         * @memberof AccountSummary.DeviceInfo
         * @instance
         */
        DeviceInfo.prototype.encryptedDeviceToken = $util.newBuffer([]);

        /**
         * DeviceInfo deviceName.
         * @member {string} deviceName
         * @memberof AccountSummary.DeviceInfo
         * @instance
         */
        DeviceInfo.prototype.deviceName = "";

        /**
         * DeviceInfo deviceStatus.
         * @member {Authentication.DeviceStatus} deviceStatus
         * @memberof AccountSummary.DeviceInfo
         * @instance
         */
        DeviceInfo.prototype.deviceStatus = 0;

        /**
         * DeviceInfo devicePublicKey.
         * @member {Uint8Array} devicePublicKey
         * @memberof AccountSummary.DeviceInfo
         * @instance
         */
        DeviceInfo.prototype.devicePublicKey = $util.newBuffer([]);

        /**
         * DeviceInfo encryptedDataKeyDoNotUse.
         * @member {Uint8Array} encryptedDataKeyDoNotUse
         * @memberof AccountSummary.DeviceInfo
         * @instance
         */
        DeviceInfo.prototype.encryptedDataKeyDoNotUse = $util.newBuffer([]);

        /**
         * DeviceInfo clientVersion.
         * @member {string} clientVersion
         * @memberof AccountSummary.DeviceInfo
         * @instance
         */
        DeviceInfo.prototype.clientVersion = "";

        /**
         * DeviceInfo username.
         * @member {string} username
         * @memberof AccountSummary.DeviceInfo
         * @instance
         */
        DeviceInfo.prototype.username = "";

        /**
         * DeviceInfo ipAddress.
         * @member {string} ipAddress
         * @memberof AccountSummary.DeviceInfo
         * @instance
         */
        DeviceInfo.prototype.ipAddress = "";

        /**
         * DeviceInfo approveRequestTime.
         * @member {number} approveRequestTime
         * @memberof AccountSummary.DeviceInfo
         * @instance
         */
        DeviceInfo.prototype.approveRequestTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * DeviceInfo encryptedDataKeyPresent.
         * @member {boolean} encryptedDataKeyPresent
         * @memberof AccountSummary.DeviceInfo
         * @instance
         */
        DeviceInfo.prototype.encryptedDataKeyPresent = false;

        /**
         * DeviceInfo groupId.
         * @member {number} groupId
         * @memberof AccountSummary.DeviceInfo
         * @instance
         */
        DeviceInfo.prototype.groupId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * DeviceInfo devicePlatform.
         * @member {string} devicePlatform
         * @memberof AccountSummary.DeviceInfo
         * @instance
         */
        DeviceInfo.prototype.devicePlatform = "";

        /**
         * DeviceInfo clientFormFactor.
         * @member {Authentication.ClientFormFactor} clientFormFactor
         * @memberof AccountSummary.DeviceInfo
         * @instance
         */
        DeviceInfo.prototype.clientFormFactor = 0;

        /**
         * Creates a new DeviceInfo instance using the specified properties.
         * @function create
         * @memberof AccountSummary.DeviceInfo
         * @static
         * @param {AccountSummary.IDeviceInfo=} [properties] Properties to set
         * @returns {AccountSummary.DeviceInfo} DeviceInfo instance
         */
        DeviceInfo.create = function create(properties) {
            return new DeviceInfo(properties);
        };

        /**
         * Encodes the specified DeviceInfo message. Does not implicitly {@link AccountSummary.DeviceInfo.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.DeviceInfo
         * @static
         * @param {AccountSummary.IDeviceInfo} message DeviceInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceInfo.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.encryptedDeviceToken != null && Object.hasOwnProperty.call(message, "encryptedDeviceToken"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.encryptedDeviceToken);
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.deviceName);
            if (message.deviceStatus != null && Object.hasOwnProperty.call(message, "deviceStatus"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.deviceStatus);
            if (message.devicePublicKey != null && Object.hasOwnProperty.call(message, "devicePublicKey"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.devicePublicKey);
            if (message.encryptedDataKeyDoNotUse != null && Object.hasOwnProperty.call(message, "encryptedDataKeyDoNotUse"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.encryptedDataKeyDoNotUse);
            if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.clientVersion);
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.username);
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.ipAddress);
            if (message.approveRequestTime != null && Object.hasOwnProperty.call(message, "approveRequestTime"))
                writer.uint32(/* id 9, wireType 0 =*/72).int64(message.approveRequestTime);
            if (message.encryptedDataKeyPresent != null && Object.hasOwnProperty.call(message, "encryptedDataKeyPresent"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.encryptedDataKeyPresent);
            if (message.groupId != null && Object.hasOwnProperty.call(message, "groupId"))
                writer.uint32(/* id 11, wireType 0 =*/88).int64(message.groupId);
            if (message.devicePlatform != null && Object.hasOwnProperty.call(message, "devicePlatform"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.devicePlatform);
            if (message.clientFormFactor != null && Object.hasOwnProperty.call(message, "clientFormFactor"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.clientFormFactor);
            return writer;
        };

        /**
         * Encodes the specified DeviceInfo message, length delimited. Does not implicitly {@link AccountSummary.DeviceInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.DeviceInfo
         * @static
         * @param {AccountSummary.IDeviceInfo} message DeviceInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a DeviceInfo message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.DeviceInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.DeviceInfo} DeviceInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceInfo.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.DeviceInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.encryptedDeviceToken = reader.bytes();
                        break;
                    }
                case 2: {
                        message.deviceName = reader.string();
                        break;
                    }
                case 3: {
                        message.deviceStatus = reader.int32();
                        break;
                    }
                case 4: {
                        message.devicePublicKey = reader.bytes();
                        break;
                    }
                case 5: {
                        message.encryptedDataKeyDoNotUse = reader.bytes();
                        break;
                    }
                case 6: {
                        message.clientVersion = reader.string();
                        break;
                    }
                case 7: {
                        message.username = reader.string();
                        break;
                    }
                case 8: {
                        message.ipAddress = reader.string();
                        break;
                    }
                case 9: {
                        message.approveRequestTime = reader.int64();
                        break;
                    }
                case 10: {
                        message.encryptedDataKeyPresent = reader.bool();
                        break;
                    }
                case 11: {
                        message.groupId = reader.int64();
                        break;
                    }
                case 12: {
                        message.devicePlatform = reader.string();
                        break;
                    }
                case 13: {
                        message.clientFormFactor = reader.int32();
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
         * Decodes a DeviceInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.DeviceInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.DeviceInfo} DeviceInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeviceInfo message.
         * @function verify
         * @memberof AccountSummary.DeviceInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeviceInfo.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.encryptedDeviceToken != null && Object.hasOwnProperty.call(message, "encryptedDeviceToken"))
                if (!(message.encryptedDeviceToken && typeof message.encryptedDeviceToken.length === "number" || $util.isString(message.encryptedDeviceToken)))
                    return "encryptedDeviceToken: buffer expected";
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                if (!$util.isString(message.deviceName))
                    return "deviceName: string expected";
            if (message.deviceStatus != null && Object.hasOwnProperty.call(message, "deviceStatus"))
                switch (message.deviceStatus) {
                default:
                    return "deviceStatus: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.devicePublicKey != null && Object.hasOwnProperty.call(message, "devicePublicKey"))
                if (!(message.devicePublicKey && typeof message.devicePublicKey.length === "number" || $util.isString(message.devicePublicKey)))
                    return "devicePublicKey: buffer expected";
            if (message.encryptedDataKeyDoNotUse != null && Object.hasOwnProperty.call(message, "encryptedDataKeyDoNotUse"))
                if (!(message.encryptedDataKeyDoNotUse && typeof message.encryptedDataKeyDoNotUse.length === "number" || $util.isString(message.encryptedDataKeyDoNotUse)))
                    return "encryptedDataKeyDoNotUse: buffer expected";
            if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
                if (!$util.isString(message.clientVersion))
                    return "clientVersion: string expected";
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                if (!$util.isString(message.ipAddress))
                    return "ipAddress: string expected";
            if (message.approveRequestTime != null && Object.hasOwnProperty.call(message, "approveRequestTime"))
                if (!$util.isInteger(message.approveRequestTime) && !(message.approveRequestTime && $util.isInteger(message.approveRequestTime.low) && $util.isInteger(message.approveRequestTime.high)))
                    return "approveRequestTime: integer|Long expected";
            if (message.encryptedDataKeyPresent != null && Object.hasOwnProperty.call(message, "encryptedDataKeyPresent"))
                if (typeof message.encryptedDataKeyPresent !== "boolean")
                    return "encryptedDataKeyPresent: boolean expected";
            if (message.groupId != null && Object.hasOwnProperty.call(message, "groupId"))
                if (!$util.isInteger(message.groupId) && !(message.groupId && $util.isInteger(message.groupId.low) && $util.isInteger(message.groupId.high)))
                    return "groupId: integer|Long expected";
            if (message.devicePlatform != null && Object.hasOwnProperty.call(message, "devicePlatform"))
                if (!$util.isString(message.devicePlatform))
                    return "devicePlatform: string expected";
            if (message.clientFormFactor != null && Object.hasOwnProperty.call(message, "clientFormFactor"))
                switch (message.clientFormFactor) {
                default:
                    return "clientFormFactor: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        /**
         * Creates a DeviceInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.DeviceInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.DeviceInfo} DeviceInfo
         */
        DeviceInfo.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.DeviceInfo)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.DeviceInfo: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.DeviceInfo();
            if (object.encryptedDeviceToken != null)
                if (typeof object.encryptedDeviceToken === "string")
                    $util.base64.decode(object.encryptedDeviceToken, message.encryptedDeviceToken = $util.newBuffer($util.base64.length(object.encryptedDeviceToken)), 0);
                else if (object.encryptedDeviceToken.length >= 0)
                    message.encryptedDeviceToken = object.encryptedDeviceToken;
            if (object.deviceName != null)
                message.deviceName = String(object.deviceName);
            switch (object.deviceStatus) {
            default:
                if (typeof object.deviceStatus === "number") {
                    message.deviceStatus = object.deviceStatus;
                    break;
                }
                break;
            case "DEVICE_NEEDS_APPROVAL":
            case 0:
                message.deviceStatus = 0;
                break;
            case "DEVICE_OK":
            case 1:
                message.deviceStatus = 1;
                break;
            case "DEVICE_DISABLED_BY_USER":
            case 2:
                message.deviceStatus = 2;
                break;
            case "DEVICE_LOCKED_BY_ADMIN":
            case 3:
                message.deviceStatus = 3;
                break;
            }
            if (object.devicePublicKey != null)
                if (typeof object.devicePublicKey === "string")
                    $util.base64.decode(object.devicePublicKey, message.devicePublicKey = $util.newBuffer($util.base64.length(object.devicePublicKey)), 0);
                else if (object.devicePublicKey.length >= 0)
                    message.devicePublicKey = object.devicePublicKey;
            if (object.encryptedDataKeyDoNotUse != null)
                if (typeof object.encryptedDataKeyDoNotUse === "string")
                    $util.base64.decode(object.encryptedDataKeyDoNotUse, message.encryptedDataKeyDoNotUse = $util.newBuffer($util.base64.length(object.encryptedDataKeyDoNotUse)), 0);
                else if (object.encryptedDataKeyDoNotUse.length >= 0)
                    message.encryptedDataKeyDoNotUse = object.encryptedDataKeyDoNotUse;
            if (object.clientVersion != null)
                message.clientVersion = String(object.clientVersion);
            if (object.username != null)
                message.username = String(object.username);
            if (object.ipAddress != null)
                message.ipAddress = String(object.ipAddress);
            if (object.approveRequestTime != null)
                if ($util.Long)
                    message.approveRequestTime = $util.Long.fromValue(object.approveRequestTime, false);
                else if (typeof object.approveRequestTime === "string")
                    message.approveRequestTime = parseInt(object.approveRequestTime, 10);
                else if (typeof object.approveRequestTime === "number")
                    message.approveRequestTime = object.approveRequestTime;
                else if (typeof object.approveRequestTime === "object")
                    message.approveRequestTime = new $util.LongBits(object.approveRequestTime.low >>> 0, object.approveRequestTime.high >>> 0).toNumber();
            if (object.encryptedDataKeyPresent != null)
                message.encryptedDataKeyPresent = Boolean(object.encryptedDataKeyPresent);
            if (object.groupId != null)
                if ($util.Long)
                    message.groupId = $util.Long.fromValue(object.groupId, false);
                else if (typeof object.groupId === "string")
                    message.groupId = parseInt(object.groupId, 10);
                else if (typeof object.groupId === "number")
                    message.groupId = object.groupId;
                else if (typeof object.groupId === "object")
                    message.groupId = new $util.LongBits(object.groupId.low >>> 0, object.groupId.high >>> 0).toNumber();
            if (object.devicePlatform != null)
                message.devicePlatform = String(object.devicePlatform);
            switch (object.clientFormFactor) {
            default:
                if (typeof object.clientFormFactor === "number") {
                    message.clientFormFactor = object.clientFormFactor;
                    break;
                }
                break;
            case "FF_EMPTY":
            case 0:
                message.clientFormFactor = 0;
                break;
            case "FF_PHONE":
            case 1:
                message.clientFormFactor = 1;
                break;
            case "FF_TABLET":
            case 2:
                message.clientFormFactor = 2;
                break;
            case "FF_WATCH":
            case 3:
                message.clientFormFactor = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a DeviceInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.DeviceInfo
         * @static
         * @param {AccountSummary.DeviceInfo} message DeviceInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeviceInfo.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.encryptedDeviceToken = "";
                else {
                    object.encryptedDeviceToken = [];
                    if (options.bytes !== Array)
                        object.encryptedDeviceToken = $util.newBuffer(object.encryptedDeviceToken);
                }
                object.deviceName = "";
                object.deviceStatus = options.enums === String ? "DEVICE_NEEDS_APPROVAL" : 0;
                if (options.bytes === String)
                    object.devicePublicKey = "";
                else {
                    object.devicePublicKey = [];
                    if (options.bytes !== Array)
                        object.devicePublicKey = $util.newBuffer(object.devicePublicKey);
                }
                if (options.bytes === String)
                    object.encryptedDataKeyDoNotUse = "";
                else {
                    object.encryptedDataKeyDoNotUse = [];
                    if (options.bytes !== Array)
                        object.encryptedDataKeyDoNotUse = $util.newBuffer(object.encryptedDataKeyDoNotUse);
                }
                object.clientVersion = "";
                object.username = "";
                object.ipAddress = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.approveRequestTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.approveRequestTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.encryptedDataKeyPresent = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.groupId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.groupId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.devicePlatform = "";
                object.clientFormFactor = options.enums === String ? "FF_EMPTY" : 0;
            }
            if (message.encryptedDeviceToken != null && Object.hasOwnProperty.call(message, "encryptedDeviceToken"))
                object.encryptedDeviceToken = options.bytes === String ? $util.base64.encode(message.encryptedDeviceToken, 0, message.encryptedDeviceToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedDeviceToken) : message.encryptedDeviceToken;
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                object.deviceName = message.deviceName;
            if (message.deviceStatus != null && Object.hasOwnProperty.call(message, "deviceStatus"))
                object.deviceStatus = options.enums === String ? $root.Authentication.DeviceStatus[message.deviceStatus] === undefined ? message.deviceStatus : $root.Authentication.DeviceStatus[message.deviceStatus] : message.deviceStatus;
            if (message.devicePublicKey != null && Object.hasOwnProperty.call(message, "devicePublicKey"))
                object.devicePublicKey = options.bytes === String ? $util.base64.encode(message.devicePublicKey, 0, message.devicePublicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.devicePublicKey) : message.devicePublicKey;
            if (message.encryptedDataKeyDoNotUse != null && Object.hasOwnProperty.call(message, "encryptedDataKeyDoNotUse"))
                object.encryptedDataKeyDoNotUse = options.bytes === String ? $util.base64.encode(message.encryptedDataKeyDoNotUse, 0, message.encryptedDataKeyDoNotUse.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedDataKeyDoNotUse) : message.encryptedDataKeyDoNotUse;
            if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
                object.clientVersion = message.clientVersion;
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                object.username = message.username;
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                object.ipAddress = message.ipAddress;
            if (message.approveRequestTime != null && Object.hasOwnProperty.call(message, "approveRequestTime"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.approveRequestTime = typeof message.approveRequestTime === "number" ? BigInt(message.approveRequestTime) : $util.Long.fromBits(message.approveRequestTime.low >>> 0, message.approveRequestTime.high >>> 0, false).toBigInt();
                else if (typeof message.approveRequestTime === "number")
                    object.approveRequestTime = options.longs === String ? String(message.approveRequestTime) : message.approveRequestTime;
                else
                    object.approveRequestTime = options.longs === String ? $util.Long.prototype.toString.call(message.approveRequestTime) : options.longs === Number ? new $util.LongBits(message.approveRequestTime.low >>> 0, message.approveRequestTime.high >>> 0).toNumber() : message.approveRequestTime;
            if (message.encryptedDataKeyPresent != null && Object.hasOwnProperty.call(message, "encryptedDataKeyPresent"))
                object.encryptedDataKeyPresent = message.encryptedDataKeyPresent;
            if (message.groupId != null && Object.hasOwnProperty.call(message, "groupId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.groupId = typeof message.groupId === "number" ? BigInt(message.groupId) : $util.Long.fromBits(message.groupId.low >>> 0, message.groupId.high >>> 0, false).toBigInt();
                else if (typeof message.groupId === "number")
                    object.groupId = options.longs === String ? String(message.groupId) : message.groupId;
                else
                    object.groupId = options.longs === String ? $util.Long.prototype.toString.call(message.groupId) : options.longs === Number ? new $util.LongBits(message.groupId.low >>> 0, message.groupId.high >>> 0).toNumber() : message.groupId;
            if (message.devicePlatform != null && Object.hasOwnProperty.call(message, "devicePlatform"))
                object.devicePlatform = message.devicePlatform;
            if (message.clientFormFactor != null && Object.hasOwnProperty.call(message, "clientFormFactor"))
                object.clientFormFactor = options.enums === String ? $root.Authentication.ClientFormFactor[message.clientFormFactor] === undefined ? message.clientFormFactor : $root.Authentication.ClientFormFactor[message.clientFormFactor] : message.clientFormFactor;
            return object;
        };

        /**
         * Converts this DeviceInfo to JSON.
         * @function toJSON
         * @memberof AccountSummary.DeviceInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeviceInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DeviceInfo
         * @function getTypeUrl
         * @memberof AccountSummary.DeviceInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DeviceInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.DeviceInfo";
        };

        return DeviceInfo;
    })();

    AccountSummary.KeysInfo = (function() {

        /**
         * Properties of a KeysInfo.
         * @memberof AccountSummary
         * @interface IKeysInfo
         * @property {Uint8Array|null} [encryptionParams] KeysInfo encryptionParams
         * @property {Uint8Array|null} [encryptedDataKey] KeysInfo encryptedDataKey
         * @property {number|null} [dataKeyBackupDate] KeysInfo dataKeyBackupDate
         * @property {Uint8Array|null} [userAuthUid] KeysInfo userAuthUid
         * @property {Uint8Array|null} [encryptedPrivateKey] KeysInfo encryptedPrivateKey
         * @property {Uint8Array|null} [encryptedEccPrivateKey] KeysInfo encryptedEccPrivateKey
         * @property {Uint8Array|null} [eccPublicKey] KeysInfo eccPublicKey
         */

        /**
         * Constructs a new KeysInfo.
         * @memberof AccountSummary
         * @classdesc Represents a KeysInfo.
         * @implements IKeysInfo
         * @constructor
         * @param {AccountSummary.IKeysInfo=} [properties] Properties to set
         */
        function KeysInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KeysInfo encryptionParams.
         * @member {Uint8Array} encryptionParams
         * @memberof AccountSummary.KeysInfo
         * @instance
         */
        KeysInfo.prototype.encryptionParams = $util.newBuffer([]);

        /**
         * KeysInfo encryptedDataKey.
         * @member {Uint8Array} encryptedDataKey
         * @memberof AccountSummary.KeysInfo
         * @instance
         */
        KeysInfo.prototype.encryptedDataKey = $util.newBuffer([]);

        /**
         * KeysInfo dataKeyBackupDate.
         * @member {number} dataKeyBackupDate
         * @memberof AccountSummary.KeysInfo
         * @instance
         */
        KeysInfo.prototype.dataKeyBackupDate = 0;

        /**
         * KeysInfo userAuthUid.
         * @member {Uint8Array} userAuthUid
         * @memberof AccountSummary.KeysInfo
         * @instance
         */
        KeysInfo.prototype.userAuthUid = $util.newBuffer([]);

        /**
         * KeysInfo encryptedPrivateKey.
         * @member {Uint8Array} encryptedPrivateKey
         * @memberof AccountSummary.KeysInfo
         * @instance
         */
        KeysInfo.prototype.encryptedPrivateKey = $util.newBuffer([]);

        /**
         * KeysInfo encryptedEccPrivateKey.
         * @member {Uint8Array} encryptedEccPrivateKey
         * @memberof AccountSummary.KeysInfo
         * @instance
         */
        KeysInfo.prototype.encryptedEccPrivateKey = $util.newBuffer([]);

        /**
         * KeysInfo eccPublicKey.
         * @member {Uint8Array} eccPublicKey
         * @memberof AccountSummary.KeysInfo
         * @instance
         */
        KeysInfo.prototype.eccPublicKey = $util.newBuffer([]);

        /**
         * Creates a new KeysInfo instance using the specified properties.
         * @function create
         * @memberof AccountSummary.KeysInfo
         * @static
         * @param {AccountSummary.IKeysInfo=} [properties] Properties to set
         * @returns {AccountSummary.KeysInfo} KeysInfo instance
         */
        KeysInfo.create = function create(properties) {
            return new KeysInfo(properties);
        };

        /**
         * Encodes the specified KeysInfo message. Does not implicitly {@link AccountSummary.KeysInfo.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.KeysInfo
         * @static
         * @param {AccountSummary.IKeysInfo} message KeysInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeysInfo.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.encryptionParams != null && Object.hasOwnProperty.call(message, "encryptionParams"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.encryptionParams);
            if (message.encryptedDataKey != null && Object.hasOwnProperty.call(message, "encryptedDataKey"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.encryptedDataKey);
            if (message.dataKeyBackupDate != null && Object.hasOwnProperty.call(message, "dataKeyBackupDate"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.dataKeyBackupDate);
            if (message.userAuthUid != null && Object.hasOwnProperty.call(message, "userAuthUid"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.userAuthUid);
            if (message.encryptedPrivateKey != null && Object.hasOwnProperty.call(message, "encryptedPrivateKey"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.encryptedPrivateKey);
            if (message.encryptedEccPrivateKey != null && Object.hasOwnProperty.call(message, "encryptedEccPrivateKey"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.encryptedEccPrivateKey);
            if (message.eccPublicKey != null && Object.hasOwnProperty.call(message, "eccPublicKey"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.eccPublicKey);
            return writer;
        };

        /**
         * Encodes the specified KeysInfo message, length delimited. Does not implicitly {@link AccountSummary.KeysInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.KeysInfo
         * @static
         * @param {AccountSummary.IKeysInfo} message KeysInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeysInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a KeysInfo message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.KeysInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.KeysInfo} KeysInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeysInfo.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.KeysInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.encryptionParams = reader.bytes();
                        break;
                    }
                case 2: {
                        message.encryptedDataKey = reader.bytes();
                        break;
                    }
                case 3: {
                        message.dataKeyBackupDate = reader.double();
                        break;
                    }
                case 4: {
                        message.userAuthUid = reader.bytes();
                        break;
                    }
                case 5: {
                        message.encryptedPrivateKey = reader.bytes();
                        break;
                    }
                case 6: {
                        message.encryptedEccPrivateKey = reader.bytes();
                        break;
                    }
                case 7: {
                        message.eccPublicKey = reader.bytes();
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
         * Decodes a KeysInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.KeysInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.KeysInfo} KeysInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeysInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KeysInfo message.
         * @function verify
         * @memberof AccountSummary.KeysInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KeysInfo.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.encryptionParams != null && Object.hasOwnProperty.call(message, "encryptionParams"))
                if (!(message.encryptionParams && typeof message.encryptionParams.length === "number" || $util.isString(message.encryptionParams)))
                    return "encryptionParams: buffer expected";
            if (message.encryptedDataKey != null && Object.hasOwnProperty.call(message, "encryptedDataKey"))
                if (!(message.encryptedDataKey && typeof message.encryptedDataKey.length === "number" || $util.isString(message.encryptedDataKey)))
                    return "encryptedDataKey: buffer expected";
            if (message.dataKeyBackupDate != null && Object.hasOwnProperty.call(message, "dataKeyBackupDate"))
                if (typeof message.dataKeyBackupDate !== "number")
                    return "dataKeyBackupDate: number expected";
            if (message.userAuthUid != null && Object.hasOwnProperty.call(message, "userAuthUid"))
                if (!(message.userAuthUid && typeof message.userAuthUid.length === "number" || $util.isString(message.userAuthUid)))
                    return "userAuthUid: buffer expected";
            if (message.encryptedPrivateKey != null && Object.hasOwnProperty.call(message, "encryptedPrivateKey"))
                if (!(message.encryptedPrivateKey && typeof message.encryptedPrivateKey.length === "number" || $util.isString(message.encryptedPrivateKey)))
                    return "encryptedPrivateKey: buffer expected";
            if (message.encryptedEccPrivateKey != null && Object.hasOwnProperty.call(message, "encryptedEccPrivateKey"))
                if (!(message.encryptedEccPrivateKey && typeof message.encryptedEccPrivateKey.length === "number" || $util.isString(message.encryptedEccPrivateKey)))
                    return "encryptedEccPrivateKey: buffer expected";
            if (message.eccPublicKey != null && Object.hasOwnProperty.call(message, "eccPublicKey"))
                if (!(message.eccPublicKey && typeof message.eccPublicKey.length === "number" || $util.isString(message.eccPublicKey)))
                    return "eccPublicKey: buffer expected";
            return null;
        };

        /**
         * Creates a KeysInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.KeysInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.KeysInfo} KeysInfo
         */
        KeysInfo.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.KeysInfo)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.KeysInfo: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.KeysInfo();
            if (object.encryptionParams != null)
                if (typeof object.encryptionParams === "string")
                    $util.base64.decode(object.encryptionParams, message.encryptionParams = $util.newBuffer($util.base64.length(object.encryptionParams)), 0);
                else if (object.encryptionParams.length >= 0)
                    message.encryptionParams = object.encryptionParams;
            if (object.encryptedDataKey != null)
                if (typeof object.encryptedDataKey === "string")
                    $util.base64.decode(object.encryptedDataKey, message.encryptedDataKey = $util.newBuffer($util.base64.length(object.encryptedDataKey)), 0);
                else if (object.encryptedDataKey.length >= 0)
                    message.encryptedDataKey = object.encryptedDataKey;
            if (object.dataKeyBackupDate != null)
                message.dataKeyBackupDate = Number(object.dataKeyBackupDate);
            if (object.userAuthUid != null)
                if (typeof object.userAuthUid === "string")
                    $util.base64.decode(object.userAuthUid, message.userAuthUid = $util.newBuffer($util.base64.length(object.userAuthUid)), 0);
                else if (object.userAuthUid.length >= 0)
                    message.userAuthUid = object.userAuthUid;
            if (object.encryptedPrivateKey != null)
                if (typeof object.encryptedPrivateKey === "string")
                    $util.base64.decode(object.encryptedPrivateKey, message.encryptedPrivateKey = $util.newBuffer($util.base64.length(object.encryptedPrivateKey)), 0);
                else if (object.encryptedPrivateKey.length >= 0)
                    message.encryptedPrivateKey = object.encryptedPrivateKey;
            if (object.encryptedEccPrivateKey != null)
                if (typeof object.encryptedEccPrivateKey === "string")
                    $util.base64.decode(object.encryptedEccPrivateKey, message.encryptedEccPrivateKey = $util.newBuffer($util.base64.length(object.encryptedEccPrivateKey)), 0);
                else if (object.encryptedEccPrivateKey.length >= 0)
                    message.encryptedEccPrivateKey = object.encryptedEccPrivateKey;
            if (object.eccPublicKey != null)
                if (typeof object.eccPublicKey === "string")
                    $util.base64.decode(object.eccPublicKey, message.eccPublicKey = $util.newBuffer($util.base64.length(object.eccPublicKey)), 0);
                else if (object.eccPublicKey.length >= 0)
                    message.eccPublicKey = object.eccPublicKey;
            return message;
        };

        /**
         * Creates a plain object from a KeysInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.KeysInfo
         * @static
         * @param {AccountSummary.KeysInfo} message KeysInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KeysInfo.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.encryptionParams = "";
                else {
                    object.encryptionParams = [];
                    if (options.bytes !== Array)
                        object.encryptionParams = $util.newBuffer(object.encryptionParams);
                }
                if (options.bytes === String)
                    object.encryptedDataKey = "";
                else {
                    object.encryptedDataKey = [];
                    if (options.bytes !== Array)
                        object.encryptedDataKey = $util.newBuffer(object.encryptedDataKey);
                }
                object.dataKeyBackupDate = 0;
                if (options.bytes === String)
                    object.userAuthUid = "";
                else {
                    object.userAuthUid = [];
                    if (options.bytes !== Array)
                        object.userAuthUid = $util.newBuffer(object.userAuthUid);
                }
                if (options.bytes === String)
                    object.encryptedPrivateKey = "";
                else {
                    object.encryptedPrivateKey = [];
                    if (options.bytes !== Array)
                        object.encryptedPrivateKey = $util.newBuffer(object.encryptedPrivateKey);
                }
                if (options.bytes === String)
                    object.encryptedEccPrivateKey = "";
                else {
                    object.encryptedEccPrivateKey = [];
                    if (options.bytes !== Array)
                        object.encryptedEccPrivateKey = $util.newBuffer(object.encryptedEccPrivateKey);
                }
                if (options.bytes === String)
                    object.eccPublicKey = "";
                else {
                    object.eccPublicKey = [];
                    if (options.bytes !== Array)
                        object.eccPublicKey = $util.newBuffer(object.eccPublicKey);
                }
            }
            if (message.encryptionParams != null && Object.hasOwnProperty.call(message, "encryptionParams"))
                object.encryptionParams = options.bytes === String ? $util.base64.encode(message.encryptionParams, 0, message.encryptionParams.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptionParams) : message.encryptionParams;
            if (message.encryptedDataKey != null && Object.hasOwnProperty.call(message, "encryptedDataKey"))
                object.encryptedDataKey = options.bytes === String ? $util.base64.encode(message.encryptedDataKey, 0, message.encryptedDataKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedDataKey) : message.encryptedDataKey;
            if (message.dataKeyBackupDate != null && Object.hasOwnProperty.call(message, "dataKeyBackupDate"))
                object.dataKeyBackupDate = options.json && !isFinite(message.dataKeyBackupDate) ? String(message.dataKeyBackupDate) : message.dataKeyBackupDate;
            if (message.userAuthUid != null && Object.hasOwnProperty.call(message, "userAuthUid"))
                object.userAuthUid = options.bytes === String ? $util.base64.encode(message.userAuthUid, 0, message.userAuthUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.userAuthUid) : message.userAuthUid;
            if (message.encryptedPrivateKey != null && Object.hasOwnProperty.call(message, "encryptedPrivateKey"))
                object.encryptedPrivateKey = options.bytes === String ? $util.base64.encode(message.encryptedPrivateKey, 0, message.encryptedPrivateKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedPrivateKey) : message.encryptedPrivateKey;
            if (message.encryptedEccPrivateKey != null && Object.hasOwnProperty.call(message, "encryptedEccPrivateKey"))
                object.encryptedEccPrivateKey = options.bytes === String ? $util.base64.encode(message.encryptedEccPrivateKey, 0, message.encryptedEccPrivateKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedEccPrivateKey) : message.encryptedEccPrivateKey;
            if (message.eccPublicKey != null && Object.hasOwnProperty.call(message, "eccPublicKey"))
                object.eccPublicKey = options.bytes === String ? $util.base64.encode(message.eccPublicKey, 0, message.eccPublicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.eccPublicKey) : message.eccPublicKey;
            return object;
        };

        /**
         * Converts this KeysInfo to JSON.
         * @function toJSON
         * @memberof AccountSummary.KeysInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KeysInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for KeysInfo
         * @function getTypeUrl
         * @memberof AccountSummary.KeysInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        KeysInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.KeysInfo";
        };

        return KeysInfo;
    })();

    AccountSummary.SyncLog = (function() {

        /**
         * Properties of a SyncLog.
         * @memberof AccountSummary
         * @interface ISyncLog
         * @property {string|null} [countryName] SyncLog countryName
         * @property {number|null} [secondsAgo] SyncLog secondsAgo
         * @property {string|null} [deviceName] SyncLog deviceName
         * @property {string|null} [countryCode] SyncLog countryCode
         * @property {Uint8Array|null} [deviceUID] SyncLog deviceUID
         * @property {string|null} [ipAddress] SyncLog ipAddress
         */

        /**
         * Constructs a new SyncLog.
         * @memberof AccountSummary
         * @classdesc Represents a SyncLog.
         * @implements ISyncLog
         * @constructor
         * @param {AccountSummary.ISyncLog=} [properties] Properties to set
         */
        function SyncLog(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SyncLog countryName.
         * @member {string} countryName
         * @memberof AccountSummary.SyncLog
         * @instance
         */
        SyncLog.prototype.countryName = "";

        /**
         * SyncLog secondsAgo.
         * @member {number} secondsAgo
         * @memberof AccountSummary.SyncLog
         * @instance
         */
        SyncLog.prototype.secondsAgo = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SyncLog deviceName.
         * @member {string} deviceName
         * @memberof AccountSummary.SyncLog
         * @instance
         */
        SyncLog.prototype.deviceName = "";

        /**
         * SyncLog countryCode.
         * @member {string} countryCode
         * @memberof AccountSummary.SyncLog
         * @instance
         */
        SyncLog.prototype.countryCode = "";

        /**
         * SyncLog deviceUID.
         * @member {Uint8Array} deviceUID
         * @memberof AccountSummary.SyncLog
         * @instance
         */
        SyncLog.prototype.deviceUID = $util.newBuffer([]);

        /**
         * SyncLog ipAddress.
         * @member {string} ipAddress
         * @memberof AccountSummary.SyncLog
         * @instance
         */
        SyncLog.prototype.ipAddress = "";

        /**
         * Creates a new SyncLog instance using the specified properties.
         * @function create
         * @memberof AccountSummary.SyncLog
         * @static
         * @param {AccountSummary.ISyncLog=} [properties] Properties to set
         * @returns {AccountSummary.SyncLog} SyncLog instance
         */
        SyncLog.create = function create(properties) {
            return new SyncLog(properties);
        };

        /**
         * Encodes the specified SyncLog message. Does not implicitly {@link AccountSummary.SyncLog.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.SyncLog
         * @static
         * @param {AccountSummary.ISyncLog} message SyncLog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncLog.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.countryName != null && Object.hasOwnProperty.call(message, "countryName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.countryName);
            if (message.secondsAgo != null && Object.hasOwnProperty.call(message, "secondsAgo"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.secondsAgo);
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.deviceName);
            if (message.countryCode != null && Object.hasOwnProperty.call(message, "countryCode"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.countryCode);
            if (message.deviceUID != null && Object.hasOwnProperty.call(message, "deviceUID"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.deviceUID);
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.ipAddress);
            return writer;
        };

        /**
         * Encodes the specified SyncLog message, length delimited. Does not implicitly {@link AccountSummary.SyncLog.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.SyncLog
         * @static
         * @param {AccountSummary.ISyncLog} message SyncLog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncLog.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a SyncLog message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.SyncLog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.SyncLog} SyncLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncLog.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.SyncLog();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.countryName = reader.string();
                        break;
                    }
                case 2: {
                        message.secondsAgo = reader.int64();
                        break;
                    }
                case 3: {
                        message.deviceName = reader.string();
                        break;
                    }
                case 4: {
                        message.countryCode = reader.string();
                        break;
                    }
                case 5: {
                        message.deviceUID = reader.bytes();
                        break;
                    }
                case 6: {
                        message.ipAddress = reader.string();
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
         * Decodes a SyncLog message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.SyncLog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.SyncLog} SyncLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncLog.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SyncLog message.
         * @function verify
         * @memberof AccountSummary.SyncLog
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SyncLog.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.countryName != null && Object.hasOwnProperty.call(message, "countryName"))
                if (!$util.isString(message.countryName))
                    return "countryName: string expected";
            if (message.secondsAgo != null && Object.hasOwnProperty.call(message, "secondsAgo"))
                if (!$util.isInteger(message.secondsAgo) && !(message.secondsAgo && $util.isInteger(message.secondsAgo.low) && $util.isInteger(message.secondsAgo.high)))
                    return "secondsAgo: integer|Long expected";
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                if (!$util.isString(message.deviceName))
                    return "deviceName: string expected";
            if (message.countryCode != null && Object.hasOwnProperty.call(message, "countryCode"))
                if (!$util.isString(message.countryCode))
                    return "countryCode: string expected";
            if (message.deviceUID != null && Object.hasOwnProperty.call(message, "deviceUID"))
                if (!(message.deviceUID && typeof message.deviceUID.length === "number" || $util.isString(message.deviceUID)))
                    return "deviceUID: buffer expected";
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                if (!$util.isString(message.ipAddress))
                    return "ipAddress: string expected";
            return null;
        };

        /**
         * Creates a SyncLog message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.SyncLog
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.SyncLog} SyncLog
         */
        SyncLog.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.SyncLog)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.SyncLog: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.SyncLog();
            if (object.countryName != null)
                message.countryName = String(object.countryName);
            if (object.secondsAgo != null)
                if ($util.Long)
                    message.secondsAgo = $util.Long.fromValue(object.secondsAgo, false);
                else if (typeof object.secondsAgo === "string")
                    message.secondsAgo = parseInt(object.secondsAgo, 10);
                else if (typeof object.secondsAgo === "number")
                    message.secondsAgo = object.secondsAgo;
                else if (typeof object.secondsAgo === "object")
                    message.secondsAgo = new $util.LongBits(object.secondsAgo.low >>> 0, object.secondsAgo.high >>> 0).toNumber();
            if (object.deviceName != null)
                message.deviceName = String(object.deviceName);
            if (object.countryCode != null)
                message.countryCode = String(object.countryCode);
            if (object.deviceUID != null)
                if (typeof object.deviceUID === "string")
                    $util.base64.decode(object.deviceUID, message.deviceUID = $util.newBuffer($util.base64.length(object.deviceUID)), 0);
                else if (object.deviceUID.length >= 0)
                    message.deviceUID = object.deviceUID;
            if (object.ipAddress != null)
                message.ipAddress = String(object.ipAddress);
            return message;
        };

        /**
         * Creates a plain object from a SyncLog message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.SyncLog
         * @static
         * @param {AccountSummary.SyncLog} message SyncLog
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SyncLog.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.countryName = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.secondsAgo = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.secondsAgo = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.deviceName = "";
                object.countryCode = "";
                if (options.bytes === String)
                    object.deviceUID = "";
                else {
                    object.deviceUID = [];
                    if (options.bytes !== Array)
                        object.deviceUID = $util.newBuffer(object.deviceUID);
                }
                object.ipAddress = "";
            }
            if (message.countryName != null && Object.hasOwnProperty.call(message, "countryName"))
                object.countryName = message.countryName;
            if (message.secondsAgo != null && Object.hasOwnProperty.call(message, "secondsAgo"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.secondsAgo = typeof message.secondsAgo === "number" ? BigInt(message.secondsAgo) : $util.Long.fromBits(message.secondsAgo.low >>> 0, message.secondsAgo.high >>> 0, false).toBigInt();
                else if (typeof message.secondsAgo === "number")
                    object.secondsAgo = options.longs === String ? String(message.secondsAgo) : message.secondsAgo;
                else
                    object.secondsAgo = options.longs === String ? $util.Long.prototype.toString.call(message.secondsAgo) : options.longs === Number ? new $util.LongBits(message.secondsAgo.low >>> 0, message.secondsAgo.high >>> 0).toNumber() : message.secondsAgo;
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                object.deviceName = message.deviceName;
            if (message.countryCode != null && Object.hasOwnProperty.call(message, "countryCode"))
                object.countryCode = message.countryCode;
            if (message.deviceUID != null && Object.hasOwnProperty.call(message, "deviceUID"))
                object.deviceUID = options.bytes === String ? $util.base64.encode(message.deviceUID, 0, message.deviceUID.length) : options.bytes === Array ? Array.prototype.slice.call(message.deviceUID) : message.deviceUID;
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                object.ipAddress = message.ipAddress;
            return object;
        };

        /**
         * Converts this SyncLog to JSON.
         * @function toJSON
         * @memberof AccountSummary.SyncLog
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SyncLog.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SyncLog
         * @function getTypeUrl
         * @memberof AccountSummary.SyncLog
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SyncLog.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.SyncLog";
        };

        return SyncLog;
    })();

    AccountSummary.License = (function() {

        /**
         * Properties of a License.
         * @memberof AccountSummary
         * @interface ILicense
         * @property {string|null} [subscriptionCode] License subscriptionCode
         * @property {number|null} [productTypeId] License productTypeId
         * @property {string|null} [productTypeName] License productTypeName
         * @property {string|null} [expirationDate] License expirationDate
         * @property {number|null} [secondsUntilExpiration] License secondsUntilExpiration
         * @property {number|null} [maxDevices] License maxDevices
         * @property {number|null} [filePlanType] License filePlanType
         * @property {number|null} [bytesUsed] License bytesUsed
         * @property {number|null} [bytesTotal] License bytesTotal
         * @property {number|null} [secondsUntilStorageExpiration] License secondsUntilStorageExpiration
         * @property {string|null} [storageExpirationDate] License storageExpirationDate
         * @property {boolean|null} [hasAutoRenewableAppstoreSubscription] License hasAutoRenewableAppstoreSubscription
         * @property {number|null} [accountType] License accountType
         * @property {number|null} [uploadsRemaining] License uploadsRemaining
         * @property {number|null} [enterpriseId] License enterpriseId
         * @property {boolean|null} [chatEnabled] License chatEnabled
         * @property {boolean|null} [auditAndReportingEnabled] License auditAndReportingEnabled
         * @property {boolean|null} [breachWatchFeatureDisable] License breachWatchFeatureDisable
         * @property {Uint8Array|null} [accountUid] License accountUid
         * @property {boolean|null} [allowPersonalLicense] License allowPersonalLicense
         * @property {string|null} [licensedBy] License licensedBy
         * @property {string|null} [email] License email
         * @property {boolean|null} [breachWatchEnabled] License breachWatchEnabled
         * @property {boolean|null} [breachWatchScanned] License breachWatchScanned
         * @property {number|null} [breachWatchExpiration] License breachWatchExpiration
         * @property {number|null} [breachWatchDateCreated] License breachWatchDateCreated
         * @property {AccountSummary.IResult|null} [error] License error
         * @property {number|null} [expiration] License expiration
         * @property {number|null} [storageExpiration] License storageExpiration
         * @property {number|null} [uploadsCount] License uploadsCount
         * @property {number|null} [units] License units
         * @property {boolean|null} [pendingEnterprise] License pendingEnterprise
         * @property {boolean|null} [isPamEnabled] License isPamEnabled
         * @property {boolean|null} [isKsmEnabled] License isKsmEnabled
         */

        /**
         * Constructs a new License.
         * @memberof AccountSummary
         * @classdesc Represents a License.
         * @implements ILicense
         * @constructor
         * @param {AccountSummary.ILicense=} [properties] Properties to set
         */
        function License(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * License subscriptionCode.
         * @member {string} subscriptionCode
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.subscriptionCode = "";

        /**
         * License productTypeId.
         * @member {number} productTypeId
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.productTypeId = 0;

        /**
         * License productTypeName.
         * @member {string} productTypeName
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.productTypeName = "";

        /**
         * License expirationDate.
         * @member {string} expirationDate
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.expirationDate = "";

        /**
         * License secondsUntilExpiration.
         * @member {number} secondsUntilExpiration
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.secondsUntilExpiration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * License maxDevices.
         * @member {number} maxDevices
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.maxDevices = 0;

        /**
         * License filePlanType.
         * @member {number} filePlanType
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.filePlanType = 0;

        /**
         * License bytesUsed.
         * @member {number} bytesUsed
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.bytesUsed = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * License bytesTotal.
         * @member {number} bytesTotal
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.bytesTotal = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * License secondsUntilStorageExpiration.
         * @member {number} secondsUntilStorageExpiration
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.secondsUntilStorageExpiration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * License storageExpirationDate.
         * @member {string} storageExpirationDate
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.storageExpirationDate = "";

        /**
         * License hasAutoRenewableAppstoreSubscription.
         * @member {boolean} hasAutoRenewableAppstoreSubscription
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.hasAutoRenewableAppstoreSubscription = false;

        /**
         * License accountType.
         * @member {number} accountType
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.accountType = 0;

        /**
         * License uploadsRemaining.
         * @member {number} uploadsRemaining
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.uploadsRemaining = 0;

        /**
         * License enterpriseId.
         * @member {number} enterpriseId
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.enterpriseId = 0;

        /**
         * License chatEnabled.
         * @member {boolean} chatEnabled
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.chatEnabled = false;

        /**
         * License auditAndReportingEnabled.
         * @member {boolean} auditAndReportingEnabled
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.auditAndReportingEnabled = false;

        /**
         * License breachWatchFeatureDisable.
         * @member {boolean} breachWatchFeatureDisable
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.breachWatchFeatureDisable = false;

        /**
         * License accountUid.
         * @member {Uint8Array} accountUid
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.accountUid = $util.newBuffer([]);

        /**
         * License allowPersonalLicense.
         * @member {boolean} allowPersonalLicense
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.allowPersonalLicense = false;

        /**
         * License licensedBy.
         * @member {string} licensedBy
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.licensedBy = "";

        /**
         * License email.
         * @member {string} email
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.email = "";

        /**
         * License breachWatchEnabled.
         * @member {boolean} breachWatchEnabled
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.breachWatchEnabled = false;

        /**
         * License breachWatchScanned.
         * @member {boolean} breachWatchScanned
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.breachWatchScanned = false;

        /**
         * License breachWatchExpiration.
         * @member {number} breachWatchExpiration
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.breachWatchExpiration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * License breachWatchDateCreated.
         * @member {number} breachWatchDateCreated
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.breachWatchDateCreated = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * License error.
         * @member {AccountSummary.IResult|null|undefined} error
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.error = null;

        /**
         * License expiration.
         * @member {number} expiration
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.expiration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * License storageExpiration.
         * @member {number} storageExpiration
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.storageExpiration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * License uploadsCount.
         * @member {number} uploadsCount
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.uploadsCount = 0;

        /**
         * License units.
         * @member {number} units
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.units = 0;

        /**
         * License pendingEnterprise.
         * @member {boolean} pendingEnterprise
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.pendingEnterprise = false;

        /**
         * License isPamEnabled.
         * @member {boolean} isPamEnabled
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.isPamEnabled = false;

        /**
         * License isKsmEnabled.
         * @member {boolean} isKsmEnabled
         * @memberof AccountSummary.License
         * @instance
         */
        License.prototype.isKsmEnabled = false;

        /**
         * Creates a new License instance using the specified properties.
         * @function create
         * @memberof AccountSummary.License
         * @static
         * @param {AccountSummary.ILicense=} [properties] Properties to set
         * @returns {AccountSummary.License} License instance
         */
        License.create = function create(properties) {
            return new License(properties);
        };

        /**
         * Encodes the specified License message. Does not implicitly {@link AccountSummary.License.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.License
         * @static
         * @param {AccountSummary.ILicense} message License message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        License.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.subscriptionCode != null && Object.hasOwnProperty.call(message, "subscriptionCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.subscriptionCode);
            if (message.productTypeId != null && Object.hasOwnProperty.call(message, "productTypeId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.productTypeId);
            if (message.productTypeName != null && Object.hasOwnProperty.call(message, "productTypeName"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.productTypeName);
            if (message.expirationDate != null && Object.hasOwnProperty.call(message, "expirationDate"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.expirationDate);
            if (message.secondsUntilExpiration != null && Object.hasOwnProperty.call(message, "secondsUntilExpiration"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.secondsUntilExpiration);
            if (message.maxDevices != null && Object.hasOwnProperty.call(message, "maxDevices"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.maxDevices);
            if (message.filePlanType != null && Object.hasOwnProperty.call(message, "filePlanType"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.filePlanType);
            if (message.bytesUsed != null && Object.hasOwnProperty.call(message, "bytesUsed"))
                writer.uint32(/* id 8, wireType 0 =*/64).int64(message.bytesUsed);
            if (message.bytesTotal != null && Object.hasOwnProperty.call(message, "bytesTotal"))
                writer.uint32(/* id 9, wireType 0 =*/72).int64(message.bytesTotal);
            if (message.secondsUntilStorageExpiration != null && Object.hasOwnProperty.call(message, "secondsUntilStorageExpiration"))
                writer.uint32(/* id 10, wireType 0 =*/80).int64(message.secondsUntilStorageExpiration);
            if (message.storageExpirationDate != null && Object.hasOwnProperty.call(message, "storageExpirationDate"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.storageExpirationDate);
            if (message.hasAutoRenewableAppstoreSubscription != null && Object.hasOwnProperty.call(message, "hasAutoRenewableAppstoreSubscription"))
                writer.uint32(/* id 12, wireType 0 =*/96).bool(message.hasAutoRenewableAppstoreSubscription);
            if (message.accountType != null && Object.hasOwnProperty.call(message, "accountType"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.accountType);
            if (message.uploadsRemaining != null && Object.hasOwnProperty.call(message, "uploadsRemaining"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.uploadsRemaining);
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.enterpriseId);
            if (message.chatEnabled != null && Object.hasOwnProperty.call(message, "chatEnabled"))
                writer.uint32(/* id 16, wireType 0 =*/128).bool(message.chatEnabled);
            if (message.auditAndReportingEnabled != null && Object.hasOwnProperty.call(message, "auditAndReportingEnabled"))
                writer.uint32(/* id 17, wireType 0 =*/136).bool(message.auditAndReportingEnabled);
            if (message.breachWatchFeatureDisable != null && Object.hasOwnProperty.call(message, "breachWatchFeatureDisable"))
                writer.uint32(/* id 18, wireType 0 =*/144).bool(message.breachWatchFeatureDisable);
            if (message.accountUid != null && Object.hasOwnProperty.call(message, "accountUid"))
                writer.uint32(/* id 19, wireType 2 =*/154).bytes(message.accountUid);
            if (message.allowPersonalLicense != null && Object.hasOwnProperty.call(message, "allowPersonalLicense"))
                writer.uint32(/* id 20, wireType 0 =*/160).bool(message.allowPersonalLicense);
            if (message.licensedBy != null && Object.hasOwnProperty.call(message, "licensedBy"))
                writer.uint32(/* id 21, wireType 2 =*/170).string(message.licensedBy);
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 22, wireType 2 =*/178).string(message.email);
            if (message.breachWatchEnabled != null && Object.hasOwnProperty.call(message, "breachWatchEnabled"))
                writer.uint32(/* id 23, wireType 0 =*/184).bool(message.breachWatchEnabled);
            if (message.breachWatchScanned != null && Object.hasOwnProperty.call(message, "breachWatchScanned"))
                writer.uint32(/* id 24, wireType 0 =*/192).bool(message.breachWatchScanned);
            if (message.breachWatchExpiration != null && Object.hasOwnProperty.call(message, "breachWatchExpiration"))
                writer.uint32(/* id 25, wireType 0 =*/200).int64(message.breachWatchExpiration);
            if (message.breachWatchDateCreated != null && Object.hasOwnProperty.call(message, "breachWatchDateCreated"))
                writer.uint32(/* id 26, wireType 0 =*/208).int64(message.breachWatchDateCreated);
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.AccountSummary.Result.encode(message.error, writer.uint32(/* id 27, wireType 2 =*/218).fork(), q + 1).ldelim();
            if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                writer.uint32(/* id 29, wireType 0 =*/232).int64(message.expiration);
            if (message.storageExpiration != null && Object.hasOwnProperty.call(message, "storageExpiration"))
                writer.uint32(/* id 30, wireType 0 =*/240).int64(message.storageExpiration);
            if (message.uploadsCount != null && Object.hasOwnProperty.call(message, "uploadsCount"))
                writer.uint32(/* id 31, wireType 0 =*/248).int32(message.uploadsCount);
            if (message.units != null && Object.hasOwnProperty.call(message, "units"))
                writer.uint32(/* id 32, wireType 0 =*/256).int32(message.units);
            if (message.pendingEnterprise != null && Object.hasOwnProperty.call(message, "pendingEnterprise"))
                writer.uint32(/* id 33, wireType 0 =*/264).bool(message.pendingEnterprise);
            if (message.isPamEnabled != null && Object.hasOwnProperty.call(message, "isPamEnabled"))
                writer.uint32(/* id 34, wireType 0 =*/272).bool(message.isPamEnabled);
            if (message.isKsmEnabled != null && Object.hasOwnProperty.call(message, "isKsmEnabled"))
                writer.uint32(/* id 35, wireType 0 =*/280).bool(message.isKsmEnabled);
            return writer;
        };

        /**
         * Encodes the specified License message, length delimited. Does not implicitly {@link AccountSummary.License.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.License
         * @static
         * @param {AccountSummary.ILicense} message License message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        License.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a License message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.License
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.License} License
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        License.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.License();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.subscriptionCode = reader.string();
                        break;
                    }
                case 2: {
                        message.productTypeId = reader.int32();
                        break;
                    }
                case 3: {
                        message.productTypeName = reader.string();
                        break;
                    }
                case 4: {
                        message.expirationDate = reader.string();
                        break;
                    }
                case 5: {
                        message.secondsUntilExpiration = reader.int64();
                        break;
                    }
                case 6: {
                        message.maxDevices = reader.int32();
                        break;
                    }
                case 7: {
                        message.filePlanType = reader.int32();
                        break;
                    }
                case 8: {
                        message.bytesUsed = reader.int64();
                        break;
                    }
                case 9: {
                        message.bytesTotal = reader.int64();
                        break;
                    }
                case 10: {
                        message.secondsUntilStorageExpiration = reader.int64();
                        break;
                    }
                case 11: {
                        message.storageExpirationDate = reader.string();
                        break;
                    }
                case 12: {
                        message.hasAutoRenewableAppstoreSubscription = reader.bool();
                        break;
                    }
                case 13: {
                        message.accountType = reader.int32();
                        break;
                    }
                case 14: {
                        message.uploadsRemaining = reader.int32();
                        break;
                    }
                case 15: {
                        message.enterpriseId = reader.int32();
                        break;
                    }
                case 16: {
                        message.chatEnabled = reader.bool();
                        break;
                    }
                case 17: {
                        message.auditAndReportingEnabled = reader.bool();
                        break;
                    }
                case 18: {
                        message.breachWatchFeatureDisable = reader.bool();
                        break;
                    }
                case 19: {
                        message.accountUid = reader.bytes();
                        break;
                    }
                case 20: {
                        message.allowPersonalLicense = reader.bool();
                        break;
                    }
                case 21: {
                        message.licensedBy = reader.string();
                        break;
                    }
                case 22: {
                        message.email = reader.string();
                        break;
                    }
                case 23: {
                        message.breachWatchEnabled = reader.bool();
                        break;
                    }
                case 24: {
                        message.breachWatchScanned = reader.bool();
                        break;
                    }
                case 25: {
                        message.breachWatchExpiration = reader.int64();
                        break;
                    }
                case 26: {
                        message.breachWatchDateCreated = reader.int64();
                        break;
                    }
                case 27: {
                        message.error = $root.AccountSummary.Result.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 29: {
                        message.expiration = reader.int64();
                        break;
                    }
                case 30: {
                        message.storageExpiration = reader.int64();
                        break;
                    }
                case 31: {
                        message.uploadsCount = reader.int32();
                        break;
                    }
                case 32: {
                        message.units = reader.int32();
                        break;
                    }
                case 33: {
                        message.pendingEnterprise = reader.bool();
                        break;
                    }
                case 34: {
                        message.isPamEnabled = reader.bool();
                        break;
                    }
                case 35: {
                        message.isKsmEnabled = reader.bool();
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
         * Decodes a License message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.License
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.License} License
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        License.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a License message.
         * @function verify
         * @memberof AccountSummary.License
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        License.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.subscriptionCode != null && Object.hasOwnProperty.call(message, "subscriptionCode"))
                if (!$util.isString(message.subscriptionCode))
                    return "subscriptionCode: string expected";
            if (message.productTypeId != null && Object.hasOwnProperty.call(message, "productTypeId"))
                if (!$util.isInteger(message.productTypeId))
                    return "productTypeId: integer expected";
            if (message.productTypeName != null && Object.hasOwnProperty.call(message, "productTypeName"))
                if (!$util.isString(message.productTypeName))
                    return "productTypeName: string expected";
            if (message.expirationDate != null && Object.hasOwnProperty.call(message, "expirationDate"))
                if (!$util.isString(message.expirationDate))
                    return "expirationDate: string expected";
            if (message.secondsUntilExpiration != null && Object.hasOwnProperty.call(message, "secondsUntilExpiration"))
                if (!$util.isInteger(message.secondsUntilExpiration) && !(message.secondsUntilExpiration && $util.isInteger(message.secondsUntilExpiration.low) && $util.isInteger(message.secondsUntilExpiration.high)))
                    return "secondsUntilExpiration: integer|Long expected";
            if (message.maxDevices != null && Object.hasOwnProperty.call(message, "maxDevices"))
                if (!$util.isInteger(message.maxDevices))
                    return "maxDevices: integer expected";
            if (message.filePlanType != null && Object.hasOwnProperty.call(message, "filePlanType"))
                if (!$util.isInteger(message.filePlanType))
                    return "filePlanType: integer expected";
            if (message.bytesUsed != null && Object.hasOwnProperty.call(message, "bytesUsed"))
                if (!$util.isInteger(message.bytesUsed) && !(message.bytesUsed && $util.isInteger(message.bytesUsed.low) && $util.isInteger(message.bytesUsed.high)))
                    return "bytesUsed: integer|Long expected";
            if (message.bytesTotal != null && Object.hasOwnProperty.call(message, "bytesTotal"))
                if (!$util.isInteger(message.bytesTotal) && !(message.bytesTotal && $util.isInteger(message.bytesTotal.low) && $util.isInteger(message.bytesTotal.high)))
                    return "bytesTotal: integer|Long expected";
            if (message.secondsUntilStorageExpiration != null && Object.hasOwnProperty.call(message, "secondsUntilStorageExpiration"))
                if (!$util.isInteger(message.secondsUntilStorageExpiration) && !(message.secondsUntilStorageExpiration && $util.isInteger(message.secondsUntilStorageExpiration.low) && $util.isInteger(message.secondsUntilStorageExpiration.high)))
                    return "secondsUntilStorageExpiration: integer|Long expected";
            if (message.storageExpirationDate != null && Object.hasOwnProperty.call(message, "storageExpirationDate"))
                if (!$util.isString(message.storageExpirationDate))
                    return "storageExpirationDate: string expected";
            if (message.hasAutoRenewableAppstoreSubscription != null && Object.hasOwnProperty.call(message, "hasAutoRenewableAppstoreSubscription"))
                if (typeof message.hasAutoRenewableAppstoreSubscription !== "boolean")
                    return "hasAutoRenewableAppstoreSubscription: boolean expected";
            if (message.accountType != null && Object.hasOwnProperty.call(message, "accountType"))
                if (!$util.isInteger(message.accountType))
                    return "accountType: integer expected";
            if (message.uploadsRemaining != null && Object.hasOwnProperty.call(message, "uploadsRemaining"))
                if (!$util.isInteger(message.uploadsRemaining))
                    return "uploadsRemaining: integer expected";
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                if (!$util.isInteger(message.enterpriseId))
                    return "enterpriseId: integer expected";
            if (message.chatEnabled != null && Object.hasOwnProperty.call(message, "chatEnabled"))
                if (typeof message.chatEnabled !== "boolean")
                    return "chatEnabled: boolean expected";
            if (message.auditAndReportingEnabled != null && Object.hasOwnProperty.call(message, "auditAndReportingEnabled"))
                if (typeof message.auditAndReportingEnabled !== "boolean")
                    return "auditAndReportingEnabled: boolean expected";
            if (message.breachWatchFeatureDisable != null && Object.hasOwnProperty.call(message, "breachWatchFeatureDisable"))
                if (typeof message.breachWatchFeatureDisable !== "boolean")
                    return "breachWatchFeatureDisable: boolean expected";
            if (message.accountUid != null && Object.hasOwnProperty.call(message, "accountUid"))
                if (!(message.accountUid && typeof message.accountUid.length === "number" || $util.isString(message.accountUid)))
                    return "accountUid: buffer expected";
            if (message.allowPersonalLicense != null && Object.hasOwnProperty.call(message, "allowPersonalLicense"))
                if (typeof message.allowPersonalLicense !== "boolean")
                    return "allowPersonalLicense: boolean expected";
            if (message.licensedBy != null && Object.hasOwnProperty.call(message, "licensedBy"))
                if (!$util.isString(message.licensedBy))
                    return "licensedBy: string expected";
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.breachWatchEnabled != null && Object.hasOwnProperty.call(message, "breachWatchEnabled"))
                if (typeof message.breachWatchEnabled !== "boolean")
                    return "breachWatchEnabled: boolean expected";
            if (message.breachWatchScanned != null && Object.hasOwnProperty.call(message, "breachWatchScanned"))
                if (typeof message.breachWatchScanned !== "boolean")
                    return "breachWatchScanned: boolean expected";
            if (message.breachWatchExpiration != null && Object.hasOwnProperty.call(message, "breachWatchExpiration"))
                if (!$util.isInteger(message.breachWatchExpiration) && !(message.breachWatchExpiration && $util.isInteger(message.breachWatchExpiration.low) && $util.isInteger(message.breachWatchExpiration.high)))
                    return "breachWatchExpiration: integer|Long expected";
            if (message.breachWatchDateCreated != null && Object.hasOwnProperty.call(message, "breachWatchDateCreated"))
                if (!$util.isInteger(message.breachWatchDateCreated) && !(message.breachWatchDateCreated && $util.isInteger(message.breachWatchDateCreated.low) && $util.isInteger(message.breachWatchDateCreated.high)))
                    return "breachWatchDateCreated: integer|Long expected";
            if (message.error != null && Object.hasOwnProperty.call(message, "error")) {
                let error = $root.AccountSummary.Result.verify(message.error, long + 1);
                if (error)
                    return "error." + error;
            }
            if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                if (!$util.isInteger(message.expiration) && !(message.expiration && $util.isInteger(message.expiration.low) && $util.isInteger(message.expiration.high)))
                    return "expiration: integer|Long expected";
            if (message.storageExpiration != null && Object.hasOwnProperty.call(message, "storageExpiration"))
                if (!$util.isInteger(message.storageExpiration) && !(message.storageExpiration && $util.isInteger(message.storageExpiration.low) && $util.isInteger(message.storageExpiration.high)))
                    return "storageExpiration: integer|Long expected";
            if (message.uploadsCount != null && Object.hasOwnProperty.call(message, "uploadsCount"))
                if (!$util.isInteger(message.uploadsCount))
                    return "uploadsCount: integer expected";
            if (message.units != null && Object.hasOwnProperty.call(message, "units"))
                if (!$util.isInteger(message.units))
                    return "units: integer expected";
            if (message.pendingEnterprise != null && Object.hasOwnProperty.call(message, "pendingEnterprise"))
                if (typeof message.pendingEnterprise !== "boolean")
                    return "pendingEnterprise: boolean expected";
            if (message.isPamEnabled != null && Object.hasOwnProperty.call(message, "isPamEnabled"))
                if (typeof message.isPamEnabled !== "boolean")
                    return "isPamEnabled: boolean expected";
            if (message.isKsmEnabled != null && Object.hasOwnProperty.call(message, "isKsmEnabled"))
                if (typeof message.isKsmEnabled !== "boolean")
                    return "isKsmEnabled: boolean expected";
            return null;
        };

        /**
         * Creates a License message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.License
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.License} License
         */
        License.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.License)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.License: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.License();
            if (object.subscriptionCode != null)
                message.subscriptionCode = String(object.subscriptionCode);
            if (object.productTypeId != null)
                message.productTypeId = object.productTypeId | 0;
            if (object.productTypeName != null)
                message.productTypeName = String(object.productTypeName);
            if (object.expirationDate != null)
                message.expirationDate = String(object.expirationDate);
            if (object.secondsUntilExpiration != null)
                if ($util.Long)
                    message.secondsUntilExpiration = $util.Long.fromValue(object.secondsUntilExpiration, false);
                else if (typeof object.secondsUntilExpiration === "string")
                    message.secondsUntilExpiration = parseInt(object.secondsUntilExpiration, 10);
                else if (typeof object.secondsUntilExpiration === "number")
                    message.secondsUntilExpiration = object.secondsUntilExpiration;
                else if (typeof object.secondsUntilExpiration === "object")
                    message.secondsUntilExpiration = new $util.LongBits(object.secondsUntilExpiration.low >>> 0, object.secondsUntilExpiration.high >>> 0).toNumber();
            if (object.maxDevices != null)
                message.maxDevices = object.maxDevices | 0;
            if (object.filePlanType != null)
                message.filePlanType = object.filePlanType | 0;
            if (object.bytesUsed != null)
                if ($util.Long)
                    message.bytesUsed = $util.Long.fromValue(object.bytesUsed, false);
                else if (typeof object.bytesUsed === "string")
                    message.bytesUsed = parseInt(object.bytesUsed, 10);
                else if (typeof object.bytesUsed === "number")
                    message.bytesUsed = object.bytesUsed;
                else if (typeof object.bytesUsed === "object")
                    message.bytesUsed = new $util.LongBits(object.bytesUsed.low >>> 0, object.bytesUsed.high >>> 0).toNumber();
            if (object.bytesTotal != null)
                if ($util.Long)
                    message.bytesTotal = $util.Long.fromValue(object.bytesTotal, false);
                else if (typeof object.bytesTotal === "string")
                    message.bytesTotal = parseInt(object.bytesTotal, 10);
                else if (typeof object.bytesTotal === "number")
                    message.bytesTotal = object.bytesTotal;
                else if (typeof object.bytesTotal === "object")
                    message.bytesTotal = new $util.LongBits(object.bytesTotal.low >>> 0, object.bytesTotal.high >>> 0).toNumber();
            if (object.secondsUntilStorageExpiration != null)
                if ($util.Long)
                    message.secondsUntilStorageExpiration = $util.Long.fromValue(object.secondsUntilStorageExpiration, false);
                else if (typeof object.secondsUntilStorageExpiration === "string")
                    message.secondsUntilStorageExpiration = parseInt(object.secondsUntilStorageExpiration, 10);
                else if (typeof object.secondsUntilStorageExpiration === "number")
                    message.secondsUntilStorageExpiration = object.secondsUntilStorageExpiration;
                else if (typeof object.secondsUntilStorageExpiration === "object")
                    message.secondsUntilStorageExpiration = new $util.LongBits(object.secondsUntilStorageExpiration.low >>> 0, object.secondsUntilStorageExpiration.high >>> 0).toNumber();
            if (object.storageExpirationDate != null)
                message.storageExpirationDate = String(object.storageExpirationDate);
            if (object.hasAutoRenewableAppstoreSubscription != null)
                message.hasAutoRenewableAppstoreSubscription = Boolean(object.hasAutoRenewableAppstoreSubscription);
            if (object.accountType != null)
                message.accountType = object.accountType | 0;
            if (object.uploadsRemaining != null)
                message.uploadsRemaining = object.uploadsRemaining | 0;
            if (object.enterpriseId != null)
                message.enterpriseId = object.enterpriseId | 0;
            if (object.chatEnabled != null)
                message.chatEnabled = Boolean(object.chatEnabled);
            if (object.auditAndReportingEnabled != null)
                message.auditAndReportingEnabled = Boolean(object.auditAndReportingEnabled);
            if (object.breachWatchFeatureDisable != null)
                message.breachWatchFeatureDisable = Boolean(object.breachWatchFeatureDisable);
            if (object.accountUid != null)
                if (typeof object.accountUid === "string")
                    $util.base64.decode(object.accountUid, message.accountUid = $util.newBuffer($util.base64.length(object.accountUid)), 0);
                else if (object.accountUid.length >= 0)
                    message.accountUid = object.accountUid;
            if (object.allowPersonalLicense != null)
                message.allowPersonalLicense = Boolean(object.allowPersonalLicense);
            if (object.licensedBy != null)
                message.licensedBy = String(object.licensedBy);
            if (object.email != null)
                message.email = String(object.email);
            if (object.breachWatchEnabled != null)
                message.breachWatchEnabled = Boolean(object.breachWatchEnabled);
            if (object.breachWatchScanned != null)
                message.breachWatchScanned = Boolean(object.breachWatchScanned);
            if (object.breachWatchExpiration != null)
                if ($util.Long)
                    message.breachWatchExpiration = $util.Long.fromValue(object.breachWatchExpiration, false);
                else if (typeof object.breachWatchExpiration === "string")
                    message.breachWatchExpiration = parseInt(object.breachWatchExpiration, 10);
                else if (typeof object.breachWatchExpiration === "number")
                    message.breachWatchExpiration = object.breachWatchExpiration;
                else if (typeof object.breachWatchExpiration === "object")
                    message.breachWatchExpiration = new $util.LongBits(object.breachWatchExpiration.low >>> 0, object.breachWatchExpiration.high >>> 0).toNumber();
            if (object.breachWatchDateCreated != null)
                if ($util.Long)
                    message.breachWatchDateCreated = $util.Long.fromValue(object.breachWatchDateCreated, false);
                else if (typeof object.breachWatchDateCreated === "string")
                    message.breachWatchDateCreated = parseInt(object.breachWatchDateCreated, 10);
                else if (typeof object.breachWatchDateCreated === "number")
                    message.breachWatchDateCreated = object.breachWatchDateCreated;
                else if (typeof object.breachWatchDateCreated === "object")
                    message.breachWatchDateCreated = new $util.LongBits(object.breachWatchDateCreated.low >>> 0, object.breachWatchDateCreated.high >>> 0).toNumber();
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw TypeError(".AccountSummary.License.error: object expected");
                message.error = $root.AccountSummary.Result.fromObject(object.error, long + 1);
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
            if (object.storageExpiration != null)
                if ($util.Long)
                    message.storageExpiration = $util.Long.fromValue(object.storageExpiration, false);
                else if (typeof object.storageExpiration === "string")
                    message.storageExpiration = parseInt(object.storageExpiration, 10);
                else if (typeof object.storageExpiration === "number")
                    message.storageExpiration = object.storageExpiration;
                else if (typeof object.storageExpiration === "object")
                    message.storageExpiration = new $util.LongBits(object.storageExpiration.low >>> 0, object.storageExpiration.high >>> 0).toNumber();
            if (object.uploadsCount != null)
                message.uploadsCount = object.uploadsCount | 0;
            if (object.units != null)
                message.units = object.units | 0;
            if (object.pendingEnterprise != null)
                message.pendingEnterprise = Boolean(object.pendingEnterprise);
            if (object.isPamEnabled != null)
                message.isPamEnabled = Boolean(object.isPamEnabled);
            if (object.isKsmEnabled != null)
                message.isKsmEnabled = Boolean(object.isKsmEnabled);
            return message;
        };

        /**
         * Creates a plain object from a License message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.License
         * @static
         * @param {AccountSummary.License} message License
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        License.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.subscriptionCode = "";
                object.productTypeId = 0;
                object.productTypeName = "";
                object.expirationDate = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.secondsUntilExpiration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.secondsUntilExpiration = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.maxDevices = 0;
                object.filePlanType = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.bytesUsed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.bytesUsed = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.bytesTotal = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.bytesTotal = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.secondsUntilStorageExpiration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.secondsUntilStorageExpiration = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.storageExpirationDate = "";
                object.hasAutoRenewableAppstoreSubscription = false;
                object.accountType = 0;
                object.uploadsRemaining = 0;
                object.enterpriseId = 0;
                object.chatEnabled = false;
                object.auditAndReportingEnabled = false;
                object.breachWatchFeatureDisable = false;
                if (options.bytes === String)
                    object.accountUid = "";
                else {
                    object.accountUid = [];
                    if (options.bytes !== Array)
                        object.accountUid = $util.newBuffer(object.accountUid);
                }
                object.allowPersonalLicense = false;
                object.licensedBy = "";
                object.email = "";
                object.breachWatchEnabled = false;
                object.breachWatchScanned = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.breachWatchExpiration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.breachWatchExpiration = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.breachWatchDateCreated = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.breachWatchDateCreated = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.error = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.expiration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.expiration = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.storageExpiration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.storageExpiration = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.uploadsCount = 0;
                object.units = 0;
                object.pendingEnterprise = false;
                object.isPamEnabled = false;
                object.isKsmEnabled = false;
            }
            if (message.subscriptionCode != null && Object.hasOwnProperty.call(message, "subscriptionCode"))
                object.subscriptionCode = message.subscriptionCode;
            if (message.productTypeId != null && Object.hasOwnProperty.call(message, "productTypeId"))
                object.productTypeId = message.productTypeId;
            if (message.productTypeName != null && Object.hasOwnProperty.call(message, "productTypeName"))
                object.productTypeName = message.productTypeName;
            if (message.expirationDate != null && Object.hasOwnProperty.call(message, "expirationDate"))
                object.expirationDate = message.expirationDate;
            if (message.secondsUntilExpiration != null && Object.hasOwnProperty.call(message, "secondsUntilExpiration"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.secondsUntilExpiration = typeof message.secondsUntilExpiration === "number" ? BigInt(message.secondsUntilExpiration) : $util.Long.fromBits(message.secondsUntilExpiration.low >>> 0, message.secondsUntilExpiration.high >>> 0, false).toBigInt();
                else if (typeof message.secondsUntilExpiration === "number")
                    object.secondsUntilExpiration = options.longs === String ? String(message.secondsUntilExpiration) : message.secondsUntilExpiration;
                else
                    object.secondsUntilExpiration = options.longs === String ? $util.Long.prototype.toString.call(message.secondsUntilExpiration) : options.longs === Number ? new $util.LongBits(message.secondsUntilExpiration.low >>> 0, message.secondsUntilExpiration.high >>> 0).toNumber() : message.secondsUntilExpiration;
            if (message.maxDevices != null && Object.hasOwnProperty.call(message, "maxDevices"))
                object.maxDevices = message.maxDevices;
            if (message.filePlanType != null && Object.hasOwnProperty.call(message, "filePlanType"))
                object.filePlanType = message.filePlanType;
            if (message.bytesUsed != null && Object.hasOwnProperty.call(message, "bytesUsed"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.bytesUsed = typeof message.bytesUsed === "number" ? BigInt(message.bytesUsed) : $util.Long.fromBits(message.bytesUsed.low >>> 0, message.bytesUsed.high >>> 0, false).toBigInt();
                else if (typeof message.bytesUsed === "number")
                    object.bytesUsed = options.longs === String ? String(message.bytesUsed) : message.bytesUsed;
                else
                    object.bytesUsed = options.longs === String ? $util.Long.prototype.toString.call(message.bytesUsed) : options.longs === Number ? new $util.LongBits(message.bytesUsed.low >>> 0, message.bytesUsed.high >>> 0).toNumber() : message.bytesUsed;
            if (message.bytesTotal != null && Object.hasOwnProperty.call(message, "bytesTotal"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.bytesTotal = typeof message.bytesTotal === "number" ? BigInt(message.bytesTotal) : $util.Long.fromBits(message.bytesTotal.low >>> 0, message.bytesTotal.high >>> 0, false).toBigInt();
                else if (typeof message.bytesTotal === "number")
                    object.bytesTotal = options.longs === String ? String(message.bytesTotal) : message.bytesTotal;
                else
                    object.bytesTotal = options.longs === String ? $util.Long.prototype.toString.call(message.bytesTotal) : options.longs === Number ? new $util.LongBits(message.bytesTotal.low >>> 0, message.bytesTotal.high >>> 0).toNumber() : message.bytesTotal;
            if (message.secondsUntilStorageExpiration != null && Object.hasOwnProperty.call(message, "secondsUntilStorageExpiration"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.secondsUntilStorageExpiration = typeof message.secondsUntilStorageExpiration === "number" ? BigInt(message.secondsUntilStorageExpiration) : $util.Long.fromBits(message.secondsUntilStorageExpiration.low >>> 0, message.secondsUntilStorageExpiration.high >>> 0, false).toBigInt();
                else if (typeof message.secondsUntilStorageExpiration === "number")
                    object.secondsUntilStorageExpiration = options.longs === String ? String(message.secondsUntilStorageExpiration) : message.secondsUntilStorageExpiration;
                else
                    object.secondsUntilStorageExpiration = options.longs === String ? $util.Long.prototype.toString.call(message.secondsUntilStorageExpiration) : options.longs === Number ? new $util.LongBits(message.secondsUntilStorageExpiration.low >>> 0, message.secondsUntilStorageExpiration.high >>> 0).toNumber() : message.secondsUntilStorageExpiration;
            if (message.storageExpirationDate != null && Object.hasOwnProperty.call(message, "storageExpirationDate"))
                object.storageExpirationDate = message.storageExpirationDate;
            if (message.hasAutoRenewableAppstoreSubscription != null && Object.hasOwnProperty.call(message, "hasAutoRenewableAppstoreSubscription"))
                object.hasAutoRenewableAppstoreSubscription = message.hasAutoRenewableAppstoreSubscription;
            if (message.accountType != null && Object.hasOwnProperty.call(message, "accountType"))
                object.accountType = message.accountType;
            if (message.uploadsRemaining != null && Object.hasOwnProperty.call(message, "uploadsRemaining"))
                object.uploadsRemaining = message.uploadsRemaining;
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                object.enterpriseId = message.enterpriseId;
            if (message.chatEnabled != null && Object.hasOwnProperty.call(message, "chatEnabled"))
                object.chatEnabled = message.chatEnabled;
            if (message.auditAndReportingEnabled != null && Object.hasOwnProperty.call(message, "auditAndReportingEnabled"))
                object.auditAndReportingEnabled = message.auditAndReportingEnabled;
            if (message.breachWatchFeatureDisable != null && Object.hasOwnProperty.call(message, "breachWatchFeatureDisable"))
                object.breachWatchFeatureDisable = message.breachWatchFeatureDisable;
            if (message.accountUid != null && Object.hasOwnProperty.call(message, "accountUid"))
                object.accountUid = options.bytes === String ? $util.base64.encode(message.accountUid, 0, message.accountUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.accountUid) : message.accountUid;
            if (message.allowPersonalLicense != null && Object.hasOwnProperty.call(message, "allowPersonalLicense"))
                object.allowPersonalLicense = message.allowPersonalLicense;
            if (message.licensedBy != null && Object.hasOwnProperty.call(message, "licensedBy"))
                object.licensedBy = message.licensedBy;
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                object.email = message.email;
            if (message.breachWatchEnabled != null && Object.hasOwnProperty.call(message, "breachWatchEnabled"))
                object.breachWatchEnabled = message.breachWatchEnabled;
            if (message.breachWatchScanned != null && Object.hasOwnProperty.call(message, "breachWatchScanned"))
                object.breachWatchScanned = message.breachWatchScanned;
            if (message.breachWatchExpiration != null && Object.hasOwnProperty.call(message, "breachWatchExpiration"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.breachWatchExpiration = typeof message.breachWatchExpiration === "number" ? BigInt(message.breachWatchExpiration) : $util.Long.fromBits(message.breachWatchExpiration.low >>> 0, message.breachWatchExpiration.high >>> 0, false).toBigInt();
                else if (typeof message.breachWatchExpiration === "number")
                    object.breachWatchExpiration = options.longs === String ? String(message.breachWatchExpiration) : message.breachWatchExpiration;
                else
                    object.breachWatchExpiration = options.longs === String ? $util.Long.prototype.toString.call(message.breachWatchExpiration) : options.longs === Number ? new $util.LongBits(message.breachWatchExpiration.low >>> 0, message.breachWatchExpiration.high >>> 0).toNumber() : message.breachWatchExpiration;
            if (message.breachWatchDateCreated != null && Object.hasOwnProperty.call(message, "breachWatchDateCreated"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.breachWatchDateCreated = typeof message.breachWatchDateCreated === "number" ? BigInt(message.breachWatchDateCreated) : $util.Long.fromBits(message.breachWatchDateCreated.low >>> 0, message.breachWatchDateCreated.high >>> 0, false).toBigInt();
                else if (typeof message.breachWatchDateCreated === "number")
                    object.breachWatchDateCreated = options.longs === String ? String(message.breachWatchDateCreated) : message.breachWatchDateCreated;
                else
                    object.breachWatchDateCreated = options.longs === String ? $util.Long.prototype.toString.call(message.breachWatchDateCreated) : options.longs === Number ? new $util.LongBits(message.breachWatchDateCreated.low >>> 0, message.breachWatchDateCreated.high >>> 0).toNumber() : message.breachWatchDateCreated;
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                object.error = $root.AccountSummary.Result.toObject(message.error, options, q + 1);
            if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.expiration = typeof message.expiration === "number" ? BigInt(message.expiration) : $util.Long.fromBits(message.expiration.low >>> 0, message.expiration.high >>> 0, false).toBigInt();
                else if (typeof message.expiration === "number")
                    object.expiration = options.longs === String ? String(message.expiration) : message.expiration;
                else
                    object.expiration = options.longs === String ? $util.Long.prototype.toString.call(message.expiration) : options.longs === Number ? new $util.LongBits(message.expiration.low >>> 0, message.expiration.high >>> 0).toNumber() : message.expiration;
            if (message.storageExpiration != null && Object.hasOwnProperty.call(message, "storageExpiration"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.storageExpiration = typeof message.storageExpiration === "number" ? BigInt(message.storageExpiration) : $util.Long.fromBits(message.storageExpiration.low >>> 0, message.storageExpiration.high >>> 0, false).toBigInt();
                else if (typeof message.storageExpiration === "number")
                    object.storageExpiration = options.longs === String ? String(message.storageExpiration) : message.storageExpiration;
                else
                    object.storageExpiration = options.longs === String ? $util.Long.prototype.toString.call(message.storageExpiration) : options.longs === Number ? new $util.LongBits(message.storageExpiration.low >>> 0, message.storageExpiration.high >>> 0).toNumber() : message.storageExpiration;
            if (message.uploadsCount != null && Object.hasOwnProperty.call(message, "uploadsCount"))
                object.uploadsCount = message.uploadsCount;
            if (message.units != null && Object.hasOwnProperty.call(message, "units"))
                object.units = message.units;
            if (message.pendingEnterprise != null && Object.hasOwnProperty.call(message, "pendingEnterprise"))
                object.pendingEnterprise = message.pendingEnterprise;
            if (message.isPamEnabled != null && Object.hasOwnProperty.call(message, "isPamEnabled"))
                object.isPamEnabled = message.isPamEnabled;
            if (message.isKsmEnabled != null && Object.hasOwnProperty.call(message, "isKsmEnabled"))
                object.isKsmEnabled = message.isKsmEnabled;
            return object;
        };

        /**
         * Converts this License to JSON.
         * @function toJSON
         * @memberof AccountSummary.License
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        License.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for License
         * @function getTypeUrl
         * @memberof AccountSummary.License
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        License.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.License";
        };

        return License;
    })();

    AccountSummary.AddOn = (function() {

        /**
         * Properties of an AddOn.
         * @memberof AccountSummary
         * @interface IAddOn
         * @property {number|null} [licenseKeyId] AddOn licenseKeyId
         * @property {string|null} [name] AddOn name
         * @property {number|null} [expirationDate] AddOn expirationDate
         * @property {number|null} [createdDate] AddOn createdDate
         * @property {boolean|null} [isTrial] AddOn isTrial
         * @property {boolean|null} [enabled] AddOn enabled
         * @property {boolean|null} [scanned] AddOn scanned
         * @property {boolean|null} [featureDisable] AddOn featureDisable
         */

        /**
         * Constructs a new AddOn.
         * @memberof AccountSummary
         * @classdesc Represents an AddOn.
         * @implements IAddOn
         * @constructor
         * @param {AccountSummary.IAddOn=} [properties] Properties to set
         */
        function AddOn(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AddOn licenseKeyId.
         * @member {number} licenseKeyId
         * @memberof AccountSummary.AddOn
         * @instance
         */
        AddOn.prototype.licenseKeyId = 0;

        /**
         * AddOn name.
         * @member {string} name
         * @memberof AccountSummary.AddOn
         * @instance
         */
        AddOn.prototype.name = "";

        /**
         * AddOn expirationDate.
         * @member {number} expirationDate
         * @memberof AccountSummary.AddOn
         * @instance
         */
        AddOn.prototype.expirationDate = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AddOn createdDate.
         * @member {number} createdDate
         * @memberof AccountSummary.AddOn
         * @instance
         */
        AddOn.prototype.createdDate = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AddOn isTrial.
         * @member {boolean} isTrial
         * @memberof AccountSummary.AddOn
         * @instance
         */
        AddOn.prototype.isTrial = false;

        /**
         * AddOn enabled.
         * @member {boolean} enabled
         * @memberof AccountSummary.AddOn
         * @instance
         */
        AddOn.prototype.enabled = false;

        /**
         * AddOn scanned.
         * @member {boolean} scanned
         * @memberof AccountSummary.AddOn
         * @instance
         */
        AddOn.prototype.scanned = false;

        /**
         * AddOn featureDisable.
         * @member {boolean} featureDisable
         * @memberof AccountSummary.AddOn
         * @instance
         */
        AddOn.prototype.featureDisable = false;

        /**
         * Creates a new AddOn instance using the specified properties.
         * @function create
         * @memberof AccountSummary.AddOn
         * @static
         * @param {AccountSummary.IAddOn=} [properties] Properties to set
         * @returns {AccountSummary.AddOn} AddOn instance
         */
        AddOn.create = function create(properties) {
            return new AddOn(properties);
        };

        /**
         * Encodes the specified AddOn message. Does not implicitly {@link AccountSummary.AddOn.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.AddOn
         * @static
         * @param {AccountSummary.IAddOn} message AddOn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddOn.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.licenseKeyId != null && Object.hasOwnProperty.call(message, "licenseKeyId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.licenseKeyId);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.expirationDate != null && Object.hasOwnProperty.call(message, "expirationDate"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.expirationDate);
            if (message.createdDate != null && Object.hasOwnProperty.call(message, "createdDate"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.createdDate);
            if (message.isTrial != null && Object.hasOwnProperty.call(message, "isTrial"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isTrial);
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.enabled);
            if (message.scanned != null && Object.hasOwnProperty.call(message, "scanned"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.scanned);
            if (message.featureDisable != null && Object.hasOwnProperty.call(message, "featureDisable"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.featureDisable);
            return writer;
        };

        /**
         * Encodes the specified AddOn message, length delimited. Does not implicitly {@link AccountSummary.AddOn.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.AddOn
         * @static
         * @param {AccountSummary.IAddOn} message AddOn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddOn.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AddOn message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.AddOn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.AddOn} AddOn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddOn.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.AddOn();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.licenseKeyId = reader.int32();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                case 3: {
                        message.expirationDate = reader.int64();
                        break;
                    }
                case 4: {
                        message.createdDate = reader.int64();
                        break;
                    }
                case 5: {
                        message.isTrial = reader.bool();
                        break;
                    }
                case 6: {
                        message.enabled = reader.bool();
                        break;
                    }
                case 7: {
                        message.scanned = reader.bool();
                        break;
                    }
                case 8: {
                        message.featureDisable = reader.bool();
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
         * Decodes an AddOn message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.AddOn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.AddOn} AddOn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddOn.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AddOn message.
         * @function verify
         * @memberof AccountSummary.AddOn
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AddOn.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.licenseKeyId != null && Object.hasOwnProperty.call(message, "licenseKeyId"))
                if (!$util.isInteger(message.licenseKeyId))
                    return "licenseKeyId: integer expected";
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.expirationDate != null && Object.hasOwnProperty.call(message, "expirationDate"))
                if (!$util.isInteger(message.expirationDate) && !(message.expirationDate && $util.isInteger(message.expirationDate.low) && $util.isInteger(message.expirationDate.high)))
                    return "expirationDate: integer|Long expected";
            if (message.createdDate != null && Object.hasOwnProperty.call(message, "createdDate"))
                if (!$util.isInteger(message.createdDate) && !(message.createdDate && $util.isInteger(message.createdDate.low) && $util.isInteger(message.createdDate.high)))
                    return "createdDate: integer|Long expected";
            if (message.isTrial != null && Object.hasOwnProperty.call(message, "isTrial"))
                if (typeof message.isTrial !== "boolean")
                    return "isTrial: boolean expected";
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                if (typeof message.enabled !== "boolean")
                    return "enabled: boolean expected";
            if (message.scanned != null && Object.hasOwnProperty.call(message, "scanned"))
                if (typeof message.scanned !== "boolean")
                    return "scanned: boolean expected";
            if (message.featureDisable != null && Object.hasOwnProperty.call(message, "featureDisable"))
                if (typeof message.featureDisable !== "boolean")
                    return "featureDisable: boolean expected";
            return null;
        };

        /**
         * Creates an AddOn message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.AddOn
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.AddOn} AddOn
         */
        AddOn.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.AddOn)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.AddOn: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.AddOn();
            if (object.licenseKeyId != null)
                message.licenseKeyId = object.licenseKeyId | 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.expirationDate != null)
                if ($util.Long)
                    message.expirationDate = $util.Long.fromValue(object.expirationDate, false);
                else if (typeof object.expirationDate === "string")
                    message.expirationDate = parseInt(object.expirationDate, 10);
                else if (typeof object.expirationDate === "number")
                    message.expirationDate = object.expirationDate;
                else if (typeof object.expirationDate === "object")
                    message.expirationDate = new $util.LongBits(object.expirationDate.low >>> 0, object.expirationDate.high >>> 0).toNumber();
            if (object.createdDate != null)
                if ($util.Long)
                    message.createdDate = $util.Long.fromValue(object.createdDate, false);
                else if (typeof object.createdDate === "string")
                    message.createdDate = parseInt(object.createdDate, 10);
                else if (typeof object.createdDate === "number")
                    message.createdDate = object.createdDate;
                else if (typeof object.createdDate === "object")
                    message.createdDate = new $util.LongBits(object.createdDate.low >>> 0, object.createdDate.high >>> 0).toNumber();
            if (object.isTrial != null)
                message.isTrial = Boolean(object.isTrial);
            if (object.enabled != null)
                message.enabled = Boolean(object.enabled);
            if (object.scanned != null)
                message.scanned = Boolean(object.scanned);
            if (object.featureDisable != null)
                message.featureDisable = Boolean(object.featureDisable);
            return message;
        };

        /**
         * Creates a plain object from an AddOn message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.AddOn
         * @static
         * @param {AccountSummary.AddOn} message AddOn
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AddOn.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.licenseKeyId = 0;
                object.name = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.expirationDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.expirationDate = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.createdDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.createdDate = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.isTrial = false;
                object.enabled = false;
                object.scanned = false;
                object.featureDisable = false;
            }
            if (message.licenseKeyId != null && Object.hasOwnProperty.call(message, "licenseKeyId"))
                object.licenseKeyId = message.licenseKeyId;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.expirationDate != null && Object.hasOwnProperty.call(message, "expirationDate"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.expirationDate = typeof message.expirationDate === "number" ? BigInt(message.expirationDate) : $util.Long.fromBits(message.expirationDate.low >>> 0, message.expirationDate.high >>> 0, false).toBigInt();
                else if (typeof message.expirationDate === "number")
                    object.expirationDate = options.longs === String ? String(message.expirationDate) : message.expirationDate;
                else
                    object.expirationDate = options.longs === String ? $util.Long.prototype.toString.call(message.expirationDate) : options.longs === Number ? new $util.LongBits(message.expirationDate.low >>> 0, message.expirationDate.high >>> 0).toNumber() : message.expirationDate;
            if (message.createdDate != null && Object.hasOwnProperty.call(message, "createdDate"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.createdDate = typeof message.createdDate === "number" ? BigInt(message.createdDate) : $util.Long.fromBits(message.createdDate.low >>> 0, message.createdDate.high >>> 0, false).toBigInt();
                else if (typeof message.createdDate === "number")
                    object.createdDate = options.longs === String ? String(message.createdDate) : message.createdDate;
                else
                    object.createdDate = options.longs === String ? $util.Long.prototype.toString.call(message.createdDate) : options.longs === Number ? new $util.LongBits(message.createdDate.low >>> 0, message.createdDate.high >>> 0).toNumber() : message.createdDate;
            if (message.isTrial != null && Object.hasOwnProperty.call(message, "isTrial"))
                object.isTrial = message.isTrial;
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                object.enabled = message.enabled;
            if (message.scanned != null && Object.hasOwnProperty.call(message, "scanned"))
                object.scanned = message.scanned;
            if (message.featureDisable != null && Object.hasOwnProperty.call(message, "featureDisable"))
                object.featureDisable = message.featureDisable;
            return object;
        };

        /**
         * Converts this AddOn to JSON.
         * @function toJSON
         * @memberof AccountSummary.AddOn
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AddOn.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AddOn
         * @function getTypeUrl
         * @memberof AccountSummary.AddOn
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AddOn.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.AddOn";
        };

        return AddOn;
    })();

    AccountSummary.Settings = (function() {

        /**
         * Properties of a Settings.
         * @memberof AccountSummary
         * @interface ISettings
         * @property {boolean|null} [audit] Settings audit
         * @property {number|null} [mustPerformAccountShareBy] Settings mustPerformAccountShareBy
         * @property {Array.<AccountSummary.IMissingAccountShareKey>|null} [shareAccountTo] Settings shareAccountTo
         * @property {Array.<AccountSummary.IPasswordRule>|null} [rules] Settings rules
         * @property {string|null} [passwordRulesIntro] Settings passwordRulesIntro
         * @property {number|null} [autoBackupDays] Settings autoBackupDays
         * @property {string|null} [theme] Settings theme
         * @property {string|null} [channel] Settings channel
         * @property {string|null} [channelValue] Settings channelValue
         * @property {boolean|null} [rsaConfigured] Settings rsaConfigured
         * @property {boolean|null} [emailVerified] Settings emailVerified
         * @property {number|null} [masterPasswordLastModified] Settings masterPasswordLastModified
         * @property {Uint8Array|null} [accountFolderKey] Settings accountFolderKey
         * @property {Array.<AccountSummary.ISecurityKey>|null} [securityKeys] Settings securityKeys
         * @property {Array.<AccountSummary.IKeyValue>|null} [keyValues] ?????
         * @property {boolean|null} [ssoUser] Settings ssoUser
         * @property {boolean|null} [onlineAccessOnly] Settings onlineAccessOnly
         * @property {number|null} [masterPasswordExpiry] Settings masterPasswordExpiry
         * @property {boolean|null} [twoFactorRequired] Settings twoFactorRequired
         * @property {boolean|null} [disallowExport] Settings disallowExport
         * @property {boolean|null} [restrictFiles] Settings restrictFiles
         * @property {boolean|null} [restrictAllSharing] Settings restrictAllSharing
         * @property {boolean|null} [restrictSharing] Settings restrictSharing
         * @property {boolean|null} [restrictSharingIncomingAll] Settings restrictSharingIncomingAll
         * @property {boolean|null} [restrictSharingIncomingEnterprise] Settings restrictSharingIncomingEnterprise
         * @property {number|null} [logoutTimer] Settings logoutTimer
         * @property {boolean|null} [persistentLogin] Settings persistentLogin
         * @property {boolean|null} [ipDisableAutoApprove] Settings ipDisableAutoApprove
         * @property {boolean|null} [shareDataKeyWithEccPublicKey] Settings shareDataKeyWithEccPublicKey
         * @property {boolean|null} [shareDataKeyWithDevicePublicKey] Settings shareDataKeyWithDevicePublicKey
         * @property {number|null} [RecordTypesCounter] Settings RecordTypesCounter
         * @property {number|null} [RecordTypesEnterpriseCounter] Settings RecordTypesEnterpriseCounter
         * @property {boolean|null} [recordTypesEnabled] Settings recordTypesEnabled
         * @property {boolean|null} [canManageRecordTypes] Settings canManageRecordTypes
         * @property {number|null} [recordTypesPAMCounter] Settings recordTypesPAMCounter
         * @property {number|null} [logoutTimerMinutes] Settings logoutTimerMinutes
         * @property {boolean|null} [securityKeysNoUserVerify] Settings securityKeysNoUserVerify
         * @property {Array.<Authentication.TwoFactorChannelType>|null} [channels] Settings channels
         * @property {Array.<string>|null} [personalUsernames] Settings personalUsernames
         * @property {number|null} [maxIpDistance] Settings maxIpDistance
         * @property {number|null} [maxIpDistanceEffective] Settings maxIpDistanceEffective
         */

        /**
         * Constructs a new Settings.
         * @memberof AccountSummary
         * @classdesc Represents a Settings.
         * @implements ISettings
         * @constructor
         * @param {AccountSummary.ISettings=} [properties] Properties to set
         */
        function Settings(properties) {
            this.shareAccountTo = [];
            this.rules = [];
            this.securityKeys = [];
            this.keyValues = [];
            this.channels = [];
            this.personalUsernames = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Settings audit.
         * @member {boolean} audit
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.audit = false;

        /**
         * Settings mustPerformAccountShareBy.
         * @member {number} mustPerformAccountShareBy
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.mustPerformAccountShareBy = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Settings shareAccountTo.
         * @member {Array.<AccountSummary.IMissingAccountShareKey>} shareAccountTo
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.shareAccountTo = $util.emptyArray;

        /**
         * Settings rules.
         * @member {Array.<AccountSummary.IPasswordRule>} rules
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.rules = $util.emptyArray;

        /**
         * Settings passwordRulesIntro.
         * @member {string} passwordRulesIntro
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.passwordRulesIntro = "";

        /**
         * Settings autoBackupDays.
         * @member {number} autoBackupDays
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.autoBackupDays = 0;

        /**
         * Settings theme.
         * @member {string} theme
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.theme = "";

        /**
         * Settings channel.
         * @member {string} channel
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.channel = "";

        /**
         * Settings channelValue.
         * @member {string} channelValue
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.channelValue = "";

        /**
         * Settings rsaConfigured.
         * @member {boolean} rsaConfigured
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.rsaConfigured = false;

        /**
         * Settings emailVerified.
         * @member {boolean} emailVerified
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.emailVerified = false;

        /**
         * Settings masterPasswordLastModified.
         * @member {number} masterPasswordLastModified
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.masterPasswordLastModified = 0;

        /**
         * Settings accountFolderKey.
         * @member {Uint8Array} accountFolderKey
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.accountFolderKey = $util.newBuffer([]);

        /**
         * Settings securityKeys.
         * @member {Array.<AccountSummary.ISecurityKey>} securityKeys
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.securityKeys = $util.emptyArray;

        /**
         * ?????
         * @member {Array.<AccountSummary.IKeyValue>} keyValues
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.keyValues = $util.emptyArray;

        /**
         * Settings ssoUser.
         * @member {boolean} ssoUser
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.ssoUser = false;

        /**
         * Settings onlineAccessOnly.
         * @member {boolean} onlineAccessOnly
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.onlineAccessOnly = false;

        /**
         * Settings masterPasswordExpiry.
         * @member {number} masterPasswordExpiry
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.masterPasswordExpiry = 0;

        /**
         * Settings twoFactorRequired.
         * @member {boolean} twoFactorRequired
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.twoFactorRequired = false;

        /**
         * Settings disallowExport.
         * @member {boolean} disallowExport
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.disallowExport = false;

        /**
         * Settings restrictFiles.
         * @member {boolean} restrictFiles
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.restrictFiles = false;

        /**
         * Settings restrictAllSharing.
         * @member {boolean} restrictAllSharing
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.restrictAllSharing = false;

        /**
         * Settings restrictSharing.
         * @member {boolean} restrictSharing
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.restrictSharing = false;

        /**
         * Settings restrictSharingIncomingAll.
         * @member {boolean} restrictSharingIncomingAll
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.restrictSharingIncomingAll = false;

        /**
         * Settings restrictSharingIncomingEnterprise.
         * @member {boolean} restrictSharingIncomingEnterprise
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.restrictSharingIncomingEnterprise = false;

        /**
         * Settings logoutTimer.
         * @member {number} logoutTimer
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.logoutTimer = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Settings persistentLogin.
         * @member {boolean} persistentLogin
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.persistentLogin = false;

        /**
         * Settings ipDisableAutoApprove.
         * @member {boolean} ipDisableAutoApprove
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.ipDisableAutoApprove = false;

        /**
         * Settings shareDataKeyWithEccPublicKey.
         * @member {boolean} shareDataKeyWithEccPublicKey
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.shareDataKeyWithEccPublicKey = false;

        /**
         * Settings shareDataKeyWithDevicePublicKey.
         * @member {boolean} shareDataKeyWithDevicePublicKey
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.shareDataKeyWithDevicePublicKey = false;

        /**
         * Settings RecordTypesCounter.
         * @member {number} RecordTypesCounter
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.RecordTypesCounter = 0;

        /**
         * Settings RecordTypesEnterpriseCounter.
         * @member {number} RecordTypesEnterpriseCounter
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.RecordTypesEnterpriseCounter = 0;

        /**
         * Settings recordTypesEnabled.
         * @member {boolean} recordTypesEnabled
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.recordTypesEnabled = false;

        /**
         * Settings canManageRecordTypes.
         * @member {boolean} canManageRecordTypes
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.canManageRecordTypes = false;

        /**
         * Settings recordTypesPAMCounter.
         * @member {number} recordTypesPAMCounter
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.recordTypesPAMCounter = 0;

        /**
         * Settings logoutTimerMinutes.
         * @member {number} logoutTimerMinutes
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.logoutTimerMinutes = 0;

        /**
         * Settings securityKeysNoUserVerify.
         * @member {boolean} securityKeysNoUserVerify
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.securityKeysNoUserVerify = false;

        /**
         * Settings channels.
         * @member {Array.<Authentication.TwoFactorChannelType>} channels
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.channels = $util.emptyArray;

        /**
         * Settings personalUsernames.
         * @member {Array.<string>} personalUsernames
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.personalUsernames = $util.emptyArray;

        /**
         * Settings maxIpDistance.
         * @member {number} maxIpDistance
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.maxIpDistance = 0;

        /**
         * Settings maxIpDistanceEffective.
         * @member {number} maxIpDistanceEffective
         * @memberof AccountSummary.Settings
         * @instance
         */
        Settings.prototype.maxIpDistanceEffective = 0;

        /**
         * Creates a new Settings instance using the specified properties.
         * @function create
         * @memberof AccountSummary.Settings
         * @static
         * @param {AccountSummary.ISettings=} [properties] Properties to set
         * @returns {AccountSummary.Settings} Settings instance
         */
        Settings.create = function create(properties) {
            return new Settings(properties);
        };

        /**
         * Encodes the specified Settings message. Does not implicitly {@link AccountSummary.Settings.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.Settings
         * @static
         * @param {AccountSummary.ISettings} message Settings message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Settings.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.audit != null && Object.hasOwnProperty.call(message, "audit"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.audit);
            if (message.mustPerformAccountShareBy != null && Object.hasOwnProperty.call(message, "mustPerformAccountShareBy"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.mustPerformAccountShareBy);
            if (message.shareAccountTo != null && message.shareAccountTo.length)
                for (let i = 0; i < message.shareAccountTo.length; ++i)
                    $root.AccountSummary.MissingAccountShareKey.encode(message.shareAccountTo[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.rules != null && message.rules.length)
                for (let i = 0; i < message.rules.length; ++i)
                    $root.AccountSummary.PasswordRule.encode(message.rules[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.passwordRulesIntro != null && Object.hasOwnProperty.call(message, "passwordRulesIntro"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.passwordRulesIntro);
            if (message.autoBackupDays != null && Object.hasOwnProperty.call(message, "autoBackupDays"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.autoBackupDays);
            if (message.theme != null && Object.hasOwnProperty.call(message, "theme"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.theme);
            if (message.channel != null && Object.hasOwnProperty.call(message, "channel"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.channel);
            if (message.channelValue != null && Object.hasOwnProperty.call(message, "channelValue"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.channelValue);
            if (message.rsaConfigured != null && Object.hasOwnProperty.call(message, "rsaConfigured"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.rsaConfigured);
            if (message.emailVerified != null && Object.hasOwnProperty.call(message, "emailVerified"))
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.emailVerified);
            if (message.masterPasswordLastModified != null && Object.hasOwnProperty.call(message, "masterPasswordLastModified"))
                writer.uint32(/* id 12, wireType 1 =*/97).double(message.masterPasswordLastModified);
            if (message.accountFolderKey != null && Object.hasOwnProperty.call(message, "accountFolderKey"))
                writer.uint32(/* id 13, wireType 2 =*/106).bytes(message.accountFolderKey);
            if (message.securityKeys != null && message.securityKeys.length)
                for (let i = 0; i < message.securityKeys.length; ++i)
                    $root.AccountSummary.SecurityKey.encode(message.securityKeys[i], writer.uint32(/* id 14, wireType 2 =*/114).fork(), q + 1).ldelim();
            if (message.keyValues != null && message.keyValues.length)
                for (let i = 0; i < message.keyValues.length; ++i)
                    $root.AccountSummary.KeyValue.encode(message.keyValues[i], writer.uint32(/* id 15, wireType 2 =*/122).fork(), q + 1).ldelim();
            if (message.ssoUser != null && Object.hasOwnProperty.call(message, "ssoUser"))
                writer.uint32(/* id 16, wireType 0 =*/128).bool(message.ssoUser);
            if (message.onlineAccessOnly != null && Object.hasOwnProperty.call(message, "onlineAccessOnly"))
                writer.uint32(/* id 17, wireType 0 =*/136).bool(message.onlineAccessOnly);
            if (message.masterPasswordExpiry != null && Object.hasOwnProperty.call(message, "masterPasswordExpiry"))
                writer.uint32(/* id 18, wireType 0 =*/144).int32(message.masterPasswordExpiry);
            if (message.twoFactorRequired != null && Object.hasOwnProperty.call(message, "twoFactorRequired"))
                writer.uint32(/* id 19, wireType 0 =*/152).bool(message.twoFactorRequired);
            if (message.disallowExport != null && Object.hasOwnProperty.call(message, "disallowExport"))
                writer.uint32(/* id 20, wireType 0 =*/160).bool(message.disallowExport);
            if (message.restrictFiles != null && Object.hasOwnProperty.call(message, "restrictFiles"))
                writer.uint32(/* id 21, wireType 0 =*/168).bool(message.restrictFiles);
            if (message.restrictAllSharing != null && Object.hasOwnProperty.call(message, "restrictAllSharing"))
                writer.uint32(/* id 22, wireType 0 =*/176).bool(message.restrictAllSharing);
            if (message.restrictSharing != null && Object.hasOwnProperty.call(message, "restrictSharing"))
                writer.uint32(/* id 23, wireType 0 =*/184).bool(message.restrictSharing);
            if (message.restrictSharingIncomingAll != null && Object.hasOwnProperty.call(message, "restrictSharingIncomingAll"))
                writer.uint32(/* id 24, wireType 0 =*/192).bool(message.restrictSharingIncomingAll);
            if (message.restrictSharingIncomingEnterprise != null && Object.hasOwnProperty.call(message, "restrictSharingIncomingEnterprise"))
                writer.uint32(/* id 25, wireType 0 =*/200).bool(message.restrictSharingIncomingEnterprise);
            if (message.logoutTimer != null && Object.hasOwnProperty.call(message, "logoutTimer"))
                writer.uint32(/* id 26, wireType 0 =*/208).int64(message.logoutTimer);
            if (message.persistentLogin != null && Object.hasOwnProperty.call(message, "persistentLogin"))
                writer.uint32(/* id 27, wireType 0 =*/216).bool(message.persistentLogin);
            if (message.ipDisableAutoApprove != null && Object.hasOwnProperty.call(message, "ipDisableAutoApprove"))
                writer.uint32(/* id 28, wireType 0 =*/224).bool(message.ipDisableAutoApprove);
            if (message.shareDataKeyWithEccPublicKey != null && Object.hasOwnProperty.call(message, "shareDataKeyWithEccPublicKey"))
                writer.uint32(/* id 29, wireType 0 =*/232).bool(message.shareDataKeyWithEccPublicKey);
            if (message.shareDataKeyWithDevicePublicKey != null && Object.hasOwnProperty.call(message, "shareDataKeyWithDevicePublicKey"))
                writer.uint32(/* id 30, wireType 0 =*/240).bool(message.shareDataKeyWithDevicePublicKey);
            if (message.RecordTypesCounter != null && Object.hasOwnProperty.call(message, "RecordTypesCounter"))
                writer.uint32(/* id 31, wireType 0 =*/248).int32(message.RecordTypesCounter);
            if (message.RecordTypesEnterpriseCounter != null && Object.hasOwnProperty.call(message, "RecordTypesEnterpriseCounter"))
                writer.uint32(/* id 32, wireType 0 =*/256).int32(message.RecordTypesEnterpriseCounter);
            if (message.recordTypesEnabled != null && Object.hasOwnProperty.call(message, "recordTypesEnabled"))
                writer.uint32(/* id 33, wireType 0 =*/264).bool(message.recordTypesEnabled);
            if (message.canManageRecordTypes != null && Object.hasOwnProperty.call(message, "canManageRecordTypes"))
                writer.uint32(/* id 34, wireType 0 =*/272).bool(message.canManageRecordTypes);
            if (message.recordTypesPAMCounter != null && Object.hasOwnProperty.call(message, "recordTypesPAMCounter"))
                writer.uint32(/* id 35, wireType 0 =*/280).int32(message.recordTypesPAMCounter);
            if (message.logoutTimerMinutes != null && Object.hasOwnProperty.call(message, "logoutTimerMinutes"))
                writer.uint32(/* id 36, wireType 0 =*/288).int32(message.logoutTimerMinutes);
            if (message.securityKeysNoUserVerify != null && Object.hasOwnProperty.call(message, "securityKeysNoUserVerify"))
                writer.uint32(/* id 37, wireType 0 =*/296).bool(message.securityKeysNoUserVerify);
            if (message.channels != null && message.channels.length) {
                writer.uint32(/* id 38, wireType 2 =*/306).fork();
                for (let i = 0; i < message.channels.length; ++i)
                    writer.int32(message.channels[i]);
                writer.ldelim();
            }
            if (message.personalUsernames != null && message.personalUsernames.length)
                for (let i = 0; i < message.personalUsernames.length; ++i)
                    writer.uint32(/* id 39, wireType 2 =*/314).string(message.personalUsernames[i]);
            if (message.maxIpDistance != null && Object.hasOwnProperty.call(message, "maxIpDistance"))
                writer.uint32(/* id 40, wireType 0 =*/320).int32(message.maxIpDistance);
            if (message.maxIpDistanceEffective != null && Object.hasOwnProperty.call(message, "maxIpDistanceEffective"))
                writer.uint32(/* id 41, wireType 0 =*/328).int32(message.maxIpDistanceEffective);
            return writer;
        };

        /**
         * Encodes the specified Settings message, length delimited. Does not implicitly {@link AccountSummary.Settings.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.Settings
         * @static
         * @param {AccountSummary.ISettings} message Settings message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Settings.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Settings message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.Settings
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.Settings} Settings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Settings.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.Settings();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.audit = reader.bool();
                        break;
                    }
                case 2: {
                        message.mustPerformAccountShareBy = reader.int64();
                        break;
                    }
                case 3: {
                        if (!(message.shareAccountTo && message.shareAccountTo.length))
                            message.shareAccountTo = [];
                        message.shareAccountTo.push($root.AccountSummary.MissingAccountShareKey.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 4: {
                        if (!(message.rules && message.rules.length))
                            message.rules = [];
                        message.rules.push($root.AccountSummary.PasswordRule.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 5: {
                        message.passwordRulesIntro = reader.string();
                        break;
                    }
                case 6: {
                        message.autoBackupDays = reader.int32();
                        break;
                    }
                case 7: {
                        message.theme = reader.string();
                        break;
                    }
                case 8: {
                        message.channel = reader.string();
                        break;
                    }
                case 9: {
                        message.channelValue = reader.string();
                        break;
                    }
                case 10: {
                        message.rsaConfigured = reader.bool();
                        break;
                    }
                case 11: {
                        message.emailVerified = reader.bool();
                        break;
                    }
                case 12: {
                        message.masterPasswordLastModified = reader.double();
                        break;
                    }
                case 13: {
                        message.accountFolderKey = reader.bytes();
                        break;
                    }
                case 14: {
                        if (!(message.securityKeys && message.securityKeys.length))
                            message.securityKeys = [];
                        message.securityKeys.push($root.AccountSummary.SecurityKey.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 15: {
                        if (!(message.keyValues && message.keyValues.length))
                            message.keyValues = [];
                        message.keyValues.push($root.AccountSummary.KeyValue.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 16: {
                        message.ssoUser = reader.bool();
                        break;
                    }
                case 17: {
                        message.onlineAccessOnly = reader.bool();
                        break;
                    }
                case 18: {
                        message.masterPasswordExpiry = reader.int32();
                        break;
                    }
                case 19: {
                        message.twoFactorRequired = reader.bool();
                        break;
                    }
                case 20: {
                        message.disallowExport = reader.bool();
                        break;
                    }
                case 21: {
                        message.restrictFiles = reader.bool();
                        break;
                    }
                case 22: {
                        message.restrictAllSharing = reader.bool();
                        break;
                    }
                case 23: {
                        message.restrictSharing = reader.bool();
                        break;
                    }
                case 24: {
                        message.restrictSharingIncomingAll = reader.bool();
                        break;
                    }
                case 25: {
                        message.restrictSharingIncomingEnterprise = reader.bool();
                        break;
                    }
                case 26: {
                        message.logoutTimer = reader.int64();
                        break;
                    }
                case 27: {
                        message.persistentLogin = reader.bool();
                        break;
                    }
                case 28: {
                        message.ipDisableAutoApprove = reader.bool();
                        break;
                    }
                case 29: {
                        message.shareDataKeyWithEccPublicKey = reader.bool();
                        break;
                    }
                case 30: {
                        message.shareDataKeyWithDevicePublicKey = reader.bool();
                        break;
                    }
                case 31: {
                        message.RecordTypesCounter = reader.int32();
                        break;
                    }
                case 32: {
                        message.RecordTypesEnterpriseCounter = reader.int32();
                        break;
                    }
                case 33: {
                        message.recordTypesEnabled = reader.bool();
                        break;
                    }
                case 34: {
                        message.canManageRecordTypes = reader.bool();
                        break;
                    }
                case 35: {
                        message.recordTypesPAMCounter = reader.int32();
                        break;
                    }
                case 36: {
                        message.logoutTimerMinutes = reader.int32();
                        break;
                    }
                case 37: {
                        message.securityKeysNoUserVerify = reader.bool();
                        break;
                    }
                case 38: {
                        if (!(message.channels && message.channels.length))
                            message.channels = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.channels.push(reader.int32());
                        } else
                            message.channels.push(reader.int32());
                        break;
                    }
                case 39: {
                        if (!(message.personalUsernames && message.personalUsernames.length))
                            message.personalUsernames = [];
                        message.personalUsernames.push(reader.string());
                        break;
                    }
                case 40: {
                        message.maxIpDistance = reader.int32();
                        break;
                    }
                case 41: {
                        message.maxIpDistanceEffective = reader.int32();
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
         * Decodes a Settings message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.Settings
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.Settings} Settings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Settings.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Settings message.
         * @function verify
         * @memberof AccountSummary.Settings
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Settings.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.audit != null && Object.hasOwnProperty.call(message, "audit"))
                if (typeof message.audit !== "boolean")
                    return "audit: boolean expected";
            if (message.mustPerformAccountShareBy != null && Object.hasOwnProperty.call(message, "mustPerformAccountShareBy"))
                if (!$util.isInteger(message.mustPerformAccountShareBy) && !(message.mustPerformAccountShareBy && $util.isInteger(message.mustPerformAccountShareBy.low) && $util.isInteger(message.mustPerformAccountShareBy.high)))
                    return "mustPerformAccountShareBy: integer|Long expected";
            if (message.shareAccountTo != null && Object.hasOwnProperty.call(message, "shareAccountTo")) {
                if (!Array.isArray(message.shareAccountTo))
                    return "shareAccountTo: array expected";
                for (let i = 0; i < message.shareAccountTo.length; ++i) {
                    let error = $root.AccountSummary.MissingAccountShareKey.verify(message.shareAccountTo[i], long + 1);
                    if (error)
                        return "shareAccountTo." + error;
                }
            }
            if (message.rules != null && Object.hasOwnProperty.call(message, "rules")) {
                if (!Array.isArray(message.rules))
                    return "rules: array expected";
                for (let i = 0; i < message.rules.length; ++i) {
                    let error = $root.AccountSummary.PasswordRule.verify(message.rules[i], long + 1);
                    if (error)
                        return "rules." + error;
                }
            }
            if (message.passwordRulesIntro != null && Object.hasOwnProperty.call(message, "passwordRulesIntro"))
                if (!$util.isString(message.passwordRulesIntro))
                    return "passwordRulesIntro: string expected";
            if (message.autoBackupDays != null && Object.hasOwnProperty.call(message, "autoBackupDays"))
                if (!$util.isInteger(message.autoBackupDays))
                    return "autoBackupDays: integer expected";
            if (message.theme != null && Object.hasOwnProperty.call(message, "theme"))
                if (!$util.isString(message.theme))
                    return "theme: string expected";
            if (message.channel != null && Object.hasOwnProperty.call(message, "channel"))
                if (!$util.isString(message.channel))
                    return "channel: string expected";
            if (message.channelValue != null && Object.hasOwnProperty.call(message, "channelValue"))
                if (!$util.isString(message.channelValue))
                    return "channelValue: string expected";
            if (message.rsaConfigured != null && Object.hasOwnProperty.call(message, "rsaConfigured"))
                if (typeof message.rsaConfigured !== "boolean")
                    return "rsaConfigured: boolean expected";
            if (message.emailVerified != null && Object.hasOwnProperty.call(message, "emailVerified"))
                if (typeof message.emailVerified !== "boolean")
                    return "emailVerified: boolean expected";
            if (message.masterPasswordLastModified != null && Object.hasOwnProperty.call(message, "masterPasswordLastModified"))
                if (typeof message.masterPasswordLastModified !== "number")
                    return "masterPasswordLastModified: number expected";
            if (message.accountFolderKey != null && Object.hasOwnProperty.call(message, "accountFolderKey"))
                if (!(message.accountFolderKey && typeof message.accountFolderKey.length === "number" || $util.isString(message.accountFolderKey)))
                    return "accountFolderKey: buffer expected";
            if (message.securityKeys != null && Object.hasOwnProperty.call(message, "securityKeys")) {
                if (!Array.isArray(message.securityKeys))
                    return "securityKeys: array expected";
                for (let i = 0; i < message.securityKeys.length; ++i) {
                    let error = $root.AccountSummary.SecurityKey.verify(message.securityKeys[i], long + 1);
                    if (error)
                        return "securityKeys." + error;
                }
            }
            if (message.keyValues != null && Object.hasOwnProperty.call(message, "keyValues")) {
                if (!Array.isArray(message.keyValues))
                    return "keyValues: array expected";
                for (let i = 0; i < message.keyValues.length; ++i) {
                    let error = $root.AccountSummary.KeyValue.verify(message.keyValues[i], long + 1);
                    if (error)
                        return "keyValues." + error;
                }
            }
            if (message.ssoUser != null && Object.hasOwnProperty.call(message, "ssoUser"))
                if (typeof message.ssoUser !== "boolean")
                    return "ssoUser: boolean expected";
            if (message.onlineAccessOnly != null && Object.hasOwnProperty.call(message, "onlineAccessOnly"))
                if (typeof message.onlineAccessOnly !== "boolean")
                    return "onlineAccessOnly: boolean expected";
            if (message.masterPasswordExpiry != null && Object.hasOwnProperty.call(message, "masterPasswordExpiry"))
                if (!$util.isInteger(message.masterPasswordExpiry))
                    return "masterPasswordExpiry: integer expected";
            if (message.twoFactorRequired != null && Object.hasOwnProperty.call(message, "twoFactorRequired"))
                if (typeof message.twoFactorRequired !== "boolean")
                    return "twoFactorRequired: boolean expected";
            if (message.disallowExport != null && Object.hasOwnProperty.call(message, "disallowExport"))
                if (typeof message.disallowExport !== "boolean")
                    return "disallowExport: boolean expected";
            if (message.restrictFiles != null && Object.hasOwnProperty.call(message, "restrictFiles"))
                if (typeof message.restrictFiles !== "boolean")
                    return "restrictFiles: boolean expected";
            if (message.restrictAllSharing != null && Object.hasOwnProperty.call(message, "restrictAllSharing"))
                if (typeof message.restrictAllSharing !== "boolean")
                    return "restrictAllSharing: boolean expected";
            if (message.restrictSharing != null && Object.hasOwnProperty.call(message, "restrictSharing"))
                if (typeof message.restrictSharing !== "boolean")
                    return "restrictSharing: boolean expected";
            if (message.restrictSharingIncomingAll != null && Object.hasOwnProperty.call(message, "restrictSharingIncomingAll"))
                if (typeof message.restrictSharingIncomingAll !== "boolean")
                    return "restrictSharingIncomingAll: boolean expected";
            if (message.restrictSharingIncomingEnterprise != null && Object.hasOwnProperty.call(message, "restrictSharingIncomingEnterprise"))
                if (typeof message.restrictSharingIncomingEnterprise !== "boolean")
                    return "restrictSharingIncomingEnterprise: boolean expected";
            if (message.logoutTimer != null && Object.hasOwnProperty.call(message, "logoutTimer"))
                if (!$util.isInteger(message.logoutTimer) && !(message.logoutTimer && $util.isInteger(message.logoutTimer.low) && $util.isInteger(message.logoutTimer.high)))
                    return "logoutTimer: integer|Long expected";
            if (message.persistentLogin != null && Object.hasOwnProperty.call(message, "persistentLogin"))
                if (typeof message.persistentLogin !== "boolean")
                    return "persistentLogin: boolean expected";
            if (message.ipDisableAutoApprove != null && Object.hasOwnProperty.call(message, "ipDisableAutoApprove"))
                if (typeof message.ipDisableAutoApprove !== "boolean")
                    return "ipDisableAutoApprove: boolean expected";
            if (message.shareDataKeyWithEccPublicKey != null && Object.hasOwnProperty.call(message, "shareDataKeyWithEccPublicKey"))
                if (typeof message.shareDataKeyWithEccPublicKey !== "boolean")
                    return "shareDataKeyWithEccPublicKey: boolean expected";
            if (message.shareDataKeyWithDevicePublicKey != null && Object.hasOwnProperty.call(message, "shareDataKeyWithDevicePublicKey"))
                if (typeof message.shareDataKeyWithDevicePublicKey !== "boolean")
                    return "shareDataKeyWithDevicePublicKey: boolean expected";
            if (message.RecordTypesCounter != null && Object.hasOwnProperty.call(message, "RecordTypesCounter"))
                if (!$util.isInteger(message.RecordTypesCounter))
                    return "RecordTypesCounter: integer expected";
            if (message.RecordTypesEnterpriseCounter != null && Object.hasOwnProperty.call(message, "RecordTypesEnterpriseCounter"))
                if (!$util.isInteger(message.RecordTypesEnterpriseCounter))
                    return "RecordTypesEnterpriseCounter: integer expected";
            if (message.recordTypesEnabled != null && Object.hasOwnProperty.call(message, "recordTypesEnabled"))
                if (typeof message.recordTypesEnabled !== "boolean")
                    return "recordTypesEnabled: boolean expected";
            if (message.canManageRecordTypes != null && Object.hasOwnProperty.call(message, "canManageRecordTypes"))
                if (typeof message.canManageRecordTypes !== "boolean")
                    return "canManageRecordTypes: boolean expected";
            if (message.recordTypesPAMCounter != null && Object.hasOwnProperty.call(message, "recordTypesPAMCounter"))
                if (!$util.isInteger(message.recordTypesPAMCounter))
                    return "recordTypesPAMCounter: integer expected";
            if (message.logoutTimerMinutes != null && Object.hasOwnProperty.call(message, "logoutTimerMinutes"))
                if (!$util.isInteger(message.logoutTimerMinutes))
                    return "logoutTimerMinutes: integer expected";
            if (message.securityKeysNoUserVerify != null && Object.hasOwnProperty.call(message, "securityKeysNoUserVerify"))
                if (typeof message.securityKeysNoUserVerify !== "boolean")
                    return "securityKeysNoUserVerify: boolean expected";
            if (message.channels != null && Object.hasOwnProperty.call(message, "channels")) {
                if (!Array.isArray(message.channels))
                    return "channels: array expected";
                for (let i = 0; i < message.channels.length; ++i)
                    switch (message.channels[i]) {
                    default:
                        return "channels: enum value[] expected";
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
            }
            if (message.personalUsernames != null && Object.hasOwnProperty.call(message, "personalUsernames")) {
                if (!Array.isArray(message.personalUsernames))
                    return "personalUsernames: array expected";
                for (let i = 0; i < message.personalUsernames.length; ++i)
                    if (!$util.isString(message.personalUsernames[i]))
                        return "personalUsernames: string[] expected";
            }
            if (message.maxIpDistance != null && Object.hasOwnProperty.call(message, "maxIpDistance"))
                if (!$util.isInteger(message.maxIpDistance))
                    return "maxIpDistance: integer expected";
            if (message.maxIpDistanceEffective != null && Object.hasOwnProperty.call(message, "maxIpDistanceEffective"))
                if (!$util.isInteger(message.maxIpDistanceEffective))
                    return "maxIpDistanceEffective: integer expected";
            return null;
        };

        /**
         * Creates a Settings message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.Settings
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.Settings} Settings
         */
        Settings.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.Settings)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.Settings: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.Settings();
            if (object.audit != null)
                message.audit = Boolean(object.audit);
            if (object.mustPerformAccountShareBy != null)
                if ($util.Long)
                    message.mustPerformAccountShareBy = $util.Long.fromValue(object.mustPerformAccountShareBy, false);
                else if (typeof object.mustPerformAccountShareBy === "string")
                    message.mustPerformAccountShareBy = parseInt(object.mustPerformAccountShareBy, 10);
                else if (typeof object.mustPerformAccountShareBy === "number")
                    message.mustPerformAccountShareBy = object.mustPerformAccountShareBy;
                else if (typeof object.mustPerformAccountShareBy === "object")
                    message.mustPerformAccountShareBy = new $util.LongBits(object.mustPerformAccountShareBy.low >>> 0, object.mustPerformAccountShareBy.high >>> 0).toNumber();
            if (object.shareAccountTo) {
                if (!Array.isArray(object.shareAccountTo))
                    throw TypeError(".AccountSummary.Settings.shareAccountTo: array expected");
                message.shareAccountTo = [];
                for (let i = 0; i < object.shareAccountTo.length; ++i) {
                    if (!$util.isObject(object.shareAccountTo[i]))
                        throw TypeError(".AccountSummary.Settings.shareAccountTo: object expected");
                    message.shareAccountTo[i] = $root.AccountSummary.MissingAccountShareKey.fromObject(object.shareAccountTo[i], long + 1);
                }
            }
            if (object.rules) {
                if (!Array.isArray(object.rules))
                    throw TypeError(".AccountSummary.Settings.rules: array expected");
                message.rules = [];
                for (let i = 0; i < object.rules.length; ++i) {
                    if (!$util.isObject(object.rules[i]))
                        throw TypeError(".AccountSummary.Settings.rules: object expected");
                    message.rules[i] = $root.AccountSummary.PasswordRule.fromObject(object.rules[i], long + 1);
                }
            }
            if (object.passwordRulesIntro != null)
                message.passwordRulesIntro = String(object.passwordRulesIntro);
            if (object.autoBackupDays != null)
                message.autoBackupDays = object.autoBackupDays | 0;
            if (object.theme != null)
                message.theme = String(object.theme);
            if (object.channel != null)
                message.channel = String(object.channel);
            if (object.channelValue != null)
                message.channelValue = String(object.channelValue);
            if (object.rsaConfigured != null)
                message.rsaConfigured = Boolean(object.rsaConfigured);
            if (object.emailVerified != null)
                message.emailVerified = Boolean(object.emailVerified);
            if (object.masterPasswordLastModified != null)
                message.masterPasswordLastModified = Number(object.masterPasswordLastModified);
            if (object.accountFolderKey != null)
                if (typeof object.accountFolderKey === "string")
                    $util.base64.decode(object.accountFolderKey, message.accountFolderKey = $util.newBuffer($util.base64.length(object.accountFolderKey)), 0);
                else if (object.accountFolderKey.length >= 0)
                    message.accountFolderKey = object.accountFolderKey;
            if (object.securityKeys) {
                if (!Array.isArray(object.securityKeys))
                    throw TypeError(".AccountSummary.Settings.securityKeys: array expected");
                message.securityKeys = [];
                for (let i = 0; i < object.securityKeys.length; ++i) {
                    if (!$util.isObject(object.securityKeys[i]))
                        throw TypeError(".AccountSummary.Settings.securityKeys: object expected");
                    message.securityKeys[i] = $root.AccountSummary.SecurityKey.fromObject(object.securityKeys[i], long + 1);
                }
            }
            if (object.keyValues) {
                if (!Array.isArray(object.keyValues))
                    throw TypeError(".AccountSummary.Settings.keyValues: array expected");
                message.keyValues = [];
                for (let i = 0; i < object.keyValues.length; ++i) {
                    if (!$util.isObject(object.keyValues[i]))
                        throw TypeError(".AccountSummary.Settings.keyValues: object expected");
                    message.keyValues[i] = $root.AccountSummary.KeyValue.fromObject(object.keyValues[i], long + 1);
                }
            }
            if (object.ssoUser != null)
                message.ssoUser = Boolean(object.ssoUser);
            if (object.onlineAccessOnly != null)
                message.onlineAccessOnly = Boolean(object.onlineAccessOnly);
            if (object.masterPasswordExpiry != null)
                message.masterPasswordExpiry = object.masterPasswordExpiry | 0;
            if (object.twoFactorRequired != null)
                message.twoFactorRequired = Boolean(object.twoFactorRequired);
            if (object.disallowExport != null)
                message.disallowExport = Boolean(object.disallowExport);
            if (object.restrictFiles != null)
                message.restrictFiles = Boolean(object.restrictFiles);
            if (object.restrictAllSharing != null)
                message.restrictAllSharing = Boolean(object.restrictAllSharing);
            if (object.restrictSharing != null)
                message.restrictSharing = Boolean(object.restrictSharing);
            if (object.restrictSharingIncomingAll != null)
                message.restrictSharingIncomingAll = Boolean(object.restrictSharingIncomingAll);
            if (object.restrictSharingIncomingEnterprise != null)
                message.restrictSharingIncomingEnterprise = Boolean(object.restrictSharingIncomingEnterprise);
            if (object.logoutTimer != null)
                if ($util.Long)
                    message.logoutTimer = $util.Long.fromValue(object.logoutTimer, false);
                else if (typeof object.logoutTimer === "string")
                    message.logoutTimer = parseInt(object.logoutTimer, 10);
                else if (typeof object.logoutTimer === "number")
                    message.logoutTimer = object.logoutTimer;
                else if (typeof object.logoutTimer === "object")
                    message.logoutTimer = new $util.LongBits(object.logoutTimer.low >>> 0, object.logoutTimer.high >>> 0).toNumber();
            if (object.persistentLogin != null)
                message.persistentLogin = Boolean(object.persistentLogin);
            if (object.ipDisableAutoApprove != null)
                message.ipDisableAutoApprove = Boolean(object.ipDisableAutoApprove);
            if (object.shareDataKeyWithEccPublicKey != null)
                message.shareDataKeyWithEccPublicKey = Boolean(object.shareDataKeyWithEccPublicKey);
            if (object.shareDataKeyWithDevicePublicKey != null)
                message.shareDataKeyWithDevicePublicKey = Boolean(object.shareDataKeyWithDevicePublicKey);
            if (object.RecordTypesCounter != null)
                message.RecordTypesCounter = object.RecordTypesCounter | 0;
            if (object.RecordTypesEnterpriseCounter != null)
                message.RecordTypesEnterpriseCounter = object.RecordTypesEnterpriseCounter | 0;
            if (object.recordTypesEnabled != null)
                message.recordTypesEnabled = Boolean(object.recordTypesEnabled);
            if (object.canManageRecordTypes != null)
                message.canManageRecordTypes = Boolean(object.canManageRecordTypes);
            if (object.recordTypesPAMCounter != null)
                message.recordTypesPAMCounter = object.recordTypesPAMCounter | 0;
            if (object.logoutTimerMinutes != null)
                message.logoutTimerMinutes = object.logoutTimerMinutes | 0;
            if (object.securityKeysNoUserVerify != null)
                message.securityKeysNoUserVerify = Boolean(object.securityKeysNoUserVerify);
            if (object.channels) {
                if (!Array.isArray(object.channels))
                    throw TypeError(".AccountSummary.Settings.channels: array expected");
                message.channels = [];
                for (let i = 0; i < object.channels.length; ++i)
                    switch (object.channels[i]) {
                    default:
                        if (typeof object.channels[i] === "number") {
                            message.channels[i] = object.channels[i];
                            break;
                        }
                    case "TWO_FA_CT_NONE":
                    case 0:
                        message.channels[i] = 0;
                        break;
                    case "TWO_FA_CT_TOTP":
                    case 1:
                        message.channels[i] = 1;
                        break;
                    case "TWO_FA_CT_SMS":
                    case 2:
                        message.channels[i] = 2;
                        break;
                    case "TWO_FA_CT_DUO":
                    case 3:
                        message.channels[i] = 3;
                        break;
                    case "TWO_FA_CT_RSA":
                    case 4:
                        message.channels[i] = 4;
                        break;
                    case "TWO_FA_CT_BACKUP":
                    case 5:
                        message.channels[i] = 5;
                        break;
                    case "TWO_FA_CT_U2F":
                    case 6:
                        message.channels[i] = 6;
                        break;
                    case "TWO_FA_CT_WEBAUTHN":
                    case 7:
                        message.channels[i] = 7;
                        break;
                    case "TWO_FA_CT_KEEPER":
                    case 8:
                        message.channels[i] = 8;
                        break;
                    case "TWO_FA_CT_DNA":
                    case 9:
                        message.channels[i] = 9;
                        break;
                    }
            }
            if (object.personalUsernames) {
                if (!Array.isArray(object.personalUsernames))
                    throw TypeError(".AccountSummary.Settings.personalUsernames: array expected");
                message.personalUsernames = [];
                for (let i = 0; i < object.personalUsernames.length; ++i)
                    message.personalUsernames[i] = String(object.personalUsernames[i]);
            }
            if (object.maxIpDistance != null)
                message.maxIpDistance = object.maxIpDistance | 0;
            if (object.maxIpDistanceEffective != null)
                message.maxIpDistanceEffective = object.maxIpDistanceEffective | 0;
            return message;
        };

        /**
         * Creates a plain object from a Settings message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.Settings
         * @static
         * @param {AccountSummary.Settings} message Settings
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Settings.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.shareAccountTo = [];
                object.rules = [];
                object.securityKeys = [];
                object.keyValues = [];
                object.channels = [];
                object.personalUsernames = [];
            }
            if (options.defaults) {
                object.audit = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.mustPerformAccountShareBy = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.mustPerformAccountShareBy = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.passwordRulesIntro = "";
                object.autoBackupDays = 0;
                object.theme = "";
                object.channel = "";
                object.channelValue = "";
                object.rsaConfigured = false;
                object.emailVerified = false;
                object.masterPasswordLastModified = 0;
                if (options.bytes === String)
                    object.accountFolderKey = "";
                else {
                    object.accountFolderKey = [];
                    if (options.bytes !== Array)
                        object.accountFolderKey = $util.newBuffer(object.accountFolderKey);
                }
                object.ssoUser = false;
                object.onlineAccessOnly = false;
                object.masterPasswordExpiry = 0;
                object.twoFactorRequired = false;
                object.disallowExport = false;
                object.restrictFiles = false;
                object.restrictAllSharing = false;
                object.restrictSharing = false;
                object.restrictSharingIncomingAll = false;
                object.restrictSharingIncomingEnterprise = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.logoutTimer = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.logoutTimer = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.persistentLogin = false;
                object.ipDisableAutoApprove = false;
                object.shareDataKeyWithEccPublicKey = false;
                object.shareDataKeyWithDevicePublicKey = false;
                object.RecordTypesCounter = 0;
                object.RecordTypesEnterpriseCounter = 0;
                object.recordTypesEnabled = false;
                object.canManageRecordTypes = false;
                object.recordTypesPAMCounter = 0;
                object.logoutTimerMinutes = 0;
                object.securityKeysNoUserVerify = false;
                object.maxIpDistance = 0;
                object.maxIpDistanceEffective = 0;
            }
            if (message.audit != null && Object.hasOwnProperty.call(message, "audit"))
                object.audit = message.audit;
            if (message.mustPerformAccountShareBy != null && Object.hasOwnProperty.call(message, "mustPerformAccountShareBy"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.mustPerformAccountShareBy = typeof message.mustPerformAccountShareBy === "number" ? BigInt(message.mustPerformAccountShareBy) : $util.Long.fromBits(message.mustPerformAccountShareBy.low >>> 0, message.mustPerformAccountShareBy.high >>> 0, false).toBigInt();
                else if (typeof message.mustPerformAccountShareBy === "number")
                    object.mustPerformAccountShareBy = options.longs === String ? String(message.mustPerformAccountShareBy) : message.mustPerformAccountShareBy;
                else
                    object.mustPerformAccountShareBy = options.longs === String ? $util.Long.prototype.toString.call(message.mustPerformAccountShareBy) : options.longs === Number ? new $util.LongBits(message.mustPerformAccountShareBy.low >>> 0, message.mustPerformAccountShareBy.high >>> 0).toNumber() : message.mustPerformAccountShareBy;
            if (message.shareAccountTo && message.shareAccountTo.length) {
                object.shareAccountTo = [];
                for (let j = 0; j < message.shareAccountTo.length; ++j)
                    object.shareAccountTo[j] = $root.AccountSummary.MissingAccountShareKey.toObject(message.shareAccountTo[j], options, q + 1);
            }
            if (message.rules && message.rules.length) {
                object.rules = [];
                for (let j = 0; j < message.rules.length; ++j)
                    object.rules[j] = $root.AccountSummary.PasswordRule.toObject(message.rules[j], options, q + 1);
            }
            if (message.passwordRulesIntro != null && Object.hasOwnProperty.call(message, "passwordRulesIntro"))
                object.passwordRulesIntro = message.passwordRulesIntro;
            if (message.autoBackupDays != null && Object.hasOwnProperty.call(message, "autoBackupDays"))
                object.autoBackupDays = message.autoBackupDays;
            if (message.theme != null && Object.hasOwnProperty.call(message, "theme"))
                object.theme = message.theme;
            if (message.channel != null && Object.hasOwnProperty.call(message, "channel"))
                object.channel = message.channel;
            if (message.channelValue != null && Object.hasOwnProperty.call(message, "channelValue"))
                object.channelValue = message.channelValue;
            if (message.rsaConfigured != null && Object.hasOwnProperty.call(message, "rsaConfigured"))
                object.rsaConfigured = message.rsaConfigured;
            if (message.emailVerified != null && Object.hasOwnProperty.call(message, "emailVerified"))
                object.emailVerified = message.emailVerified;
            if (message.masterPasswordLastModified != null && Object.hasOwnProperty.call(message, "masterPasswordLastModified"))
                object.masterPasswordLastModified = options.json && !isFinite(message.masterPasswordLastModified) ? String(message.masterPasswordLastModified) : message.masterPasswordLastModified;
            if (message.accountFolderKey != null && Object.hasOwnProperty.call(message, "accountFolderKey"))
                object.accountFolderKey = options.bytes === String ? $util.base64.encode(message.accountFolderKey, 0, message.accountFolderKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.accountFolderKey) : message.accountFolderKey;
            if (message.securityKeys && message.securityKeys.length) {
                object.securityKeys = [];
                for (let j = 0; j < message.securityKeys.length; ++j)
                    object.securityKeys[j] = $root.AccountSummary.SecurityKey.toObject(message.securityKeys[j], options, q + 1);
            }
            if (message.keyValues && message.keyValues.length) {
                object.keyValues = [];
                for (let j = 0; j < message.keyValues.length; ++j)
                    object.keyValues[j] = $root.AccountSummary.KeyValue.toObject(message.keyValues[j], options, q + 1);
            }
            if (message.ssoUser != null && Object.hasOwnProperty.call(message, "ssoUser"))
                object.ssoUser = message.ssoUser;
            if (message.onlineAccessOnly != null && Object.hasOwnProperty.call(message, "onlineAccessOnly"))
                object.onlineAccessOnly = message.onlineAccessOnly;
            if (message.masterPasswordExpiry != null && Object.hasOwnProperty.call(message, "masterPasswordExpiry"))
                object.masterPasswordExpiry = message.masterPasswordExpiry;
            if (message.twoFactorRequired != null && Object.hasOwnProperty.call(message, "twoFactorRequired"))
                object.twoFactorRequired = message.twoFactorRequired;
            if (message.disallowExport != null && Object.hasOwnProperty.call(message, "disallowExport"))
                object.disallowExport = message.disallowExport;
            if (message.restrictFiles != null && Object.hasOwnProperty.call(message, "restrictFiles"))
                object.restrictFiles = message.restrictFiles;
            if (message.restrictAllSharing != null && Object.hasOwnProperty.call(message, "restrictAllSharing"))
                object.restrictAllSharing = message.restrictAllSharing;
            if (message.restrictSharing != null && Object.hasOwnProperty.call(message, "restrictSharing"))
                object.restrictSharing = message.restrictSharing;
            if (message.restrictSharingIncomingAll != null && Object.hasOwnProperty.call(message, "restrictSharingIncomingAll"))
                object.restrictSharingIncomingAll = message.restrictSharingIncomingAll;
            if (message.restrictSharingIncomingEnterprise != null && Object.hasOwnProperty.call(message, "restrictSharingIncomingEnterprise"))
                object.restrictSharingIncomingEnterprise = message.restrictSharingIncomingEnterprise;
            if (message.logoutTimer != null && Object.hasOwnProperty.call(message, "logoutTimer"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.logoutTimer = typeof message.logoutTimer === "number" ? BigInt(message.logoutTimer) : $util.Long.fromBits(message.logoutTimer.low >>> 0, message.logoutTimer.high >>> 0, false).toBigInt();
                else if (typeof message.logoutTimer === "number")
                    object.logoutTimer = options.longs === String ? String(message.logoutTimer) : message.logoutTimer;
                else
                    object.logoutTimer = options.longs === String ? $util.Long.prototype.toString.call(message.logoutTimer) : options.longs === Number ? new $util.LongBits(message.logoutTimer.low >>> 0, message.logoutTimer.high >>> 0).toNumber() : message.logoutTimer;
            if (message.persistentLogin != null && Object.hasOwnProperty.call(message, "persistentLogin"))
                object.persistentLogin = message.persistentLogin;
            if (message.ipDisableAutoApprove != null && Object.hasOwnProperty.call(message, "ipDisableAutoApprove"))
                object.ipDisableAutoApprove = message.ipDisableAutoApprove;
            if (message.shareDataKeyWithEccPublicKey != null && Object.hasOwnProperty.call(message, "shareDataKeyWithEccPublicKey"))
                object.shareDataKeyWithEccPublicKey = message.shareDataKeyWithEccPublicKey;
            if (message.shareDataKeyWithDevicePublicKey != null && Object.hasOwnProperty.call(message, "shareDataKeyWithDevicePublicKey"))
                object.shareDataKeyWithDevicePublicKey = message.shareDataKeyWithDevicePublicKey;
            if (message.RecordTypesCounter != null && Object.hasOwnProperty.call(message, "RecordTypesCounter"))
                object.RecordTypesCounter = message.RecordTypesCounter;
            if (message.RecordTypesEnterpriseCounter != null && Object.hasOwnProperty.call(message, "RecordTypesEnterpriseCounter"))
                object.RecordTypesEnterpriseCounter = message.RecordTypesEnterpriseCounter;
            if (message.recordTypesEnabled != null && Object.hasOwnProperty.call(message, "recordTypesEnabled"))
                object.recordTypesEnabled = message.recordTypesEnabled;
            if (message.canManageRecordTypes != null && Object.hasOwnProperty.call(message, "canManageRecordTypes"))
                object.canManageRecordTypes = message.canManageRecordTypes;
            if (message.recordTypesPAMCounter != null && Object.hasOwnProperty.call(message, "recordTypesPAMCounter"))
                object.recordTypesPAMCounter = message.recordTypesPAMCounter;
            if (message.logoutTimerMinutes != null && Object.hasOwnProperty.call(message, "logoutTimerMinutes"))
                object.logoutTimerMinutes = message.logoutTimerMinutes;
            if (message.securityKeysNoUserVerify != null && Object.hasOwnProperty.call(message, "securityKeysNoUserVerify"))
                object.securityKeysNoUserVerify = message.securityKeysNoUserVerify;
            if (message.channels && message.channels.length) {
                object.channels = [];
                for (let j = 0; j < message.channels.length; ++j)
                    object.channels[j] = options.enums === String ? $root.Authentication.TwoFactorChannelType[message.channels[j]] === undefined ? message.channels[j] : $root.Authentication.TwoFactorChannelType[message.channels[j]] : message.channels[j];
            }
            if (message.personalUsernames && message.personalUsernames.length) {
                object.personalUsernames = [];
                for (let j = 0; j < message.personalUsernames.length; ++j)
                    object.personalUsernames[j] = message.personalUsernames[j];
            }
            if (message.maxIpDistance != null && Object.hasOwnProperty.call(message, "maxIpDistance"))
                object.maxIpDistance = message.maxIpDistance;
            if (message.maxIpDistanceEffective != null && Object.hasOwnProperty.call(message, "maxIpDistanceEffective"))
                object.maxIpDistanceEffective = message.maxIpDistanceEffective;
            return object;
        };

        /**
         * Converts this Settings to JSON.
         * @function toJSON
         * @memberof AccountSummary.Settings
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Settings.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Settings
         * @function getTypeUrl
         * @memberof AccountSummary.Settings
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Settings.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.Settings";
        };

        return Settings;
    })();

    AccountSummary.KeyValue = (function() {

        /**
         * Properties of a KeyValue.
         * @memberof AccountSummary
         * @interface IKeyValue
         * @property {string|null} [key] KeyValue key
         * @property {string|null} [value] KeyValue value
         */

        /**
         * Constructs a new KeyValue.
         * @memberof AccountSummary
         * @classdesc Represents a KeyValue.
         * @implements IKeyValue
         * @constructor
         * @param {AccountSummary.IKeyValue=} [properties] Properties to set
         */
        function KeyValue(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KeyValue key.
         * @member {string} key
         * @memberof AccountSummary.KeyValue
         * @instance
         */
        KeyValue.prototype.key = "";

        /**
         * KeyValue value.
         * @member {string} value
         * @memberof AccountSummary.KeyValue
         * @instance
         */
        KeyValue.prototype.value = "";

        /**
         * Creates a new KeyValue instance using the specified properties.
         * @function create
         * @memberof AccountSummary.KeyValue
         * @static
         * @param {AccountSummary.IKeyValue=} [properties] Properties to set
         * @returns {AccountSummary.KeyValue} KeyValue instance
         */
        KeyValue.create = function create(properties) {
            return new KeyValue(properties);
        };

        /**
         * Encodes the specified KeyValue message. Does not implicitly {@link AccountSummary.KeyValue.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.KeyValue
         * @static
         * @param {AccountSummary.IKeyValue} message KeyValue message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeyValue.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
            return writer;
        };

        /**
         * Encodes the specified KeyValue message, length delimited. Does not implicitly {@link AccountSummary.KeyValue.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.KeyValue
         * @static
         * @param {AccountSummary.IKeyValue} message KeyValue message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeyValue.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a KeyValue message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.KeyValue
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.KeyValue} KeyValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeyValue.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.KeyValue();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.key = reader.string();
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
         * Decodes a KeyValue message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.KeyValue
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.KeyValue} KeyValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeyValue.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KeyValue message.
         * @function verify
         * @memberof AccountSummary.KeyValue
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KeyValue.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                if (!$util.isString(message.key))
                    return "key: string expected";
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                if (!$util.isString(message.value))
                    return "value: string expected";
            return null;
        };

        /**
         * Creates a KeyValue message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.KeyValue
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.KeyValue} KeyValue
         */
        KeyValue.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.KeyValue)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.KeyValue: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.KeyValue();
            if (object.key != null)
                message.key = String(object.key);
            if (object.value != null)
                message.value = String(object.value);
            return message;
        };

        /**
         * Creates a plain object from a KeyValue message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.KeyValue
         * @static
         * @param {AccountSummary.KeyValue} message KeyValue
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KeyValue.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.key = "";
                object.value = "";
            }
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                object.key = message.key;
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this KeyValue to JSON.
         * @function toJSON
         * @memberof AccountSummary.KeyValue
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KeyValue.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for KeyValue
         * @function getTypeUrl
         * @memberof AccountSummary.KeyValue
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        KeyValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.KeyValue";
        };

        return KeyValue;
    })();

    AccountSummary.KeyValueBoolean = (function() {

        /**
         * Properties of a KeyValueBoolean.
         * @memberof AccountSummary
         * @interface IKeyValueBoolean
         * @property {string|null} [key] KeyValueBoolean key
         * @property {boolean|null} [value] KeyValueBoolean value
         */

        /**
         * Constructs a new KeyValueBoolean.
         * @memberof AccountSummary
         * @classdesc Represents a KeyValueBoolean.
         * @implements IKeyValueBoolean
         * @constructor
         * @param {AccountSummary.IKeyValueBoolean=} [properties] Properties to set
         */
        function KeyValueBoolean(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KeyValueBoolean key.
         * @member {string} key
         * @memberof AccountSummary.KeyValueBoolean
         * @instance
         */
        KeyValueBoolean.prototype.key = "";

        /**
         * KeyValueBoolean value.
         * @member {boolean} value
         * @memberof AccountSummary.KeyValueBoolean
         * @instance
         */
        KeyValueBoolean.prototype.value = false;

        /**
         * Creates a new KeyValueBoolean instance using the specified properties.
         * @function create
         * @memberof AccountSummary.KeyValueBoolean
         * @static
         * @param {AccountSummary.IKeyValueBoolean=} [properties] Properties to set
         * @returns {AccountSummary.KeyValueBoolean} KeyValueBoolean instance
         */
        KeyValueBoolean.create = function create(properties) {
            return new KeyValueBoolean(properties);
        };

        /**
         * Encodes the specified KeyValueBoolean message. Does not implicitly {@link AccountSummary.KeyValueBoolean.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.KeyValueBoolean
         * @static
         * @param {AccountSummary.IKeyValueBoolean} message KeyValueBoolean message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeyValueBoolean.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.value);
            return writer;
        };

        /**
         * Encodes the specified KeyValueBoolean message, length delimited. Does not implicitly {@link AccountSummary.KeyValueBoolean.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.KeyValueBoolean
         * @static
         * @param {AccountSummary.IKeyValueBoolean} message KeyValueBoolean message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeyValueBoolean.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a KeyValueBoolean message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.KeyValueBoolean
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.KeyValueBoolean} KeyValueBoolean
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeyValueBoolean.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.KeyValueBoolean();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.key = reader.string();
                        break;
                    }
                case 2: {
                        message.value = reader.bool();
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
         * Decodes a KeyValueBoolean message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.KeyValueBoolean
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.KeyValueBoolean} KeyValueBoolean
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeyValueBoolean.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KeyValueBoolean message.
         * @function verify
         * @memberof AccountSummary.KeyValueBoolean
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KeyValueBoolean.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                if (!$util.isString(message.key))
                    return "key: string expected";
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                if (typeof message.value !== "boolean")
                    return "value: boolean expected";
            return null;
        };

        /**
         * Creates a KeyValueBoolean message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.KeyValueBoolean
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.KeyValueBoolean} KeyValueBoolean
         */
        KeyValueBoolean.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.KeyValueBoolean)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.KeyValueBoolean: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.KeyValueBoolean();
            if (object.key != null)
                message.key = String(object.key);
            if (object.value != null)
                message.value = Boolean(object.value);
            return message;
        };

        /**
         * Creates a plain object from a KeyValueBoolean message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.KeyValueBoolean
         * @static
         * @param {AccountSummary.KeyValueBoolean} message KeyValueBoolean
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KeyValueBoolean.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.key = "";
                object.value = false;
            }
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                object.key = message.key;
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this KeyValueBoolean to JSON.
         * @function toJSON
         * @memberof AccountSummary.KeyValueBoolean
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KeyValueBoolean.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for KeyValueBoolean
         * @function getTypeUrl
         * @memberof AccountSummary.KeyValueBoolean
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        KeyValueBoolean.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.KeyValueBoolean";
        };

        return KeyValueBoolean;
    })();

    AccountSummary.KeyValueLong = (function() {

        /**
         * Properties of a KeyValueLong.
         * @memberof AccountSummary
         * @interface IKeyValueLong
         * @property {string|null} [key] KeyValueLong key
         * @property {number|null} [value] KeyValueLong value
         */

        /**
         * Constructs a new KeyValueLong.
         * @memberof AccountSummary
         * @classdesc Represents a KeyValueLong.
         * @implements IKeyValueLong
         * @constructor
         * @param {AccountSummary.IKeyValueLong=} [properties] Properties to set
         */
        function KeyValueLong(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KeyValueLong key.
         * @member {string} key
         * @memberof AccountSummary.KeyValueLong
         * @instance
         */
        KeyValueLong.prototype.key = "";

        /**
         * KeyValueLong value.
         * @member {number} value
         * @memberof AccountSummary.KeyValueLong
         * @instance
         */
        KeyValueLong.prototype.value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new KeyValueLong instance using the specified properties.
         * @function create
         * @memberof AccountSummary.KeyValueLong
         * @static
         * @param {AccountSummary.IKeyValueLong=} [properties] Properties to set
         * @returns {AccountSummary.KeyValueLong} KeyValueLong instance
         */
        KeyValueLong.create = function create(properties) {
            return new KeyValueLong(properties);
        };

        /**
         * Encodes the specified KeyValueLong message. Does not implicitly {@link AccountSummary.KeyValueLong.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.KeyValueLong
         * @static
         * @param {AccountSummary.IKeyValueLong} message KeyValueLong message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeyValueLong.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.value);
            return writer;
        };

        /**
         * Encodes the specified KeyValueLong message, length delimited. Does not implicitly {@link AccountSummary.KeyValueLong.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.KeyValueLong
         * @static
         * @param {AccountSummary.IKeyValueLong} message KeyValueLong message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeyValueLong.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a KeyValueLong message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.KeyValueLong
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.KeyValueLong} KeyValueLong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeyValueLong.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.KeyValueLong();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.key = reader.string();
                        break;
                    }
                case 2: {
                        message.value = reader.int64();
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
         * Decodes a KeyValueLong message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.KeyValueLong
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.KeyValueLong} KeyValueLong
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeyValueLong.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KeyValueLong message.
         * @function verify
         * @memberof AccountSummary.KeyValueLong
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KeyValueLong.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                if (!$util.isString(message.key))
                    return "key: string expected";
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                if (!$util.isInteger(message.value) && !(message.value && $util.isInteger(message.value.low) && $util.isInteger(message.value.high)))
                    return "value: integer|Long expected";
            return null;
        };

        /**
         * Creates a KeyValueLong message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.KeyValueLong
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.KeyValueLong} KeyValueLong
         */
        KeyValueLong.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.KeyValueLong)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.KeyValueLong: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.KeyValueLong();
            if (object.key != null)
                message.key = String(object.key);
            if (object.value != null)
                if ($util.Long)
                    message.value = $util.Long.fromValue(object.value, false);
                else if (typeof object.value === "string")
                    message.value = parseInt(object.value, 10);
                else if (typeof object.value === "number")
                    message.value = object.value;
                else if (typeof object.value === "object")
                    message.value = new $util.LongBits(object.value.low >>> 0, object.value.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a KeyValueLong message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.KeyValueLong
         * @static
         * @param {AccountSummary.KeyValueLong} message KeyValueLong
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KeyValueLong.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.key = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.value = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                object.key = message.key;
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.value = typeof message.value === "number" ? BigInt(message.value) : $util.Long.fromBits(message.value.low >>> 0, message.value.high >>> 0, false).toBigInt();
                else if (typeof message.value === "number")
                    object.value = options.longs === String ? String(message.value) : message.value;
                else
                    object.value = options.longs === String ? $util.Long.prototype.toString.call(message.value) : options.longs === Number ? new $util.LongBits(message.value.low >>> 0, message.value.high >>> 0).toNumber() : message.value;
            return object;
        };

        /**
         * Converts this KeyValueLong to JSON.
         * @function toJSON
         * @memberof AccountSummary.KeyValueLong
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KeyValueLong.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for KeyValueLong
         * @function getTypeUrl
         * @memberof AccountSummary.KeyValueLong
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        KeyValueLong.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.KeyValueLong";
        };

        return KeyValueLong;
    })();

    AccountSummary.Result = (function() {

        /**
         * Properties of a Result.
         * @memberof AccountSummary
         * @interface IResult
         * @property {string|null} [resultCode] Result resultCode
         * @property {string|null} [message] Result message
         * @property {string|null} [result] Result result
         */

        /**
         * Constructs a new Result.
         * @memberof AccountSummary
         * @classdesc Represents a Result.
         * @implements IResult
         * @constructor
         * @param {AccountSummary.IResult=} [properties] Properties to set
         */
        function Result(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Result resultCode.
         * @member {string} resultCode
         * @memberof AccountSummary.Result
         * @instance
         */
        Result.prototype.resultCode = "";

        /**
         * Result message.
         * @member {string} message
         * @memberof AccountSummary.Result
         * @instance
         */
        Result.prototype.message = "";

        /**
         * Result result.
         * @member {string} result
         * @memberof AccountSummary.Result
         * @instance
         */
        Result.prototype.result = "";

        /**
         * Creates a new Result instance using the specified properties.
         * @function create
         * @memberof AccountSummary.Result
         * @static
         * @param {AccountSummary.IResult=} [properties] Properties to set
         * @returns {AccountSummary.Result} Result instance
         */
        Result.create = function create(properties) {
            return new Result(properties);
        };

        /**
         * Encodes the specified Result message. Does not implicitly {@link AccountSummary.Result.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.Result
         * @static
         * @param {AccountSummary.IResult} message Result message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Result.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.resultCode != null && Object.hasOwnProperty.call(message, "resultCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.resultCode);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.result);
            return writer;
        };

        /**
         * Encodes the specified Result message, length delimited. Does not implicitly {@link AccountSummary.Result.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.Result
         * @static
         * @param {AccountSummary.IResult} message Result message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Result.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Result message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.Result
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.Result} Result
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Result.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.Result();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.resultCode = reader.string();
                        break;
                    }
                case 2: {
                        message.message = reader.string();
                        break;
                    }
                case 3: {
                        message.result = reader.string();
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
         * Decodes a Result message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.Result
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.Result} Result
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Result.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Result message.
         * @function verify
         * @memberof AccountSummary.Result
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Result.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.resultCode != null && Object.hasOwnProperty.call(message, "resultCode"))
                if (!$util.isString(message.resultCode))
                    return "resultCode: string expected";
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                if (!$util.isString(message.result))
                    return "result: string expected";
            return null;
        };

        /**
         * Creates a Result message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.Result
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.Result} Result
         */
        Result.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.Result)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.Result: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.Result();
            if (object.resultCode != null)
                message.resultCode = String(object.resultCode);
            if (object.message != null)
                message.message = String(object.message);
            if (object.result != null)
                message.result = String(object.result);
            return message;
        };

        /**
         * Creates a plain object from a Result message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.Result
         * @static
         * @param {AccountSummary.Result} message Result
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Result.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.resultCode = "";
                object.message = "";
                object.result = "";
            }
            if (message.resultCode != null && Object.hasOwnProperty.call(message, "resultCode"))
                object.resultCode = message.resultCode;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                object.result = message.result;
            return object;
        };

        /**
         * Converts this Result to JSON.
         * @function toJSON
         * @memberof AccountSummary.Result
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Result.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Result
         * @function getTypeUrl
         * @memberof AccountSummary.Result
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Result.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.Result";
        };

        return Result;
    })();

    AccountSummary.Enforcements = (function() {

        /**
         * Properties of an Enforcements.
         * @memberof AccountSummary
         * @interface IEnforcements
         * @property {Array.<AccountSummary.IKeyValue>|null} [strings] Enforcements strings
         * @property {Array.<AccountSummary.IKeyValueBoolean>|null} [booleans] Enforcements booleans
         * @property {Array.<AccountSummary.IKeyValueLong>|null} [longs] Enforcements longs
         * @property {Array.<AccountSummary.IKeyValue>|null} [jsons] Enforcements jsons
         */

        /**
         * Constructs a new Enforcements.
         * @memberof AccountSummary
         * @classdesc Represents an Enforcements.
         * @implements IEnforcements
         * @constructor
         * @param {AccountSummary.IEnforcements=} [properties] Properties to set
         */
        function Enforcements(properties) {
            this.strings = [];
            this.booleans = [];
            this.longs = [];
            this.jsons = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Enforcements strings.
         * @member {Array.<AccountSummary.IKeyValue>} strings
         * @memberof AccountSummary.Enforcements
         * @instance
         */
        Enforcements.prototype.strings = $util.emptyArray;

        /**
         * Enforcements booleans.
         * @member {Array.<AccountSummary.IKeyValueBoolean>} booleans
         * @memberof AccountSummary.Enforcements
         * @instance
         */
        Enforcements.prototype.booleans = $util.emptyArray;

        /**
         * Enforcements longs.
         * @member {Array.<AccountSummary.IKeyValueLong>} longs
         * @memberof AccountSummary.Enforcements
         * @instance
         */
        Enforcements.prototype.longs = $util.emptyArray;

        /**
         * Enforcements jsons.
         * @member {Array.<AccountSummary.IKeyValue>} jsons
         * @memberof AccountSummary.Enforcements
         * @instance
         */
        Enforcements.prototype.jsons = $util.emptyArray;

        /**
         * Creates a new Enforcements instance using the specified properties.
         * @function create
         * @memberof AccountSummary.Enforcements
         * @static
         * @param {AccountSummary.IEnforcements=} [properties] Properties to set
         * @returns {AccountSummary.Enforcements} Enforcements instance
         */
        Enforcements.create = function create(properties) {
            return new Enforcements(properties);
        };

        /**
         * Encodes the specified Enforcements message. Does not implicitly {@link AccountSummary.Enforcements.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.Enforcements
         * @static
         * @param {AccountSummary.IEnforcements} message Enforcements message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Enforcements.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.strings != null && message.strings.length)
                for (let i = 0; i < message.strings.length; ++i)
                    $root.AccountSummary.KeyValue.encode(message.strings[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.booleans != null && message.booleans.length)
                for (let i = 0; i < message.booleans.length; ++i)
                    $root.AccountSummary.KeyValueBoolean.encode(message.booleans[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.longs != null && message.longs.length)
                for (let i = 0; i < message.longs.length; ++i)
                    $root.AccountSummary.KeyValueLong.encode(message.longs[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.jsons != null && message.jsons.length)
                for (let i = 0; i < message.jsons.length; ++i)
                    $root.AccountSummary.KeyValue.encode(message.jsons[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Enforcements message, length delimited. Does not implicitly {@link AccountSummary.Enforcements.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.Enforcements
         * @static
         * @param {AccountSummary.IEnforcements} message Enforcements message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Enforcements.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an Enforcements message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.Enforcements
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.Enforcements} Enforcements
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Enforcements.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.Enforcements();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.strings && message.strings.length))
                            message.strings = [];
                        message.strings.push($root.AccountSummary.KeyValue.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        if (!(message.booleans && message.booleans.length))
                            message.booleans = [];
                        message.booleans.push($root.AccountSummary.KeyValueBoolean.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 3: {
                        if (!(message.longs && message.longs.length))
                            message.longs = [];
                        message.longs.push($root.AccountSummary.KeyValueLong.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 4: {
                        if (!(message.jsons && message.jsons.length))
                            message.jsons = [];
                        message.jsons.push($root.AccountSummary.KeyValue.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes an Enforcements message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.Enforcements
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.Enforcements} Enforcements
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Enforcements.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Enforcements message.
         * @function verify
         * @memberof AccountSummary.Enforcements
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Enforcements.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.strings != null && Object.hasOwnProperty.call(message, "strings")) {
                if (!Array.isArray(message.strings))
                    return "strings: array expected";
                for (let i = 0; i < message.strings.length; ++i) {
                    let error = $root.AccountSummary.KeyValue.verify(message.strings[i], long + 1);
                    if (error)
                        return "strings." + error;
                }
            }
            if (message.booleans != null && Object.hasOwnProperty.call(message, "booleans")) {
                if (!Array.isArray(message.booleans))
                    return "booleans: array expected";
                for (let i = 0; i < message.booleans.length; ++i) {
                    let error = $root.AccountSummary.KeyValueBoolean.verify(message.booleans[i], long + 1);
                    if (error)
                        return "booleans." + error;
                }
            }
            if (message.longs != null && Object.hasOwnProperty.call(message, "longs")) {
                if (!Array.isArray(message.longs))
                    return "longs: array expected";
                for (let i = 0; i < message.longs.length; ++i) {
                    let error = $root.AccountSummary.KeyValueLong.verify(message.longs[i], long + 1);
                    if (error)
                        return "longs." + error;
                }
            }
            if (message.jsons != null && Object.hasOwnProperty.call(message, "jsons")) {
                if (!Array.isArray(message.jsons))
                    return "jsons: array expected";
                for (let i = 0; i < message.jsons.length; ++i) {
                    let error = $root.AccountSummary.KeyValue.verify(message.jsons[i], long + 1);
                    if (error)
                        return "jsons." + error;
                }
            }
            return null;
        };

        /**
         * Creates an Enforcements message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.Enforcements
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.Enforcements} Enforcements
         */
        Enforcements.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.Enforcements)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.Enforcements: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.Enforcements();
            if (object.strings) {
                if (!Array.isArray(object.strings))
                    throw TypeError(".AccountSummary.Enforcements.strings: array expected");
                message.strings = [];
                for (let i = 0; i < object.strings.length; ++i) {
                    if (!$util.isObject(object.strings[i]))
                        throw TypeError(".AccountSummary.Enforcements.strings: object expected");
                    message.strings[i] = $root.AccountSummary.KeyValue.fromObject(object.strings[i], long + 1);
                }
            }
            if (object.booleans) {
                if (!Array.isArray(object.booleans))
                    throw TypeError(".AccountSummary.Enforcements.booleans: array expected");
                message.booleans = [];
                for (let i = 0; i < object.booleans.length; ++i) {
                    if (!$util.isObject(object.booleans[i]))
                        throw TypeError(".AccountSummary.Enforcements.booleans: object expected");
                    message.booleans[i] = $root.AccountSummary.KeyValueBoolean.fromObject(object.booleans[i], long + 1);
                }
            }
            if (object.longs) {
                if (!Array.isArray(object.longs))
                    throw TypeError(".AccountSummary.Enforcements.longs: array expected");
                message.longs = [];
                for (let i = 0; i < object.longs.length; ++i) {
                    if (!$util.isObject(object.longs[i]))
                        throw TypeError(".AccountSummary.Enforcements.longs: object expected");
                    message.longs[i] = $root.AccountSummary.KeyValueLong.fromObject(object.longs[i], long + 1);
                }
            }
            if (object.jsons) {
                if (!Array.isArray(object.jsons))
                    throw TypeError(".AccountSummary.Enforcements.jsons: array expected");
                message.jsons = [];
                for (let i = 0; i < object.jsons.length; ++i) {
                    if (!$util.isObject(object.jsons[i]))
                        throw TypeError(".AccountSummary.Enforcements.jsons: object expected");
                    message.jsons[i] = $root.AccountSummary.KeyValue.fromObject(object.jsons[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an Enforcements message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.Enforcements
         * @static
         * @param {AccountSummary.Enforcements} message Enforcements
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Enforcements.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.strings = [];
                object.booleans = [];
                object.longs = [];
                object.jsons = [];
            }
            if (message.strings && message.strings.length) {
                object.strings = [];
                for (let j = 0; j < message.strings.length; ++j)
                    object.strings[j] = $root.AccountSummary.KeyValue.toObject(message.strings[j], options, q + 1);
            }
            if (message.booleans && message.booleans.length) {
                object.booleans = [];
                for (let j = 0; j < message.booleans.length; ++j)
                    object.booleans[j] = $root.AccountSummary.KeyValueBoolean.toObject(message.booleans[j], options, q + 1);
            }
            if (message.longs && message.longs.length) {
                object.longs = [];
                for (let j = 0; j < message.longs.length; ++j)
                    object.longs[j] = $root.AccountSummary.KeyValueLong.toObject(message.longs[j], options, q + 1);
            }
            if (message.jsons && message.jsons.length) {
                object.jsons = [];
                for (let j = 0; j < message.jsons.length; ++j)
                    object.jsons[j] = $root.AccountSummary.KeyValue.toObject(message.jsons[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this Enforcements to JSON.
         * @function toJSON
         * @memberof AccountSummary.Enforcements
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Enforcements.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Enforcements
         * @function getTypeUrl
         * @memberof AccountSummary.Enforcements
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Enforcements.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.Enforcements";
        };

        return Enforcements;
    })();

    AccountSummary.MissingAccountShareKey = (function() {

        /**
         * Properties of a MissingAccountShareKey.
         * @memberof AccountSummary
         * @interface IMissingAccountShareKey
         * @property {number|null} [roleId] MissingAccountShareKey roleId
         * @property {Uint8Array|null} [publicKey] MissingAccountShareKey publicKey
         */

        /**
         * Constructs a new MissingAccountShareKey.
         * @memberof AccountSummary
         * @classdesc Represents a MissingAccountShareKey.
         * @implements IMissingAccountShareKey
         * @constructor
         * @param {AccountSummary.IMissingAccountShareKey=} [properties] Properties to set
         */
        function MissingAccountShareKey(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MissingAccountShareKey roleId.
         * @member {number} roleId
         * @memberof AccountSummary.MissingAccountShareKey
         * @instance
         */
        MissingAccountShareKey.prototype.roleId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * MissingAccountShareKey publicKey.
         * @member {Uint8Array} publicKey
         * @memberof AccountSummary.MissingAccountShareKey
         * @instance
         */
        MissingAccountShareKey.prototype.publicKey = $util.newBuffer([]);

        /**
         * Creates a new MissingAccountShareKey instance using the specified properties.
         * @function create
         * @memberof AccountSummary.MissingAccountShareKey
         * @static
         * @param {AccountSummary.IMissingAccountShareKey=} [properties] Properties to set
         * @returns {AccountSummary.MissingAccountShareKey} MissingAccountShareKey instance
         */
        MissingAccountShareKey.create = function create(properties) {
            return new MissingAccountShareKey(properties);
        };

        /**
         * Encodes the specified MissingAccountShareKey message. Does not implicitly {@link AccountSummary.MissingAccountShareKey.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.MissingAccountShareKey
         * @static
         * @param {AccountSummary.IMissingAccountShareKey} message MissingAccountShareKey message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MissingAccountShareKey.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.roleId != null && Object.hasOwnProperty.call(message, "roleId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.roleId);
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.publicKey);
            return writer;
        };

        /**
         * Encodes the specified MissingAccountShareKey message, length delimited. Does not implicitly {@link AccountSummary.MissingAccountShareKey.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.MissingAccountShareKey
         * @static
         * @param {AccountSummary.IMissingAccountShareKey} message MissingAccountShareKey message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MissingAccountShareKey.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MissingAccountShareKey message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.MissingAccountShareKey
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.MissingAccountShareKey} MissingAccountShareKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MissingAccountShareKey.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.MissingAccountShareKey();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.roleId = reader.int64();
                        break;
                    }
                case 2: {
                        message.publicKey = reader.bytes();
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
         * Decodes a MissingAccountShareKey message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.MissingAccountShareKey
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.MissingAccountShareKey} MissingAccountShareKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MissingAccountShareKey.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MissingAccountShareKey message.
         * @function verify
         * @memberof AccountSummary.MissingAccountShareKey
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MissingAccountShareKey.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.roleId != null && Object.hasOwnProperty.call(message, "roleId"))
                if (!$util.isInteger(message.roleId) && !(message.roleId && $util.isInteger(message.roleId.low) && $util.isInteger(message.roleId.high)))
                    return "roleId: integer|Long expected";
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                    return "publicKey: buffer expected";
            return null;
        };

        /**
         * Creates a MissingAccountShareKey message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.MissingAccountShareKey
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.MissingAccountShareKey} MissingAccountShareKey
         */
        MissingAccountShareKey.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.MissingAccountShareKey)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.MissingAccountShareKey: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.MissingAccountShareKey();
            if (object.roleId != null)
                if ($util.Long)
                    message.roleId = $util.Long.fromValue(object.roleId, false);
                else if (typeof object.roleId === "string")
                    message.roleId = parseInt(object.roleId, 10);
                else if (typeof object.roleId === "number")
                    message.roleId = object.roleId;
                else if (typeof object.roleId === "object")
                    message.roleId = new $util.LongBits(object.roleId.low >>> 0, object.roleId.high >>> 0).toNumber();
            if (object.publicKey != null)
                if (typeof object.publicKey === "string")
                    $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                else if (object.publicKey.length >= 0)
                    message.publicKey = object.publicKey;
            return message;
        };

        /**
         * Creates a plain object from a MissingAccountShareKey message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.MissingAccountShareKey
         * @static
         * @param {AccountSummary.MissingAccountShareKey} message MissingAccountShareKey
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MissingAccountShareKey.toObject = function toObject(message, options, q) {
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
                    object.roleId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.roleId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.publicKey = "";
                else {
                    object.publicKey = [];
                    if (options.bytes !== Array)
                        object.publicKey = $util.newBuffer(object.publicKey);
                }
            }
            if (message.roleId != null && Object.hasOwnProperty.call(message, "roleId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.roleId = typeof message.roleId === "number" ? BigInt(message.roleId) : $util.Long.fromBits(message.roleId.low >>> 0, message.roleId.high >>> 0, false).toBigInt();
                else if (typeof message.roleId === "number")
                    object.roleId = options.longs === String ? String(message.roleId) : message.roleId;
                else
                    object.roleId = options.longs === String ? $util.Long.prototype.toString.call(message.roleId) : options.longs === Number ? new $util.LongBits(message.roleId.low >>> 0, message.roleId.high >>> 0).toNumber() : message.roleId;
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
            return object;
        };

        /**
         * Converts this MissingAccountShareKey to JSON.
         * @function toJSON
         * @memberof AccountSummary.MissingAccountShareKey
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MissingAccountShareKey.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MissingAccountShareKey
         * @function getTypeUrl
         * @memberof AccountSummary.MissingAccountShareKey
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MissingAccountShareKey.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.MissingAccountShareKey";
        };

        return MissingAccountShareKey;
    })();

    AccountSummary.PasswordRule = (function() {

        /**
         * Properties of a PasswordRule.
         * @memberof AccountSummary
         * @interface IPasswordRule
         * @property {string|null} [ruleType] PasswordRule ruleType
         * @property {string|null} [pattern] PasswordRule pattern
         * @property {boolean|null} [match] PasswordRule match
         * @property {number|null} [minimum] PasswordRule minimum
         * @property {string|null} [description] PasswordRule description
         * @property {string|null} [value] PasswordRule value
         */

        /**
         * Constructs a new PasswordRule.
         * @memberof AccountSummary
         * @classdesc Represents a PasswordRule.
         * @implements IPasswordRule
         * @constructor
         * @param {AccountSummary.IPasswordRule=} [properties] Properties to set
         */
        function PasswordRule(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PasswordRule ruleType.
         * @member {string} ruleType
         * @memberof AccountSummary.PasswordRule
         * @instance
         */
        PasswordRule.prototype.ruleType = "";

        /**
         * PasswordRule pattern.
         * @member {string} pattern
         * @memberof AccountSummary.PasswordRule
         * @instance
         */
        PasswordRule.prototype.pattern = "";

        /**
         * PasswordRule match.
         * @member {boolean} match
         * @memberof AccountSummary.PasswordRule
         * @instance
         */
        PasswordRule.prototype.match = false;

        /**
         * PasswordRule minimum.
         * @member {number} minimum
         * @memberof AccountSummary.PasswordRule
         * @instance
         */
        PasswordRule.prototype.minimum = 0;

        /**
         * PasswordRule description.
         * @member {string} description
         * @memberof AccountSummary.PasswordRule
         * @instance
         */
        PasswordRule.prototype.description = "";

        /**
         * PasswordRule value.
         * @member {string} value
         * @memberof AccountSummary.PasswordRule
         * @instance
         */
        PasswordRule.prototype.value = "";

        /**
         * Creates a new PasswordRule instance using the specified properties.
         * @function create
         * @memberof AccountSummary.PasswordRule
         * @static
         * @param {AccountSummary.IPasswordRule=} [properties] Properties to set
         * @returns {AccountSummary.PasswordRule} PasswordRule instance
         */
        PasswordRule.create = function create(properties) {
            return new PasswordRule(properties);
        };

        /**
         * Encodes the specified PasswordRule message. Does not implicitly {@link AccountSummary.PasswordRule.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.PasswordRule
         * @static
         * @param {AccountSummary.IPasswordRule} message PasswordRule message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PasswordRule.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ruleType != null && Object.hasOwnProperty.call(message, "ruleType"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.ruleType);
            if (message.pattern != null && Object.hasOwnProperty.call(message, "pattern"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.pattern);
            if (message.match != null && Object.hasOwnProperty.call(message, "match"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.match);
            if (message.minimum != null && Object.hasOwnProperty.call(message, "minimum"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.minimum);
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.description);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.value);
            return writer;
        };

        /**
         * Encodes the specified PasswordRule message, length delimited. Does not implicitly {@link AccountSummary.PasswordRule.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.PasswordRule
         * @static
         * @param {AccountSummary.IPasswordRule} message PasswordRule message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PasswordRule.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PasswordRule message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.PasswordRule
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.PasswordRule} PasswordRule
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PasswordRule.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.PasswordRule();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ruleType = reader.string();
                        break;
                    }
                case 2: {
                        message.pattern = reader.string();
                        break;
                    }
                case 3: {
                        message.match = reader.bool();
                        break;
                    }
                case 4: {
                        message.minimum = reader.int32();
                        break;
                    }
                case 5: {
                        message.description = reader.string();
                        break;
                    }
                case 6: {
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
         * Decodes a PasswordRule message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.PasswordRule
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.PasswordRule} PasswordRule
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PasswordRule.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PasswordRule message.
         * @function verify
         * @memberof AccountSummary.PasswordRule
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PasswordRule.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.ruleType != null && Object.hasOwnProperty.call(message, "ruleType"))
                if (!$util.isString(message.ruleType))
                    return "ruleType: string expected";
            if (message.pattern != null && Object.hasOwnProperty.call(message, "pattern"))
                if (!$util.isString(message.pattern))
                    return "pattern: string expected";
            if (message.match != null && Object.hasOwnProperty.call(message, "match"))
                if (typeof message.match !== "boolean")
                    return "match: boolean expected";
            if (message.minimum != null && Object.hasOwnProperty.call(message, "minimum"))
                if (!$util.isInteger(message.minimum))
                    return "minimum: integer expected";
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                if (!$util.isString(message.description))
                    return "description: string expected";
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                if (!$util.isString(message.value))
                    return "value: string expected";
            return null;
        };

        /**
         * Creates a PasswordRule message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.PasswordRule
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.PasswordRule} PasswordRule
         */
        PasswordRule.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.PasswordRule)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.PasswordRule: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.PasswordRule();
            if (object.ruleType != null)
                message.ruleType = String(object.ruleType);
            if (object.pattern != null)
                message.pattern = String(object.pattern);
            if (object.match != null)
                message.match = Boolean(object.match);
            if (object.minimum != null)
                message.minimum = object.minimum | 0;
            if (object.description != null)
                message.description = String(object.description);
            if (object.value != null)
                message.value = String(object.value);
            return message;
        };

        /**
         * Creates a plain object from a PasswordRule message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.PasswordRule
         * @static
         * @param {AccountSummary.PasswordRule} message PasswordRule
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PasswordRule.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.ruleType = "";
                object.pattern = "";
                object.match = false;
                object.minimum = 0;
                object.description = "";
                object.value = "";
            }
            if (message.ruleType != null && Object.hasOwnProperty.call(message, "ruleType"))
                object.ruleType = message.ruleType;
            if (message.pattern != null && Object.hasOwnProperty.call(message, "pattern"))
                object.pattern = message.pattern;
            if (message.match != null && Object.hasOwnProperty.call(message, "match"))
                object.match = message.match;
            if (message.minimum != null && Object.hasOwnProperty.call(message, "minimum"))
                object.minimum = message.minimum;
            if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                object.description = message.description;
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this PasswordRule to JSON.
         * @function toJSON
         * @memberof AccountSummary.PasswordRule
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PasswordRule.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PasswordRule
         * @function getTypeUrl
         * @memberof AccountSummary.PasswordRule
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PasswordRule.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.PasswordRule";
        };

        return PasswordRule;
    })();

    AccountSummary.SecurityKey = (function() {

        /**
         * Properties of a SecurityKey.
         * @memberof AccountSummary
         * @interface ISecurityKey
         * @property {number|null} [deviceId] SecurityKey deviceId
         * @property {string|null} [deviceName] SecurityKey deviceName
         * @property {number|null} [dateAdded] SecurityKey dateAdded
         * @property {boolean|null} [isValid] SecurityKey isValid
         * @property {AccountSummary.IDeviceRegistration|null} [deviceRegistration] SecurityKey deviceRegistration
         */

        /**
         * Constructs a new SecurityKey.
         * @memberof AccountSummary
         * @classdesc Represents a SecurityKey.
         * @implements ISecurityKey
         * @constructor
         * @param {AccountSummary.ISecurityKey=} [properties] Properties to set
         */
        function SecurityKey(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SecurityKey deviceId.
         * @member {number} deviceId
         * @memberof AccountSummary.SecurityKey
         * @instance
         */
        SecurityKey.prototype.deviceId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SecurityKey deviceName.
         * @member {string} deviceName
         * @memberof AccountSummary.SecurityKey
         * @instance
         */
        SecurityKey.prototype.deviceName = "";

        /**
         * SecurityKey dateAdded.
         * @member {number} dateAdded
         * @memberof AccountSummary.SecurityKey
         * @instance
         */
        SecurityKey.prototype.dateAdded = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SecurityKey isValid.
         * @member {boolean} isValid
         * @memberof AccountSummary.SecurityKey
         * @instance
         */
        SecurityKey.prototype.isValid = false;

        /**
         * SecurityKey deviceRegistration.
         * @member {AccountSummary.IDeviceRegistration|null|undefined} deviceRegistration
         * @memberof AccountSummary.SecurityKey
         * @instance
         */
        SecurityKey.prototype.deviceRegistration = null;

        /**
         * Creates a new SecurityKey instance using the specified properties.
         * @function create
         * @memberof AccountSummary.SecurityKey
         * @static
         * @param {AccountSummary.ISecurityKey=} [properties] Properties to set
         * @returns {AccountSummary.SecurityKey} SecurityKey instance
         */
        SecurityKey.create = function create(properties) {
            return new SecurityKey(properties);
        };

        /**
         * Encodes the specified SecurityKey message. Does not implicitly {@link AccountSummary.SecurityKey.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.SecurityKey
         * @static
         * @param {AccountSummary.ISecurityKey} message SecurityKey message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityKey.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.deviceId);
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.deviceName);
            if (message.dateAdded != null && Object.hasOwnProperty.call(message, "dateAdded"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.dateAdded);
            if (message.isValid != null && Object.hasOwnProperty.call(message, "isValid"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isValid);
            if (message.deviceRegistration != null && Object.hasOwnProperty.call(message, "deviceRegistration"))
                $root.AccountSummary.DeviceRegistration.encode(message.deviceRegistration, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SecurityKey message, length delimited. Does not implicitly {@link AccountSummary.SecurityKey.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.SecurityKey
         * @static
         * @param {AccountSummary.ISecurityKey} message SecurityKey message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityKey.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a SecurityKey message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.SecurityKey
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.SecurityKey} SecurityKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityKey.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.SecurityKey();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.deviceId = reader.int64();
                        break;
                    }
                case 2: {
                        message.deviceName = reader.string();
                        break;
                    }
                case 3: {
                        message.dateAdded = reader.int64();
                        break;
                    }
                case 4: {
                        message.isValid = reader.bool();
                        break;
                    }
                case 5: {
                        message.deviceRegistration = $root.AccountSummary.DeviceRegistration.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Decodes a SecurityKey message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.SecurityKey
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.SecurityKey} SecurityKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityKey.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SecurityKey message.
         * @function verify
         * @memberof AccountSummary.SecurityKey
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SecurityKey.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                if (!$util.isInteger(message.deviceId) && !(message.deviceId && $util.isInteger(message.deviceId.low) && $util.isInteger(message.deviceId.high)))
                    return "deviceId: integer|Long expected";
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                if (!$util.isString(message.deviceName))
                    return "deviceName: string expected";
            if (message.dateAdded != null && Object.hasOwnProperty.call(message, "dateAdded"))
                if (!$util.isInteger(message.dateAdded) && !(message.dateAdded && $util.isInteger(message.dateAdded.low) && $util.isInteger(message.dateAdded.high)))
                    return "dateAdded: integer|Long expected";
            if (message.isValid != null && Object.hasOwnProperty.call(message, "isValid"))
                if (typeof message.isValid !== "boolean")
                    return "isValid: boolean expected";
            if (message.deviceRegistration != null && Object.hasOwnProperty.call(message, "deviceRegistration")) {
                let error = $root.AccountSummary.DeviceRegistration.verify(message.deviceRegistration, long + 1);
                if (error)
                    return "deviceRegistration." + error;
            }
            return null;
        };

        /**
         * Creates a SecurityKey message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.SecurityKey
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.SecurityKey} SecurityKey
         */
        SecurityKey.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.SecurityKey)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.SecurityKey: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.SecurityKey();
            if (object.deviceId != null)
                if ($util.Long)
                    message.deviceId = $util.Long.fromValue(object.deviceId, false);
                else if (typeof object.deviceId === "string")
                    message.deviceId = parseInt(object.deviceId, 10);
                else if (typeof object.deviceId === "number")
                    message.deviceId = object.deviceId;
                else if (typeof object.deviceId === "object")
                    message.deviceId = new $util.LongBits(object.deviceId.low >>> 0, object.deviceId.high >>> 0).toNumber();
            if (object.deviceName != null)
                message.deviceName = String(object.deviceName);
            if (object.dateAdded != null)
                if ($util.Long)
                    message.dateAdded = $util.Long.fromValue(object.dateAdded, false);
                else if (typeof object.dateAdded === "string")
                    message.dateAdded = parseInt(object.dateAdded, 10);
                else if (typeof object.dateAdded === "number")
                    message.dateAdded = object.dateAdded;
                else if (typeof object.dateAdded === "object")
                    message.dateAdded = new $util.LongBits(object.dateAdded.low >>> 0, object.dateAdded.high >>> 0).toNumber();
            if (object.isValid != null)
                message.isValid = Boolean(object.isValid);
            if (object.deviceRegistration != null) {
                if (!$util.isObject(object.deviceRegistration))
                    throw TypeError(".AccountSummary.SecurityKey.deviceRegistration: object expected");
                message.deviceRegistration = $root.AccountSummary.DeviceRegistration.fromObject(object.deviceRegistration, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a SecurityKey message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.SecurityKey
         * @static
         * @param {AccountSummary.SecurityKey} message SecurityKey
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SecurityKey.toObject = function toObject(message, options, q) {
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
                    object.deviceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.deviceId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.deviceName = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.dateAdded = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.dateAdded = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.isValid = false;
                object.deviceRegistration = null;
            }
            if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.deviceId = typeof message.deviceId === "number" ? BigInt(message.deviceId) : $util.Long.fromBits(message.deviceId.low >>> 0, message.deviceId.high >>> 0, false).toBigInt();
                else if (typeof message.deviceId === "number")
                    object.deviceId = options.longs === String ? String(message.deviceId) : message.deviceId;
                else
                    object.deviceId = options.longs === String ? $util.Long.prototype.toString.call(message.deviceId) : options.longs === Number ? new $util.LongBits(message.deviceId.low >>> 0, message.deviceId.high >>> 0).toNumber() : message.deviceId;
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                object.deviceName = message.deviceName;
            if (message.dateAdded != null && Object.hasOwnProperty.call(message, "dateAdded"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.dateAdded = typeof message.dateAdded === "number" ? BigInt(message.dateAdded) : $util.Long.fromBits(message.dateAdded.low >>> 0, message.dateAdded.high >>> 0, false).toBigInt();
                else if (typeof message.dateAdded === "number")
                    object.dateAdded = options.longs === String ? String(message.dateAdded) : message.dateAdded;
                else
                    object.dateAdded = options.longs === String ? $util.Long.prototype.toString.call(message.dateAdded) : options.longs === Number ? new $util.LongBits(message.dateAdded.low >>> 0, message.dateAdded.high >>> 0).toNumber() : message.dateAdded;
            if (message.isValid != null && Object.hasOwnProperty.call(message, "isValid"))
                object.isValid = message.isValid;
            if (message.deviceRegistration != null && Object.hasOwnProperty.call(message, "deviceRegistration"))
                object.deviceRegistration = $root.AccountSummary.DeviceRegistration.toObject(message.deviceRegistration, options, q + 1);
            return object;
        };

        /**
         * Converts this SecurityKey to JSON.
         * @function toJSON
         * @memberof AccountSummary.SecurityKey
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SecurityKey.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SecurityKey
         * @function getTypeUrl
         * @memberof AccountSummary.SecurityKey
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SecurityKey.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.SecurityKey";
        };

        return SecurityKey;
    })();

    AccountSummary.DeviceRegistration = (function() {

        /**
         * Properties of a DeviceRegistration.
         * @memberof AccountSummary
         * @interface IDeviceRegistration
         * @property {string|null} [keyHandle] DeviceRegistration keyHandle
         * @property {Uint8Array|null} [publicKey] DeviceRegistration publicKey
         * @property {string|null} [attestationCert] DeviceRegistration attestationCert
         * @property {number|null} [counter] DeviceRegistration counter
         * @property {boolean|null} [compromised] DeviceRegistration compromised
         */

        /**
         * Constructs a new DeviceRegistration.
         * @memberof AccountSummary
         * @classdesc Represents a DeviceRegistration.
         * @implements IDeviceRegistration
         * @constructor
         * @param {AccountSummary.IDeviceRegistration=} [properties] Properties to set
         */
        function DeviceRegistration(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeviceRegistration keyHandle.
         * @member {string} keyHandle
         * @memberof AccountSummary.DeviceRegistration
         * @instance
         */
        DeviceRegistration.prototype.keyHandle = "";

        /**
         * DeviceRegistration publicKey.
         * @member {Uint8Array} publicKey
         * @memberof AccountSummary.DeviceRegistration
         * @instance
         */
        DeviceRegistration.prototype.publicKey = $util.newBuffer([]);

        /**
         * DeviceRegistration attestationCert.
         * @member {string} attestationCert
         * @memberof AccountSummary.DeviceRegistration
         * @instance
         */
        DeviceRegistration.prototype.attestationCert = "";

        /**
         * DeviceRegistration counter.
         * @member {number} counter
         * @memberof AccountSummary.DeviceRegistration
         * @instance
         */
        DeviceRegistration.prototype.counter = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * DeviceRegistration compromised.
         * @member {boolean} compromised
         * @memberof AccountSummary.DeviceRegistration
         * @instance
         */
        DeviceRegistration.prototype.compromised = false;

        /**
         * Creates a new DeviceRegistration instance using the specified properties.
         * @function create
         * @memberof AccountSummary.DeviceRegistration
         * @static
         * @param {AccountSummary.IDeviceRegistration=} [properties] Properties to set
         * @returns {AccountSummary.DeviceRegistration} DeviceRegistration instance
         */
        DeviceRegistration.create = function create(properties) {
            return new DeviceRegistration(properties);
        };

        /**
         * Encodes the specified DeviceRegistration message. Does not implicitly {@link AccountSummary.DeviceRegistration.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.DeviceRegistration
         * @static
         * @param {AccountSummary.IDeviceRegistration} message DeviceRegistration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceRegistration.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.keyHandle != null && Object.hasOwnProperty.call(message, "keyHandle"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.keyHandle);
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.publicKey);
            if (message.attestationCert != null && Object.hasOwnProperty.call(message, "attestationCert"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.attestationCert);
            if (message.counter != null && Object.hasOwnProperty.call(message, "counter"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.counter);
            if (message.compromised != null && Object.hasOwnProperty.call(message, "compromised"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.compromised);
            return writer;
        };

        /**
         * Encodes the specified DeviceRegistration message, length delimited. Does not implicitly {@link AccountSummary.DeviceRegistration.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.DeviceRegistration
         * @static
         * @param {AccountSummary.IDeviceRegistration} message DeviceRegistration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceRegistration.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a DeviceRegistration message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.DeviceRegistration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.DeviceRegistration} DeviceRegistration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceRegistration.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.DeviceRegistration();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.keyHandle = reader.string();
                        break;
                    }
                case 2: {
                        message.publicKey = reader.bytes();
                        break;
                    }
                case 3: {
                        message.attestationCert = reader.string();
                        break;
                    }
                case 4: {
                        message.counter = reader.int64();
                        break;
                    }
                case 5: {
                        message.compromised = reader.bool();
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
         * Decodes a DeviceRegistration message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.DeviceRegistration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.DeviceRegistration} DeviceRegistration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceRegistration.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeviceRegistration message.
         * @function verify
         * @memberof AccountSummary.DeviceRegistration
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeviceRegistration.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.keyHandle != null && Object.hasOwnProperty.call(message, "keyHandle"))
                if (!$util.isString(message.keyHandle))
                    return "keyHandle: string expected";
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                    return "publicKey: buffer expected";
            if (message.attestationCert != null && Object.hasOwnProperty.call(message, "attestationCert"))
                if (!$util.isString(message.attestationCert))
                    return "attestationCert: string expected";
            if (message.counter != null && Object.hasOwnProperty.call(message, "counter"))
                if (!$util.isInteger(message.counter) && !(message.counter && $util.isInteger(message.counter.low) && $util.isInteger(message.counter.high)))
                    return "counter: integer|Long expected";
            if (message.compromised != null && Object.hasOwnProperty.call(message, "compromised"))
                if (typeof message.compromised !== "boolean")
                    return "compromised: boolean expected";
            return null;
        };

        /**
         * Creates a DeviceRegistration message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.DeviceRegistration
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.DeviceRegistration} DeviceRegistration
         */
        DeviceRegistration.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.DeviceRegistration)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.DeviceRegistration: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.DeviceRegistration();
            if (object.keyHandle != null)
                message.keyHandle = String(object.keyHandle);
            if (object.publicKey != null)
                if (typeof object.publicKey === "string")
                    $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                else if (object.publicKey.length >= 0)
                    message.publicKey = object.publicKey;
            if (object.attestationCert != null)
                message.attestationCert = String(object.attestationCert);
            if (object.counter != null)
                if ($util.Long)
                    message.counter = $util.Long.fromValue(object.counter, false);
                else if (typeof object.counter === "string")
                    message.counter = parseInt(object.counter, 10);
                else if (typeof object.counter === "number")
                    message.counter = object.counter;
                else if (typeof object.counter === "object")
                    message.counter = new $util.LongBits(object.counter.low >>> 0, object.counter.high >>> 0).toNumber();
            if (object.compromised != null)
                message.compromised = Boolean(object.compromised);
            return message;
        };

        /**
         * Creates a plain object from a DeviceRegistration message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.DeviceRegistration
         * @static
         * @param {AccountSummary.DeviceRegistration} message DeviceRegistration
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeviceRegistration.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.keyHandle = "";
                if (options.bytes === String)
                    object.publicKey = "";
                else {
                    object.publicKey = [];
                    if (options.bytes !== Array)
                        object.publicKey = $util.newBuffer(object.publicKey);
                }
                object.attestationCert = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.counter = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.counter = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.compromised = false;
            }
            if (message.keyHandle != null && Object.hasOwnProperty.call(message, "keyHandle"))
                object.keyHandle = message.keyHandle;
            if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
            if (message.attestationCert != null && Object.hasOwnProperty.call(message, "attestationCert"))
                object.attestationCert = message.attestationCert;
            if (message.counter != null && Object.hasOwnProperty.call(message, "counter"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.counter = typeof message.counter === "number" ? BigInt(message.counter) : $util.Long.fromBits(message.counter.low >>> 0, message.counter.high >>> 0, false).toBigInt();
                else if (typeof message.counter === "number")
                    object.counter = options.longs === String ? String(message.counter) : message.counter;
                else
                    object.counter = options.longs === String ? $util.Long.prototype.toString.call(message.counter) : options.longs === Number ? new $util.LongBits(message.counter.low >>> 0, message.counter.high >>> 0).toNumber() : message.counter;
            if (message.compromised != null && Object.hasOwnProperty.call(message, "compromised"))
                object.compromised = message.compromised;
            return object;
        };

        /**
         * Converts this DeviceRegistration to JSON.
         * @function toJSON
         * @memberof AccountSummary.DeviceRegistration
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeviceRegistration.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DeviceRegistration
         * @function getTypeUrl
         * @memberof AccountSummary.DeviceRegistration
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DeviceRegistration.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.DeviceRegistration";
        };

        return DeviceRegistration;
    })();

    AccountSummary.Group = (function() {

        /**
         * Properties of a Group.
         * @memberof AccountSummary
         * @interface IGroup
         * @property {boolean|null} [admin] Group admin
         * @property {string|null} [groupVerificationCode] Group groupVerificationCode
         * @property {AccountSummary.IAdministrator|null} [administrator] Group administrator
         */

        /**
         * Constructs a new Group.
         * @memberof AccountSummary
         * @classdesc Represents a Group.
         * @implements IGroup
         * @constructor
         * @param {AccountSummary.IGroup=} [properties] Properties to set
         */
        function Group(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Group admin.
         * @member {boolean} admin
         * @memberof AccountSummary.Group
         * @instance
         */
        Group.prototype.admin = false;

        /**
         * Group groupVerificationCode.
         * @member {string} groupVerificationCode
         * @memberof AccountSummary.Group
         * @instance
         */
        Group.prototype.groupVerificationCode = "";

        /**
         * Group administrator.
         * @member {AccountSummary.IAdministrator|null|undefined} administrator
         * @memberof AccountSummary.Group
         * @instance
         */
        Group.prototype.administrator = null;

        /**
         * Creates a new Group instance using the specified properties.
         * @function create
         * @memberof AccountSummary.Group
         * @static
         * @param {AccountSummary.IGroup=} [properties] Properties to set
         * @returns {AccountSummary.Group} Group instance
         */
        Group.create = function create(properties) {
            return new Group(properties);
        };

        /**
         * Encodes the specified Group message. Does not implicitly {@link AccountSummary.Group.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.Group
         * @static
         * @param {AccountSummary.IGroup} message Group message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Group.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.admin != null && Object.hasOwnProperty.call(message, "admin"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.admin);
            if (message.groupVerificationCode != null && Object.hasOwnProperty.call(message, "groupVerificationCode"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.groupVerificationCode);
            if (message.administrator != null && Object.hasOwnProperty.call(message, "administrator"))
                $root.AccountSummary.Administrator.encode(message.administrator, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Group message, length delimited. Does not implicitly {@link AccountSummary.Group.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.Group
         * @static
         * @param {AccountSummary.IGroup} message Group message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Group.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Group message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.Group
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.Group} Group
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Group.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.Group();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.admin = reader.bool();
                        break;
                    }
                case 2: {
                        message.groupVerificationCode = reader.string();
                        break;
                    }
                case 4: {
                        message.administrator = $root.AccountSummary.Administrator.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Decodes a Group message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.Group
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.Group} Group
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Group.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Group message.
         * @function verify
         * @memberof AccountSummary.Group
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Group.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.admin != null && Object.hasOwnProperty.call(message, "admin"))
                if (typeof message.admin !== "boolean")
                    return "admin: boolean expected";
            if (message.groupVerificationCode != null && Object.hasOwnProperty.call(message, "groupVerificationCode"))
                if (!$util.isString(message.groupVerificationCode))
                    return "groupVerificationCode: string expected";
            if (message.administrator != null && Object.hasOwnProperty.call(message, "administrator")) {
                let error = $root.AccountSummary.Administrator.verify(message.administrator, long + 1);
                if (error)
                    return "administrator." + error;
            }
            return null;
        };

        /**
         * Creates a Group message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.Group
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.Group} Group
         */
        Group.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.Group)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.Group: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.Group();
            if (object.admin != null)
                message.admin = Boolean(object.admin);
            if (object.groupVerificationCode != null)
                message.groupVerificationCode = String(object.groupVerificationCode);
            if (object.administrator != null) {
                if (!$util.isObject(object.administrator))
                    throw TypeError(".AccountSummary.Group.administrator: object expected");
                message.administrator = $root.AccountSummary.Administrator.fromObject(object.administrator, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a Group message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.Group
         * @static
         * @param {AccountSummary.Group} message Group
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Group.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.admin = false;
                object.groupVerificationCode = "";
                object.administrator = null;
            }
            if (message.admin != null && Object.hasOwnProperty.call(message, "admin"))
                object.admin = message.admin;
            if (message.groupVerificationCode != null && Object.hasOwnProperty.call(message, "groupVerificationCode"))
                object.groupVerificationCode = message.groupVerificationCode;
            if (message.administrator != null && Object.hasOwnProperty.call(message, "administrator"))
                object.administrator = $root.AccountSummary.Administrator.toObject(message.administrator, options, q + 1);
            return object;
        };

        /**
         * Converts this Group to JSON.
         * @function toJSON
         * @memberof AccountSummary.Group
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Group.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Group
         * @function getTypeUrl
         * @memberof AccountSummary.Group
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Group.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.Group";
        };

        return Group;
    })();

    AccountSummary.Administrator = (function() {

        /**
         * Properties of an Administrator.
         * @memberof AccountSummary
         * @interface IAdministrator
         * @property {string|null} [firstName] Administrator firstName
         * @property {string|null} [lastName] Administrator lastName
         * @property {string|null} [email] Administrator email
         * @property {number|null} [currentNumberOfUsers] Administrator currentNumberOfUsers
         * @property {number|null} [numberOfUsers] Administrator numberOfUsers
         * @property {string|null} [subscriptionCode] Administrator subscriptionCode
         * @property {string|null} [expirationDate] Administrator expirationDate
         * @property {string|null} [purchaseDate] Administrator purchaseDate
         */

        /**
         * Constructs a new Administrator.
         * @memberof AccountSummary
         * @classdesc Represents an Administrator.
         * @implements IAdministrator
         * @constructor
         * @param {AccountSummary.IAdministrator=} [properties] Properties to set
         */
        function Administrator(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Administrator firstName.
         * @member {string} firstName
         * @memberof AccountSummary.Administrator
         * @instance
         */
        Administrator.prototype.firstName = "";

        /**
         * Administrator lastName.
         * @member {string} lastName
         * @memberof AccountSummary.Administrator
         * @instance
         */
        Administrator.prototype.lastName = "";

        /**
         * Administrator email.
         * @member {string} email
         * @memberof AccountSummary.Administrator
         * @instance
         */
        Administrator.prototype.email = "";

        /**
         * Administrator currentNumberOfUsers.
         * @member {number} currentNumberOfUsers
         * @memberof AccountSummary.Administrator
         * @instance
         */
        Administrator.prototype.currentNumberOfUsers = 0;

        /**
         * Administrator numberOfUsers.
         * @member {number} numberOfUsers
         * @memberof AccountSummary.Administrator
         * @instance
         */
        Administrator.prototype.numberOfUsers = 0;

        /**
         * Administrator subscriptionCode.
         * @member {string} subscriptionCode
         * @memberof AccountSummary.Administrator
         * @instance
         */
        Administrator.prototype.subscriptionCode = "";

        /**
         * Administrator expirationDate.
         * @member {string} expirationDate
         * @memberof AccountSummary.Administrator
         * @instance
         */
        Administrator.prototype.expirationDate = "";

        /**
         * Administrator purchaseDate.
         * @member {string} purchaseDate
         * @memberof AccountSummary.Administrator
         * @instance
         */
        Administrator.prototype.purchaseDate = "";

        /**
         * Creates a new Administrator instance using the specified properties.
         * @function create
         * @memberof AccountSummary.Administrator
         * @static
         * @param {AccountSummary.IAdministrator=} [properties] Properties to set
         * @returns {AccountSummary.Administrator} Administrator instance
         */
        Administrator.create = function create(properties) {
            return new Administrator(properties);
        };

        /**
         * Encodes the specified Administrator message. Does not implicitly {@link AccountSummary.Administrator.verify|verify} messages.
         * @function encode
         * @memberof AccountSummary.Administrator
         * @static
         * @param {AccountSummary.IAdministrator} message Administrator message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Administrator.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.firstName != null && Object.hasOwnProperty.call(message, "firstName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.firstName);
            if (message.lastName != null && Object.hasOwnProperty.call(message, "lastName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.lastName);
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.email);
            if (message.currentNumberOfUsers != null && Object.hasOwnProperty.call(message, "currentNumberOfUsers"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.currentNumberOfUsers);
            if (message.numberOfUsers != null && Object.hasOwnProperty.call(message, "numberOfUsers"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.numberOfUsers);
            if (message.subscriptionCode != null && Object.hasOwnProperty.call(message, "subscriptionCode"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.subscriptionCode);
            if (message.expirationDate != null && Object.hasOwnProperty.call(message, "expirationDate"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.expirationDate);
            if (message.purchaseDate != null && Object.hasOwnProperty.call(message, "purchaseDate"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.purchaseDate);
            return writer;
        };

        /**
         * Encodes the specified Administrator message, length delimited. Does not implicitly {@link AccountSummary.Administrator.verify|verify} messages.
         * @function encodeDelimited
         * @memberof AccountSummary.Administrator
         * @static
         * @param {AccountSummary.IAdministrator} message Administrator message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Administrator.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an Administrator message from the specified reader or buffer.
         * @function decode
         * @memberof AccountSummary.Administrator
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {AccountSummary.Administrator} Administrator
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Administrator.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.AccountSummary.Administrator();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.firstName = reader.string();
                        break;
                    }
                case 2: {
                        message.lastName = reader.string();
                        break;
                    }
                case 3: {
                        message.email = reader.string();
                        break;
                    }
                case 4: {
                        message.currentNumberOfUsers = reader.int32();
                        break;
                    }
                case 5: {
                        message.numberOfUsers = reader.int32();
                        break;
                    }
                case 7: {
                        message.subscriptionCode = reader.string();
                        break;
                    }
                case 8: {
                        message.expirationDate = reader.string();
                        break;
                    }
                case 9: {
                        message.purchaseDate = reader.string();
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
         * Decodes an Administrator message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof AccountSummary.Administrator
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {AccountSummary.Administrator} Administrator
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Administrator.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Administrator message.
         * @function verify
         * @memberof AccountSummary.Administrator
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Administrator.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.firstName != null && Object.hasOwnProperty.call(message, "firstName"))
                if (!$util.isString(message.firstName))
                    return "firstName: string expected";
            if (message.lastName != null && Object.hasOwnProperty.call(message, "lastName"))
                if (!$util.isString(message.lastName))
                    return "lastName: string expected";
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.currentNumberOfUsers != null && Object.hasOwnProperty.call(message, "currentNumberOfUsers"))
                if (!$util.isInteger(message.currentNumberOfUsers))
                    return "currentNumberOfUsers: integer expected";
            if (message.numberOfUsers != null && Object.hasOwnProperty.call(message, "numberOfUsers"))
                if (!$util.isInteger(message.numberOfUsers))
                    return "numberOfUsers: integer expected";
            if (message.subscriptionCode != null && Object.hasOwnProperty.call(message, "subscriptionCode"))
                if (!$util.isString(message.subscriptionCode))
                    return "subscriptionCode: string expected";
            if (message.expirationDate != null && Object.hasOwnProperty.call(message, "expirationDate"))
                if (!$util.isString(message.expirationDate))
                    return "expirationDate: string expected";
            if (message.purchaseDate != null && Object.hasOwnProperty.call(message, "purchaseDate"))
                if (!$util.isString(message.purchaseDate))
                    return "purchaseDate: string expected";
            return null;
        };

        /**
         * Creates an Administrator message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof AccountSummary.Administrator
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {AccountSummary.Administrator} Administrator
         */
        Administrator.fromObject = function fromObject(object, long) {
            if (object instanceof $root.AccountSummary.Administrator)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".AccountSummary.Administrator: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.AccountSummary.Administrator();
            if (object.firstName != null)
                message.firstName = String(object.firstName);
            if (object.lastName != null)
                message.lastName = String(object.lastName);
            if (object.email != null)
                message.email = String(object.email);
            if (object.currentNumberOfUsers != null)
                message.currentNumberOfUsers = object.currentNumberOfUsers | 0;
            if (object.numberOfUsers != null)
                message.numberOfUsers = object.numberOfUsers | 0;
            if (object.subscriptionCode != null)
                message.subscriptionCode = String(object.subscriptionCode);
            if (object.expirationDate != null)
                message.expirationDate = String(object.expirationDate);
            if (object.purchaseDate != null)
                message.purchaseDate = String(object.purchaseDate);
            return message;
        };

        /**
         * Creates a plain object from an Administrator message. Also converts values to other types if specified.
         * @function toObject
         * @memberof AccountSummary.Administrator
         * @static
         * @param {AccountSummary.Administrator} message Administrator
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Administrator.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.firstName = "";
                object.lastName = "";
                object.email = "";
                object.currentNumberOfUsers = 0;
                object.numberOfUsers = 0;
                object.subscriptionCode = "";
                object.expirationDate = "";
                object.purchaseDate = "";
            }
            if (message.firstName != null && Object.hasOwnProperty.call(message, "firstName"))
                object.firstName = message.firstName;
            if (message.lastName != null && Object.hasOwnProperty.call(message, "lastName"))
                object.lastName = message.lastName;
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                object.email = message.email;
            if (message.currentNumberOfUsers != null && Object.hasOwnProperty.call(message, "currentNumberOfUsers"))
                object.currentNumberOfUsers = message.currentNumberOfUsers;
            if (message.numberOfUsers != null && Object.hasOwnProperty.call(message, "numberOfUsers"))
                object.numberOfUsers = message.numberOfUsers;
            if (message.subscriptionCode != null && Object.hasOwnProperty.call(message, "subscriptionCode"))
                object.subscriptionCode = message.subscriptionCode;
            if (message.expirationDate != null && Object.hasOwnProperty.call(message, "expirationDate"))
                object.expirationDate = message.expirationDate;
            if (message.purchaseDate != null && Object.hasOwnProperty.call(message, "purchaseDate"))
                object.purchaseDate = message.purchaseDate;
            return object;
        };

        /**
         * Converts this Administrator to JSON.
         * @function toJSON
         * @memberof AccountSummary.Administrator
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Administrator.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Administrator
         * @function getTypeUrl
         * @memberof AccountSummary.Administrator
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Administrator.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/AccountSummary.Administrator";
        };

        return Administrator;
    })();

    return AccountSummary;
})();

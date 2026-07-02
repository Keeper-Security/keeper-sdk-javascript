/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const keeper = $root.keeper = (() => {

    /**
     * Namespace keeper.
     * @exports keeper
     * @namespace
     */
    const keeper = {};

    keeper.api = (function() {

        /**
         * Namespace api.
         * @memberof keeper
         * @namespace
         */
        const api = {};

        api.common = (function() {

            /**
             * Namespace common.
             * @memberof keeper.api
             * @namespace
             */
            const common = {};

            common.Page = (function() {

                /**
                 * Properties of a Page.
                 * @memberof keeper.api.common
                 * @interface IPage
                 * @property {number|null} [pageNumber] Zero-indexed page number.
                 * Default: 0 (first page)
                 * @property {number|null} [pageSize] Number of items per page.
                 * @property {string|null} [cursorToken] Use as cursor to the next page.
                 */

                /**
                 * Constructs a new Page.
                 * @memberof keeper.api.common
                 * @classdesc Pagination parameters for paginated requests.
                 * Used to specify which page of results to retrieve.
                 * @implements IPage
                 * @constructor
                 * @param {keeper.api.common.IPage=} [properties] Properties to set
                 */
                function Page(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Zero-indexed page number.
                 * Default: 0 (first page)
                 * @member {number} pageNumber
                 * @memberof keeper.api.common.Page
                 * @instance
                 */
                Page.prototype.pageNumber = 0;

                /**
                 * Number of items per page.
                 * @member {number} pageSize
                 * @memberof keeper.api.common.Page
                 * @instance
                 */
                Page.prototype.pageSize = 0;

                /**
                 * Use as cursor to the next page.
                 * @member {string} cursorToken
                 * @memberof keeper.api.common.Page
                 * @instance
                 */
                Page.prototype.cursorToken = "";

                /**
                 * Creates a new Page instance using the specified properties.
                 * @function create
                 * @memberof keeper.api.common.Page
                 * @static
                 * @param {keeper.api.common.IPage=} [properties] Properties to set
                 * @returns {keeper.api.common.Page} Page instance
                 */
                Page.create = function create(properties) {
                    return new Page(properties);
                };

                /**
                 * Encodes the specified Page message. Does not implicitly {@link keeper.api.common.Page.verify|verify} messages.
                 * @function encode
                 * @memberof keeper.api.common.Page
                 * @static
                 * @param {keeper.api.common.IPage} message Page message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Page.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.pageNumber != null && Object.hasOwnProperty.call(message, "pageNumber"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.pageNumber);
                    if (message.pageSize != null && Object.hasOwnProperty.call(message, "pageSize"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.pageSize);
                    if (message.cursorToken != null && Object.hasOwnProperty.call(message, "cursorToken"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.cursorToken);
                    return writer;
                };

                /**
                 * Decodes a Page message from the specified reader or buffer.
                 * @function decode
                 * @memberof keeper.api.common.Page
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {keeper.api.common.Page} Page
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Page.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.keeper.api.common.Page();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.pageNumber = reader.int32();
                                break;
                            }
                        case 2: {
                                message.pageSize = reader.int32();
                                break;
                            }
                        case 3: {
                                message.cursorToken = reader.string();
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
                 * Creates a Page message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof keeper.api.common.Page
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {keeper.api.common.Page} Page
                 */
                Page.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.keeper.api.common.Page)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".keeper.api.common.Page: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.keeper.api.common.Page();
                    if (object.pageNumber != null)
                        message.pageNumber = object.pageNumber | 0;
                    if (object.pageSize != null)
                        message.pageSize = object.pageSize | 0;
                    if (object.cursorToken != null)
                        message.cursorToken = String(object.cursorToken);
                    return message;
                };

                /**
                 * Creates a plain object from a Page message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof keeper.api.common.Page
                 * @static
                 * @param {keeper.api.common.Page} message Page
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Page.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.pageNumber = 0;
                        object.pageSize = 0;
                        object.cursorToken = "";
                    }
                    if (message.pageNumber != null && Object.hasOwnProperty.call(message, "pageNumber"))
                        object.pageNumber = message.pageNumber;
                    if (message.pageSize != null && Object.hasOwnProperty.call(message, "pageSize"))
                        object.pageSize = message.pageSize;
                    if (message.cursorToken != null && Object.hasOwnProperty.call(message, "cursorToken"))
                        object.cursorToken = message.cursorToken;
                    return object;
                };

                /**
                 * Converts this Page to JSON.
                 * @function toJSON
                 * @memberof keeper.api.common.Page
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Page.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Page
                 * @function getTypeUrl
                 * @memberof keeper.api.common.Page
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Page.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/keeper.api.common.Page";
                };

                return Page;
            })();

            common.PageInfo = (function() {

                /**
                 * Properties of a PageInfo.
                 * @memberof keeper.api.common
                 * @interface IPageInfo
                 * @property {number|null} [pageNumber] Current page number (zero-indexed).
                 * @property {number|null} [pageSize] Number of items per page.
                 * @property {number|null} [totalCount] Total number of items available across all pages.
                 * @property {boolean|null} [hasMore] Indicates whether more pages are available.
                 * True if (page_number + 1) * page_size < total_count
                 * @property {string|null} [cursorToken] Use as cursor to the next page.
                 */

                /**
                 * Constructs a new PageInfo.
                 * @memberof keeper.api.common
                 * @classdesc Pagination metadata included in paginated responses.
                 * Provides information about the current page and total available items.
                 * @implements IPageInfo
                 * @constructor
                 * @param {keeper.api.common.IPageInfo=} [properties] Properties to set
                 */
                function PageInfo(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Current page number (zero-indexed).
                 * @member {number} pageNumber
                 * @memberof keeper.api.common.PageInfo
                 * @instance
                 */
                PageInfo.prototype.pageNumber = 0;

                /**
                 * Number of items per page.
                 * @member {number} pageSize
                 * @memberof keeper.api.common.PageInfo
                 * @instance
                 */
                PageInfo.prototype.pageSize = 0;

                /**
                 * Total number of items available across all pages.
                 * @member {number} totalCount
                 * @memberof keeper.api.common.PageInfo
                 * @instance
                 */
                PageInfo.prototype.totalCount = 0;

                /**
                 * Indicates whether more pages are available.
                 * True if (page_number + 1) * page_size < total_count
                 * @member {boolean} hasMore
                 * @memberof keeper.api.common.PageInfo
                 * @instance
                 */
                PageInfo.prototype.hasMore = false;

                /**
                 * Use as cursor to the next page.
                 * @member {string} cursorToken
                 * @memberof keeper.api.common.PageInfo
                 * @instance
                 */
                PageInfo.prototype.cursorToken = "";

                /**
                 * Creates a new PageInfo instance using the specified properties.
                 * @function create
                 * @memberof keeper.api.common.PageInfo
                 * @static
                 * @param {keeper.api.common.IPageInfo=} [properties] Properties to set
                 * @returns {keeper.api.common.PageInfo} PageInfo instance
                 */
                PageInfo.create = function create(properties) {
                    return new PageInfo(properties);
                };

                /**
                 * Encodes the specified PageInfo message. Does not implicitly {@link keeper.api.common.PageInfo.verify|verify} messages.
                 * @function encode
                 * @memberof keeper.api.common.PageInfo
                 * @static
                 * @param {keeper.api.common.IPageInfo} message PageInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PageInfo.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.pageNumber != null && Object.hasOwnProperty.call(message, "pageNumber"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.pageNumber);
                    if (message.pageSize != null && Object.hasOwnProperty.call(message, "pageSize"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.pageSize);
                    if (message.totalCount != null && Object.hasOwnProperty.call(message, "totalCount"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.totalCount);
                    if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
                        writer.uint32(/* id 4, wireType 0 =*/32).bool(message.hasMore);
                    if (message.cursorToken != null && Object.hasOwnProperty.call(message, "cursorToken"))
                        writer.uint32(/* id 5, wireType 2 =*/42).string(message.cursorToken);
                    return writer;
                };

                /**
                 * Decodes a PageInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof keeper.api.common.PageInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {keeper.api.common.PageInfo} PageInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PageInfo.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.keeper.api.common.PageInfo();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.pageNumber = reader.int32();
                                break;
                            }
                        case 2: {
                                message.pageSize = reader.int32();
                                break;
                            }
                        case 3: {
                                message.totalCount = reader.int32();
                                break;
                            }
                        case 4: {
                                message.hasMore = reader.bool();
                                break;
                            }
                        case 5: {
                                message.cursorToken = reader.string();
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
                 * Creates a PageInfo message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof keeper.api.common.PageInfo
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {keeper.api.common.PageInfo} PageInfo
                 */
                PageInfo.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.keeper.api.common.PageInfo)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".keeper.api.common.PageInfo: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.keeper.api.common.PageInfo();
                    if (object.pageNumber != null)
                        message.pageNumber = object.pageNumber | 0;
                    if (object.pageSize != null)
                        message.pageSize = object.pageSize | 0;
                    if (object.totalCount != null)
                        message.totalCount = object.totalCount | 0;
                    if (object.hasMore != null)
                        message.hasMore = Boolean(object.hasMore);
                    if (object.cursorToken != null)
                        message.cursorToken = String(object.cursorToken);
                    return message;
                };

                /**
                 * Creates a plain object from a PageInfo message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof keeper.api.common.PageInfo
                 * @static
                 * @param {keeper.api.common.PageInfo} message PageInfo
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                PageInfo.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.pageNumber = 0;
                        object.pageSize = 0;
                        object.totalCount = 0;
                        object.hasMore = false;
                        object.cursorToken = "";
                    }
                    if (message.pageNumber != null && Object.hasOwnProperty.call(message, "pageNumber"))
                        object.pageNumber = message.pageNumber;
                    if (message.pageSize != null && Object.hasOwnProperty.call(message, "pageSize"))
                        object.pageSize = message.pageSize;
                    if (message.totalCount != null && Object.hasOwnProperty.call(message, "totalCount"))
                        object.totalCount = message.totalCount;
                    if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
                        object.hasMore = message.hasMore;
                    if (message.cursorToken != null && Object.hasOwnProperty.call(message, "cursorToken"))
                        object.cursorToken = message.cursorToken;
                    return object;
                };

                /**
                 * Converts this PageInfo to JSON.
                 * @function toJSON
                 * @memberof keeper.api.common.PageInfo
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                PageInfo.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for PageInfo
                 * @function getTypeUrl
                 * @memberof keeper.api.common.PageInfo
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                PageInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/keeper.api.common.PageInfo";
                };

                return PageInfo;
            })();

            return common;
        })();

        return api;
    })();

    return keeper;
})();

import * as $protobuf from "protobufjs";
/** Namespace Authentication. */
export namespace Authentication {

    /** SupportedLanguage enum. */
    enum SupportedLanguage {
        ENGLISH = 0,
        ARABIC = 1,
        BRITISH = 2,
        CHINESE = 3,
        CHINESE_HONG_KONG = 4,
        CHINESE_TAIWAN = 5,
        DUTCH = 6,
        FRENCH = 7,
        GERMAN = 8,
        GREEK = 9,
        HEBREW = 10,
        ITALIAN = 11,
        JAPANESE = 12,
        KOREAN = 13,
        POLISH = 14,
        PORTUGUESE = 15,
        PORTUGUESE_BRAZIL = 16,
        ROMANIAN = 17,
        RUSSIAN = 18,
        SLOVAK = 19,
        SPANISH = 20
    }

    /** LoginType enum. */
    enum LoginType {
        NORMAL = 0,
        SSO = 1,
        BIO = 2,
        ALTERNATE = 3,
        OFFLINE = 4
    }

    /** DeviceStatus enum. */
    enum DeviceStatus {
        NEED_APPROVAL = 0,
        OK = 1,
        DEVICE_DISABLED = 2
    }

    /** LicenseStatus enum. */
    enum LicenseStatus {
        OTHER = 0,
        ACTIVE = 1,
        EXPIRED = 2,
        DISABLED = 3
    }

    /** AccountType enum. */
    enum AccountType {
        CONSUMER = 0,
        FAMILY = 1,
        ENTERPRISE = 2
    }

    /** SessionTokenType enum. */
    enum SessionTokenType {
        NO_RESTRICTION = 0,
        ACCOUNT_RECOVERY = 1,
        SHARE_ACCOUNT = 2,
        PURCHASE = 3,
        RESTRICT = 4,
        ACCEPT_INVITE = 5
    }

    /** Properties of an ApiRequest. */
    interface IApiRequest {

        /** ApiRequest encryptedTransmissionKey */
        encryptedTransmissionKey?: (Uint8Array|null);

        /** ApiRequest publicKeyId */
        publicKeyId?: (number|null);

        /** ApiRequest locale */
        locale?: (string|null);

        /** ApiRequest encryptedPayload */
        encryptedPayload?: (Uint8Array|null);
    }

    /** Represents an ApiRequest. */
    class ApiRequest implements IApiRequest {

        /**
         * Constructs a new ApiRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IApiRequest);

        /** ApiRequest encryptedTransmissionKey. */
        public encryptedTransmissionKey: Uint8Array;

        /** ApiRequest publicKeyId. */
        public publicKeyId: number;

        /** ApiRequest locale. */
        public locale: string;

        /** ApiRequest encryptedPayload. */
        public encryptedPayload: Uint8Array;

        /**
         * Creates a new ApiRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApiRequest instance
         */
        public static create(properties?: Authentication.IApiRequest): Authentication.ApiRequest;

        /**
         * Encodes the specified ApiRequest message. Does not implicitly {@link Authentication.ApiRequest.verify|verify} messages.
         * @param message ApiRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IApiRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApiRequest message, length delimited. Does not implicitly {@link Authentication.ApiRequest.verify|verify} messages.
         * @param message ApiRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IApiRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApiRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApiRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.ApiRequest;

        /**
         * Decodes an ApiRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApiRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.ApiRequest;

        /**
         * Verifies an ApiRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApiRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApiRequest
         */
        public static fromObject(object: { [k: string]: any }): Authentication.ApiRequest;

        /**
         * Creates a plain object from an ApiRequest message. Also converts values to other types if specified.
         * @param message ApiRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.ApiRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApiRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApiRequestPayload. */
    interface IApiRequestPayload {

        /** ApiRequestPayload payload */
        payload?: (Uint8Array|null);

        /** ApiRequestPayload encryptedSessionToken */
        encryptedSessionToken?: (Uint8Array|null);

        /** ApiRequestPayload timeToken */
        timeToken?: (Uint8Array|null);

        /** ApiRequestPayload apiVersion */
        apiVersion?: (number|null);
    }

    /** Represents an ApiRequestPayload. */
    class ApiRequestPayload implements IApiRequestPayload {

        /**
         * Constructs a new ApiRequestPayload.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IApiRequestPayload);

        /** ApiRequestPayload payload. */
        public payload: Uint8Array;

        /** ApiRequestPayload encryptedSessionToken. */
        public encryptedSessionToken: Uint8Array;

        /** ApiRequestPayload timeToken. */
        public timeToken: Uint8Array;

        /** ApiRequestPayload apiVersion. */
        public apiVersion: number;

        /**
         * Creates a new ApiRequestPayload instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApiRequestPayload instance
         */
        public static create(properties?: Authentication.IApiRequestPayload): Authentication.ApiRequestPayload;

        /**
         * Encodes the specified ApiRequestPayload message. Does not implicitly {@link Authentication.ApiRequestPayload.verify|verify} messages.
         * @param message ApiRequestPayload message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IApiRequestPayload, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApiRequestPayload message, length delimited. Does not implicitly {@link Authentication.ApiRequestPayload.verify|verify} messages.
         * @param message ApiRequestPayload message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IApiRequestPayload, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApiRequestPayload message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApiRequestPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.ApiRequestPayload;

        /**
         * Decodes an ApiRequestPayload message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApiRequestPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.ApiRequestPayload;

        /**
         * Verifies an ApiRequestPayload message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApiRequestPayload message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApiRequestPayload
         */
        public static fromObject(object: { [k: string]: any }): Authentication.ApiRequestPayload;

        /**
         * Creates a plain object from an ApiRequestPayload message. Also converts values to other types if specified.
         * @param message ApiRequestPayload
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.ApiRequestPayload, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApiRequestPayload to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Transform. */
    interface ITransform {

        /** Transform key */
        key?: (Uint8Array|null);

        /** Transform encryptedDeviceToken */
        encryptedDeviceToken?: (Uint8Array|null);
    }

    /** Represents a Transform. */
    class Transform implements ITransform {

        /**
         * Constructs a new Transform.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.ITransform);

        /** Transform key. */
        public key: Uint8Array;

        /** Transform encryptedDeviceToken. */
        public encryptedDeviceToken: Uint8Array;

        /**
         * Creates a new Transform instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Transform instance
         */
        public static create(properties?: Authentication.ITransform): Authentication.Transform;

        /**
         * Encodes the specified Transform message. Does not implicitly {@link Authentication.Transform.verify|verify} messages.
         * @param message Transform message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.ITransform, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Transform message, length delimited. Does not implicitly {@link Authentication.Transform.verify|verify} messages.
         * @param message Transform message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.ITransform, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Transform message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Transform
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.Transform;

        /**
         * Decodes a Transform message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Transform
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.Transform;

        /**
         * Verifies a Transform message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Transform message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Transform
         */
        public static fromObject(object: { [k: string]: any }): Authentication.Transform;

        /**
         * Creates a plain object from a Transform message. Also converts values to other types if specified.
         * @param message Transform
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.Transform, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Transform to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DeviceRequest. */
    interface IDeviceRequest {

        /** DeviceRequest clientVersion */
        clientVersion?: (string|null);

        /** DeviceRequest deviceName */
        deviceName?: (string|null);
    }

    /** Represents a DeviceRequest. */
    class DeviceRequest implements IDeviceRequest {

        /**
         * Constructs a new DeviceRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IDeviceRequest);

        /** DeviceRequest clientVersion. */
        public clientVersion: string;

        /** DeviceRequest deviceName. */
        public deviceName: string;

        /**
         * Creates a new DeviceRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeviceRequest instance
         */
        public static create(properties?: Authentication.IDeviceRequest): Authentication.DeviceRequest;

        /**
         * Encodes the specified DeviceRequest message. Does not implicitly {@link Authentication.DeviceRequest.verify|verify} messages.
         * @param message DeviceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IDeviceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DeviceRequest message, length delimited. Does not implicitly {@link Authentication.DeviceRequest.verify|verify} messages.
         * @param message DeviceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IDeviceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DeviceRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeviceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.DeviceRequest;

        /**
         * Decodes a DeviceRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeviceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.DeviceRequest;

        /**
         * Verifies a DeviceRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeviceRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeviceRequest
         */
        public static fromObject(object: { [k: string]: any }): Authentication.DeviceRequest;

        /**
         * Creates a plain object from a DeviceRequest message. Also converts values to other types if specified.
         * @param message DeviceRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.DeviceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeviceRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AuthRequest. */
    interface IAuthRequest {

        /** AuthRequest clientVersion */
        clientVersion?: (string|null);

        /** AuthRequest username */
        username?: (string|null);

        /** AuthRequest encryptedDeviceToken */
        encryptedDeviceToken?: (Uint8Array|null);
    }

    /** Represents an AuthRequest. */
    class AuthRequest implements IAuthRequest {

        /**
         * Constructs a new AuthRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IAuthRequest);

        /** AuthRequest clientVersion. */
        public clientVersion: string;

        /** AuthRequest username. */
        public username: string;

        /** AuthRequest encryptedDeviceToken. */
        public encryptedDeviceToken: Uint8Array;

        /**
         * Creates a new AuthRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AuthRequest instance
         */
        public static create(properties?: Authentication.IAuthRequest): Authentication.AuthRequest;

        /**
         * Encodes the specified AuthRequest message. Does not implicitly {@link Authentication.AuthRequest.verify|verify} messages.
         * @param message AuthRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IAuthRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AuthRequest message, length delimited. Does not implicitly {@link Authentication.AuthRequest.verify|verify} messages.
         * @param message AuthRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IAuthRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AuthRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.AuthRequest;

        /**
         * Decodes an AuthRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.AuthRequest;

        /**
         * Verifies an AuthRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AuthRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AuthRequest
         */
        public static fromObject(object: { [k: string]: any }): Authentication.AuthRequest;

        /**
         * Creates a plain object from an AuthRequest message. Also converts values to other types if specified.
         * @param message AuthRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.AuthRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AuthRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NewUserMinimumParams. */
    interface INewUserMinimumParams {

        /** NewUserMinimumParams minimumIterations */
        minimumIterations?: (number|null);

        /** NewUserMinimumParams passwordMatchRegex */
        passwordMatchRegex?: (string[]|null);

        /** NewUserMinimumParams passwordMatchDescription */
        passwordMatchDescription?: (string[]|null);
    }

    /** Represents a NewUserMinimumParams. */
    class NewUserMinimumParams implements INewUserMinimumParams {

        /**
         * Constructs a new NewUserMinimumParams.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.INewUserMinimumParams);

        /** NewUserMinimumParams minimumIterations. */
        public minimumIterations: number;

        /** NewUserMinimumParams passwordMatchRegex. */
        public passwordMatchRegex: string[];

        /** NewUserMinimumParams passwordMatchDescription. */
        public passwordMatchDescription: string[];

        /**
         * Creates a new NewUserMinimumParams instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NewUserMinimumParams instance
         */
        public static create(properties?: Authentication.INewUserMinimumParams): Authentication.NewUserMinimumParams;

        /**
         * Encodes the specified NewUserMinimumParams message. Does not implicitly {@link Authentication.NewUserMinimumParams.verify|verify} messages.
         * @param message NewUserMinimumParams message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.INewUserMinimumParams, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified NewUserMinimumParams message, length delimited. Does not implicitly {@link Authentication.NewUserMinimumParams.verify|verify} messages.
         * @param message NewUserMinimumParams message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.INewUserMinimumParams, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a NewUserMinimumParams message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NewUserMinimumParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.NewUserMinimumParams;

        /**
         * Decodes a NewUserMinimumParams message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NewUserMinimumParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.NewUserMinimumParams;

        /**
         * Verifies a NewUserMinimumParams message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NewUserMinimumParams message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NewUserMinimumParams
         */
        public static fromObject(object: { [k: string]: any }): Authentication.NewUserMinimumParams;

        /**
         * Creates a plain object from a NewUserMinimumParams message. Also converts values to other types if specified.
         * @param message NewUserMinimumParams
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.NewUserMinimumParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NewUserMinimumParams to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PreLoginRequest. */
    interface IPreLoginRequest {

        /** PreLoginRequest authRequest */
        authRequest?: (Authentication.IAuthRequest|null);

        /** PreLoginRequest loginType */
        loginType?: (Authentication.LoginType|null);

        /** PreLoginRequest twoFactorToken */
        twoFactorToken?: (Uint8Array|null);
    }

    /** Represents a PreLoginRequest. */
    class PreLoginRequest implements IPreLoginRequest {

        /**
         * Constructs a new PreLoginRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IPreLoginRequest);

        /** PreLoginRequest authRequest. */
        public authRequest?: (Authentication.IAuthRequest|null);

        /** PreLoginRequest loginType. */
        public loginType: Authentication.LoginType;

        /** PreLoginRequest twoFactorToken. */
        public twoFactorToken: Uint8Array;

        /**
         * Creates a new PreLoginRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PreLoginRequest instance
         */
        public static create(properties?: Authentication.IPreLoginRequest): Authentication.PreLoginRequest;

        /**
         * Encodes the specified PreLoginRequest message. Does not implicitly {@link Authentication.PreLoginRequest.verify|verify} messages.
         * @param message PreLoginRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IPreLoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PreLoginRequest message, length delimited. Does not implicitly {@link Authentication.PreLoginRequest.verify|verify} messages.
         * @param message PreLoginRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IPreLoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PreLoginRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PreLoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.PreLoginRequest;

        /**
         * Decodes a PreLoginRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PreLoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.PreLoginRequest;

        /**
         * Verifies a PreLoginRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PreLoginRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PreLoginRequest
         */
        public static fromObject(object: { [k: string]: any }): Authentication.PreLoginRequest;

        /**
         * Creates a plain object from a PreLoginRequest message. Also converts values to other types if specified.
         * @param message PreLoginRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.PreLoginRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PreLoginRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LoginRequest. */
    interface ILoginRequest {

        /** LoginRequest authRequest */
        authRequest?: (Authentication.IAuthRequest|null);

        /** LoginRequest loginType */
        loginType?: (Authentication.LoginType|null);

        /** LoginRequest authenticationHashPrime */
        authenticationHashPrime?: (Uint8Array|null);

        /** LoginRequest randomHashKey */
        randomHashKey?: (Uint8Array|null);

        /** LoginRequest encryptedTwoFactorToken */
        encryptedTwoFactorToken?: (Uint8Array|null);

        /** LoginRequest encryptedBreachWatchToken */
        encryptedBreachWatchToken?: (Uint8Array|null);
    }

    /** Represents a LoginRequest. */
    class LoginRequest implements ILoginRequest {

        /**
         * Constructs a new LoginRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.ILoginRequest);

        /** LoginRequest authRequest. */
        public authRequest?: (Authentication.IAuthRequest|null);

        /** LoginRequest loginType. */
        public loginType: Authentication.LoginType;

        /** LoginRequest authenticationHashPrime. */
        public authenticationHashPrime: Uint8Array;

        /** LoginRequest randomHashKey. */
        public randomHashKey: Uint8Array;

        /** LoginRequest encryptedTwoFactorToken. */
        public encryptedTwoFactorToken: Uint8Array;

        /** LoginRequest encryptedBreachWatchToken. */
        public encryptedBreachWatchToken: Uint8Array;

        /**
         * Creates a new LoginRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginRequest instance
         */
        public static create(properties?: Authentication.ILoginRequest): Authentication.LoginRequest;

        /**
         * Encodes the specified LoginRequest message. Does not implicitly {@link Authentication.LoginRequest.verify|verify} messages.
         * @param message LoginRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.ILoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginRequest message, length delimited. Does not implicitly {@link Authentication.LoginRequest.verify|verify} messages.
         * @param message LoginRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.ILoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.LoginRequest;

        /**
         * Decodes a LoginRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.LoginRequest;

        /**
         * Verifies a LoginRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginRequest
         */
        public static fromObject(object: { [k: string]: any }): Authentication.LoginRequest;

        /**
         * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
         * @param message LoginRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.LoginRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RegistrationRequest. */
    interface IRegistrationRequest {

        /** RegistrationRequest authRequest */
        authRequest?: (Authentication.IAuthRequest|null);

        /** RegistrationRequest userAuthRequest */
        userAuthRequest?: (Authentication.IUserAuthRequest|null);

        /** RegistrationRequest encryptedClientKey */
        encryptedClientKey?: (Uint8Array|null);

        /** RegistrationRequest encryptedPrivateKey */
        encryptedPrivateKey?: (Uint8Array|null);

        /** RegistrationRequest publicKey */
        publicKey?: (Uint8Array|null);

        /** RegistrationRequest verificationCode */
        verificationCode?: (string|null);

        /** RegistrationRequest deprecatedAuthHashHash */
        deprecatedAuthHashHash?: (Uint8Array|null);

        /** RegistrationRequest deprecatedEncryptedClientKey */
        deprecatedEncryptedClientKey?: (Uint8Array|null);

        /** RegistrationRequest deprecatedEncryptedPrivateKey */
        deprecatedEncryptedPrivateKey?: (Uint8Array|null);

        /** RegistrationRequest deprecatedEncryptionParams */
        deprecatedEncryptionParams?: (Uint8Array|null);
    }

    /** Represents a RegistrationRequest. */
    class RegistrationRequest implements IRegistrationRequest {

        /**
         * Constructs a new RegistrationRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IRegistrationRequest);

        /** RegistrationRequest authRequest. */
        public authRequest?: (Authentication.IAuthRequest|null);

        /** RegistrationRequest userAuthRequest. */
        public userAuthRequest?: (Authentication.IUserAuthRequest|null);

        /** RegistrationRequest encryptedClientKey. */
        public encryptedClientKey: Uint8Array;

        /** RegistrationRequest encryptedPrivateKey. */
        public encryptedPrivateKey: Uint8Array;

        /** RegistrationRequest publicKey. */
        public publicKey: Uint8Array;

        /** RegistrationRequest verificationCode. */
        public verificationCode: string;

        /** RegistrationRequest deprecatedAuthHashHash. */
        public deprecatedAuthHashHash: Uint8Array;

        /** RegistrationRequest deprecatedEncryptedClientKey. */
        public deprecatedEncryptedClientKey: Uint8Array;

        /** RegistrationRequest deprecatedEncryptedPrivateKey. */
        public deprecatedEncryptedPrivateKey: Uint8Array;

        /** RegistrationRequest deprecatedEncryptionParams. */
        public deprecatedEncryptionParams: Uint8Array;

        /**
         * Creates a new RegistrationRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegistrationRequest instance
         */
        public static create(properties?: Authentication.IRegistrationRequest): Authentication.RegistrationRequest;

        /**
         * Encodes the specified RegistrationRequest message. Does not implicitly {@link Authentication.RegistrationRequest.verify|verify} messages.
         * @param message RegistrationRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IRegistrationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegistrationRequest message, length delimited. Does not implicitly {@link Authentication.RegistrationRequest.verify|verify} messages.
         * @param message RegistrationRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IRegistrationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegistrationRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegistrationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.RegistrationRequest;

        /**
         * Decodes a RegistrationRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegistrationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.RegistrationRequest;

        /**
         * Verifies a RegistrationRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegistrationRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegistrationRequest
         */
        public static fromObject(object: { [k: string]: any }): Authentication.RegistrationRequest;

        /**
         * Creates a plain object from a RegistrationRequest message. Also converts values to other types if specified.
         * @param message RegistrationRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.RegistrationRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegistrationRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DeviceResponse. */
    interface IDeviceResponse {

        /** DeviceResponse encryptedDeviceToken */
        encryptedDeviceToken?: (Uint8Array|null);

        /** DeviceResponse status */
        status?: (Authentication.DeviceStatus|null);
    }

    /** Represents a DeviceResponse. */
    class DeviceResponse implements IDeviceResponse {

        /**
         * Constructs a new DeviceResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IDeviceResponse);

        /** DeviceResponse encryptedDeviceToken. */
        public encryptedDeviceToken: Uint8Array;

        /** DeviceResponse status. */
        public status: Authentication.DeviceStatus;

        /**
         * Creates a new DeviceResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeviceResponse instance
         */
        public static create(properties?: Authentication.IDeviceResponse): Authentication.DeviceResponse;

        /**
         * Encodes the specified DeviceResponse message. Does not implicitly {@link Authentication.DeviceResponse.verify|verify} messages.
         * @param message DeviceResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IDeviceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DeviceResponse message, length delimited. Does not implicitly {@link Authentication.DeviceResponse.verify|verify} messages.
         * @param message DeviceResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IDeviceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DeviceResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeviceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.DeviceResponse;

        /**
         * Decodes a DeviceResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeviceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.DeviceResponse;

        /**
         * Verifies a DeviceResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeviceResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeviceResponse
         */
        public static fromObject(object: { [k: string]: any }): Authentication.DeviceResponse;

        /**
         * Creates a plain object from a DeviceResponse message. Also converts values to other types if specified.
         * @param message DeviceResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.DeviceResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeviceResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Salt. */
    interface ISalt {

        /** Salt iterations */
        iterations?: (number|null);

        /** Salt salt */
        salt?: (Uint8Array|null);

        /** Salt algorithm */
        algorithm?: (number|null);

        /** Salt uid */
        uid?: (Uint8Array|null);

        /** Salt name */
        name?: (string|null);
    }

    /** Represents a Salt. */
    class Salt implements ISalt {

        /**
         * Constructs a new Salt.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.ISalt);

        /** Salt iterations. */
        public iterations: number;

        /** Salt salt. */
        public salt: Uint8Array;

        /** Salt algorithm. */
        public algorithm: number;

        /** Salt uid. */
        public uid: Uint8Array;

        /** Salt name. */
        public name: string;

        /**
         * Creates a new Salt instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Salt instance
         */
        public static create(properties?: Authentication.ISalt): Authentication.Salt;

        /**
         * Encodes the specified Salt message. Does not implicitly {@link Authentication.Salt.verify|verify} messages.
         * @param message Salt message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.ISalt, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Salt message, length delimited. Does not implicitly {@link Authentication.Salt.verify|verify} messages.
         * @param message Salt message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.ISalt, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Salt message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Salt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.Salt;

        /**
         * Decodes a Salt message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Salt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.Salt;

        /**
         * Verifies a Salt message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Salt message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Salt
         */
        public static fromObject(object: { [k: string]: any }): Authentication.Salt;

        /**
         * Creates a plain object from a Salt message. Also converts values to other types if specified.
         * @param message Salt
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.Salt, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Salt to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TwoFactorChannel. */
    interface ITwoFactorChannel {

        /** TwoFactorChannel type */
        type?: (number|null);
    }

    /** Represents a TwoFactorChannel. */
    class TwoFactorChannel implements ITwoFactorChannel {

        /**
         * Constructs a new TwoFactorChannel.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.ITwoFactorChannel);

        /** TwoFactorChannel type. */
        public type: number;

        /**
         * Creates a new TwoFactorChannel instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TwoFactorChannel instance
         */
        public static create(properties?: Authentication.ITwoFactorChannel): Authentication.TwoFactorChannel;

        /**
         * Encodes the specified TwoFactorChannel message. Does not implicitly {@link Authentication.TwoFactorChannel.verify|verify} messages.
         * @param message TwoFactorChannel message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.ITwoFactorChannel, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TwoFactorChannel message, length delimited. Does not implicitly {@link Authentication.TwoFactorChannel.verify|verify} messages.
         * @param message TwoFactorChannel message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.ITwoFactorChannel, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TwoFactorChannel message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TwoFactorChannel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.TwoFactorChannel;

        /**
         * Decodes a TwoFactorChannel message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TwoFactorChannel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.TwoFactorChannel;

        /**
         * Verifies a TwoFactorChannel message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TwoFactorChannel message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TwoFactorChannel
         */
        public static fromObject(object: { [k: string]: any }): Authentication.TwoFactorChannel;

        /**
         * Creates a plain object from a TwoFactorChannel message. Also converts values to other types if specified.
         * @param message TwoFactorChannel
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.TwoFactorChannel, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TwoFactorChannel to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PreLoginResponse. */
    interface IPreLoginResponse {

        /** PreLoginResponse status */
        status?: (Authentication.DeviceStatus|null);

        /** PreLoginResponse salt */
        salt?: (Authentication.ISalt[]|null);

        /** PreLoginResponse twoFactorChannel */
        twoFactorChannel?: (Authentication.ITwoFactorChannel[]|null);
    }

    /** Represents a PreLoginResponse. */
    class PreLoginResponse implements IPreLoginResponse {

        /**
         * Constructs a new PreLoginResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IPreLoginResponse);

        /** PreLoginResponse status. */
        public status: Authentication.DeviceStatus;

        /** PreLoginResponse salt. */
        public salt: Authentication.ISalt[];

        /** PreLoginResponse twoFactorChannel. */
        public twoFactorChannel: Authentication.ITwoFactorChannel[];

        /**
         * Creates a new PreLoginResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PreLoginResponse instance
         */
        public static create(properties?: Authentication.IPreLoginResponse): Authentication.PreLoginResponse;

        /**
         * Encodes the specified PreLoginResponse message. Does not implicitly {@link Authentication.PreLoginResponse.verify|verify} messages.
         * @param message PreLoginResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IPreLoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PreLoginResponse message, length delimited. Does not implicitly {@link Authentication.PreLoginResponse.verify|verify} messages.
         * @param message PreLoginResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IPreLoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PreLoginResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PreLoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.PreLoginResponse;

        /**
         * Decodes a PreLoginResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PreLoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.PreLoginResponse;

        /**
         * Verifies a PreLoginResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PreLoginResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PreLoginResponse
         */
        public static fromObject(object: { [k: string]: any }): Authentication.PreLoginResponse;

        /**
         * Creates a plain object from a PreLoginResponse message. Also converts values to other types if specified.
         * @param message PreLoginResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.PreLoginResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PreLoginResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LoginResponse. */
    interface ILoginResponse {

        /** LoginResponse encryrptedSessionToken */
        encryrptedSessionToken?: (Uint8Array|null);

        /** LoginResponse vault */
        vault?: (Authentication.ILicense|null);

        /** LoginResponse chat */
        chat?: (Authentication.ILicense|null);

        /** LoginResponse storage */
        storage?: (Authentication.ILicense|null);

        /** LoginResponse breachWatch */
        breachWatch?: (Authentication.ILicense|null);

        /** LoginResponse accountType */
        accountType?: (Authentication.AccountType|null);

        /** LoginResponse encryptedDAT */
        encryptedDAT?: (Uint8Array|null);

        /** LoginResponse encryptedPAT */
        encryptedPAT?: (Uint8Array|null);

        /** LoginResponse encryptedEAT */
        encryptedEAT?: (Uint8Array|null);

        /** LoginResponse encryptedDataKey */
        encryptedDataKey?: (Uint8Array|null);

        /** LoginResponse sessionTokenType */
        sessionTokenType?: (Authentication.SessionTokenType[]|null);
    }

    /** Represents a LoginResponse. */
    class LoginResponse implements ILoginResponse {

        /**
         * Constructs a new LoginResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.ILoginResponse);

        /** LoginResponse encryrptedSessionToken. */
        public encryrptedSessionToken: Uint8Array;

        /** LoginResponse vault. */
        public vault?: (Authentication.ILicense|null);

        /** LoginResponse chat. */
        public chat?: (Authentication.ILicense|null);

        /** LoginResponse storage. */
        public storage?: (Authentication.ILicense|null);

        /** LoginResponse breachWatch. */
        public breachWatch?: (Authentication.ILicense|null);

        /** LoginResponse accountType. */
        public accountType: Authentication.AccountType;

        /** LoginResponse encryptedDAT. */
        public encryptedDAT: Uint8Array;

        /** LoginResponse encryptedPAT. */
        public encryptedPAT: Uint8Array;

        /** LoginResponse encryptedEAT. */
        public encryptedEAT: Uint8Array;

        /** LoginResponse encryptedDataKey. */
        public encryptedDataKey: Uint8Array;

        /** LoginResponse sessionTokenType. */
        public sessionTokenType: Authentication.SessionTokenType[];

        /**
         * Creates a new LoginResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginResponse instance
         */
        public static create(properties?: Authentication.ILoginResponse): Authentication.LoginResponse;

        /**
         * Encodes the specified LoginResponse message. Does not implicitly {@link Authentication.LoginResponse.verify|verify} messages.
         * @param message LoginResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.ILoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginResponse message, length delimited. Does not implicitly {@link Authentication.LoginResponse.verify|verify} messages.
         * @param message LoginResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.ILoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.LoginResponse;

        /**
         * Decodes a LoginResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.LoginResponse;

        /**
         * Verifies a LoginResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginResponse
         */
        public static fromObject(object: { [k: string]: any }): Authentication.LoginResponse;

        /**
         * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
         * @param message LoginResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.LoginResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a License. */
    interface ILicense {

        /** License created */
        created?: (number|Long|null);

        /** License expiration */
        expiration?: (number|Long|null);

        /** License licenseStatus */
        licenseStatus?: (Authentication.LicenseStatus|null);

        /** License paid */
        paid?: (boolean|null);

        /** License message */
        message?: (string|null);
    }

    /** Represents a License. */
    class License implements ILicense {

        /**
         * Constructs a new License.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.ILicense);

        /** License created. */
        public created: (number|Long);

        /** License expiration. */
        public expiration: (number|Long);

        /** License licenseStatus. */
        public licenseStatus: Authentication.LicenseStatus;

        /** License paid. */
        public paid: boolean;

        /** License message. */
        public message: string;

        /**
         * Creates a new License instance using the specified properties.
         * @param [properties] Properties to set
         * @returns License instance
         */
        public static create(properties?: Authentication.ILicense): Authentication.License;

        /**
         * Encodes the specified License message. Does not implicitly {@link Authentication.License.verify|verify} messages.
         * @param message License message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.ILicense, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified License message, length delimited. Does not implicitly {@link Authentication.License.verify|verify} messages.
         * @param message License message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.ILicense, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a License message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns License
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.License;

        /**
         * Decodes a License message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns License
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.License;

        /**
         * Verifies a License message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a License message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns License
         */
        public static fromObject(object: { [k: string]: any }): Authentication.License;

        /**
         * Creates a plain object from a License message. Also converts values to other types if specified.
         * @param message License
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.License, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this License to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an OwnerlessRecord. */
    interface IOwnerlessRecord {

        /** OwnerlessRecord recordUid */
        recordUid?: (Uint8Array|null);

        /** OwnerlessRecord recordKey */
        recordKey?: (Uint8Array|null);

        /** OwnerlessRecord status */
        status?: (number|null);
    }

    /** Represents an OwnerlessRecord. */
    class OwnerlessRecord implements IOwnerlessRecord {

        /**
         * Constructs a new OwnerlessRecord.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IOwnerlessRecord);

        /** OwnerlessRecord recordUid. */
        public recordUid: Uint8Array;

        /** OwnerlessRecord recordKey. */
        public recordKey: Uint8Array;

        /** OwnerlessRecord status. */
        public status: number;

        /**
         * Creates a new OwnerlessRecord instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OwnerlessRecord instance
         */
        public static create(properties?: Authentication.IOwnerlessRecord): Authentication.OwnerlessRecord;

        /**
         * Encodes the specified OwnerlessRecord message. Does not implicitly {@link Authentication.OwnerlessRecord.verify|verify} messages.
         * @param message OwnerlessRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IOwnerlessRecord, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OwnerlessRecord message, length delimited. Does not implicitly {@link Authentication.OwnerlessRecord.verify|verify} messages.
         * @param message OwnerlessRecord message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IOwnerlessRecord, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OwnerlessRecord message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OwnerlessRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.OwnerlessRecord;

        /**
         * Decodes an OwnerlessRecord message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OwnerlessRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.OwnerlessRecord;

        /**
         * Verifies an OwnerlessRecord message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OwnerlessRecord message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OwnerlessRecord
         */
        public static fromObject(object: { [k: string]: any }): Authentication.OwnerlessRecord;

        /**
         * Creates a plain object from an OwnerlessRecord message. Also converts values to other types if specified.
         * @param message OwnerlessRecord
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.OwnerlessRecord, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OwnerlessRecord to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an OwnerlessRecords. */
    interface IOwnerlessRecords {

        /** OwnerlessRecords ownerlessRecord */
        ownerlessRecord?: (Authentication.IOwnerlessRecord[]|null);
    }

    /** Represents an OwnerlessRecords. */
    class OwnerlessRecords implements IOwnerlessRecords {

        /**
         * Constructs a new OwnerlessRecords.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IOwnerlessRecords);

        /** OwnerlessRecords ownerlessRecord. */
        public ownerlessRecord: Authentication.IOwnerlessRecord[];

        /**
         * Creates a new OwnerlessRecords instance using the specified properties.
         * @param [properties] Properties to set
         * @returns OwnerlessRecords instance
         */
        public static create(properties?: Authentication.IOwnerlessRecords): Authentication.OwnerlessRecords;

        /**
         * Encodes the specified OwnerlessRecords message. Does not implicitly {@link Authentication.OwnerlessRecords.verify|verify} messages.
         * @param message OwnerlessRecords message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IOwnerlessRecords, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified OwnerlessRecords message, length delimited. Does not implicitly {@link Authentication.OwnerlessRecords.verify|verify} messages.
         * @param message OwnerlessRecords message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IOwnerlessRecords, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an OwnerlessRecords message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns OwnerlessRecords
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.OwnerlessRecords;

        /**
         * Decodes an OwnerlessRecords message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns OwnerlessRecords
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.OwnerlessRecords;

        /**
         * Verifies an OwnerlessRecords message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an OwnerlessRecords message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns OwnerlessRecords
         */
        public static fromObject(object: { [k: string]: any }): Authentication.OwnerlessRecords;

        /**
         * Creates a plain object from an OwnerlessRecords message. Also converts values to other types if specified.
         * @param message OwnerlessRecords
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.OwnerlessRecords, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this OwnerlessRecords to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserAuthRequest. */
    interface IUserAuthRequest {

        /** UserAuthRequest uid */
        uid?: (Uint8Array|null);

        /** UserAuthRequest salt */
        salt?: (Uint8Array|null);

        /** UserAuthRequest iterations */
        iterations?: (number|null);

        /** UserAuthRequest encryptedClientKey */
        encryptedClientKey?: (Uint8Array|null);

        /** UserAuthRequest authHash */
        authHash?: (Uint8Array|null);

        /** UserAuthRequest encryptedDataKey */
        encryptedDataKey?: (Uint8Array|null);

        /** UserAuthRequest loginType */
        loginType?: (Authentication.LoginType|null);

        /** UserAuthRequest name */
        name?: (string|null);

        /** UserAuthRequest algorithm */
        algorithm?: (number|null);
    }

    /** Represents a UserAuthRequest. */
    class UserAuthRequest implements IUserAuthRequest {

        /**
         * Constructs a new UserAuthRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IUserAuthRequest);

        /** UserAuthRequest uid. */
        public uid: Uint8Array;

        /** UserAuthRequest salt. */
        public salt: Uint8Array;

        /** UserAuthRequest iterations. */
        public iterations: number;

        /** UserAuthRequest encryptedClientKey. */
        public encryptedClientKey: Uint8Array;

        /** UserAuthRequest authHash. */
        public authHash: Uint8Array;

        /** UserAuthRequest encryptedDataKey. */
        public encryptedDataKey: Uint8Array;

        /** UserAuthRequest loginType. */
        public loginType: Authentication.LoginType;

        /** UserAuthRequest name. */
        public name: string;

        /** UserAuthRequest algorithm. */
        public algorithm: number;

        /**
         * Creates a new UserAuthRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserAuthRequest instance
         */
        public static create(properties?: Authentication.IUserAuthRequest): Authentication.UserAuthRequest;

        /**
         * Encodes the specified UserAuthRequest message. Does not implicitly {@link Authentication.UserAuthRequest.verify|verify} messages.
         * @param message UserAuthRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IUserAuthRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserAuthRequest message, length delimited. Does not implicitly {@link Authentication.UserAuthRequest.verify|verify} messages.
         * @param message UserAuthRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IUserAuthRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserAuthRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserAuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.UserAuthRequest;

        /**
         * Decodes a UserAuthRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserAuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.UserAuthRequest;

        /**
         * Verifies a UserAuthRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserAuthRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserAuthRequest
         */
        public static fromObject(object: { [k: string]: any }): Authentication.UserAuthRequest;

        /**
         * Creates a plain object from a UserAuthRequest message. Also converts values to other types if specified.
         * @param message UserAuthRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.UserAuthRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserAuthRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UidRequest. */
    interface IUidRequest {

        /** UidRequest uid */
        uid?: (Uint8Array[]|null);
    }

    /** Represents an UidRequest. */
    class UidRequest implements IUidRequest {

        /**
         * Constructs a new UidRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IUidRequest);

        /** UidRequest uid. */
        public uid: Uint8Array[];

        /**
         * Creates a new UidRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UidRequest instance
         */
        public static create(properties?: Authentication.IUidRequest): Authentication.UidRequest;

        /**
         * Encodes the specified UidRequest message. Does not implicitly {@link Authentication.UidRequest.verify|verify} messages.
         * @param message UidRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IUidRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UidRequest message, length delimited. Does not implicitly {@link Authentication.UidRequest.verify|verify} messages.
         * @param message UidRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IUidRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UidRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.UidRequest;

        /**
         * Decodes an UidRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.UidRequest;

        /**
         * Verifies an UidRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UidRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UidRequest
         */
        public static fromObject(object: { [k: string]: any }): Authentication.UidRequest;

        /**
         * Creates a plain object from an UidRequest message. Also converts values to other types if specified.
         * @param message UidRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.UidRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UidRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DeviceClientVersionUpdateRequest. */
    interface IDeviceClientVersionUpdateRequest {

        /** DeviceClientVersionUpdateRequest encryptedDeviceToken */
        encryptedDeviceToken?: (Uint8Array|null);

        /** DeviceClientVersionUpdateRequest clientVersion */
        clientVersion?: (string|null);
    }

    /** Represents a DeviceClientVersionUpdateRequest. */
    class DeviceClientVersionUpdateRequest implements IDeviceClientVersionUpdateRequest {

        /**
         * Constructs a new DeviceClientVersionUpdateRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IDeviceClientVersionUpdateRequest);

        /** DeviceClientVersionUpdateRequest encryptedDeviceToken. */
        public encryptedDeviceToken: Uint8Array;

        /** DeviceClientVersionUpdateRequest clientVersion. */
        public clientVersion: string;

        /**
         * Creates a new DeviceClientVersionUpdateRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeviceClientVersionUpdateRequest instance
         */
        public static create(properties?: Authentication.IDeviceClientVersionUpdateRequest): Authentication.DeviceClientVersionUpdateRequest;

        /**
         * Encodes the specified DeviceClientVersionUpdateRequest message. Does not implicitly {@link Authentication.DeviceClientVersionUpdateRequest.verify|verify} messages.
         * @param message DeviceClientVersionUpdateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IDeviceClientVersionUpdateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DeviceClientVersionUpdateRequest message, length delimited. Does not implicitly {@link Authentication.DeviceClientVersionUpdateRequest.verify|verify} messages.
         * @param message DeviceClientVersionUpdateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IDeviceClientVersionUpdateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DeviceClientVersionUpdateRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeviceClientVersionUpdateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.DeviceClientVersionUpdateRequest;

        /**
         * Decodes a DeviceClientVersionUpdateRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeviceClientVersionUpdateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.DeviceClientVersionUpdateRequest;

        /**
         * Verifies a DeviceClientVersionUpdateRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeviceClientVersionUpdateRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeviceClientVersionUpdateRequest
         */
        public static fromObject(object: { [k: string]: any }): Authentication.DeviceClientVersionUpdateRequest;

        /**
         * Creates a plain object from a DeviceClientVersionUpdateRequest message. Also converts values to other types if specified.
         * @param message DeviceClientVersionUpdateRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.DeviceClientVersionUpdateRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeviceClientVersionUpdateRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ConvertUserToV3Request. */
    interface IConvertUserToV3Request {

        /** ConvertUserToV3Request authRequest */
        authRequest?: (Authentication.IAuthRequest|null);

        /** ConvertUserToV3Request userAuthRequest */
        userAuthRequest?: (Authentication.IUserAuthRequest|null);

        /** ConvertUserToV3Request encryptedClientKey */
        encryptedClientKey?: (Uint8Array|null);

        /** ConvertUserToV3Request encryptedPrivateKey */
        encryptedPrivateKey?: (Uint8Array|null);

        /** ConvertUserToV3Request publicKey */
        publicKey?: (Uint8Array|null);
    }

    /** Represents a ConvertUserToV3Request. */
    class ConvertUserToV3Request implements IConvertUserToV3Request {

        /**
         * Constructs a new ConvertUserToV3Request.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IConvertUserToV3Request);

        /** ConvertUserToV3Request authRequest. */
        public authRequest?: (Authentication.IAuthRequest|null);

        /** ConvertUserToV3Request userAuthRequest. */
        public userAuthRequest?: (Authentication.IUserAuthRequest|null);

        /** ConvertUserToV3Request encryptedClientKey. */
        public encryptedClientKey: Uint8Array;

        /** ConvertUserToV3Request encryptedPrivateKey. */
        public encryptedPrivateKey: Uint8Array;

        /** ConvertUserToV3Request publicKey. */
        public publicKey: Uint8Array;

        /**
         * Creates a new ConvertUserToV3Request instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ConvertUserToV3Request instance
         */
        public static create(properties?: Authentication.IConvertUserToV3Request): Authentication.ConvertUserToV3Request;

        /**
         * Encodes the specified ConvertUserToV3Request message. Does not implicitly {@link Authentication.ConvertUserToV3Request.verify|verify} messages.
         * @param message ConvertUserToV3Request message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IConvertUserToV3Request, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ConvertUserToV3Request message, length delimited. Does not implicitly {@link Authentication.ConvertUserToV3Request.verify|verify} messages.
         * @param message ConvertUserToV3Request message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IConvertUserToV3Request, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ConvertUserToV3Request message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ConvertUserToV3Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.ConvertUserToV3Request;

        /**
         * Decodes a ConvertUserToV3Request message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ConvertUserToV3Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.ConvertUserToV3Request;

        /**
         * Verifies a ConvertUserToV3Request message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ConvertUserToV3Request message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ConvertUserToV3Request
         */
        public static fromObject(object: { [k: string]: any }): Authentication.ConvertUserToV3Request;

        /**
         * Creates a plain object from a ConvertUserToV3Request message. Also converts values to other types if specified.
         * @param message ConvertUserToV3Request
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.ConvertUserToV3Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ConvertUserToV3Request to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RevisionResponse. */
    interface IRevisionResponse {

        /** RevisionResponse revision */
        revision?: (number|Long|null);
    }

    /** Represents a RevisionResponse. */
    class RevisionResponse implements IRevisionResponse {

        /**
         * Constructs a new RevisionResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IRevisionResponse);

        /** RevisionResponse revision. */
        public revision: (number|Long);

        /**
         * Creates a new RevisionResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RevisionResponse instance
         */
        public static create(properties?: Authentication.IRevisionResponse): Authentication.RevisionResponse;

        /**
         * Encodes the specified RevisionResponse message. Does not implicitly {@link Authentication.RevisionResponse.verify|verify} messages.
         * @param message RevisionResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IRevisionResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RevisionResponse message, length delimited. Does not implicitly {@link Authentication.RevisionResponse.verify|verify} messages.
         * @param message RevisionResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IRevisionResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RevisionResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RevisionResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.RevisionResponse;

        /**
         * Decodes a RevisionResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RevisionResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.RevisionResponse;

        /**
         * Verifies a RevisionResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RevisionResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RevisionResponse
         */
        public static fromObject(object: { [k: string]: any }): Authentication.RevisionResponse;

        /**
         * Creates a plain object from a RevisionResponse message. Also converts values to other types if specified.
         * @param message RevisionResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.RevisionResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RevisionResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChangeEmailRequest. */
    interface IChangeEmailRequest {

        /** ChangeEmailRequest newEmail */
        newEmail?: (string|null);
    }

    /** Represents a ChangeEmailRequest. */
    class ChangeEmailRequest implements IChangeEmailRequest {

        /**
         * Constructs a new ChangeEmailRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IChangeEmailRequest);

        /** ChangeEmailRequest newEmail. */
        public newEmail: string;

        /**
         * Creates a new ChangeEmailRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChangeEmailRequest instance
         */
        public static create(properties?: Authentication.IChangeEmailRequest): Authentication.ChangeEmailRequest;

        /**
         * Encodes the specified ChangeEmailRequest message. Does not implicitly {@link Authentication.ChangeEmailRequest.verify|verify} messages.
         * @param message ChangeEmailRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IChangeEmailRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChangeEmailRequest message, length delimited. Does not implicitly {@link Authentication.ChangeEmailRequest.verify|verify} messages.
         * @param message ChangeEmailRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IChangeEmailRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChangeEmailRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChangeEmailRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.ChangeEmailRequest;

        /**
         * Decodes a ChangeEmailRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChangeEmailRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.ChangeEmailRequest;

        /**
         * Verifies a ChangeEmailRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChangeEmailRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChangeEmailRequest
         */
        public static fromObject(object: { [k: string]: any }): Authentication.ChangeEmailRequest;

        /**
         * Creates a plain object from a ChangeEmailRequest message. Also converts values to other types if specified.
         * @param message ChangeEmailRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.ChangeEmailRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChangeEmailRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChangeEmailResponse. */
    interface IChangeEmailResponse {

        /** ChangeEmailResponse encryptedChangeEmailToken */
        encryptedChangeEmailToken?: (Uint8Array|null);
    }

    /** Represents a ChangeEmailResponse. */
    class ChangeEmailResponse implements IChangeEmailResponse {

        /**
         * Constructs a new ChangeEmailResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IChangeEmailResponse);

        /** ChangeEmailResponse encryptedChangeEmailToken. */
        public encryptedChangeEmailToken: Uint8Array;

        /**
         * Creates a new ChangeEmailResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChangeEmailResponse instance
         */
        public static create(properties?: Authentication.IChangeEmailResponse): Authentication.ChangeEmailResponse;

        /**
         * Encodes the specified ChangeEmailResponse message. Does not implicitly {@link Authentication.ChangeEmailResponse.verify|verify} messages.
         * @param message ChangeEmailResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IChangeEmailResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChangeEmailResponse message, length delimited. Does not implicitly {@link Authentication.ChangeEmailResponse.verify|verify} messages.
         * @param message ChangeEmailResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IChangeEmailResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChangeEmailResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChangeEmailResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.ChangeEmailResponse;

        /**
         * Decodes a ChangeEmailResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChangeEmailResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.ChangeEmailResponse;

        /**
         * Verifies a ChangeEmailResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChangeEmailResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChangeEmailResponse
         */
        public static fromObject(object: { [k: string]: any }): Authentication.ChangeEmailResponse;

        /**
         * Creates a plain object from a ChangeEmailResponse message. Also converts values to other types if specified.
         * @param message ChangeEmailResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.ChangeEmailResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChangeEmailResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SecurityData. */
    interface ISecurityData {

        /** SecurityData uid */
        uid?: (Uint8Array|null);

        /** SecurityData data */
        data?: (Uint8Array|null);
    }

    /** Represents a SecurityData. */
    class SecurityData implements ISecurityData {

        /**
         * Constructs a new SecurityData.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.ISecurityData);

        /** SecurityData uid. */
        public uid: Uint8Array;

        /** SecurityData data. */
        public data: Uint8Array;

        /**
         * Creates a new SecurityData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SecurityData instance
         */
        public static create(properties?: Authentication.ISecurityData): Authentication.SecurityData;

        /**
         * Encodes the specified SecurityData message. Does not implicitly {@link Authentication.SecurityData.verify|verify} messages.
         * @param message SecurityData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.ISecurityData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SecurityData message, length delimited. Does not implicitly {@link Authentication.SecurityData.verify|verify} messages.
         * @param message SecurityData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.ISecurityData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SecurityData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SecurityData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.SecurityData;

        /**
         * Decodes a SecurityData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SecurityData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.SecurityData;

        /**
         * Verifies a SecurityData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SecurityData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SecurityData
         */
        public static fromObject(object: { [k: string]: any }): Authentication.SecurityData;

        /**
         * Creates a plain object from a SecurityData message. Also converts values to other types if specified.
         * @param message SecurityData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.SecurityData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SecurityData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SecurityDataRequest. */
    interface ISecurityDataRequest {

        /** SecurityDataRequest recordSecurityData */
        recordSecurityData?: (Authentication.ISecurityData[]|null);

        /** SecurityDataRequest masterPasswordSecurityData */
        masterPasswordSecurityData?: (Authentication.ISecurityData[]|null);
    }

    /** Represents a SecurityDataRequest. */
    class SecurityDataRequest implements ISecurityDataRequest {

        /**
         * Constructs a new SecurityDataRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.ISecurityDataRequest);

        /** SecurityDataRequest recordSecurityData. */
        public recordSecurityData: Authentication.ISecurityData[];

        /** SecurityDataRequest masterPasswordSecurityData. */
        public masterPasswordSecurityData: Authentication.ISecurityData[];

        /**
         * Creates a new SecurityDataRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SecurityDataRequest instance
         */
        public static create(properties?: Authentication.ISecurityDataRequest): Authentication.SecurityDataRequest;

        /**
         * Encodes the specified SecurityDataRequest message. Does not implicitly {@link Authentication.SecurityDataRequest.verify|verify} messages.
         * @param message SecurityDataRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.ISecurityDataRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SecurityDataRequest message, length delimited. Does not implicitly {@link Authentication.SecurityDataRequest.verify|verify} messages.
         * @param message SecurityDataRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.ISecurityDataRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SecurityDataRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SecurityDataRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.SecurityDataRequest;

        /**
         * Decodes a SecurityDataRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SecurityDataRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.SecurityDataRequest;

        /**
         * Verifies a SecurityDataRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SecurityDataRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SecurityDataRequest
         */
        public static fromObject(object: { [k: string]: any }): Authentication.SecurityDataRequest;

        /**
         * Creates a plain object from a SecurityDataRequest message. Also converts values to other types if specified.
         * @param message SecurityDataRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.SecurityDataRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SecurityDataRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SecurityReportIncrementalData. */
    interface ISecurityReportIncrementalData {

        /** SecurityReportIncrementalData enterpriseUserId */
        enterpriseUserId?: (number|Long|null);

        /** SecurityReportIncrementalData currentSecurityData */
        currentSecurityData?: (Uint8Array|null);

        /** SecurityReportIncrementalData currentSecurityDataRevision */
        currentSecurityDataRevision?: (number|Long|null);

        /** SecurityReportIncrementalData oldSecurityData */
        oldSecurityData?: (Uint8Array|null);

        /** SecurityReportIncrementalData oldSecurityDataRevision */
        oldSecurityDataRevision?: (number|Long|null);
    }

    /** Represents a SecurityReportIncrementalData. */
    class SecurityReportIncrementalData implements ISecurityReportIncrementalData {

        /**
         * Constructs a new SecurityReportIncrementalData.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.ISecurityReportIncrementalData);

        /** SecurityReportIncrementalData enterpriseUserId. */
        public enterpriseUserId: (number|Long);

        /** SecurityReportIncrementalData currentSecurityData. */
        public currentSecurityData: Uint8Array;

        /** SecurityReportIncrementalData currentSecurityDataRevision. */
        public currentSecurityDataRevision: (number|Long);

        /** SecurityReportIncrementalData oldSecurityData. */
        public oldSecurityData: Uint8Array;

        /** SecurityReportIncrementalData oldSecurityDataRevision. */
        public oldSecurityDataRevision: (number|Long);

        /**
         * Creates a new SecurityReportIncrementalData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SecurityReportIncrementalData instance
         */
        public static create(properties?: Authentication.ISecurityReportIncrementalData): Authentication.SecurityReportIncrementalData;

        /**
         * Encodes the specified SecurityReportIncrementalData message. Does not implicitly {@link Authentication.SecurityReportIncrementalData.verify|verify} messages.
         * @param message SecurityReportIncrementalData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.ISecurityReportIncrementalData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SecurityReportIncrementalData message, length delimited. Does not implicitly {@link Authentication.SecurityReportIncrementalData.verify|verify} messages.
         * @param message SecurityReportIncrementalData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.ISecurityReportIncrementalData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SecurityReportIncrementalData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SecurityReportIncrementalData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.SecurityReportIncrementalData;

        /**
         * Decodes a SecurityReportIncrementalData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SecurityReportIncrementalData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.SecurityReportIncrementalData;

        /**
         * Verifies a SecurityReportIncrementalData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SecurityReportIncrementalData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SecurityReportIncrementalData
         */
        public static fromObject(object: { [k: string]: any }): Authentication.SecurityReportIncrementalData;

        /**
         * Creates a plain object from a SecurityReportIncrementalData message. Also converts values to other types if specified.
         * @param message SecurityReportIncrementalData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.SecurityReportIncrementalData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SecurityReportIncrementalData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SecurityReport. */
    interface ISecurityReport {

        /** SecurityReport enterpriseUserId */
        enterpriseUserId?: (number|Long|null);

        /** SecurityReport encryptedReportData */
        encryptedReportData?: (Uint8Array|null);

        /** SecurityReport revision */
        revision?: (number|Long|null);

        /** SecurityReport twoFactor */
        twoFactor?: (string|null);

        /** SecurityReport lastLogin */
        lastLogin?: (number|Long|null);

        /** SecurityReport numberOfReusedPassword */
        numberOfReusedPassword?: (number|null);

        /** SecurityReport securityReportIncrementalData */
        securityReportIncrementalData?: (Authentication.ISecurityReportIncrementalData[]|null);
    }

    /** Represents a SecurityReport. */
    class SecurityReport implements ISecurityReport {

        /**
         * Constructs a new SecurityReport.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.ISecurityReport);

        /** SecurityReport enterpriseUserId. */
        public enterpriseUserId: (number|Long);

        /** SecurityReport encryptedReportData. */
        public encryptedReportData: Uint8Array;

        /** SecurityReport revision. */
        public revision: (number|Long);

        /** SecurityReport twoFactor. */
        public twoFactor: string;

        /** SecurityReport lastLogin. */
        public lastLogin: (number|Long);

        /** SecurityReport numberOfReusedPassword. */
        public numberOfReusedPassword: number;

        /** SecurityReport securityReportIncrementalData. */
        public securityReportIncrementalData: Authentication.ISecurityReportIncrementalData[];

        /**
         * Creates a new SecurityReport instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SecurityReport instance
         */
        public static create(properties?: Authentication.ISecurityReport): Authentication.SecurityReport;

        /**
         * Encodes the specified SecurityReport message. Does not implicitly {@link Authentication.SecurityReport.verify|verify} messages.
         * @param message SecurityReport message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.ISecurityReport, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SecurityReport message, length delimited. Does not implicitly {@link Authentication.SecurityReport.verify|verify} messages.
         * @param message SecurityReport message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.ISecurityReport, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SecurityReport message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SecurityReport
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.SecurityReport;

        /**
         * Decodes a SecurityReport message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SecurityReport
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.SecurityReport;

        /**
         * Verifies a SecurityReport message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SecurityReport message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SecurityReport
         */
        public static fromObject(object: { [k: string]: any }): Authentication.SecurityReport;

        /**
         * Creates a plain object from a SecurityReport message. Also converts values to other types if specified.
         * @param message SecurityReport
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.SecurityReport, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SecurityReport to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SecurityReportSaveRequest. */
    interface ISecurityReportSaveRequest {

        /** SecurityReportSaveRequest securityReport */
        securityReport?: (Authentication.ISecurityReport[]|null);
    }

    /** Represents a SecurityReportSaveRequest. */
    class SecurityReportSaveRequest implements ISecurityReportSaveRequest {

        /**
         * Constructs a new SecurityReportSaveRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.ISecurityReportSaveRequest);

        /** SecurityReportSaveRequest securityReport. */
        public securityReport: Authentication.ISecurityReport[];

        /**
         * Creates a new SecurityReportSaveRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SecurityReportSaveRequest instance
         */
        public static create(properties?: Authentication.ISecurityReportSaveRequest): Authentication.SecurityReportSaveRequest;

        /**
         * Encodes the specified SecurityReportSaveRequest message. Does not implicitly {@link Authentication.SecurityReportSaveRequest.verify|verify} messages.
         * @param message SecurityReportSaveRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.ISecurityReportSaveRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SecurityReportSaveRequest message, length delimited. Does not implicitly {@link Authentication.SecurityReportSaveRequest.verify|verify} messages.
         * @param message SecurityReportSaveRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.ISecurityReportSaveRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SecurityReportSaveRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SecurityReportSaveRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.SecurityReportSaveRequest;

        /**
         * Decodes a SecurityReportSaveRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SecurityReportSaveRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.SecurityReportSaveRequest;

        /**
         * Verifies a SecurityReportSaveRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SecurityReportSaveRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SecurityReportSaveRequest
         */
        public static fromObject(object: { [k: string]: any }): Authentication.SecurityReportSaveRequest;

        /**
         * Creates a plain object from a SecurityReportSaveRequest message. Also converts values to other types if specified.
         * @param message SecurityReportSaveRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.SecurityReportSaveRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SecurityReportSaveRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SecurityReportRequest. */
    interface ISecurityReportRequest {

        /** SecurityReportRequest fromPage */
        fromPage?: (number|Long|null);
    }

    /** Represents a SecurityReportRequest. */
    class SecurityReportRequest implements ISecurityReportRequest {

        /**
         * Constructs a new SecurityReportRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.ISecurityReportRequest);

        /** SecurityReportRequest fromPage. */
        public fromPage: (number|Long);

        /**
         * Creates a new SecurityReportRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SecurityReportRequest instance
         */
        public static create(properties?: Authentication.ISecurityReportRequest): Authentication.SecurityReportRequest;

        /**
         * Encodes the specified SecurityReportRequest message. Does not implicitly {@link Authentication.SecurityReportRequest.verify|verify} messages.
         * @param message SecurityReportRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.ISecurityReportRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SecurityReportRequest message, length delimited. Does not implicitly {@link Authentication.SecurityReportRequest.verify|verify} messages.
         * @param message SecurityReportRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.ISecurityReportRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SecurityReportRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SecurityReportRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.SecurityReportRequest;

        /**
         * Decodes a SecurityReportRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SecurityReportRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.SecurityReportRequest;

        /**
         * Verifies a SecurityReportRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SecurityReportRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SecurityReportRequest
         */
        public static fromObject(object: { [k: string]: any }): Authentication.SecurityReportRequest;

        /**
         * Creates a plain object from a SecurityReportRequest message. Also converts values to other types if specified.
         * @param message SecurityReportRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.SecurityReportRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SecurityReportRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SecurityReportResponse. */
    interface ISecurityReportResponse {

        /** SecurityReportResponse enterprisePrivateKey */
        enterprisePrivateKey?: (Uint8Array|null);

        /** SecurityReportResponse securityReport */
        securityReport?: (Authentication.ISecurityReport[]|null);

        /** SecurityReportResponse asOfRevision */
        asOfRevision?: (number|Long|null);

        /** SecurityReportResponse fromPage */
        fromPage?: (number|Long|null);

        /** SecurityReportResponse toPage */
        toPage?: (number|Long|null);

        /** SecurityReportResponse complete */
        complete?: (boolean|null);
    }

    /** Represents a SecurityReportResponse. */
    class SecurityReportResponse implements ISecurityReportResponse {

        /**
         * Constructs a new SecurityReportResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.ISecurityReportResponse);

        /** SecurityReportResponse enterprisePrivateKey. */
        public enterprisePrivateKey: Uint8Array;

        /** SecurityReportResponse securityReport. */
        public securityReport: Authentication.ISecurityReport[];

        /** SecurityReportResponse asOfRevision. */
        public asOfRevision: (number|Long);

        /** SecurityReportResponse fromPage. */
        public fromPage: (number|Long);

        /** SecurityReportResponse toPage. */
        public toPage: (number|Long);

        /** SecurityReportResponse complete. */
        public complete: boolean;

        /**
         * Creates a new SecurityReportResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SecurityReportResponse instance
         */
        public static create(properties?: Authentication.ISecurityReportResponse): Authentication.SecurityReportResponse;

        /**
         * Encodes the specified SecurityReportResponse message. Does not implicitly {@link Authentication.SecurityReportResponse.verify|verify} messages.
         * @param message SecurityReportResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.ISecurityReportResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SecurityReportResponse message, length delimited. Does not implicitly {@link Authentication.SecurityReportResponse.verify|verify} messages.
         * @param message SecurityReportResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.ISecurityReportResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SecurityReportResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SecurityReportResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.SecurityReportResponse;

        /**
         * Decodes a SecurityReportResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SecurityReportResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.SecurityReportResponse;

        /**
         * Verifies a SecurityReportResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SecurityReportResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SecurityReportResponse
         */
        public static fromObject(object: { [k: string]: any }): Authentication.SecurityReportResponse;

        /**
         * Creates a plain object from a SecurityReportResponse message. Also converts values to other types if specified.
         * @param message SecurityReportResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.SecurityReportResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SecurityReportResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReusedPasswordsRequest. */
    interface IReusedPasswordsRequest {

        /** ReusedPasswordsRequest count */
        count?: (number|null);
    }

    /** Represents a ReusedPasswordsRequest. */
    class ReusedPasswordsRequest implements IReusedPasswordsRequest {

        /**
         * Constructs a new ReusedPasswordsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.IReusedPasswordsRequest);

        /** ReusedPasswordsRequest count. */
        public count: number;

        /**
         * Creates a new ReusedPasswordsRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReusedPasswordsRequest instance
         */
        public static create(properties?: Authentication.IReusedPasswordsRequest): Authentication.ReusedPasswordsRequest;

        /**
         * Encodes the specified ReusedPasswordsRequest message. Does not implicitly {@link Authentication.ReusedPasswordsRequest.verify|verify} messages.
         * @param message ReusedPasswordsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.IReusedPasswordsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReusedPasswordsRequest message, length delimited. Does not implicitly {@link Authentication.ReusedPasswordsRequest.verify|verify} messages.
         * @param message ReusedPasswordsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.IReusedPasswordsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReusedPasswordsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReusedPasswordsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.ReusedPasswordsRequest;

        /**
         * Decodes a ReusedPasswordsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReusedPasswordsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.ReusedPasswordsRequest;

        /**
         * Verifies a ReusedPasswordsRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReusedPasswordsRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReusedPasswordsRequest
         */
        public static fromObject(object: { [k: string]: any }): Authentication.ReusedPasswordsRequest;

        /**
         * Creates a plain object from a ReusedPasswordsRequest message. Also converts values to other types if specified.
         * @param message ReusedPasswordsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.ReusedPasswordsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReusedPasswordsRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SummaryConsoleReport. */
    interface ISummaryConsoleReport {

        /** SummaryConsoleReport reportType */
        reportType?: (number|null);

        /** SummaryConsoleReport reportData */
        reportData?: (Uint8Array|null);
    }

    /** Represents a SummaryConsoleReport. */
    class SummaryConsoleReport implements ISummaryConsoleReport {

        /**
         * Constructs a new SummaryConsoleReport.
         * @param [properties] Properties to set
         */
        constructor(properties?: Authentication.ISummaryConsoleReport);

        /** SummaryConsoleReport reportType. */
        public reportType: number;

        /** SummaryConsoleReport reportData. */
        public reportData: Uint8Array;

        /**
         * Creates a new SummaryConsoleReport instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SummaryConsoleReport instance
         */
        public static create(properties?: Authentication.ISummaryConsoleReport): Authentication.SummaryConsoleReport;

        /**
         * Encodes the specified SummaryConsoleReport message. Does not implicitly {@link Authentication.SummaryConsoleReport.verify|verify} messages.
         * @param message SummaryConsoleReport message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Authentication.ISummaryConsoleReport, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SummaryConsoleReport message, length delimited. Does not implicitly {@link Authentication.SummaryConsoleReport.verify|verify} messages.
         * @param message SummaryConsoleReport message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Authentication.ISummaryConsoleReport, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SummaryConsoleReport message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SummaryConsoleReport
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Authentication.SummaryConsoleReport;

        /**
         * Decodes a SummaryConsoleReport message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SummaryConsoleReport
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Authentication.SummaryConsoleReport;

        /**
         * Verifies a SummaryConsoleReport message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SummaryConsoleReport message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SummaryConsoleReport
         */
        public static fromObject(object: { [k: string]: any }): Authentication.SummaryConsoleReport;

        /**
         * Creates a plain object from a SummaryConsoleReport message. Also converts values to other types if specified.
         * @param message SummaryConsoleReport
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Authentication.SummaryConsoleReport, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SummaryConsoleReport to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

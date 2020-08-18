/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  Authentication: {
    options: {
      java_package: "com.keepersecurity.proto",
      java_outer_classname: "Authentication"
    },
    nested: {
      SupportedLanguage: {
        values: {
          ENGLISH: 0,
          ARABIC: 1,
          BRITISH: 2,
          CHINESE: 3,
          CHINESE_HONG_KONG: 4,
          CHINESE_TAIWAN: 5,
          DUTCH: 6,
          FRENCH: 7,
          GERMAN: 8,
          GREEK: 9,
          HEBREW: 10,
          ITALIAN: 11,
          JAPANESE: 12,
          KOREAN: 13,
          POLISH: 14,
          PORTUGUESE: 15,
          PORTUGUESE_BRAZIL: 16,
          ROMANIAN: 17,
          RUSSIAN: 18,
          SLOVAK: 19,
          SPANISH: 20
        }
      },
      LoginType: {
        values: {
          NORMAL: 0,
          SSO: 1,
          BIO: 2,
          ALTERNATE: 3,
          OFFLINE: 4
        }
      },
      DeviceStatus: {
        values: {
          DEVICE_NEEDS_APPROVAL: 0,
          DEVICE_OK: 1,
          DEVICE_DISABLED_BY_USER: 2,
          DEVICE_LOCKED_BY_ADMIN: 3
        }
      },
      LicenseStatus: {
        values: {
          OTHER: 0,
          ACTIVE: 1,
          EXPIRED: 2,
          DISABLED: 3
        }
      },
      AccountType: {
        values: {
          CONSUMER: 0,
          FAMILY: 1,
          ENTERPRISE: 2
        }
      },
      SessionTokenType: {
        values: {
          NO_RESTRICTION: 0,
          ACCOUNT_RECOVERY: 1,
          SHARE_ACCOUNT: 2,
          PURCHASE: 3,
          RESTRICT: 4,
          ACCEPT_INVITE: 5,
          SUPPORT_SERVER: 6
        }
      },
      Version: {
        values: {
          invalid_version: 0,
          default_version: 1,
          second_version: 2
        }
      },
      MasterPasswordReentryActionType: {
        values: {
          UNMASK: 0,
          COPY: 1
        }
      },
      ApiRequest: {
        fields: {
          encryptedTransmissionKey: {
            type: "bytes",
            id: 1
          },
          publicKeyId: {
            type: "int32",
            id: 2
          },
          locale: {
            type: "string",
            id: 3
          },
          encryptedPayload: {
            type: "bytes",
            id: 4
          },
          encryptionType: {
            type: "int32",
            id: 5
          },
          recaptcha: {
            type: "string",
            id: 6
          }
        }
      },
      ApiRequestPayload: {
        fields: {
          payload: {
            type: "bytes",
            id: 1
          },
          encryptedSessionToken: {
            type: "bytes",
            id: 2
          },
          timeToken: {
            type: "bytes",
            id: 3
          },
          apiVersion: {
            type: "int32",
            id: 4
          }
        }
      },
      Transform: {
        fields: {
          key: {
            type: "bytes",
            id: 1
          },
          encryptedDeviceToken: {
            type: "bytes",
            id: 2
          }
        }
      },
      DeviceRequest: {
        fields: {
          clientVersion: {
            type: "string",
            id: 1
          },
          deviceName: {
            type: "string",
            id: 2
          }
        }
      },
      AuthRequest: {
        fields: {
          clientVersion: {
            type: "string",
            id: 1
          },
          username: {
            type: "string",
            id: 2
          },
          encryptedDeviceToken: {
            type: "bytes",
            id: 3
          }
        }
      },
      NewUserMinimumParams: {
        fields: {
          minimumIterations: {
            type: "int32",
            id: 1
          },
          passwordMatchRegex: {
            rule: "repeated",
            type: "string",
            id: 2
          },
          passwordMatchDescription: {
            rule: "repeated",
            type: "string",
            id: 3
          },
          isEnterpriseDomain: {
            type: "bool",
            id: 4
          }
        }
      },
      PreLoginRequest: {
        fields: {
          authRequest: {
            type: "AuthRequest",
            id: 1
          },
          loginType: {
            type: "LoginType",
            id: 2
          },
          twoFactorToken: {
            type: "bytes",
            id: 3
          }
        }
      },
      LoginRequest: {
        fields: {
          authRequest: {
            type: "AuthRequest",
            id: 1
          },
          loginType: {
            type: "LoginType",
            id: 2
          },
          authenticationHashPrime: {
            type: "bytes",
            id: 3
          },
          encryptedLoginToken: {
            type: "bytes",
            id: 4
          },
          authResponse: {
            type: "bytes",
            id: 5
          },
          mcEnterpriseId: {
            type: "int32",
            id: 6
          },
          pushToken: {
            type: "string",
            id: 7
          },
          platform: {
            type: "string",
            id: 8
          }
        }
      },
      DeviceResponse: {
        fields: {
          encryptedDeviceToken: {
            type: "bytes",
            id: 1
          },
          status: {
            type: "DeviceStatus",
            id: 2
          }
        }
      },
      Salt: {
        fields: {
          iterations: {
            type: "int32",
            id: 1
          },
          salt: {
            type: "bytes",
            id: 2
          },
          algorithm: {
            type: "int32",
            id: 3
          },
          uid: {
            type: "bytes",
            id: 4
          },
          name: {
            type: "string",
            id: 5
          }
        }
      },
      TwoFactorChannel: {
        fields: {
          type: {
            type: "int32",
            id: 1
          }
        }
      },
      LoginMethod: {
        values: {
          INVALID_LOGINMETHOD: 0,
          EXISTING_ACCOUNT: 1,
          SSO_DOMAIN: 2,
          AFTER_SSO: 3,
          NEW_ACCOUNT: 4
        }
      },
      LoginState: {
        values: {
          INVALID_LOGINSTATE: 0,
          LOGGED_OUT: 1,
          DEVICE_APPROVAL_REQUIRED: 2,
          DEVICE_LOCKED: 3,
          ACCOUNT_LOCKED: 4,
          DEVICE_ACCOUNT_LOCKED: 5,
          UPGRADE: 6,
          LICENSE_EXPIRED: 7,
          REGION_REDIRECT: 8,
          REDIRECT_CLOUD_SSO: 9,
          REDIRECT_ONSITE_SSO: 10,
          REQUIRES_2FA: 12,
          REQUIRES_AUTH_HASH: 13,
          REQUIRES_USERNAME: 14,
          AFTER_CLOUD_SSO_LOGIN: 15,
          REQUIRES_ACCOUNT_CREATION: 16,
          REQUIRES_DEVICE_ENCRYPTED_DATA_KEY: 17,
          LOGIN_TOKEN_EXPIRED: 18,
          LOGGED_IN: 99
        }
      },
      EncryptedDataKeyType: {
        values: {
          NO_KEY: 0,
          BY_DEVICE_PUBLIC_KEY: 1,
          BY_PASSWORD: 2
        }
      },
      StartLoginRequest: {
        fields: {
          encryptedDeviceToken: {
            type: "bytes",
            id: 1
          },
          username: {
            type: "string",
            id: 2
          },
          clientVersion: {
            type: "string",
            id: 3
          },
          messageSessionUid: {
            type: "bytes",
            id: 4
          },
          encryptedLoginToken: {
            type: "bytes",
            id: 5
          },
          loginType: {
            type: "LoginType",
            id: 6
          },
          mcEnterpriseId: {
            type: "int32",
            id: 7
          },
          loginMethod: {
            type: "LoginMethod",
            id: 8
          },
          forceNewLogin: {
            type: "bool",
            id: 9
          },
          cloneCode: {
            type: "bytes",
            id: 10
          }
        }
      },
      LoginResponse: {
        fields: {
          loginState: {
            type: "LoginState",
            id: 1
          },
          accountUid: {
            type: "bytes",
            id: 2
          },
          primaryUsername: {
            type: "string",
            id: 3
          },
          encryptedDataKey: {
            type: "bytes",
            id: 4
          },
          encryptedDataKeyType: {
            type: "EncryptedDataKeyType",
            id: 5
          },
          encryptedLoginToken: {
            type: "bytes",
            id: 6
          },
          encryptedSessionToken: {
            type: "bytes",
            id: 7
          },
          sessionTokenType: {
            type: "SessionTokenType",
            id: 8
          },
          message: {
            type: "string",
            id: 9
          },
          url: {
            type: "string",
            id: 10
          },
          channels: {
            rule: "repeated",
            type: "TwoFactorChannelInfo",
            id: 11
          },
          salt: {
            rule: "repeated",
            type: "Salt",
            id: 12
          },
          cloneCode: {
            type: "bytes",
            id: 13
          },
          stateSpecificValue: {
            type: "string",
            id: 14
          },
          ssoClientVersion: {
            type: "string",
            id: 15
          }
        }
      },
      SsoUserInfo: {
        fields: {
          companyName: {
            type: "string",
            id: 1
          },
          samlRequest: {
            type: "string",
            id: 2
          },
          samlRequestType: {
            type: "string",
            id: 3
          },
          ssoDomainName: {
            type: "string",
            id: 4
          },
          loginUrl: {
            type: "string",
            id: 5
          },
          logoutUrl: {
            type: "string",
            id: 6
          }
        }
      },
      PreLoginResponse: {
        fields: {
          deviceStatus: {
            type: "DeviceStatus",
            id: 1
          },
          salt: {
            rule: "repeated",
            type: "Salt",
            id: 2
          },
          OBSOLETE_FIELD: {
            rule: "repeated",
            type: "TwoFactorChannel",
            id: 3
          },
          ssoUserInfo: {
            type: "SsoUserInfo",
            id: 4
          }
        }
      },
      LoginToMcRequest: {
        fields: {
          mcEnterpriseId: {
            type: "int32",
            id: 1
          }
        }
      },
      LoginToMcResponse: {
        fields: {
          encryptedSessionToken: {
            type: "bytes",
            id: 1
          },
          encryptedTreeKey: {
            type: "string",
            id: 2
          }
        }
      },
      LoginAsUserRequest: {
        fields: {
          username: {
            type: "string",
            id: 1
          }
        }
      },
      LoginAsUserResponse: {
        fields: {
          encryptedSessionToken: {
            type: "bytes",
            id: 1
          },
          encryptedSharedAccountKey: {
            type: "bytes",
            id: 2
          }
        }
      },
      ValidateAuthHashRequest: {
        fields: {
          passwordMethod: {
            type: "PasswordMethod",
            id: 1
          },
          authResponse: {
            type: "bytes",
            id: 2
          },
          encryptedLoginToken: {
            type: "bytes",
            id: 3
          }
        }
      },
      PasswordMethod: {
        values: {
          ENTERED: 0,
          BIOMETRICS: 1
        }
      },
      TwoFactorPushType: {
        values: {
          TWO_FA_PUSH_NONE: 0,
          TWO_FA_PUSH_SMS: 1,
          TWO_FA_PUSH_KEEPER: 2,
          TWO_FA_PUSH_DUO_PUSH: 3,
          TWO_FA_PUSH_DUO_TEXT: 4,
          TWO_FA_PUSH_DUO_CALL: 5,
          TWO_FA_PUSH_DNA: 6
        }
      },
      TwoFactorValueType: {
        values: {
          TWO_FA_CODE_NONE: 0,
          TWO_FA_CODE_TOTP: 1,
          TWO_FA_CODE_SMS: 2,
          TWO_FA_CODE_DUO: 3,
          TWO_FA_CODE_RSA: 4,
          TWO_FA_RESP_U2F: 5,
          TWO_FA_RESP_WEBAUTHN: 6,
          TWO_FA_CODE_DNA: 7
        }
      },
      TwoFactorChannelType: {
        values: {
          TWO_FA_CT_NONE: 0,
          TWO_FA_CT_TOTP: 1,
          TWO_FA_CT_SMS: 2,
          TWO_FA_CT_DUO: 3,
          TWO_FA_CT_RSA: 4,
          TWO_FA_CT_BACKUP: 5,
          TWO_FA_CT_U2F: 6,
          TWO_FA_CT_WEBAUTHN: 7,
          TWO_FA_CT_KEEPER: 8,
          TWO_FA_CT_DNA: 9
        }
      },
      TwoFactorChannelInfo: {
        fields: {
          channelType: {
            type: "TwoFactorChannelType",
            id: 1
          },
          channelUid: {
            type: "bytes",
            id: 2
          },
          channelName: {
            type: "string",
            id: 3
          },
          challenge: {
            type: "string",
            id: 4
          },
          capabilities: {
            rule: "repeated",
            type: "string",
            id: 5
          },
          phoneNumber: {
            type: "string",
            id: 6
          }
        }
      },
      TwoFactorExpiration: {
        values: {
          TWO_FA_EXP_IMMEDIATELY: 0,
          TWO_FA_EXP_5_MINUTES: 1,
          TWO_FA_EXP_12_HOURS: 2,
          TWO_FA_EXP_24_HOURS: 3,
          TWO_FA_EXP_30_DAYS: 4,
          TWO_FA_EXP_NEVER: 5
        }
      },
      TwoFactorValidateRequest: {
        fields: {
          encryptedLoginToken: {
            type: "bytes",
            id: 1
          },
          valueType: {
            type: "TwoFactorValueType",
            id: 2
          },
          value: {
            type: "string",
            id: 3
          },
          channelUid: {
            type: "bytes",
            id: 4
          },
          expireIn: {
            type: "TwoFactorExpiration",
            id: 5
          }
        }
      },
      TwoFactorValidateResponse: {
        fields: {
          encryptedLoginToken: {
            type: "bytes",
            id: 1
          }
        }
      },
      TwoFactorSendPushRequest: {
        fields: {
          encryptedLoginToken: {
            type: "bytes",
            id: 1
          },
          pushType: {
            type: "TwoFactorPushType",
            id: 2
          },
          channelUid: {
            type: "bytes",
            id: 3
          },
          expireIn: {
            type: "TwoFactorExpiration",
            id: 4
          }
        }
      },
      License: {
        fields: {
          created: {
            type: "int64",
            id: 1
          },
          expiration: {
            type: "int64",
            id: 2
          },
          licenseStatus: {
            type: "LicenseStatus",
            id: 3
          },
          paid: {
            type: "bool",
            id: 4
          },
          message: {
            type: "string",
            id: 5
          }
        }
      },
      LicenseType: {
        values: {
          VAULT: 0,
          CHAT: 1,
          STORAGE: 2,
          BREACHWATCH: 3
        }
      },
      OwnerlessRecord: {
        fields: {
          recordUid: {
            type: "bytes",
            id: 1
          },
          recordKey: {
            type: "bytes",
            id: 2
          },
          status: {
            type: "int32",
            id: 3
          }
        }
      },
      OwnerlessRecords: {
        fields: {
          ownerlessRecord: {
            rule: "repeated",
            type: "OwnerlessRecord",
            id: 1
          }
        }
      },
      UserAuthRequest: {
        fields: {
          uid: {
            type: "bytes",
            id: 1
          },
          salt: {
            type: "bytes",
            id: 2
          },
          iterations: {
            type: "int32",
            id: 3
          },
          encryptedClientKey: {
            type: "bytes",
            id: 4
          },
          authHash: {
            type: "bytes",
            id: 5
          },
          encryptedDataKey: {
            type: "bytes",
            id: 6
          },
          loginType: {
            type: "LoginType",
            id: 7
          },
          name: {
            type: "string",
            id: 8
          },
          algorithm: {
            type: "int32",
            id: 9
          }
        }
      },
      UidRequest: {
        fields: {
          uid: {
            rule: "repeated",
            type: "bytes",
            id: 1
          }
        }
      },
      DeviceUpdateRequest: {
        fields: {
          encryptedDeviceToken: {
            type: "bytes",
            id: 1
          },
          clientVersion: {
            type: "string",
            id: 2
          },
          deviceName: {
            type: "string",
            id: 3
          },
          devicePublicKey: {
            type: "bytes",
            id: 4
          },
          deviceStatus: {
            type: "DeviceStatus",
            id: 5
          }
        }
      },
      RegisterDeviceInRegionRequest: {
        fields: {
          encryptedDeviceToken: {
            type: "bytes",
            id: 1
          },
          clientVersion: {
            type: "string",
            id: 2
          },
          deviceName: {
            type: "string",
            id: 3
          },
          devicePublicKey: {
            type: "bytes",
            id: 4
          }
        }
      },
      RegistrationRequest: {
        fields: {
          authRequest: {
            type: "AuthRequest",
            id: 1
          },
          userAuthRequest: {
            type: "UserAuthRequest",
            id: 2
          },
          encryptedClientKey: {
            type: "bytes",
            id: 3
          },
          encryptedPrivateKey: {
            type: "bytes",
            id: 4
          },
          publicKey: {
            type: "bytes",
            id: 5
          },
          verificationCode: {
            type: "string",
            id: 6
          },
          deprecatedAuthHashHash: {
            type: "bytes",
            id: 7
          },
          deprecatedEncryptedClientKey: {
            type: "bytes",
            id: 8
          },
          deprecatedEncryptedPrivateKey: {
            type: "bytes",
            id: 9
          },
          deprecatedEncryptionParams: {
            type: "bytes",
            id: 10
          }
        }
      },
      ConvertUserToV3Request: {
        fields: {
          authRequest: {
            type: "AuthRequest",
            id: 1
          },
          userAuthRequest: {
            type: "UserAuthRequest",
            id: 2
          },
          encryptedClientKey: {
            type: "bytes",
            id: 3
          },
          encryptedPrivateKey: {
            type: "bytes",
            id: 4
          },
          publicKey: {
            type: "bytes",
            id: 5
          }
        }
      },
      RevisionResponse: {
        fields: {
          revision: {
            type: "int64",
            id: 1
          }
        }
      },
      ChangeEmailRequest: {
        fields: {
          newEmail: {
            type: "string",
            id: 1
          }
        }
      },
      ChangeEmailResponse: {
        fields: {
          encryptedChangeEmailToken: {
            type: "bytes",
            id: 1
          }
        }
      },
      EmailVerificationLinkResponse: {
        fields: {
          emailVerified: {
            type: "bool",
            id: 1
          }
        }
      },
      SecurityData: {
        fields: {
          uid: {
            type: "bytes",
            id: 1
          },
          data: {
            type: "bytes",
            id: 2
          }
        }
      },
      SecurityDataRequest: {
        fields: {
          recordSecurityData: {
            rule: "repeated",
            type: "SecurityData",
            id: 1
          },
          masterPasswordSecurityData: {
            rule: "repeated",
            type: "SecurityData",
            id: 2
          }
        }
      },
      SecurityReportIncrementalData: {
        fields: {
          enterpriseUserId: {
            type: "int64",
            id: 1
          },
          currentSecurityData: {
            type: "bytes",
            id: 2
          },
          currentSecurityDataRevision: {
            type: "int64",
            id: 3
          },
          oldSecurityData: {
            type: "bytes",
            id: 4
          },
          oldSecurityDataRevision: {
            type: "int64",
            id: 5
          }
        }
      },
      SecurityReport: {
        fields: {
          enterpriseUserId: {
            type: "int64",
            id: 1
          },
          encryptedReportData: {
            type: "bytes",
            id: 2
          },
          revision: {
            type: "int64",
            id: 3
          },
          twoFactor: {
            type: "string",
            id: 4
          },
          lastLogin: {
            type: "int64",
            id: 5
          },
          numberOfReusedPassword: {
            type: "int32",
            id: 6
          },
          securityReportIncrementalData: {
            rule: "repeated",
            type: "SecurityReportIncrementalData",
            id: 7
          }
        }
      },
      SecurityReportSaveRequest: {
        fields: {
          securityReport: {
            rule: "repeated",
            type: "SecurityReport",
            id: 1
          }
        }
      },
      SecurityReportRequest: {
        fields: {
          fromPage: {
            type: "int64",
            id: 1
          }
        }
      },
      SecurityReportResponse: {
        fields: {
          enterprisePrivateKey: {
            type: "bytes",
            id: 1
          },
          securityReport: {
            rule: "repeated",
            type: "SecurityReport",
            id: 2
          },
          asOfRevision: {
            type: "int64",
            id: 3
          },
          fromPage: {
            type: "int64",
            id: 4
          },
          toPage: {
            type: "int64",
            id: 5
          },
          complete: {
            type: "bool",
            id: 6
          }
        }
      },
      ReusedPasswordsRequest: {
        fields: {
          count: {
            type: "int32",
            id: 1
          }
        }
      },
      SummaryConsoleReport: {
        fields: {
          reportType: {
            type: "int32",
            id: 1
          },
          reportData: {
            type: "bytes",
            id: 2
          }
        }
      },
      ObjectTypes: {
        values: {
          RECORD: 0,
          SHARED_FOLDER_USER: 1,
          SHARED_FOLDER_TEAM: 2,
          USER_FOLDER: 3,
          TEAM_USER: 4
        }
      },
      ChangeToKeyTypeOne: {
        fields: {
          objectType: {
            type: "ObjectTypes",
            id: 1
          },
          primaryUid: {
            type: "bytes",
            id: 2
          },
          secondaryUid: {
            type: "bytes",
            id: 3
          },
          key: {
            type: "bytes",
            id: 4
          }
        }
      },
      ChangeToKeyTypeOneRequest: {
        fields: {
          changeToKeyTypeOne: {
            rule: "repeated",
            type: "ChangeToKeyTypeOne",
            id: 1
          }
        }
      },
      ChangeToKeyTypeOneStatus: {
        fields: {
          uid: {
            type: "bytes",
            id: 1
          },
          type: {
            type: "string",
            id: 2
          },
          status: {
            type: "string",
            id: 3
          },
          reason: {
            type: "string",
            id: 4
          }
        }
      },
      ChangeToKeyTypeOneResponse: {
        fields: {
          changeToKeyTypeOneStatus: {
            rule: "repeated",
            type: "ChangeToKeyTypeOneStatus",
            id: 1
          }
        }
      },
      SetKey: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          key: {
            type: "bytes",
            id: 2
          }
        }
      },
      SetKeyRequest: {
        fields: {
          keys: {
            rule: "repeated",
            type: "SetKey",
            id: 1
          }
        }
      },
      CreateUserRequest: {
        fields: {
          username: {
            type: "string",
            id: 1
          },
          authVerifier: {
            type: "bytes",
            id: 2
          },
          encryptionParams: {
            type: "bytes",
            id: 3
          },
          rsaPublicKey: {
            type: "bytes",
            id: 4
          },
          rsaEncryptedPrivateKey: {
            type: "bytes",
            id: 5
          },
          eccPublicKey: {
            type: "bytes",
            id: 6
          },
          eccEncryptedPrivateKey: {
            type: "bytes",
            id: 7
          },
          encryptedDeviceToken: {
            type: "bytes",
            id: 8
          },
          encryptedClientKey: {
            type: "bytes",
            id: 9
          },
          clientVersion: {
            type: "string",
            id: 10
          },
          encryptedDeviceDataKey: {
            type: "bytes",
            id: 11
          },
          encryptedLoginToken: {
            type: "bytes",
            id: 12
          },
          messageSessionUid: {
            type: "bytes",
            id: 13
          },
          installReferrer: {
            type: "string",
            id: 14
          },
          mccMNC: {
            type: "int32",
            id: 15
          },
          mfg: {
            type: "string",
            id: 16
          },
          model: {
            type: "string",
            id: 17
          },
          brand: {
            type: "string",
            id: 18
          },
          product: {
            type: "string",
            id: 19
          },
          device: {
            type: "string",
            id: 20
          },
          carrier: {
            type: "string",
            id: 21
          },
          verificationCode: {
            type: "string",
            id: 22
          },
          enterpriseRegistration: {
            type: "Enterprise.EnterpriseRegistration",
            id: 23
          }
        }
      },
      NodeEnforcementAddOrUpdateRequest: {
        fields: {
          nodeId: {
            type: "int64",
            id: 1
          },
          enforcement: {
            type: "string",
            id: 2
          },
          value: {
            type: "string",
            id: 3
          }
        }
      },
      NodeEnforcementRemoveRequest: {
        fields: {
          nodeId: {
            type: "int64",
            id: 1
          },
          enforcement: {
            type: "string",
            id: 2
          }
        }
      },
      UserAccounts: {
        fields: {
          accountUid: {
            rule: "repeated",
            type: "bytes",
            id: 1
          }
        }
      },
      ApiRequestByKey: {
        fields: {
          keyId: {
            type: "int32",
            id: 1
          },
          payload: {
            type: "bytes",
            id: 2
          },
          username: {
            type: "string",
            id: 3
          },
          locale: {
            type: "string",
            id: 4
          },
          supportedLanguage: {
            type: "SupportedLanguage",
            id: 5
          },
          type: {
            type: "int32",
            id: 6
          }
        }
      },
      MemcacheRequest: {
        fields: {
          key: {
            type: "string",
            id: 1
          }
        }
      },
      MemcacheResponse: {
        fields: {
          key: {
            type: "string",
            id: 1
          },
          value: {
            type: "string",
            id: 2
          }
        }
      },
      MasterPasswordReentryRequest: {
        fields: {
          pbkdf2Password: {
            type: "string",
            id: 1
          },
          action: {
            type: "MasterPasswordReentryActionType",
            id: 2
          }
        }
      },
      DeviceRegistrationRequest: {
        fields: {
          clientVersion: {
            type: "string",
            id: 1
          },
          deviceName: {
            type: "string",
            id: 2
          },
          devicePublicKey: {
            type: "bytes",
            id: 3
          }
        }
      },
      DeviceVerificationRequest: {
        fields: {
          encryptedDeviceToken: {
            type: "bytes",
            id: 1
          },
          username: {
            type: "string",
            id: 2
          },
          verificationChannel: {
            type: "string",
            id: 3
          },
          messageSessionUid: {
            type: "bytes",
            id: 4
          },
          clientVersion: {
            type: "string",
            id: 5
          }
        }
      },
      DeviceApprovalRequest: {
        fields: {
          email: {
            type: "string",
            id: 1
          },
          twoFactorChannel: {
            type: "string",
            id: 2
          },
          clientVersion: {
            type: "string",
            id: 3
          },
          locale: {
            type: "string",
            id: 4
          },
          encryptedDeviceToken: {
            type: "bytes",
            id: 5
          },
          totpCode: {
            type: "string",
            id: 6
          },
          deviceIp: {
            type: "string",
            id: 7
          },
          deviceTokenExpireDays: {
            type: "string",
            id: 8
          }
        }
      },
      DeviceApprovalResponse: {
        fields: {
          encryptedTwoFactorToken: {
            type: "bytes",
            id: 1
          }
        }
      },
      ApproveDeviceRequest: {
        fields: {
          encryptedDeviceToken: {
            type: "bytes",
            id: 1
          },
          encryptedDeviceDataKey: {
            type: "bytes",
            id: 2
          },
          denyApproval: {
            type: "bool",
            id: 3
          }
        }
      },
      EnterpriseUserAliasRequest: {
        fields: {
          enterpriseUserId: {
            type: "int64",
            id: 1
          },
          alias: {
            type: "string",
            id: 2
          }
        }
      },
      Device: {
        fields: {
          encryptedDeviceToken: {
            type: "bytes",
            id: 1
          }
        }
      },
      RegisterDeviceDataKeyRequest: {
        fields: {
          encryptedDeviceToken: {
            type: "bytes",
            id: 1
          },
          encryptedDeviceDataKey: {
            type: "bytes",
            id: 2
          }
        }
      },
      ValidateCreateUserVerificationCodeRequest: {
        fields: {
          username: {
            type: "string",
            id: 1
          },
          clientVersion: {
            type: "string",
            id: 2
          },
          verificationCode: {
            type: "string",
            id: 3
          },
          messageSessionUid: {
            type: "bytes",
            id: 4
          }
        }
      },
      ValidateDeviceVerificationCodeRequest: {
        fields: {
          username: {
            type: "string",
            id: 1
          },
          clientVersion: {
            type: "string",
            id: 2
          },
          verificationCode: {
            type: "string",
            id: 3
          },
          messageSessionUid: {
            type: "bytes",
            id: 4
          }
        }
      },
      SendSessionMessageRequest: {
        fields: {
          messageSessionUid: {
            type: "bytes",
            id: 1
          },
          command: {
            type: "string",
            id: 2
          },
          username: {
            type: "string",
            id: 3
          }
        }
      },
      GetUserAccountsFromPartialUsernameRequest: {
        fields: {
          partialUsername: {
            type: "string",
            id: 1
          }
        }
      },
      GlobalUserAccount: {
        fields: {
          username: {
            type: "string",
            id: 1
          },
          accountUid: {
            type: "bytes",
            id: 2
          },
          regionName: {
            type: "string",
            id: 3
          }
        }
      },
      GetUserAccountsFromPartialUsernameResponse: {
        fields: {
          globalUserAccount: {
            rule: "repeated",
            type: "GlobalUserAccount",
            id: 1
          }
        }
      },
      SsoServiceProviderRequest: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          clientVersion: {
            type: "string",
            id: 2
          },
          locale: {
            type: "string",
            id: 3
          }
        }
      },
      SsoServiceProviderResponse: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          spUrl: {
            type: "string",
            id: 2
          },
          isCloud: {
            type: "bool",
            id: 3
          },
          clientVersion: {
            type: "string",
            id: 4
          }
        }
      },
      UserSettingRequest: {
        fields: {
          setting: {
            type: "string",
            id: 1
          },
          value: {
            type: "string",
            id: 2
          }
        }
      },
      SupportToolChangeUsernameRequest: {
        fields: {
          username: {
            type: "string",
            id: 1
          },
          newUsername: {
            type: "string",
            id: 2
          }
        }
      },
      UserDataKeyRequest: {
        fields: {
          enterpriseUserId: {
            rule: "repeated",
            type: "int64",
            id: 1
          }
        }
      },
      DataKeyStatus: {
        values: {
          DK_OK: 0,
          DK_DOESNOT_EXIST: 1,
          DK_ACCESS_DENIED: 2
        }
      },
      UserDataKey: {
        fields: {
          enterpriseUserId: {
            type: "int64",
            id: 1
          },
          encryptedDataKey: {
            type: "bytes",
            id: 2
          },
          roleKey: {
            type: "bytes",
            id: 3
          },
          status: {
            type: "DataKeyStatus",
            id: 4
          }
        }
      },
      UserDataKeyResponse: {
        fields: {
          userDataKeys: {
            rule: "repeated",
            type: "UserDataKey",
            id: 1
          }
        }
      }
    }
  },
  Enterprise: {
    options: {
      java_package: "com.keepersecurity.proto",
      java_outer_classname: "Enterprise"
    },
    nested: {
      EnterpriseKeyPairRequest: {
        fields: {
          enterprisePublicKey: {
            type: "bytes",
            id: 1
          },
          encryptedEnterprisePrivateKey: {
            type: "bytes",
            id: 2
          }
        }
      },
      GetTeamMemberRequest: {
        fields: {
          teamUid: {
            type: "bytes",
            id: 1
          }
        }
      },
      EnterpriseUser: {
        fields: {
          enterpriseUserId: {
            type: "int64",
            id: 1
          },
          email: {
            type: "string",
            id: 2
          },
          enterpriseUsername: {
            type: "string",
            id: 3
          }
        }
      },
      GetTeamMemberResponse: {
        fields: {
          enterpriseUser: {
            rule: "repeated",
            type: "EnterpriseUser",
            id: 1
          }
        }
      },
      EnterpriseUserIds: {
        fields: {
          enterpriseUserId: {
            rule: "repeated",
            type: "int64",
            id: 1
          }
        }
      },
      EnterprisePersonalAccount: {
        fields: {
          email: {
            type: "string",
            id: 1
          },
          OBSOLETE_FIELD: {
            type: "bytes",
            id: 2
          }
        }
      },
      EncryptedTeamKeyRequest: {
        fields: {
          teamUid: {
            type: "bytes",
            id: 1
          },
          encryptedTeamKey: {
            type: "bytes",
            id: 2
          },
          force: {
            type: "bool",
            id: 3
          }
        }
      },
      ReEncryptedData: {
        fields: {
          id: {
            type: "int64",
            id: 1
          },
          data: {
            type: "string",
            id: 2
          }
        }
      },
      ReEncryptedRoleKey: {
        fields: {
          roleId: {
            type: "int64",
            id: 1
          },
          encryptedRoleKey: {
            type: "bytes",
            id: 2
          }
        }
      },
      NodeToManagedCompanyRequest: {
        fields: {
          companyId: {
            type: "int32",
            id: 1
          },
          nodes: {
            rule: "repeated",
            type: "ReEncryptedData",
            id: 2
          },
          roles: {
            rule: "repeated",
            type: "ReEncryptedData",
            id: 3
          },
          users: {
            rule: "repeated",
            type: "ReEncryptedData",
            id: 4
          },
          roleKeys: {
            rule: "repeated",
            type: "ReEncryptedRoleKey",
            id: 5
          },
          teamKeys: {
            rule: "repeated",
            type: "EncryptedTeamKeyRequest",
            id: 6
          }
        }
      },
      RoleTeam: {
        fields: {
          roleId: {
            type: "int64",
            id: 1
          },
          teamUid: {
            type: "bytes",
            id: 2
          }
        }
      },
      RoleTeams: {
        fields: {
          roleTeam: {
            rule: "repeated",
            type: "RoleTeam",
            id: 1
          }
        }
      },
      EnterpriseType: {
        values: {
          ENTERPRISE_STANDARD: 0,
          ENTERPRISE_MSP: 1
        }
      },
      EnterpriseRegistration: {
        fields: {
          encryptedTreeKey: {
            type: "bytes",
            id: 1
          },
          enterpriseName: {
            type: "string",
            id: 2
          },
          rootNodeData: {
            type: "bytes",
            id: 3
          },
          adminUserData: {
            type: "bytes",
            id: 4
          },
          adminName: {
            type: "string",
            id: 5
          },
          roleData: {
            type: "bytes",
            id: 6
          },
          rsaKeyPair: {
            type: "EnterpriseKeyPairRequest",
            id: 7
          },
          numberSeats: {
            type: "int32",
            id: 8
          },
          enterpriseType: {
            type: "EnterpriseType",
            id: 9
          },
          rolePublicKey: {
            type: "bytes",
            id: 10
          },
          rolePrivateKeyEncryptedWithRoleKey: {
            type: "bytes",
            id: 11
          },
          roleKeyEncryptedWithTreeKey: {
            type: "bytes",
            id: 12
          }
        }
      },
      DomainPasswordRulesRequest: {
        fields: {
          username: {
            type: "string",
            id: 1
          }
        }
      },
      DomainPasswordRulesFields: {
        fields: {
          type: {
            type: "string",
            id: 1
          },
          minimum: {
            type: "int32",
            id: 2
          },
          maximum: {
            type: "int32",
            id: 3
          },
          allowed: {
            type: "bool",
            id: 4
          }
        }
      },
      DomainPasswordRulesResponse: {
        fields: {
          domainPasswordRulesFields: {
            rule: "repeated",
            type: "DomainPasswordRulesFields",
            id: 1
          }
        }
      },
      ApproveUserDeviceRequest: {
        fields: {
          enterpriseUserId: {
            type: "int64",
            id: 1
          },
          encryptedDeviceToken: {
            type: "bytes",
            id: 2
          },
          encryptedDeviceDataKey: {
            type: "bytes",
            id: 3
          },
          denyApproval: {
            type: "bool",
            id: 4
          }
        }
      },
      ApproveUserDeviceResponse: {
        fields: {
          enterpriseUserId: {
            type: "int64",
            id: 1
          },
          encryptedDeviceToken: {
            type: "bytes",
            id: 2
          },
          failed: {
            type: "bool",
            id: 3
          },
          message: {
            type: "string",
            id: 4
          }
        }
      },
      ApproveUserDevicesRequest: {
        fields: {
          deviceRequests: {
            rule: "repeated",
            type: "ApproveUserDeviceRequest",
            id: 1
          }
        }
      },
      ApproveUserDevicesResponse: {
        fields: {
          deviceResponses: {
            rule: "repeated",
            type: "ApproveUserDeviceResponse",
            id: 1
          }
        }
      }
    }
  },
  AccountSummary: {
    options: {
      java_package: "com.keepersecurity.proto",
      java_outer_classname: "AccountSummary"
    },
    nested: {
      AccountSummaryRequest: {
        fields: {
          summaryVersion: {
            type: "int32",
            id: 1
          }
        }
      },
      AccountSummaryElements: {
        fields: {
          clientKey: {
            type: "bytes",
            id: 1
          },
          settings: {
            type: "Settings",
            id: 2
          },
          keysInfo: {
            type: "KeysInfo",
            id: 3
          },
          syncLogs: {
            rule: "repeated",
            type: "SyncLog",
            id: 4
          },
          isEnterpriseAdmin: {
            type: "bool",
            id: 5
          },
          license: {
            type: "License",
            id: 6
          },
          group: {
            type: "Group",
            id: 7
          },
          Enforcements: {
            type: "Enforcements",
            id: 8
          },
          Images: {
            rule: "repeated",
            type: "KeyValue",
            id: 9
          },
          personalLicense: {
            type: "License",
            id: 10
          },
          fixSharedFolderRecords: {
            type: "bool",
            id: 11
          },
          usernames: {
            rule: "repeated",
            type: "string",
            id: 12
          },
          devices: {
            rule: "repeated",
            type: "DeviceInfo",
            id: 13
          }
        }
      },
      DeviceInfo: {
        fields: {
          encryptedDeviceToken: {
            type: "bytes",
            id: 1
          },
          deviceName: {
            type: "string",
            id: 2
          },
          deviceStatus: {
            type: "Authentication.DeviceStatus",
            id: 3
          },
          devicePublicKey: {
            type: "bytes",
            id: 4
          },
          encryptedDataKey: {
            type: "bytes",
            id: 5
          },
          clientVersion: {
            type: "string",
            id: 6
          },
          username: {
            type: "string",
            id: 7
          },
          ipAddress: {
            type: "string",
            id: 8
          },
          approveRequestTime: {
            type: "int64",
            id: 9
          }
        }
      },
      KeysInfo: {
        fields: {
          encryptionParams: {
            type: "bytes",
            id: 1
          },
          encryptedDataKey: {
            type: "bytes",
            id: 2
          },
          dataKeyBackupDate: {
            type: "double",
            id: 3
          },
          userAuthUid: {
            type: "bytes",
            id: 4
          },
          encryptedPrivateKey: {
            type: "bytes",
            id: 5
          }
        }
      },
      SyncLog: {
        fields: {
          countryName: {
            type: "string",
            id: 1
          },
          secondsAgo: {
            type: "int64",
            id: 2
          },
          deviceName: {
            type: "string",
            id: 3
          },
          countryCode: {
            type: "string",
            id: 4
          },
          deviceUID: {
            type: "bytes",
            id: 5
          },
          ipAddress: {
            type: "string",
            id: 6
          }
        }
      },
      License: {
        fields: {
          subscriptionCode: {
            type: "string",
            id: 1
          },
          productTypeId: {
            type: "int32",
            id: 2
          },
          productTypeName: {
            type: "string",
            id: 3
          },
          expirationDate: {
            type: "string",
            id: 4
          },
          secondsUntilExpiration: {
            type: "int64",
            id: 5
          },
          maxDevices: {
            type: "int32",
            id: 6
          },
          filePlanType: {
            type: "int32",
            id: 7
          },
          bytesUsed: {
            type: "int64",
            id: 8
          },
          bytesTotal: {
            type: "int64",
            id: 9
          },
          secondsUntilStorageExpiration: {
            type: "int64",
            id: 10
          },
          storageExpirationDate: {
            type: "string",
            id: 11
          },
          hasAutoRenewableAppstoreSubscription: {
            type: "bool",
            id: 12
          },
          accountType: {
            type: "int32",
            id: 13
          },
          uploadsRemaining: {
            type: "int32",
            id: 14
          },
          enterpriseId: {
            type: "int32",
            id: 15
          },
          chatEnabled: {
            type: "bool",
            id: 16
          },
          auditAndReportingEnabled: {
            type: "bool",
            id: 17
          },
          breachWatchFeatureDisable: {
            type: "bool",
            id: 18
          },
          accountUid: {
            type: "bytes",
            id: 19
          },
          allowPersonalLicense: {
            type: "bool",
            id: 20
          },
          licensedBy: {
            type: "string",
            id: 21
          },
          email: {
            type: "string",
            id: 22
          },
          breachWatchEnabled: {
            type: "bool",
            id: 23
          },
          breachWatchScanned: {
            type: "bool",
            id: 24
          },
          breachWatchExpiration: {
            type: "int64",
            id: 25
          },
          breachWatchDateCreated: {
            type: "int64",
            id: 26
          },
          error: {
            type: "Result",
            id: 27
          }
        }
      },
      AddOn: {
        fields: {
          licenseKeyId: {
            type: "int32",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          expirationDate: {
            type: "int64",
            id: 3
          },
          createdDate: {
            type: "int64",
            id: 4
          },
          isTrial: {
            type: "bool",
            id: 5
          },
          enabled: {
            type: "bool",
            id: 6
          },
          scanned: {
            type: "bool",
            id: 7
          },
          featureDisable: {
            type: "bool",
            id: 8
          }
        }
      },
      Settings: {
        fields: {
          audit: {
            type: "bool",
            id: 1
          },
          mustPerformAccountShareBy: {
            type: "int64",
            id: 2
          },
          shareAccountTo: {
            rule: "repeated",
            type: "MissingAccountShareKey",
            id: 3
          },
          rules: {
            rule: "repeated",
            type: "PasswordRule",
            id: 4
          },
          passwordRulesIntro: {
            type: "string",
            id: 5
          },
          autoBackupDays: {
            type: "int32",
            id: 6
          },
          theme: {
            type: "string",
            id: 7
          },
          channel: {
            type: "string",
            id: 8
          },
          channelValue: {
            type: "string",
            id: 9
          },
          rsaConfigured: {
            type: "bool",
            id: 10
          },
          emailVerified: {
            type: "bool",
            id: 11
          },
          masterPasswordLastModified: {
            type: "double",
            id: 12
          },
          accountFolderKey: {
            type: "bytes",
            id: 13
          },
          securityKeys: {
            rule: "repeated",
            type: "SecurityKey",
            id: 14
          },
          keyValues: {
            rule: "repeated",
            type: "KeyValue",
            id: 15
          },
          ssoUser: {
            type: "bool",
            id: 16
          },
          onlineAccessOnly: {
            type: "bool",
            id: 17
          },
          masterPasswordExpiry: {
            type: "int32",
            id: 18
          },
          twoFactorRequired: {
            type: "bool",
            id: 19
          },
          disallowExport: {
            type: "bool",
            id: 20
          },
          restrictFiles: {
            type: "bool",
            id: 21
          },
          restrictAllSharing: {
            type: "bool",
            id: 22
          },
          restrictSharing: {
            type: "bool",
            id: 23
          },
          restrictSharingIncomingAll: {
            type: "bool",
            id: 24
          },
          restrictSharingIncomingEnterprise: {
            type: "bool",
            id: 25
          }
        }
      },
      KeyValue: {
        fields: {
          key: {
            type: "string",
            id: 1
          },
          value: {
            type: "string",
            id: 2
          }
        }
      },
      KeyValueBoolean: {
        fields: {
          key: {
            type: "string",
            id: 1
          },
          value: {
            type: "bool",
            id: 2
          }
        }
      },
      KeyValueLong: {
        fields: {
          key: {
            type: "string",
            id: 1
          },
          value: {
            type: "int64",
            id: 2
          }
        }
      },
      Result: {
        fields: {
          resultCode: {
            type: "string",
            id: 1
          },
          message: {
            type: "string",
            id: 2
          },
          result: {
            type: "string",
            id: 3
          }
        }
      },
      Enforcements: {
        fields: {
          strings: {
            rule: "repeated",
            type: "KeyValue",
            id: 1
          },
          booleans: {
            rule: "repeated",
            type: "KeyValueBoolean",
            id: 2
          },
          longs: {
            rule: "repeated",
            type: "KeyValueLong",
            id: 3
          },
          jsons: {
            rule: "repeated",
            type: "KeyValue",
            id: 4
          }
        }
      },
      MissingAccountShareKey: {
        fields: {
          roleId: {
            type: "int64",
            id: 1
          },
          publicKey: {
            type: "bytes",
            id: 2
          }
        }
      },
      PasswordRule: {
        fields: {
          ruleType: {
            type: "string",
            id: 1
          },
          pattern: {
            type: "string",
            id: 2
          },
          match: {
            type: "bool",
            id: 3
          },
          minimum: {
            type: "int32",
            id: 4
          },
          description: {
            type: "string",
            id: 5
          },
          value: {
            type: "string",
            id: 6
          }
        }
      },
      SecurityKey: {
        fields: {
          deviceId: {
            type: "int64",
            id: 1
          },
          deviceName: {
            type: "string",
            id: 2
          },
          dateAdded: {
            type: "int64",
            id: 3
          },
          isValid: {
            type: "bool",
            id: 4
          },
          deviceRegistration: {
            type: "DeviceRegistration",
            id: 5
          }
        }
      },
      DeviceRegistration: {
        fields: {
          keyHandle: {
            type: "string",
            id: 1
          },
          publicKey: {
            type: "bytes",
            id: 2
          },
          attestationCert: {
            type: "string",
            id: 3
          },
          counter: {
            type: "int64",
            id: 4
          },
          compromised: {
            type: "bool",
            id: 5
          }
        }
      },
      Group: {
        fields: {
          admin: {
            type: "bool",
            id: 1
          },
          groupVerificationCode: {
            type: "string",
            id: 2
          },
          groupSettings: {
            rule: "repeated",
            type: "KeyValue",
            id: 3
          },
          administrator: {
            type: "Administrator",
            id: 4
          },
          error: {
            type: "Result",
            id: 5
          },
          twoFactorRequired: {
            type: "bool",
            id: 6
          },
          restrictSharing: {
            type: "bool",
            id: 7
          },
          restrictAllSharing: {
            type: "bool",
            id: 8
          },
          autoBackupDays: {
            type: "int32",
            id: 9
          },
          adminAccountSharing: {
            type: "bool",
            id: 10
          }
        }
      },
      Administrator: {
        fields: {
          firstName: {
            type: "string",
            id: 1
          },
          lastName: {
            type: "string",
            id: 2
          },
          email: {
            type: "string",
            id: 3
          },
          currentNumberOfUsers: {
            type: "int32",
            id: 4
          },
          numberOfUsers: {
            type: "int32",
            id: 5
          },
          numberOfDevices: {
            type: "int32",
            id: 6
          },
          subscriptionCode: {
            type: "string",
            id: 7
          },
          expirationDate: {
            type: "string",
            id: 8
          },
          purchaseDate: {
            type: "string",
            id: 9
          },
          total: {
            type: "string",
            id: 10
          }
        }
      }
    }
  },
  BITokenValidation: {
    options: {
      java_package: "com.keepersecurity.proto",
      java_outer_classname: "BITokenValidation"
    },
    nested: {
      SupportedLanguage: {
        values: {
          ENGLISH: 0,
          ARABIC: 1,
          BRITISH: 2,
          CHINESE: 3,
          CHINESE_HONG_KONG: 4,
          CHINESE_TAIWAN: 5,
          DUTCH: 6,
          FRENCH: 7,
          GERMAN: 8,
          GREEK: 9,
          HEBREW: 10,
          ITALIAN: 11,
          JAPANESE: 12,
          KOREAN: 13,
          POLISH: 14,
          PORTUGUESE: 15,
          PORTUGUESE_BRAZIL: 16,
          ROMANIAN: 17,
          RUSSIAN: 18,
          SLOVAK: 19,
          SPANISH: 20
        }
      },
      SessionTokenType: {
        values: {
          NO_RESTRICTION: 0,
          ACCOUNT_RECOVERY: 1,
          SHARE_ACCOUNT: 2,
          PURCHASE: 3
        }
      },
      LoginType: {
        values: {
          NORMAL: 0,
          SSO: 1,
          BIO: 2,
          ALTERNATE: 3,
          OFFLINE: 4
        }
      },
      BIApiRequest: {
        fields: {
          encryptedTransmissionKey: {
            type: "bytes",
            id: 1
          },
          publicKeyId: {
            type: "int32",
            id: 2
          },
          locale: {
            type: "string",
            id: 3
          },
          encryptedPayload: {
            type: "bytes",
            id: 4
          },
          email: {
            type: "string",
            id: 5
          },
          clientVersion: {
            type: "string",
            id: 6
          },
          sessionToken: {
            type: "string",
            id: 7
          }
        }
      },
      BIApiRequestPayload: {
        fields: {
          payload: {
            type: "bytes",
            id: 1
          },
          encryptedSessionToken: {
            type: "bytes",
            id: 2
          },
          timeToken: {
            type: "bytes",
            id: 3
          },
          apiVersion: {
            type: "int32",
            id: 4
          }
        }
      },
      Transform: {
        fields: {
          key: {
            type: "bytes",
            id: 1
          },
          encryptedDeviceToken: {
            type: "bytes",
            id: 2
          }
        }
      },
      DeviceRequest: {
        fields: {
          clientVersion: {
            type: "string",
            id: 1
          },
          deviceName: {
            type: "string",
            id: 2
          }
        }
      },
      AuthRequest: {
        fields: {
          clientVersion: {
            type: "string",
            id: 1
          },
          username: {
            type: "string",
            id: 2
          },
          encryptedDeviceToken: {
            type: "bytes",
            id: 3
          }
        }
      },
      Salt: {
        fields: {
          iterations: {
            type: "int32",
            id: 1
          },
          salt: {
            type: "bytes",
            id: 2
          },
          algorithm: {
            type: "int32",
            id: 3
          },
          uid: {
            type: "bytes",
            id: 4
          },
          name: {
            type: "string",
            id: 5
          }
        }
      },
      UserAuthRequest: {
        fields: {
          uid: {
            type: "bytes",
            id: 1
          },
          salt: {
            type: "bytes",
            id: 2
          },
          iterations: {
            type: "int32",
            id: 3
          },
          encryptedClientKey: {
            type: "bytes",
            id: 4
          },
          authHash: {
            type: "bytes",
            id: 5
          },
          encryptedDataKey: {
            type: "bytes",
            id: 6
          },
          loginType: {
            type: "LoginType",
            id: 7
          },
          name: {
            type: "string",
            id: 8
          },
          algorithm: {
            type: "int32",
            id: 9
          }
        }
      },
      BIApiDecryptedRequest: {
        fields: {
          decryptedTransmissionKey: {
            type: "bytes",
            id: 1
          },
          bIApiRequestPayload: {
            type: "BITokenValidation.BIApiRequestPayload",
            id: 3
          },
          supportedLanguage: {
            type: "BITokenValidation.SupportedLanguage",
            id: 4
          }
        }
      },
      SessionToken: {
        fields: {
          created: {
            type: "int64",
            id: 1
          },
          expiration: {
            type: "int64",
            id: 2
          },
          ip: {
            type: "string",
            id: 3
          },
          sessionUid: {
            type: "bytes",
            id: 4
          },
          deviceToken: {
            type: "DeviceToken",
            id: 5
          },
          fromUserId: {
            type: "int32",
            id: 6
          },
          forUserId: {
            type: "int32",
            id: 7
          },
          enterpriseUserId: {
            type: "int64",
            id: 8
          },
          clientVersionId: {
            type: "int32",
            id: 9
          },
          sessionTokenType: {
            type: "BITokenValidation.SessionTokenType",
            id: 10
          }
        }
      },
      DeviceToken: {
        fields: {
          deviceId: {
            type: "int64",
            id: 1
          },
          region: {
            type: "int32",
            id: 2
          }
        }
      }
    }
  },
  BreachWatch: {
    options: {
      java_package: "com.keepersecurity.proto",
      java_outer_classname: "BreachWatch"
    },
    nested: {
      BreachWatchInfoType: {
        values: {
          RECORD: 0,
          ALTERNATE_PASSWORD: 1
        }
      },
      BreachWatchRecordRequest: {
        fields: {
          recordUid: {
            type: "bytes",
            id: 1
          },
          encryptedData: {
            type: "bytes",
            id: 2
          },
          breachWatchInfoType: {
            type: "BreachWatchInfoType",
            id: 3
          },
          updateUserWhoScanned: {
            type: "bool",
            id: 4
          }
        }
      },
      BreachWatchUpdateRequest: {
        fields: {
          breachWatchRecordRequest: {
            rule: "repeated",
            type: "BreachWatchRecordRequest",
            id: 1
          },
          encryptedData: {
            type: "bytes",
            id: 2
          }
        }
      },
      BreachWatchRecordStatus: {
        fields: {
          recordUid: {
            type: "bytes",
            id: 1
          },
          status: {
            type: "string",
            id: 2
          },
          reason: {
            type: "string",
            id: 3
          }
        }
      },
      BreachWatchUpdateResponse: {
        fields: {
          breachWatchRecordStatus: {
            rule: "repeated",
            type: "BreachWatchRecordStatus",
            id: 1
          }
        }
      },
      BreachWatchTokenRequest: {
        fields: {
          breachWatchToken: {
            type: "bytes",
            id: 1
          }
        }
      },
      BreachWatchTokenResponse: {
        fields: {
          breachWatchToken: {
            type: "bytes",
            id: 1
          },
          clientEncrypted: {
            type: "bool",
            id: 2
          }
        }
      },
      AnonymizedTokenResponse: {
        fields: {
          domainToken: {
            type: "bytes",
            id: 1
          },
          emailToken: {
            type: "bytes",
            id: 2
          },
          passwordToken: {
            type: "bytes",
            id: 3
          }
        }
      },
      HashCheck: {
        fields: {
          hash1: {
            type: "bytes",
            id: 1
          },
          euid: {
            type: "bytes",
            id: 2
          }
        }
      },
      BreachWatchStatusRequest: {
        fields: {
          anonymizedToken: {
            type: "bytes",
            id: 1
          },
          hashCheck: {
            rule: "repeated",
            type: "HashCheck",
            id: 2
          },
          removedEuid: {
            rule: "repeated",
            type: "bytes",
            id: 3
          }
        }
      },
      HashStatus: {
        fields: {
          hash1: {
            type: "bytes",
            id: 1
          },
          euid: {
            type: "bytes",
            id: 2
          },
          breachDetected: {
            type: "bool",
            id: 3
          }
        }
      },
      BreachWatchStatusResponse: {
        fields: {
          hashStatus: {
            rule: "repeated",
            type: "HashStatus",
            id: 2
          }
        }
      },
      EnterprisePublicKeyResponse: {
        fields: {
          enterprisePublicKey: {
            type: "bytes",
            id: 1
          }
        }
      },
      FreeScanRequest: {
        fields: {
          hashedEmail: {
            type: "bytes",
            id: 1
          }
        }
      },
      FreeScanResponse: {
        fields: {
          emailBreaches: {
            type: "int32",
            id: 1
          },
          passwordBreaches: {
            type: "int32",
            id: 2
          }
        }
      },
      PaidUserRequest: {
        fields: {
          email: {
            type: "string",
            id: 1
          }
        }
      },
      PaidUserResponse: {
        fields: {
          paidUser: {
            type: "bool",
            id: 1
          }
        }
      },
      DetailedScanRequest: {
        fields: {
          email: {
            type: "string",
            id: 1
          }
        }
      },
      UseOneTimeTokenRequest: {
        fields: {
          token: {
            type: "bytes",
            id: 1
          }
        }
      },
      BreachEvent: {
        fields: {
          site: {
            type: "string",
            id: 1
          },
          email: {
            type: "string",
            id: 2
          },
          passwordInBreach: {
            type: "bool",
            id: 3
          },
          date: {
            type: "string",
            id: 4
          },
          description: {
            type: "string",
            id: 5
          }
        }
      },
      UseOneTimeTokenResponse: {
        fields: {
          emailBreaches: {
            type: "int32",
            id: 1
          },
          passwordBreaches: {
            type: "int32",
            id: 2
          },
          breachEvents: {
            rule: "repeated",
            type: "BreachEvent",
            id: 3
          },
          email: {
            type: "string",
            id: 4
          }
        }
      },
      OneTimeUseToken: {
        fields: {
          email: {
            type: "string",
            id: 1
          },
          pad: {
            type: "string",
            id: 2
          }
        }
      },
      FreePasswordScanRequest: {
        fields: {
          hashedPassword: {
            type: "bytes",
            id: 1
          }
        }
      },
      FreePasswordScanResponse: {
        fields: {
          passwordBreaches: {
            type: "int64",
            id: 1
          }
        }
      }
    }
  },
  Tokens: {
    options: {
      java_package: "com.keepersecurity.proto",
      java_outer_classname: "Tokens"
    },
    nested: {
      BreachWatchUpdateRequest: {
        fields: {
          breachWatchRecordRequest: {
            rule: "repeated",
            type: "BreachWatchRecordRequest",
            id: 1
          },
          encryptedData: {
            type: "bytes",
            id: 2
          }
        }
      },
      BreachWatchRecordRequest: {
        fields: {
          recordUid: {
            type: "bytes",
            id: 1
          },
          encryptedData: {
            type: "bytes",
            id: 2
          },
          breachWatchInfoType: {
            type: "BreachWatchInfoType",
            id: 3
          },
          updateUserWhoScanned: {
            type: "bool",
            id: 4
          }
        }
      },
      BreachWatchInfoType: {
        values: {
          RECORD: 0,
          ALTERNATE_PASSWORD: 1
        }
      },
      BreachWatchData: {
        fields: {
          passwords: {
            rule: "repeated",
            type: "BWPassword",
            id: 1
          },
          emails: {
            rule: "repeated",
            type: "BWPassword",
            id: 2
          },
          domains: {
            rule: "repeated",
            type: "BWPassword",
            id: 3
          }
        }
      },
      BWPassword: {
        fields: {
          value: {
            type: "string",
            id: 1
          },
          resolved: {
            type: "uint64",
            id: 2
          },
          status: {
            type: "BWStatus",
            id: 3
          },
          euid: {
            type: "bytes",
            id: 4
          }
        }
      },
      BWStatus: {
        values: {
          GOOD: 0,
          CHANGED: 1,
          WEAK: 2,
          BREACHED: 3,
          IGNORE: 4
        }
      },
      DeviceToken: {
        fields: {
          deviceId: {
            type: "int64",
            id: 1
          },
          region: {
            type: "int32",
            id: 2
          }
        }
      },
      SSOLoginToken: {
        fields: {
          ssoServiceProviderId: {
            type: "int64",
            id: 1
          },
          username: {
            type: "string",
            id: 2
          },
          alias: {
            type: "string",
            id: 3
          },
          displayname: {
            type: "string",
            id: 4
          }
        }
      },
      LoginToken: {
        fields: {
          loginSessionId: {
            type: "int64",
            id: 1
          },
          deviceId: {
            type: "int64",
            id: 2
          },
          accountUid: {
            type: "bytes",
            id: 3
          },
          messageSessionUid: {
            type: "bytes",
            id: 4
          },
          loginState: {
            type: "Authentication.LoginState",
            id: 5
          },
          loginMethod: {
            type: "Authentication.LoginMethod",
            id: 6
          },
          creation: {
            type: "int64",
            id: 7
          },
          userId: {
            type: "int32",
            id: 8
          },
          enterpriseUserId: {
            type: "int64",
            id: 9
          },
          clientVersionId: {
            type: "int32",
            id: 10
          },
          supportedLanguage: {
            type: "Authentication.SupportedLanguage",
            id: 11
          },
          ssoLoginToken: {
            type: "SSOLoginToken",
            id: 12
          },
          username: {
            type: "string",
            id: 13
          }
        }
      },
      DeviceApprovalToken: {
        fields: {
          creation: {
            type: "int64",
            id: 1
          },
          expiration: {
            type: "int64",
            id: 2
          },
          deviceToken: {
            type: "DeviceToken",
            id: 3
          },
          supportedLanguage: {
            type: "Authentication.SupportedLanguage",
            id: 4
          }
        }
      },
      TwoFactorToken: {
        fields: {
          creation: {
            type: "int64",
            id: 1
          },
          expiration: {
            type: "int64",
            id: 2
          },
          deviceToken: {
            type: "DeviceToken",
            id: 3
          },
          deviceIp: {
            type: "string",
            id: 4
          }
        }
      },
      BreachWatchToken: {
        fields: {
          userId: {
            type: "int32",
            id: 1
          },
          domainUid: {
            type: "bytes",
            id: 2
          },
          emailUid: {
            type: "bytes",
            id: 3
          },
          passwordUid: {
            type: "bytes",
            id: 4
          }
        }
      },
      AnonymizedTokenType: {
        values: {
          DAT: 0,
          EAT: 1,
          PAT: 2
        }
      },
      AnonymizedToken: {
        fields: {
          created: {
            type: "int64",
            id: 1
          },
          expiration: {
            type: "int64",
            id: 2
          },
          uid: {
            type: "bytes",
            id: 3
          },
          anonymizedTokenType: {
            type: "AnonymizedTokenType",
            id: 4
          }
        }
      },
      LicenseToken: {
        fields: {
          expiration: {
            type: "int64",
            id: 2
          },
          licenseStatus: {
            type: "Authentication.LicenseStatus",
            id: 3
          }
        }
      },
      AccessType: {
        values: {
          VAULT_RW: 0,
          VAULT_RO: 1,
          ADMIN: 2
        }
      },
      SessionToken: {
        fields: {
          created: {
            type: "int64",
            id: 1
          },
          expiration: {
            type: "int64",
            id: 2
          },
          du1: {
            type: "string",
            id: 3
          },
          messageSessionUid: {
            type: "bytes",
            id: 4
          },
          du8: {
            type: "DeviceToken",
            id: 5
          },
          fromUserId: {
            type: "int32",
            id: 6
          },
          forUserId: {
            type: "int32",
            id: 7
          },
          enterpriseUserId: {
            type: "int64",
            id: 8
          },
          du2: {
            type: "LicenseToken",
            id: 9
          },
          du3: {
            type: "LicenseToken",
            id: 10
          },
          du4: {
            type: "LicenseToken",
            id: 11
          },
          du5: {
            type: "LicenseToken",
            id: 15
          },
          du6: {
            type: "Authentication.AccountType",
            id: 12
          },
          clientVersionId: {
            type: "int32",
            id: 13
          },
          sessionTokenType: {
            type: "Authentication.SessionTokenType",
            id: 14
          },
          mcEnterpriseId: {
            type: "int32",
            id: 16
          },
          du7: {
            type: "bool",
            id: 17
          },
          deviceId: {
            type: "int64",
            id: 18
          },
          loginSessionId: {
            type: "int64",
            id: 19
          }
        }
      },
      UserLicenseStatus: {
        fields: {
          licenseType: {
            type: "Authentication.LicenseType",
            id: 1
          },
          expiration: {
            type: "int64",
            id: 2
          }
        }
      },
      CheckOutTokenResponse: {
        fields: {
          checkOutToken: {
            type: "string",
            id: 1
          }
        }
      },
      ImporterToken: {
        fields: {
          importId: {
            type: "int32",
            id: 1
          },
          userId: {
            type: "int32",
            id: 2
          },
          region: {
            type: "string",
            id: 3
          }
        }
      },
      ApiDecryptedRequest: {
        fields: {
          decryptedTransmissionKey: {
            type: "bytes",
            id: 1
          },
          apiRequestPayload: {
            type: "Authentication.ApiRequestPayload",
            id: 3
          },
          supportedLanguage: {
            type: "Authentication.SupportedLanguage",
            id: 4
          },
          recaptcha: {
            type: "string",
            id: 5
          },
          userAgent: {
            type: "string",
            id: 6
          }
        }
      },
      ChangeEmailToken: {
        fields: {
          userId: {
            type: "int32",
            id: 1
          },
          newEmail: {
            type: "string",
            id: 2
          },
          supportedLanguage: {
            type: "Authentication.SupportedLanguage",
            id: 3
          },
          enterpriseUserId: {
            type: "int64",
            id: 4
          },
          creation: {
            type: "int64",
            id: 5
          }
        }
      },
      EmailVerificationToken: {
        fields: {
          userId: {
            type: "int32",
            id: 1
          },
          email: {
            type: "string",
            id: 2
          },
          du1: {
            type: "string",
            id: 3
          },
          enterpriseUserId: {
            type: "int64",
            id: 4
          },
          du2: {
            type: "int64",
            id: 5
          }
        }
      },
      IpAddressVerificationToken: {
        fields: {
          userId: {
            type: "int32",
            id: 1
          },
          email: {
            type: "string",
            id: 2
          },
          ssoServiceProviderId: {
            type: "int64",
            id: 3
          },
          ipAddress: {
            type: "string",
            id: 4
          },
          du1: {
            type: "string",
            id: 5
          },
          du2: {
            type: "int64",
            id: 6
          },
          enterpriseId: {
            type: "int32",
            id: 7
          },
          deviceId: {
            type: "int64",
            id: 8
          }
        }
      },
      EnterprisePersonalAccountToken: {
        fields: {
          enterpriseUserId: {
            type: "int64",
            id: 1
          },
          email: {
            type: "string",
            id: 2
          },
          supportedLanguage: {
            type: "Authentication.SupportedLanguage",
            id: 3
          },
          duration: {
            type: "int64",
            id: 4
          },
          referralName: {
            type: "string",
            id: 5
          },
          creation: {
            type: "int64",
            id: 6
          }
        }
      },
      UsernameVerificationToken: {
        fields: {
          username: {
            type: "string",
            id: 1
          },
          accountUid: {
            type: "bytes",
            id: 2
          },
          supportedLanguage: {
            type: "Authentication.SupportedLanguage",
            id: 3
          },
          creation: {
            type: "int64",
            id: 4
          }
        }
      },
      DeviceVerificationToken: {
        fields: {
          deviceId: {
            type: "int64",
            id: 1
          },
          username: {
            type: "string",
            id: 2
          },
          accountUid: {
            type: "bytes",
            id: 3
          },
          clientVersion: {
            type: "string",
            id: 4
          },
          supportedLanguage: {
            type: "Authentication.SupportedLanguage",
            id: 5
          },
          creation: {
            type: "int64",
            id: 6
          },
          messageSessionUid: {
            type: "bytes",
            id: 7
          },
          ipAddress: {
            type: "string",
            id: 8
          }
        }
      },
      CreateUserToken: {
        fields: {
          createUserRequestId: {
            type: "int32",
            id: 1
          },
          verificationCode: {
            type: "string",
            id: 2
          },
          requestTimeStamp: {
            type: "int64",
            id: 3
          },
          supportedLanguage: {
            type: "Authentication.SupportedLanguage",
            id: 4
          },
          remoteAddress: {
            type: "string",
            id: 5
          },
          messageSessionUid: {
            type: "bytes",
            id: 6
          },
          deviceId: {
            type: "int64",
            id: 7
          }
        }
      },
      ProcessTokenType: {
        values: {
          CHANGE_EMAIL: 0,
          EMAIL_VERIFICATION: 1,
          IP_ADDRESS_VERIFICATION: 2,
          USERNAME_VERIFICATION: 3,
          DEVICE_VERIFICATION: 4,
          CREATE_ACCOUNT_VERIFICATION: 5,
          REDEEM_PERSONAL_LICENSE: 6
        }
      },
      ProcessToken: {
        fields: {
          processTokenType: {
            type: "ProcessTokenType",
            id: 1
          },
          payload: {
            type: "bytes",
            id: 2
          },
          creation: {
            type: "int64",
            id: 3
          },
          supportedLanguage: {
            type: "Authentication.SupportedLanguage",
            id: 4
          }
        }
      }
    }
  },
  ExternalService: {
    options: {
      java_package: "com.keepersecurity.proto",
      java_outer_classname: "ExternalService"
    },
    nested: {
      SaveSettingsRequest: {
        fields: {
          enterpriseId: {
            type: "int32",
            id: 1
          },
          certificate: {
            type: "bytes",
            id: 2
          },
          password: {
            type: "string",
            id: 3
          },
          directoryUrl: {
            type: "string",
            id: 4
          }
        }
      },
      GetUsersRequest: {
        fields: {
          field: {
            type: "string",
            id: 1
          },
          value: {
            type: "string",
            id: 2
          }
        }
      },
      UserStatus: {
        values: {
          NEW: 0,
          INVITED: 1,
          ACTIVE: 2,
          TAKEN: 3
        }
      },
      LockStatus: {
        values: {
          UNLOCKED: 0,
          LOCKED: 1,
          DISABLED: 2
        }
      },
      User: {
        fields: {
          email: {
            type: "string",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          status: {
            type: "UserStatus",
            id: 3
          },
          lockStatus: {
            type: "LockStatus",
            id: 4
          }
        }
      },
      GetUsersResponse: {
        fields: {
          users: {
            rule: "repeated",
            type: "User",
            id: 1
          }
        }
      }
    }
  },
  Folder: {
    options: {
      java_package: "com.keepersecurity.proto",
      java_outer_classname: "Folder"
    },
    nested: {
      RecordType: {
        values: {
          password: 0
        }
      },
      FolderType: {
        values: {
          default_folder: 0,
          user_folder: 1,
          shared_folder: 2,
          shared_folder_folder: 3
        }
      },
      EncryptedKeyType: {
        values: {
          no_key: 0,
          encrypted_by_data_key: 1,
          encrypted_by_public_key: 2
        }
      },
      EncryptedDataKey: {
        fields: {
          encryptedKey: {
            type: "bytes",
            id: 1
          },
          encryptedKeyType: {
            type: "EncryptedKeyType",
            id: 2
          }
        }
      },
      SharedFolderRecordData: {
        fields: {
          folderUid: {
            type: "bytes",
            id: 1
          },
          recordUid: {
            type: "bytes",
            id: 2
          },
          userId: {
            type: "int32",
            id: 3
          },
          encryptedDataKey: {
            rule: "repeated",
            type: "EncryptedDataKey",
            id: 4
          }
        }
      },
      SharedFolderRecordDataList: {
        fields: {
          sharedFolderRecordData: {
            rule: "repeated",
            type: "SharedFolderRecordData",
            id: 1
          }
        }
      },
      SharedFolderRecordFix: {
        fields: {
          folderUid: {
            type: "bytes",
            id: 1
          },
          recordUid: {
            type: "bytes",
            id: 2
          },
          encryptedRecordFolderKey: {
            type: "bytes",
            id: 3
          }
        }
      },
      SharedFolderRecordFixList: {
        fields: {
          sharedFolderRecordFix: {
            rule: "repeated",
            type: "SharedFolderRecordFix",
            id: 1
          }
        }
      },
      RecordRequest: {
        fields: {
          recordUid: {
            type: "bytes",
            id: 1
          },
          recordType: {
            type: "RecordType",
            id: 2
          },
          recordData: {
            type: "bytes",
            id: 3
          },
          encryptedRecordKey: {
            type: "bytes",
            id: 4
          },
          folderType: {
            type: "FolderType",
            id: 5
          },
          howLongAgo: {
            type: "int64",
            id: 6
          },
          folderUid: {
            type: "bytes",
            id: 7
          },
          encryptedRecordFolderKey: {
            type: "bytes",
            id: 8
          },
          extra: {
            type: "bytes",
            id: 9
          },
          nonSharedData: {
            type: "bytes",
            id: 10
          },
          fileIds: {
            rule: "repeated",
            type: "int64",
            id: 11
          }
        }
      },
      RecordResponse: {
        fields: {
          recordUid: {
            type: "bytes",
            id: 1
          },
          revision: {
            type: "int64",
            id: 2
          },
          status: {
            type: "string",
            id: 3
          }
        }
      },
      SharedFolderFields: {
        fields: {
          encryptedFolderName: {
            type: "bytes",
            id: 1
          },
          manageUsers: {
            type: "bool",
            id: 2
          },
          manageRecords: {
            type: "bool",
            id: 3
          },
          canEdit: {
            type: "bool",
            id: 4
          },
          canShare: {
            type: "bool",
            id: 5
          }
        }
      },
      SharedFolderFolderFields: {
        fields: {
          sharedFolderUid: {
            type: "bytes",
            id: 1
          }
        }
      },
      FolderRequest: {
        fields: {
          folderUid: {
            type: "bytes",
            id: 1
          },
          folderType: {
            type: "FolderType",
            id: 2
          },
          parentFolderUid: {
            type: "bytes",
            id: 3
          },
          folderData: {
            type: "bytes",
            id: 4
          },
          encryptedFolderKey: {
            type: "bytes",
            id: 5
          },
          sharedFolderFields: {
            type: "SharedFolderFields",
            id: 6
          },
          sharedFolderFolderFields: {
            type: "SharedFolderFolderFields",
            id: 7
          }
        }
      },
      FolderResponse: {
        fields: {
          folderUid: {
            type: "bytes",
            id: 1
          },
          revision: {
            type: "int64",
            id: 2
          },
          status: {
            type: "string",
            id: 3
          }
        }
      },
      ImportFolderRecordRequest: {
        fields: {
          folderRequest: {
            rule: "repeated",
            type: "FolderRequest",
            id: 1
          },
          recordRequest: {
            rule: "repeated",
            type: "RecordRequest",
            id: 2
          }
        }
      },
      ImportFolderRecordResponse: {
        fields: {
          folderResponse: {
            rule: "repeated",
            type: "FolderResponse",
            id: 1
          },
          recordResponse: {
            rule: "repeated",
            type: "RecordResponse",
            id: 2
          }
        }
      }
    }
  },
  Push: {
    options: {
      java_package: "com.keepersecurity.proto",
      java_outer_classname: "Push"
    },
    nested: {
      UserRegistrationRequest: {
        fields: {
          messageSessionUid: {
            type: "bytes",
            id: 1
          },
          userId: {
            type: "int32",
            id: 2
          },
          enterpriseId: {
            type: "int32",
            id: 3
          }
        }
      },
      MessageType: {
        values: {
          UNKNOWN: 0,
          DNA: 1,
          SSO: 2,
          CHAT: 3,
          USER: 4,
          ENTERPRISE: 5,
          KEEPER: 6,
          SESSION: 7,
          DEVICE: 8,
          TOTP: 9
        }
      },
      KAToPushServerRequest: {
        fields: {
          messageType: {
            type: "MessageType",
            id: 1
          },
          message: {
            type: "string",
            id: 2
          },
          messageSessionUid: {
            type: "bytes",
            id: 3
          },
          encryptedDeviceToken: {
            rule: "repeated",
            type: "bytes",
            id: 4
          },
          userId: {
            rule: "repeated",
            type: "int32",
            id: 5
          },
          enterpriseId: {
            rule: "repeated",
            type: "int32",
            id: 6
          }
        }
      },
      WssConnectionRequest: {
        fields: {
          messageSessionUid: {
            type: "bytes",
            id: 1
          },
          encryptedDeviceToken: {
            type: "bytes",
            id: 2
          },
          deviceTimeStamp: {
            type: "int64",
            id: 3
          }
        }
      },
      WssClientResponse: {
        fields: {
          messageType: {
            type: "MessageType",
            id: 1
          },
          message: {
            type: "string",
            id: 2
          }
        }
      },
      PushServerDeviceRegistrationRequest: {
        fields: {
          encryptedDeviceToken: {
            type: "bytes",
            id: 1
          },
          pushToken: {
            type: "string",
            id: 2
          },
          mobilePushPlatform: {
            type: "string",
            id: 3
          },
          transmissionKey: {
            type: "bytes",
            id: 4
          }
        }
      },
      SnsMessage: {
        fields: {
          messageType: {
            type: "MessageType",
            id: 1
          },
          message: {
            type: "bytes",
            id: 2
          }
        }
      }
    }
  },
  Records: {
    options: {
      java_package: "com.keepersecurity.proto",
      java_outer_classname: "Records"
    },
    nested: {
      RecordTypeScope: {
        values: {
          RT_STANDARD: 0,
          RT_USER: 1,
          RT_ENTERPRISE: 2
        }
      },
      RecordType: {
        fields: {
          recordTypeId: {
            type: "int32",
            id: 1
          },
          content: {
            type: "string",
            id: 2
          },
          scope: {
            type: "RecordTypeScope",
            id: 3
          }
        }
      },
      RecordTypesRequest: {
        fields: {
          standard: {
            type: "bool",
            id: 1
          },
          user: {
            type: "bool",
            id: 2
          },
          enterprise: {
            type: "bool",
            id: 3
          }
        }
      },
      RecordTypesResponse: {
        fields: {
          recordTypes: {
            rule: "repeated",
            type: "RecordType",
            id: 1
          },
          standardCounter: {
            type: "int32",
            id: 2
          },
          userCounter: {
            type: "int32",
            id: 3
          },
          enterpriseCounter: {
            type: "int32",
            id: 4
          }
        }
      },
      RecordTypeModifyResponse: {
        fields: {
          recordTypeId: {
            type: "int32",
            id: 1
          },
          counter: {
            type: "int32",
            id: 2
          }
        }
      },
      RecordFolderType: {
        values: {
          user_folder: 0,
          shared_folder: 1,
          shared_folder_folder: 2
        }
      },
      RecordLink: {
        fields: {
          recordUid: {
            type: "bytes",
            id: 1
          },
          recordKey: {
            type: "bytes",
            id: 2
          }
        }
      },
      RecordAdd: {
        fields: {
          recordUid: {
            type: "bytes",
            id: 1
          },
          recordKey: {
            type: "bytes",
            id: 2
          },
          clientModifiedTime: {
            type: "int64",
            id: 3
          },
          data: {
            type: "bytes",
            id: 4
          },
          nonSharedData: {
            type: "bytes",
            id: 5
          },
          folderType: {
            type: "RecordFolderType",
            id: 6
          },
          folderUid: {
            type: "bytes",
            id: 7
          },
          folderKey: {
            type: "bytes",
            id: 8
          },
          recordLinks: {
            rule: "repeated",
            type: "RecordLink",
            id: 9
          }
        }
      },
      RecordsAddRequest: {
        fields: {
          records: {
            rule: "repeated",
            type: "RecordAdd",
            id: 1
          },
          clientTime: {
            type: "int64",
            id: 2
          }
        }
      },
      RecordUpdate: {
        fields: {
          recordUid: {
            type: "bytes",
            id: 1
          },
          clientModifiedTime: {
            type: "int64",
            id: 2
          },
          revision: {
            type: "int64",
            id: 3
          },
          data: {
            type: "bytes",
            id: 4
          },
          nonSharedData: {
            type: "bytes",
            id: 5
          },
          recordLinks: {
            rule: "repeated",
            type: "RecordLink",
            id: 6
          }
        }
      },
      RecordsUpdateRequest: {
        fields: {
          records: {
            rule: "repeated",
            type: "RecordUpdate",
            id: 1
          },
          clientTime: {
            type: "int64",
            id: 2
          }
        }
      },
      RecordsRemoveRequest: {
        fields: {
          records: {
            rule: "repeated",
            type: "bytes",
            id: 1
          }
        }
      },
      RecordModifyResult: {
        values: {
          RS_SUCCESS: 0,
          RS_OUT_OF_SYNC: 1,
          RS_ACCESS_DENIED: 2,
          RS_SHARE_DENIED: 3,
          RS_RECORD_EXISTS: 4
        }
      },
      RecordModifyStatus: {
        fields: {
          recordUid: {
            type: "bytes",
            id: 1
          },
          status: {
            type: "RecordModifyResult",
            id: 2
          }
        }
      },
      RecordsModifyResponse: {
        fields: {
          records: {
            rule: "repeated",
            type: "RecordModifyStatus",
            id: 1
          },
          revision: {
            type: "int64",
            id: 2
          }
        }
      },
      File: {
        fields: {
          recordUid: {
            type: "bytes",
            id: 1
          },
          recordKey: {
            type: "bytes",
            id: 2
          },
          data: {
            type: "bytes",
            id: 3
          },
          fileSize: {
            type: "int64",
            id: 4
          },
          thumbSize: {
            type: "int32",
            id: 5
          }
        }
      },
      FilesAddRequest: {
        fields: {
          files: {
            rule: "repeated",
            type: "File",
            id: 1
          },
          clientTime: {
            type: "int64",
            id: 2
          }
        }
      },
      FileAddResult: {
        values: {
          FA_SUCCESS: 0,
          FA_ERROR: 1
        }
      },
      FileAddStatus: {
        fields: {
          recordUid: {
            type: "bytes",
            id: 1
          },
          status: {
            type: "FileAddResult",
            id: 2
          },
          url: {
            type: "string",
            id: 3
          },
          parameters: {
            type: "string",
            id: 4
          },
          thumbnailParameters: {
            type: "string",
            id: 5
          },
          successStatusCode: {
            type: "int32",
            id: 6
          }
        }
      },
      FilesAddResponse: {
        fields: {
          files: {
            rule: "repeated",
            type: "FileAddStatus",
            id: 1
          }
        }
      },
      FilesGetRequest: {
        fields: {
          recordUids: {
            rule: "repeated",
            type: "bytes",
            id: 1
          },
          forThumbnails: {
            type: "bool",
            id: 2
          },
          emergencyAccessAccountOwner: {
            type: "string",
            id: 3
          }
        }
      },
      FileGetResult: {
        values: {
          FG_SUCCESS: 0,
          FG_ERROR: 1,
          FG_ACCESS_DENIED: 2
        }
      },
      FileGetStatus: {
        fields: {
          recordUid: {
            type: "bytes",
            id: 1
          },
          status: {
            type: "FileGetResult",
            id: 2
          },
          url: {
            type: "string",
            id: 3
          },
          successStatusCode: {
            type: "int32",
            id: 4
          }
        }
      },
      FilesGetResponse: {
        fields: {
          files: {
            rule: "repeated",
            type: "FileGetStatus",
            id: 1
          }
        }
      }
    }
  },
  ServiceLogger: {
    options: {
      java_package: "com.keepersecurity.proto",
      java_outer_classname: "ServiceLogger"
    },
    nested: {
      IdRange: {
        fields: {
          startingId: {
            type: "uint64",
            id: 1
          },
          endingId: {
            type: "uint64",
            id: 2
          }
        }
      },
      ServiceInfoSpecifier: {
        fields: {
          all: {
            type: "bool",
            id: 1
          },
          serviceInfoId: {
            type: "uint64",
            id: 2
          },
          name: {
            type: "string",
            id: 3
          }
        }
      },
      ServiceInfoRequest: {
        fields: {
          serviceInfoSpecifier: {
            rule: "repeated",
            type: "ServiceInfoSpecifier",
            id: 1
          }
        }
      },
      ServiceInfoRecord: {
        fields: {
          serviceInfoId: {
            type: "uint64",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          deleteAfter: {
            type: "uint32",
            id: 3
          },
          deleteAfterTimeUnits: {
            type: "string",
            id: 4
          },
          isShortTermLogging: {
            type: "bool",
            id: 5
          }
        }
      },
      ServiceInfoResponse: {
        fields: {
          serviceInfoRecord: {
            rule: "repeated",
            type: "ServiceInfoRecord",
            id: 1
          }
        }
      },
      ServiceInfoUpdateRequest: {
        fields: {
          serviceInfoRecord: {
            rule: "repeated",
            type: "ServiceInfoRecord",
            id: 1
          }
        }
      },
      ServiceRuleSpecifier: {
        fields: {
          all: {
            type: "bool",
            id: 1
          },
          serviceRuleId: {
            type: "uint64",
            id: 2
          },
          serviceInfoId: {
            type: "uint64",
            id: 3
          },
          resourceIdRange: {
            rule: "repeated",
            type: "IdRange",
            id: 4
          }
        }
      },
      ServiceRuleRequest: {
        fields: {
          serviceRuleSpecifier: {
            rule: "repeated",
            type: "ServiceRuleSpecifier",
            id: 1
          }
        }
      },
      ServiceRuleRecord: {
        fields: {
          serviceRuleId: {
            type: "uint64",
            id: 1
          },
          serviceInfoId: {
            type: "uint64",
            id: 2
          },
          resourceId: {
            type: "uint64",
            id: 3
          },
          isLoggingEnabled: {
            type: "bool",
            id: 4
          },
          logLevel: {
            type: "string",
            id: 5
          },
          ruleStart: {
            type: "string",
            id: 6
          },
          ruleEnd: {
            type: "string",
            id: 7
          },
          dateModified: {
            type: "string",
            id: 8
          }
        }
      },
      ServiceRuleResponse: {
        fields: {
          serviceRule: {
            rule: "repeated",
            type: "ServiceRuleRecord",
            id: 1
          }
        }
      },
      ServiceRuleUpdateRequest: {
        fields: {
          serviceRuleRecord: {
            rule: "repeated",
            type: "ServiceRuleRecord",
            id: 1
          }
        }
      },
      ServiceLogSpecifier: {
        fields: {
          all: {
            type: "bool",
            id: 1
          },
          serviceLogId: {
            type: "uint64",
            id: 2
          },
          serviceIdRange: {
            rule: "repeated",
            type: "IdRange",
            id: 3
          },
          resourceIdRange: {
            rule: "repeated",
            type: "IdRange",
            id: 4
          },
          startDateTime: {
            type: "string",
            id: 5
          },
          endDateTime: {
            type: "string",
            id: 6
          }
        }
      },
      ServiceLogGetRequest: {
        fields: {
          serviceLogSpecifier: {
            rule: "repeated",
            type: "ServiceLogSpecifier",
            id: 1
          }
        }
      },
      ServiceLogRecord: {
        fields: {
          serviceLogId: {
            type: "uint64",
            id: 1
          },
          serviceInfoId: {
            type: "uint64",
            id: 2
          },
          resourceId: {
            type: "uint64",
            id: 3
          },
          logger: {
            type: "string",
            id: 4
          },
          logLevel: {
            type: "string",
            id: 5
          },
          message: {
            type: "string",
            id: 6
          },
          exception: {
            type: "string",
            id: 7
          },
          dateCreated: {
            type: "string",
            id: 8
          }
        }
      },
      ServiceLogAddRequest: {
        fields: {
          entry: {
            rule: "repeated",
            type: "ServiceLogRecord",
            id: 1
          }
        }
      },
      ServiceLogResponse: {
        fields: {
          entry: {
            rule: "repeated",
            type: "ServiceLogRecord",
            id: 1
          }
        }
      },
      ServiceLogClearRequest: {
        fields: {
          useDefaults: {
            type: "bool",
            id: 1
          },
          serviceTypeId: {
            type: "uint64",
            id: 2
          },
          daysOld: {
            type: "uint32",
            id: 3
          },
          hoursOld: {
            type: "uint32",
            id: 4
          },
          resourceIdRange: {
            rule: "repeated",
            type: "IdRange",
            id: 5
          }
        }
      },
      ServiceLogClearResponse: {
        fields: {
          serviceTypeId: {
            type: "uint64",
            id: 1
          },
          serviceName: {
            type: "string",
            id: 2
          },
          resourceIdRange: {
            rule: "repeated",
            type: "IdRange",
            id: 3
          },
          numDeleted: {
            type: "uint32",
            id: 4
          },
          numRemaining: {
            type: "uint32",
            id: 5
          }
        }
      }
    }
  },
  SsoCloud: {
    options: {
      java_package: "com.keepersecurity.proto",
      java_outer_classname: "SsoCloud"
    },
    nested: {
      AuthProtocolType: {
        values: {
          SAML2: 0
        }
      },
      DataType: {
        values: {
          ANY: 0,
          BOOLEAN: 1,
          INTEGER: 2,
          STRING: 3,
          BYTES: 4,
          URL: 5,
          com_keepersecurity_proto_SsoCloud_DataType: 6,
          com_keepersecurity_proto_SsoCloud_AuthProtocolType: 7,
          com_keepersecurity_proto_SsoCloud_SsoIdpType: 8
        }
      },
      SsoCloudSettingOperationType: {
        values: {
          SET: 0,
          GET: 1,
          DELETE: 2,
          RESET_TO_DEFAULT: 3
        }
      },
      SsoIdpType: {
        values: {
          XX_UNUSED: 0,
          GENERIC: 1,
          F5: 2,
          GOOGLE: 3,
          OKTA: 4,
          ADFS: 5,
          AZURE: 6,
          ONELOGIN: 7
        }
      },
      SsoCloudSettingValue: {
        fields: {
          settingId: {
            type: "uint64",
            id: 1
          },
          settingName: {
            type: "string",
            id: 2
          },
          label: {
            type: "string",
            id: 3
          },
          value: {
            type: "string",
            id: 4
          },
          valueType: {
            type: "DataType",
            id: 5
          },
          lastModified: {
            type: "string",
            id: 7
          },
          isFromFile: {
            type: "bool",
            id: 8
          },
          isEditable: {
            type: "bool",
            id: 9
          },
          isRequired: {
            type: "bool",
            id: 10
          }
        }
      },
      SsoCloudSettingAction: {
        fields: {
          settingId: {
            type: "uint64",
            id: 1
          },
          settingName: {
            type: "string",
            id: 2
          },
          operation: {
            type: "SsoCloudSettingOperationType",
            id: 3
          },
          value: {
            type: "string",
            id: 4
          }
        }
      },
      SsoCloudConfigurationRequest: {
        fields: {
          ssoServiceProviderId: {
            type: "uint64",
            id: 1
          },
          ssoSpConfigurationId: {
            type: "uint64",
            id: 2
          },
          name: {
            type: "string",
            id: 3
          },
          ssoAuthProtocolType: {
            type: "AuthProtocolType",
            id: 4
          },
          ssoCloudSettingAction: {
            rule: "repeated",
            type: "SsoCloudSettingAction",
            id: 5
          }
        }
      },
      SsoCloudConfigurationResponse: {
        fields: {
          ssoServiceProviderId: {
            type: "uint64",
            id: 1
          },
          ssoSpConfigurationId: {
            type: "uint64",
            id: 2
          },
          enterpriseId: {
            type: "uint64",
            id: 3
          },
          name: {
            type: "string",
            id: 4
          },
          protocol: {
            type: "string",
            id: 5
          },
          lastModified: {
            type: "string",
            id: 6
          },
          ssoCloudSettingValue: {
            rule: "repeated",
            type: "SsoCloudSettingValue",
            id: 7
          }
        }
      },
      SsoIdpTypeRequest: {
        fields: {
          ssoIdpTypeId: {
            type: "uint32",
            id: 1
          },
          tag: {
            type: "string",
            id: 2
          },
          label: {
            type: "string",
            id: 3
          }
        }
      },
      SsoIdpTypeResponse: {
        fields: {
          ssoIdpTypeId: {
            type: "int32",
            id: 1
          },
          tag: {
            type: "int32",
            id: 2
          },
          label: {
            type: "int32",
            id: 3
          }
        }
      },
      SsoCloudSAMLLogRequest: {
        fields: {
          ssoServiceProviderId: {
            type: "uint64",
            id: 1
          }
        }
      },
      SsoCloudSAMLLogEntry: {
        fields: {
          serverTime: {
            type: "string",
            id: 1
          },
          direction: {
            type: "string",
            id: 2
          },
          messageType: {
            type: "string",
            id: 3
          },
          messageIssued: {
            type: "string",
            id: 4
          },
          fromEntityId: {
            type: "string",
            id: 5
          },
          samlStatus: {
            type: "string",
            id: 6
          },
          relayState: {
            type: "string",
            id: 7
          },
          samlContent: {
            type: "string",
            id: 8
          },
          isSigned: {
            type: "bool",
            id: 9
          },
          isOK: {
            type: "bool",
            id: 10
          }
        }
      },
      SsoCloudSAMLLogResponse: {
        fields: {
          ssoServiceProviderId: {
            type: "uint64",
            id: 1
          },
          entry: {
            rule: "repeated",
            type: "SsoCloudSAMLLogEntry",
            id: 2
          }
        }
      },
      SsoCloudServiceProviderUpdateRequest: {
        fields: {
          ssoServiceProviderId: {
            type: "uint64",
            id: 1
          },
          ssoSpConfigurationId: {
            type: "uint64",
            id: 2
          }
        }
      },
      SsoCloudIdpMetadataRequest: {
        fields: {
          ssoSpConfigurationId: {
            type: "uint64",
            id: 1
          },
          filename: {
            type: "string",
            id: 2
          },
          content: {
            type: "bytes",
            id: 3
          }
        }
      },
      SsoCloudConfigurationValidationRequest: {
        fields: {
          ssoSpConfigurationId: {
            rule: "repeated",
            type: "uint64",
            id: 1
          }
        }
      },
      ValidationContent: {
        fields: {
          ssoSpConfigurationId: {
            type: "uint64",
            id: 1
          },
          isSuccessful: {
            type: "bool",
            id: 2
          },
          errorMessage: {
            rule: "repeated",
            type: "string",
            id: 3
          }
        }
      },
      SsoCloudConfigurationValidationResponse: {
        fields: {
          validationContent: {
            rule: "repeated",
            type: "ValidationContent",
            id: 1
          }
        }
      },
      SsoCloudServiceProviderConfigurationListRequest: {
        fields: {
          ssoServiceProviderId: {
            type: "uint64",
            id: 1
          }
        }
      },
      ConfigurationListItem: {
        fields: {
          ssoSpConfigurationId: {
            type: "uint64",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          isSelected: {
            type: "bool",
            id: 3
          }
        }
      },
      SsoCloudServiceProviderConfigurationListResponse: {
        fields: {
          configurationItem: {
            rule: "repeated",
            type: "ConfigurationListItem",
            id: 1
          }
        }
      },
      SsoCloudRequest: {
        fields: {
          messageSessionUid: {
            type: "bytes",
            id: 1
          },
          clientVersion: {
            type: "string",
            id: 2
          },
          embedded: {
            type: "bool",
            id: 3
          },
          json: {
            type: "bool",
            id: 4
          },
          dest: {
            type: "string",
            id: 5
          },
          idpSessionId: {
            type: "string",
            id: 6
          },
          forceLogin: {
            type: "bool",
            id: 7
          },
          username: {
            type: "string",
            id: 8
          }
        }
      },
      SsoCloudResponse: {
        fields: {
          command: {
            type: "string",
            id: 1
          },
          messageSessionUid: {
            type: "bytes",
            id: 2
          },
          email: {
            type: "string",
            id: 3
          },
          encryptedLoginToken: {
            type: "bytes",
            id: 4
          },
          providerName: {
            type: "string",
            id: 5
          },
          idpSessionId: {
            type: "string",
            id: 6
          },
          encryptedSessionToken: {
            type: "bytes",
            id: 7
          },
          errorToken: {
            type: "string",
            id: 8
          }
        }
      },
      SamlRelayState: {
        fields: {
          messageSessionUid: {
            type: "bytes",
            id: 1
          },
          username: {
            type: "string",
            id: 2
          },
          embedded: {
            type: "bool",
            id: 3
          },
          json: {
            type: "bool",
            id: 4
          },
          destId: {
            type: "uint32",
            id: 5
          },
          keyId: {
            type: "int32",
            id: 6
          },
          supportedLanguage: {
            type: "Authentication.SupportedLanguage",
            id: 7
          },
          checksum: {
            type: "uint64",
            id: 8
          },
          isGeneratedUid: {
            type: "bool",
            id: 9
          }
        }
      }
    }
  },
  Upsell: {
    options: {
      java_package: "com.keepersecurity.proto",
      java_outer_classname: "Upsell"
    },
    nested: {
      UpsellRequest: {
        fields: {
          email: {
            type: "string",
            id: 1
          },
          locale: {
            type: "string",
            id: 2
          },
          clientVersion: {
            type: "string",
            id: 3
          },
          sessionToken: {
            type: "string",
            id: 4
          }
        }
      },
      UpsellResponse: {
        fields: {
          UpsellBanner: {
            rule: "repeated",
            type: "UpsellBanner",
            id: 1
          }
        }
      },
      UpsellBanner: {
        fields: {
          bannerId: {
            type: "int32",
            id: 1
          },
          bannerOkAction: {
            type: "string",
            id: 2
          },
          bannerOkButton: {
            type: "string",
            id: 3
          },
          bannerCancelAction: {
            type: "string",
            id: 4
          },
          bannerCancelButton: {
            type: "string",
            id: 5
          },
          bannerMessage: {
            type: "string",
            id: 6
          },
          locale: {
            type: "string",
            id: 7
          }
        }
      },
      ClientType: {
        values: {
          DEFAULT_CLIENT_TYPE: 0,
          ALL: 1,
          ANDROID: 2,
          IOS: 3,
          MICROSOFT: 4,
          WEBAPP: 5
        }
      },
      ClientVersion: {
        values: {
          DEFAULT_VERSION: 0,
          SUPPORTS_ALL: 1,
          BASEVERSION: 14,
          ABOVERANGE: 15
        }
      }
    }
  }
});

module.exports = $root;

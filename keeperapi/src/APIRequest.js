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
          NEED_APPROVAL: 0,
          OK: 1,
          DEVICE_DISABLED: 2
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
          ACCEPT_INVITE: 5
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
          randomHashKey: {
            type: "bytes",
            id: 4
          },
          encryptedTwoFactorToken: {
            type: "bytes",
            id: 5
          },
          encryptedBreachWatchToken: {
            type: "bytes",
            id: 6
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
      PreLoginResponse: {
        fields: {
          status: {
            type: "DeviceStatus",
            id: 1
          },
          salt: {
            rule: "repeated",
            type: "Salt",
            id: 2
          },
          twoFactorChannel: {
            rule: "repeated",
            type: "TwoFactorChannel",
            id: 3
          }
        }
      },
      LoginResponse: {
        fields: {
          encryrptedSessionToken: {
            type: "bytes",
            id: 1
          },
          vault: {
            type: "License",
            id: 2
          },
          chat: {
            type: "License",
            id: 3
          },
          storage: {
            type: "License",
            id: 4
          },
          breachWatch: {
            type: "License",
            id: 5
          },
          accountType: {
            type: "AccountType",
            id: 6
          },
          encryptedDAT: {
            type: "bytes",
            id: 7
          },
          encryptedPAT: {
            type: "bytes",
            id: 8
          },
          encryptedEAT: {
            type: "bytes",
            id: 9
          },
          encryptedDataKey: {
            type: "bytes",
            id: 10
          },
          sessionTokenType: {
            rule: "repeated",
            type: "SessionTokenType",
            id: 11
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
      DeviceClientVersionUpdateRequest: {
        fields: {
          encryptedDeviceToken: {
            type: "bytes",
            id: 1
          },
          clientVersion: {
            type: "string",
            id: 2
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
      }
    }
  }
});

module.exports = $root;

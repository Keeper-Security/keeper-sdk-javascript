export { SdkDefaults, AuthDefaults, ResultCodes, KEEPER_PUBLIC_HOSTS } from './constants'
export { Logger, ConsoleLogger, LogLevel, logger, setLogger, getLogger, resetLogger } from './Logger'
export type { ILogger } from './Logger'
export { KeeperSdkError, isKeeperError, extractErrorMessage, extractResultCode } from './errors'
export type { Nullable, Optional, DeepPartial, Immutable } from './types'
export { isBoolean, isString, isNonEmptyString, isNumber, isObject, anyIsBoolean } from './guards'
export {
    EMAIL_PATTERN,
    EMAIL_LIST_SEPARATOR_PATTERN,
    REGEX_ESCAPE_PATTERN,
    TRAILING_EQUALS_PATTERN,
    WHITESPACE_PATTERN,
    isValidEmail,
    escapeRegExp,
} from './patterns'

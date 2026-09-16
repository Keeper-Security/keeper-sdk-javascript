export const PAM_ACTION_ROTATE = 'rotate' as const
export const PAM_ACTION_ROTATE_TIMEOUT = 15_000

export const PAM_ACTION_DEFAULT_PASSWORD_COMPLEXITY = {
    length: 20,
    caps: 1,
    lowercase: 1,
    digits: 1,
    special: 1,
} as const

export const PAM_ACTION_ROTATE_RECORD_TYPE = 'pamUser' as const

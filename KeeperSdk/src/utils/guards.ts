export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean'
}

export function isString(value: unknown): value is string {
    return typeof value === 'string'
}

export function isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.trim().length > 0
}

export function isNumber(value: unknown): value is number {
    return typeof value === 'number' && Number.isFinite(value)
}

export function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** True if at least one of the values is a boolean (true or false). */
export function anyIsBoolean(...values: unknown[]): boolean {
    return values.some(isBoolean)
}

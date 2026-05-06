/** A value of type T or null. Use this for caches and computed-but-empty results. */
export type Nullable<T> = T | null

/** A value of type T or undefined. Use this for "not provided" inputs. */
export type Optional<T> = T | undefined

/** Recursively makes every property optional. */
export type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T

/** Helper to mark properties as readonly. */
export type Immutable<T> = { readonly [K in keyof T]: T[K] }

import { connectSdkPlatform } from './platform'
import { browserSdkPlatform } from './platform/browser/platform'

connectSdkPlatform(browserSdkPlatform)

export * from './api'
/** Nested Share Folder / Keeper Drive APIs (also on Node `index.ts`). */
export * from './nestedShareFolders'

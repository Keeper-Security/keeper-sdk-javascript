import { connectSdkPlatform } from './platform'
import { installRequestRetry } from './platform/requestRetry'
import { browserSdkPlatform } from './platform/browser/platform'

connectSdkPlatform(browserSdkPlatform)
installRequestRetry()

export * from './api'
export * from './nestedShareFolders'

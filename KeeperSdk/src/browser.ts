import { connectSdkPlatform } from './platform'
import { browserSdkPlatform } from './platform/browser/platform'

connectSdkPlatform(browserSdkPlatform)

export * from './api'

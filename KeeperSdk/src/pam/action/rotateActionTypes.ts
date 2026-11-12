import type { PAM, Router } from '@keeper-security/keeperapi'

export type PamActionRotateInput = {
    recordUid?: string
    folder?: string
    dryRun?: boolean
    recursive?: boolean
    selfDestruct?: string
    emailConfig?: string
    sendEmail?: string
    emailMessage?: string
    timeout?: number
}

export type PamActionRotateStatus = 'submitted' | 'dry-run' | 'skipped' | 'failed'

export type PamActionRotateRecordResult = {
    recordUid: string
    status: PamActionRotateStatus
    conversationId?: string
    gatewayUid?: string
    response?: unknown
    message?: string
}

export type PamActionRotateResult = {
    dryRun: boolean
    records: PamActionRotateRecordResult[]
    warnings: string[]
}

export type PamActionRotateOptions = PamActionRotateInput

export type PamActionRotateLiveInfo = Router.IRouterRotationInfo
export type PamActionRotateControllerResponse = PAM.IControllerResponse

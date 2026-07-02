import type { Auth, KeeperResponse } from '@keeper-security/keeperapi'
import { KeeperSdkError } from '../utils'
import { AuditReportOrder } from './reportTypes'

export type AuthProvider = () => Auth

export function resolveTimezone(timezone: string | undefined): string {
    if (timezone?.trim()) return timezone.trim()
    const hours = -new Date().getTimezoneOffset() / 60
    return `Etc/GMT${hours >= 0 ? '+' : ''}${hours}`
}

export function assertSucceeded(
    response: KeeperResponse,
    fallbackMessage: string,
    fallbackCode: string
): void {
    if ((response.result || '').toLowerCase() === 'fail') {
        throw new KeeperSdkError(
            response.message || response.result_code || fallbackMessage,
            response.result_code || fallbackCode
        )
    }
}

export function toAuditApiOrder(order: AuditReportOrder): 'ascending' | 'descending' {
    return order === AuditReportOrder.Asc ? 'ascending' : 'descending'
}

export function chunkArray<T>(values: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let index = 0; index < values.length; index += size) {
        chunks.push(values.slice(index, index + size))
    }
    return chunks
}

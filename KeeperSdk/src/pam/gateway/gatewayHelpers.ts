import type { Auth, DRecord, PAM } from '@keeper-security/keeperapi'
import { getControllers, getKeeperRouterUrl, webSafe64FromBytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { getRecordTitle } from '../../records/RecordUtils'
import { KEEPER_PUBLIC_HOSTS, KeeperSdkError, ResultCodes, extractErrorMessage } from '../../utils'
import {
    APP_NOT_ACCESSIBLE_LABEL,
    ROUTER_CONNECTION_ERROR_CODES,
    SUPPORTED_KSM_APP_RECORD_VERSIONS,
    type RouterConnectionErrorCode,
} from './gatewayConstants'
import type {
    GatewayVersionParts,
    KsmApplicationDisplayInfo,
    NetworkErrorLike,
    ResolvedKsmApplication,
} from './gatewayTypes'

export function getKeeperRouterBaseUrl(host: string): string {
    return getKeeperRouterUrl(host, '').replace(/\/$/, '')
}

export function webSafeUidFromBytes(bytes: Uint8Array | null | undefined): string {
    if (!bytes || bytes.length === 0) return ''
    return webSafe64FromBytes(bytes)
}

export function controllerUidsEqual(a: Uint8Array | null | undefined, b: Uint8Array | null | undefined): boolean {
    if (!a || !b || a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false
    }
    return true
}

export function toFiniteNumber(value: unknown): number {
    if (value == null) return 0
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
}

export function formatTimestampMs(value: unknown): string {
    const ms = toFiniteNumber(value)
    if (!ms) return ''
    const date = new Date(ms)
    if (Number.isNaN(date.getTime())) return ''
    const pad = (n: number): string => String(n).padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
        date.getMinutes()
    )}:${pad(date.getSeconds())}`
}

export function parseGatewayVersionString(version: string | null | undefined): GatewayVersionParts {
    if (!version) {
        return { gatewayVersion: '', os: '', osRelease: '', machineType: '', osVersion: '' }
    }
    const parts = version.split(';')
    return {
        gatewayVersion: parts[0] || version,
        os: parts[1] || '',
        osRelease: parts[2] || '',
        machineType: parts[3] || '',
        osVersion: parts[4] || '',
    }
}

function isSupportedKsmAppRecordVersion(version: number): boolean {
    return (SUPPORTED_KSM_APP_RECORD_VERSIONS as readonly number[]).includes(version)
}

function isKsmApplicationRecord(record: DRecord): boolean {
    // Version gate keeps us aligned with known Keeper app-record formats; type==='app' is the semantic check.
    if (!isSupportedKsmAppRecordVersion(record.version)) return false
    const data: unknown = record.data
    if (!data || typeof data !== 'object') return false
    return (data as { type?: unknown }).type === 'app'
}

export function getKsmApplicationDisplayInfo(
    storage: InMemoryStorage,
    applicationUid: string
): KsmApplicationDisplayInfo {
    if (!applicationUid) {
        return {
            name: null,
            accessible: false,
            display: `${APP_NOT_ACCESSIBLE_LABEL} ()`,
        }
    }

    const byUid = storage.getByUid<DRecord>(VaultObjectKind.Record, applicationUid)
    if (byUid) {
        const title = getRecordTitle(byUid)
        const name = title && title !== '(untitled)' && title !== '(no data)' ? title : applicationUid
        return {
            name,
            accessible: true,
            display: `${name} (${applicationUid})`,
        }
    }

    return {
        name: null,
        accessible: false,
        display: `${APP_NOT_ACCESSIBLE_LABEL} (${applicationUid})`,
    }
}

async function requireRecordKey(storage: InMemoryStorage, record: DRecord, label: string): Promise<Uint8Array> {
    const recordKey = await storage.getKeyBytes(record.uid)
    if (!recordKey) {
        throw new KeeperSdkError(
            `KSM application "${label}" key is not available. Sync the vault and try again.`,
            ResultCodes.PAM_KSM_APP_NOT_FOUND
        )
    }
    return recordKey
}

export async function resolveKsmApplication(
    storage: InMemoryStorage,
    applicationNameOrUid: string
): Promise<ResolvedKsmApplication> {
    const trimmed = applicationNameOrUid.trim()
    if (!trimmed) {
        throw new KeeperSdkError('KSM application name or UID is required.', ResultCodes.PAM_KSM_APP_REQUIRED)
    }

    const byUid = storage.getByUid<DRecord>(VaultObjectKind.Record, trimmed)
    if (byUid && isKsmApplicationRecord(byUid)) {
        return {
            uid: byUid.uid,
            title: getRecordTitle(byUid),
            record: byUid,
            recordKey: await requireRecordKey(storage, byUid, trimmed),
        }
    }

    const lower = trimmed.toLowerCase()
    const matches = storage
        .getRecords()
        .filter((record) => isKsmApplicationRecord(record) && getRecordTitle(record).toLowerCase() === lower)

    if (matches.length === 0) {
        throw new KeeperSdkError(
            `KSM Application "${trimmed}" not found. Run sync and verify the application exists in your vault.`,
            ResultCodes.PAM_KSM_APP_NOT_FOUND
        )
    }
    if (matches.length > 1) {
        throw new KeeperSdkError(
            `Multiple KSM applications named "${trimmed}". Use the application UID instead.`,
            ResultCodes.PAM_MULTIPLE_KSM_APP_MATCHES
        )
    }

    const record = matches[0]
    return {
        uid: record.uid,
        title: getRecordTitle(record),
        record,
        recordKey: await requireRecordKey(storage, record, trimmed),
    }
}

export function getKeeperRegionAbbreviation(host: string): string | null {
    let normalized = host.trim().toLowerCase()
    if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
        try {
            normalized = new URL(normalized).hostname.toLowerCase()
        } catch {
            /* keep as-is */
        }
    }
    for (const [abbrev, publicHost] of Object.entries(KEEPER_PUBLIC_HOSTS)) {
        if (publicHost.toLowerCase() === normalized) return abbrev
    }
    return null
}

export function formatGatewayOneTimeToken(host: string, secretBytes: Uint8Array): string {
    const token = webSafe64FromBytes(secretBytes)
    const abbrev = getKeeperRegionAbbreviation(host)
    if (abbrev) return `${abbrev}:${token}`
    const bareHost = host
        .replace(/^https?:\/\//i, '')
        .split('/')[0]
        .toLowerCase()
    return `${bareHost}:${token}`
}

export function findEnterpriseGatewayByUidOrName(
    controllers: readonly PAM.IPAMController[],
    gatewayUidOrName: string
): PAM.IPAMController | undefined {
    const trimmed = gatewayUidOrName.trim()
    if (!trimmed) return undefined
    const lowered = trimmed.toLowerCase()
    return controllers.find((controller) => {
        const uid = webSafeUidFromBytes(controller.controllerUid)
        if (uid === trimmed) return true
        return (controller.controllerName || '').toLowerCase() === lowered
    })
}

export function requireEnterpriseGatewayByUidOrName(
    controllers: readonly PAM.IPAMController[],
    gatewayUidOrName: string
): PAM.IPAMController {
    const gateway = findEnterpriseGatewayByUidOrName(controllers, gatewayUidOrName)
    if (!gateway?.controllerUid?.length) {
        throw new KeeperSdkError(`Gateway "${gatewayUidOrName}" not found.`, ResultCodes.PAM_GATEWAY_NOT_FOUND)
    }
    return gateway
}

export async function fetchEnterprisePamControllers(
    auth: Auth,
    failureResultCode: string
): Promise<PAM.IPAMController[]> {
    try {
        const response = await auth.executeRest(getControllers())
        return response.controllers ?? []
    } catch (err) {
        throw new KeeperSdkError(`Failed to list enterprise gateways: ${extractErrorMessage(err)}`, failureResultCode)
    }
}

export function groupOnlineGatewaysByControllerUid(
    controllers: readonly PAM.IPAMOnlineController[]
): Map<string, PAM.IPAMOnlineController[]> {
    const map = new Map<string, PAM.IPAMOnlineController[]>()
    for (const controller of controllers) {
        const uid = webSafeUidFromBytes(controller.controllerUid)
        if (!uid) continue
        const list = map.get(uid)
        if (list) list.push(controller)
        else map.set(uid, [controller])
    }
    return map
}

function isRouterConnectionErrorCode(code: string | undefined): code is RouterConnectionErrorCode {
    return !!code && (ROUTER_CONNECTION_ERROR_CODES as readonly string[]).includes(code)
}

export function isKeeperRouterConnectionError(err: unknown): boolean {
    if (err == null) return false

    let code: string | undefined
    let message: string | undefined
    if (typeof err === 'string') {
        message = err
    } else if (typeof err === 'object') {
        const e = err as NetworkErrorLike
        code = e.code || e.errno || e.cause?.code
        message = typeof e.message === 'string' ? e.message : undefined
    } else {
        return false
    }

    if (isRouterConnectionErrorCode(code)) return true
    if (!message) return false

    const msg = message.toLowerCase()
    return (
        msg.includes('econnrefused') ||
        msg.includes('enotfound') ||
        msg.includes('etimedout') ||
        msg.includes('network') ||
        msg.includes('fetch failed') ||
        msg.includes('socket hang up')
    )
}

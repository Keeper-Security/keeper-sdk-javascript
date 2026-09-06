import type { DRecord, DRecordRotation, DSharedFolder, DSharedFolderFolder, PAM, Router } from '@keeper-security/keeperapi'
import { generateUid, normal64Bytes, platform, webSafe64FromBytes } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { FolderKind, VaultObjectKind, sharedFolderFolderName, sharedFolderName } from '../../folders/folderHelpers'
import { getRecordType } from '../../records/RecordUtils'
import { KeeperSdkError, ResultCodes } from '../../utils'
import {
    PAM_ACTION_DEFAULT_PASSWORD_COMPLEXITY,
    PAM_ACTION_ROTATE,
    PAM_ACTION_ROTATE_RECORD_TYPE,
} from './actionConstants'
import type { PamActionRotateInput, PamActionRotateLiveInfo } from './rotateActionTypes'

export type PamRotateActionPayload = {
    action: typeof PAM_ACTION_ROTATE
    is_scheduled: true
    gateway_destination: string
    inputs: {
        recordUid: string
        configurationUid: string
        pwdComplexity: string
        resourceRef: string
    }
    conversationId: string
}

export function requireRotateTarget(input: PamActionRotateInput): { recordUid?: string; folder?: string } {
    const recordUid = input.recordUid?.trim()
    const folder = input.folder?.trim()
    if ((!recordUid && !folder) || (recordUid && folder)) {
        throw new KeeperSdkError(
            'Exactly one of recordUid or folder is required.',
            ResultCodes.PAM_ROTATE_TARGET_REQUIRED
        )
    }
    return { recordUid, folder }
}

export function getPamRecord(storage: InMemoryStorage, recordUid: string): DRecord | undefined {
    return storage.getByUid<DRecord>(VaultObjectKind.Record, recordUid)
}

export function isPamUserRecord(record: DRecord | undefined): record is DRecord {
    return !!record && record.version === 3 && getRecordType(record) === PAM_ACTION_ROTATE_RECORD_TYPE
}

export function resolvePamActionFolderUids(
    storage: InMemoryStorage,
    target: string,
    recursive: boolean = true
): string[] {
    const direct =
        storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, target) ||
        storage.getByUid<DSharedFolderFolder>(FolderKind.SharedFolderFolder, target)
    const folderUids: string[] = []

    if (direct) {
        folderUids.push(direct.uid)
    } else {
        const lower = target.toLowerCase()
        for (const folder of storage.getAll<DSharedFolder>(FolderKind.SharedFolder)) {
            if (sharedFolderName(folder).toLowerCase().includes(lower)) folderUids.push(folder.uid)
        }
        for (const folder of storage.getAll<DSharedFolderFolder>(FolderKind.SharedFolderFolder)) {
            if (sharedFolderFolderName(folder).toLowerCase().includes(lower)) folderUids.push(folder.uid)
        }
    }

    if (!recursive) return [...new Set(folderUids)]

    const pending = [...folderUids]
    const seen = new Set(folderUids)
    while (pending.length) {
        const parentUid = pending.shift()!
        for (const folder of storage.getAll<DSharedFolderFolder>(FolderKind.SharedFolderFolder)) {
            if (folder.sharedFolderUid === parentUid && !seen.has(folder.uid)) {
                seen.add(folder.uid)
                pending.push(folder.uid)
            }
        }
    }
    return [...seen]
}

export async function resolvePamActionRecordUids(
    storage: InMemoryStorage,
    folder: string,
    recursive: boolean = true
): Promise<string[]> {
    const folders = resolvePamActionFolderUids(storage, folder, recursive)
    if (folders.length === 0) {
        throw new KeeperSdkError(`Shared folder "${folder}" not found.`, ResultCodes.PAM_ROTATE_FOLDER_NOT_FOUND)
    }

    const recordUids = new Set<string>()
    for (const folderUid of folders) {
        for (const dependency of (await storage.getDependencies(folderUid)) || []) {
            if (dependency.kind !== VaultObjectKind.Record) continue
            const record = getPamRecord(storage, dependency.uid)
            if (isPamUserRecord(record)) recordUids.add(record.uid)
        }
    }
    return [...recordUids]
}

export function getCachedRotation(storage: InMemoryStorage, recordUid: string): DRecordRotation | undefined {
    return storage.getByUid<DRecordRotation>('record_rotation', recordUid)
}

export function getRotationUids(
    info: PamActionRotateLiveInfo,
    cached: DRecordRotation | undefined
): { configurationUid: string; resourceUid: string } {
    return {
        configurationUid: webSafe64FromBytes(info.configurationUid || new Uint8Array()) || cached?.configurationUid || '',
        resourceUid: webSafe64FromBytes(info.resourceUid || new Uint8Array()) || cached?.resourceUid || '',
    }
}

export async function encryptRotationPasswordComplexity(
    recordKey: Uint8Array,
    info: PamActionRotateLiveInfo
): Promise<string> {
    if (info.pwdComplexity) return info.pwdComplexity
    const encrypted = await platform.aesGcmEncrypt(
        platform.stringToBytes(JSON.stringify(PAM_ACTION_DEFAULT_PASSWORD_COMPLEXITY)),
        recordKey
    )
    return webSafe64FromBytes(encrypted)
}

export function isGatewayConnected(online: { controllers?: PAM.IPAMOnlineController[] }, gatewayUid: string): boolean {
    const gatewayBytes = normal64Bytes(gatewayUid)
    return (online.controllers || []).some(
        (item) =>
            !!item.controllerUid &&
            item.controllerUid.length === gatewayBytes.length &&
            item.controllerUid.every((byte, index) => byte === gatewayBytes[index])
    )
}

export function createRotateActionPayload(args: {
    recordUid: string
    configurationUid: string
    resourceUid: string
    gatewayUid: string
    pwdComplexity: string
}): { payload: PamRotateActionPayload; message: Router.IRouterControllerMessage } {
    const conversationId = generateUid()
    const payload: PamRotateActionPayload = {
        action: PAM_ACTION_ROTATE,
        is_scheduled: true,
        gateway_destination: args.gatewayUid,
        inputs: {
            recordUid: args.recordUid,
            configurationUid: args.configurationUid,
            pwdComplexity: args.pwdComplexity,
            resourceRef: args.resourceUid,
        },
        conversationId,
    }
    return {
        payload,
        message: {
            messageUid: normal64Bytes(conversationId),
            controllerUid: normal64Bytes(args.gatewayUid),
            streamResponse: false,
            payload: platform.stringToBytes(JSON.stringify(payload)),
        },
    }
}

export function parseRotateResponse(payload: string | undefined): unknown {
    if (!payload) return undefined
    try {
        return JSON.parse(payload)
    } catch {
        return payload
    }
}

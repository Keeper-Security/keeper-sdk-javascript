import type { DRecord } from '@keeper-security/keeperapi'
import {
    formatRecord,
    formatRecordFields,
    getRecordPassword,
} from '../../records/RecordUtils'
import type { CliResult, KeeperCliHost, ParsedCli } from '../types'
import { getOpt, hasOpt } from '../parse'
import { ensureCapability, ensureSession } from '../commandHelpers'
import { GetFolderFormat } from '../../folders/getFolder'

export type GetOutputFormat = 'detail' | 'json' | 'password' | 'fields'

export function resolveGetFormat(parsed: ParsedCli): GetOutputFormat {
    const raw = getOpt(parsed.opts, 'format')?.toLowerCase()
    if (raw === 'json' || hasOpt(parsed.opts, 'json')) return 'json'
    if (raw === 'password') return 'password'
    if (raw === 'fields') return 'fields'
    if (raw === 'detail') return 'detail'
    return hasOpt(parsed.opts, 'detail') ? 'detail' : 'detail'
}

export function resolveGetUnmask(parsed: ParsedCli): boolean {
    return hasOpt(parsed.opts, 'unmask')
}

export function getGetTarget(parsed: ParsedCli): string | undefined {
    return parsed.positional[0]?.trim() || undefined
}

async function outputRecord(
    host: KeeperCliHost,
    record: DRecord,
    fmt: GetOutputFormat,
    unmask: boolean,
    cmd: string
): Promise<CliResult> {
    if (fmt === 'password') {
        const pw = getRecordPassword(record)
        return { code: 0, out: pw ? `${pw}\n` : '', err: pw ? '' : `${cmd}: record has no password field\n` }
    }
    if (fmt === 'fields') {
        return { code: 0, out: JSON.stringify(formatRecordFields(record, unmask), null, 2) + '\n', err: '' }
    }
    if (fmt === 'json') {
        return { code: 0, out: JSON.stringify(record, null, 2) + '\n', err: '' }
    }
    return { code: 0, out: formatRecord(record, { showDetails: true, unmask }) + '\n', err: '' }
}

async function tryGetFolder(
    host: KeeperCliHost,
    target: string,
    fmt: GetOutputFormat,
    cmd: string
): Promise<CliResult | null> {
    const v = host.getVault()
    if (!v.getFolder) return null
    try {
        const res = await v.getFolder(target, {
            format: fmt === 'json' ? GetFolderFormat.JSON : GetFolderFormat.Detail,
        })
        if (fmt === 'json') {
            const json = (res as { json?: Record<string, unknown> }).json ?? res
            return { code: 0, out: JSON.stringify(json, null, 2) + '\n', err: '' }
        }
        const name = 'name' in res ? res.name : target
        const uid =
            'folder_uid' in res
                ? res.folder_uid
                : 'shared_folder_uid' in res
                  ? res.shared_folder_uid
                  : target
        return { code: 0, out: `${name}\t${uid}\n`, err: '' }
    } catch {
        return null
    }
}

async function tryGetSharedFolderByUid(
    host: KeeperCliHost,
    target: string,
    fmt: GetOutputFormat,
    cmd: string
): Promise<CliResult | null> {
    const v = host.getVault()
    const hit = v.getSharedFolders().find((sf) => sf.uid === target)
    if (!hit) return null
    if (fmt === 'json') {
        return { code: 0, out: JSON.stringify(hit, null, 2) + '\n', err: '' }
    }
    if (fmt === 'password' || fmt === 'fields') {
        return { code: 1, out: '', err: `${cmd}: --format ${fmt} applies to records only\n` }
    }
    return { code: 0, out: `${hit.name ?? '(unnamed)'}\t${hit.uid}\n`, err: '' }
}

/** Commander-style `get` (record, folder, or shared folder by UID/title). */
export async function executeGet(host: KeeperCliHost, parsed: ParsedCli, cmd = 'get'): Promise<CliResult> {
    const target = getGetTarget(parsed)
    if (!target) {
        return { code: 1, out: '', err: `${cmd}: UID parameter is required\n` }
    }
    const r = await ensureSession(host)
    if (r) return r
    const v = host.getVault()
    const fmt = resolveGetFormat(parsed)
    const unmask = resolveGetUnmask(parsed)

    await v.sync()

    const sf = await tryGetSharedFolderByUid(host, target, fmt, cmd)
    if (sf) return sf

    const folder = await tryGetFolder(host, target, fmt, cmd)
    if (folder) return folder

    const cap = ensureCapability(v, 'findRecord', cmd)
    if (cap) return cap
    const record = v.findRecord!(target)
    if (!record) {
        return { code: 1, out: '', err: `${cmd}: cannot find any object matching "${target}"\n` }
    }
    return outputRecord(host, record, fmt, unmask, cmd)
}

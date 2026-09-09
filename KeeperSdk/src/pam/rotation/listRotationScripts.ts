import type { Auth } from '@keeper-security/keeperapi'
import type { DRecord } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { getRecordTitle, getRecordType } from '../../records/RecordUtils'
import type { RotationScript, ListRotationScriptsResult, ListRotationScriptsOptions } from './rotationScriptTypes'
import { findScriptFieldsInRecord, isPamRecord } from './rotationScriptHelpers'

export async function listRotationScripts(
    _auth: Auth,
    storage: InMemoryStorage,
    options: ListRotationScriptsOptions = {}
): Promise<ListRotationScriptsResult> {
    const pattern = options.pattern?.toLowerCase() || ''
    const scripts: RotationScript[] = []

    try {
        const allRecords = storage.getRecords()

        for (const record of allRecords) {
            if (!record) continue

            const recordType = getRecordType(record)
            if (recordType !== 'pamUser' && recordType !== 'pamDirectory') {
                continue
            }

            if (pattern) {
                const recordUid = record.uid.toLowerCase()
                const title = (getRecordTitle(record) || '').toLowerCase()
                if (!recordUid.includes(pattern) && !title.includes(pattern)) {
                    continue
                }
            }

            if (!isPamRecord(record)) continue
            const recordData = record.data
            const scriptFields = findScriptFieldsInRecord(recordData)

            if (scriptFields.length > 0) {
                const location = scriptFields[0]
                const scriptValue = location.script

                const fileRecord = storage.getByUid<DRecord>(VaultObjectKind.Record, scriptValue.fileRef)
                if (fileRecord) {
                    const recordRefs = scriptValue.recordRef || []
                    const command = scriptValue.command || ''

                    scripts.push({
                        recordUid: record.uid,
                        recordTitle: getRecordTitle(record) || '',
                        recordType,
                        scriptUid: scriptValue.fileRef,
                        scriptName: getRecordTitle(fileRecord) || '',
                        recordRefs: Array.isArray(recordRefs) ? recordRefs : [],
                        command: typeof command === 'string' ? command : '',
                    })
                }
            }
        }

        return {
            success: true,
            scripts,
            message: `Found ${scripts.length} rotation script(s)`,
        }
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        return {
            success: false,
            scripts: [],
            message: `Failed to list rotation scripts: ${message}`,
        }
    }
}

export function formatRotationScriptsTable(result: ListRotationScriptsResult): string[][] {
    if (!result.success || result.scripts.length === 0) {
        return []
    }

    const headers = ['Record UID', 'Record Title', 'Record Type', 'Script UID', 'Script Name', 'Credentials', 'Command']

    const rows = result.scripts.map((script) => [
        script.recordUid,
        script.recordTitle,
        script.recordType,
        script.scriptUid,
        script.scriptName,
        script.recordRefs.join(', '),
        script.command,
    ])

    return [headers, ...rows]
}

export function formatRotationScriptsJson(result: ListRotationScriptsResult): string {
    return JSON.stringify(
        {
            success: result.success,
            message: result.message,
            scripts: result.scripts,
        },
        null,
        2
    )
}

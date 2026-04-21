export const createKdRecordAccessCompositeKey = (actorUid: string, recordUid: string) => `${actorUid}:${recordUid}`

export const createKdFolderAccessCompositeKey = (actorUid: string, folderUid: string) => `${folderUid}:${actorUid}`

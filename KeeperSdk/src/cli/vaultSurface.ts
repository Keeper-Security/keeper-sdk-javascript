/** Shared footer for vault-related command help (SDK APIs not yet exposed as CLI). */
export const KEEPER_VAULT_SURFACE = `
KeeperVault (JavaScript SDK) — operations available in code (not all exposed as CLI yet):

  Session: login, loginWithSessionToken, logout, resumeSession, sync, disconnect
  Records: getRecords, findRecord, findRecords, getRecordByUid, getRecordsByType,
           addRecord, updateRecord, deleteRecord, moveRecord, getRecordHistory,
           printRecords
  Sharing: shareRecord, removeRecordShare, getRecordShareInfo
  Folders: listFolder, changeDirectory, getFolder, mkdir, addFolder, updateFolder,
           renameFolder, deleteFolder, rmdir, tree, getCurrentFolderUid
  Shared folders: getSharedFolders, listSharedFolders, shareFolder, …
  Metadata: getRecordMetadata, getSummary, …

Utilities exported from @keeper-security/keeper-sdk-javascript include searchRecords,
formatRecord, getRecordTitle, getRecordPassword, getRecordLogin, shareRecord, …
See the SDK package for full APIs.
`.trim()

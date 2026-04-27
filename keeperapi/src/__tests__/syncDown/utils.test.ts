import { createKdRecordAccessCompositeKey, createKdFolderAccessCompositeKey } from '../../syncDown'

describe('createKdRecordAccessCompositeKey', () => {
    it('produces actorUid:recordUid format', () => {
        expect(createKdRecordAccessCompositeKey('actor1', 'record1')).toBe('actor1:record1')
    })
})

describe('createKdFolderAccessCompositeKey', () => {
    it('produces folderUid:actorUid format', () => {
        expect(createKdFolderAccessCompositeKey('actor1', 'folder1')).toBe('folder1:actor1')
    })
})

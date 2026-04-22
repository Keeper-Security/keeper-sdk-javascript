import { Folder } from '../proto'
import { EncryptionType } from '../platform'

export const createKdRecordAccessCompositeKey = (actorUid: string, recordUid: string) => `${actorUid}:${recordUid}`

export const createKdFolderAccessCompositeKey = (actorUid: string, folderUid: string) => `${folderUid}:${actorUid}`

export const mapTeamKeyType = (keyType: Folder.EncryptedKeyType, teamUid: string) => {
    let keyId: string
    let encryptionType: EncryptionType
    const unwrappedType = 'aes'
    switch (keyType) {
        case Folder.EncryptedKeyType.encrypted_by_data_key:
            keyId = teamUid
            encryptionType = 'cbc'
            break
        case Folder.EncryptedKeyType.encrypted_by_public_key:
            keyId = `${teamUid}_priv`
            encryptionType = 'rsa'
            break
        case Folder.EncryptedKeyType.encrypted_by_public_key_ecc:
            keyId = `${teamUid}_ecc`
            encryptionType = 'ecc'
            break
        default:
            console.error('Unknown key type: ' + keyType)
            return null
    }
    return { keyId, encryptionType, unwrappedType }
}

/**
 * Quantum Resistant Cryptography (QRC) module
 * Implements HPKE with ECDH-P256 and ML-KEM for quantum-resistant encryption
 */

// Main HPKE class
export { HPKE_ECDH_KYBER } from './hpke';

// Types
export type {
    MlKemKeyPair,
    QrcEncryptionResult,
    MlKemEncapsulation,
} from './types';

// Constants
export {
    Ciphersuite,
    MlKemVariant,
    getMlKemVariant,
    getMlKemCiphertextLength,
    getMlKemPublicKeyLength,
    QRC_PROTOCOL_VERSION,
    OPTIONAL_DATA_LENGTH,
    ML_KEM_768_CIPHERTEXT_LENGTH,
    ML_KEM_1024_CIPHERTEXT_LENGTH,
    ML_KEM_768_PUBLIC_KEY_LENGTH,
    ML_KEM_1024_PUBLIC_KEY_LENGTH,
    EC_PUBLIC_KEY_LENGTH,
    EC_PRIVATE_KEY_LENGTH,
    AES_KEY_LENGTH
} from './constants';

// Utilities
export {
    concatUint8Arrays,
} from './utils';

// ML-KEM operations
export {
    mlKemKeygen,
    mlKemEncapsulate,
    mlKemDecapsulate
} from './mlkem';

// Context info builder
export {
    buildContextInfo,
    validateContextInfoParams
} from './context';

// PEM encoding
export {
    encodeMlKemPublicKeyToPem
} from './pem';

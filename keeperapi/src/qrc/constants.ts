/**
 * Constants for Quantum Resistant Cryptography (QRC) implementation
 * Based on ML-KEM and HPKE standards
 */

// Ciphertext lengths by ML-KEM variant (in bytes)
export const ML_KEM_768_CIPHERTEXT_LENGTH = 1088;
export const ML_KEM_1024_CIPHERTEXT_LENGTH = 1568;

// ML-KEM public key lengths (in bytes)
export const ML_KEM_768_PUBLIC_KEY_LENGTH = 1184;
export const ML_KEM_1024_PUBLIC_KEY_LENGTH = 1568;

// ML-KEM private key lengths (in bytes)
export const ML_KEM_768_PRIVATE_KEY_LENGTH = 2400;
export const ML_KEM_1024_PRIVATE_KEY_LENGTH = 3168;

// ML-KEM shared secret length (same for all variants)
export const ML_KEM_SHARED_SECRET_LENGTH = 32;

// ECDH key lengths
export const EC_PUBLIC_KEY_LENGTH = 65;  // Uncompressed P-256 public key (0x04 + x + y)
export const EC_PRIVATE_KEY_LENGTH = 32; // P-256 private key scalar
export const EC_SHARED_SECRET_LENGTH = 32; // ECDH shared secret with P-256

// AES-GCM parameters
export const AES_KEY_LENGTH = 32;         // AES-256
export const AES_GCM_IV_LENGTH = 12;      // 96-bit IV for GCM
export const AES_GCM_TAG_LENGTH = 16;     // 128-bit authentication tag

// HKDF parameters
export const HKDF_SALT_LENGTH = 32;       // SHA-256 output size
export const HKDF_OUTPUT_LENGTH = 32;     // AES-256 key size

// Protocol version
export const QRC_PROTOCOL_VERSION = 1;

// Optional data (recommended size for additional security)
export const OPTIONAL_DATA_LENGTH = 16;

// Ciphersuite identifiers (must match server implementation)
export enum Ciphersuite {
    HPKE_MLKEM768_ECDHP256_HKDFSHA256_AESGCM256 = 'HPKE_ML-KEM-768_ECDH-P256_HKDF-SHA256_AES-GCM-256',
    HPKE_MLKEM1024_ECDHP256_HKDFSHA256_AESGCM256 = 'HPKE_ML-KEM-1024_ECDH-P256_HKDF-SHA256_AES-GCM-256'
}

// ML-KEM variant types
export enum MlKemVariant {
    ML_KEM_768 = 768,
    ML_KEM_1024 = 1024
}

// Map ciphersuite to ML-KEM variant
export function getMlKemVariant(ciphersuite: Ciphersuite): MlKemVariant {
    switch (ciphersuite) {
        case Ciphersuite.HPKE_MLKEM768_ECDHP256_HKDFSHA256_AESGCM256:
            return MlKemVariant.ML_KEM_768;
        case Ciphersuite.HPKE_MLKEM1024_ECDHP256_HKDFSHA256_AESGCM256:
            return MlKemVariant.ML_KEM_1024;
        default:
            throw new Error(`Unknown ciphersuite: ${ciphersuite}`);
    }
}

// Get ML-KEM ciphertext length for a given variant
export function getMlKemCiphertextLength(variant: MlKemVariant): number {
    switch (variant) {
        case MlKemVariant.ML_KEM_768:
            return ML_KEM_768_CIPHERTEXT_LENGTH;
        case MlKemVariant.ML_KEM_1024:
            return ML_KEM_1024_CIPHERTEXT_LENGTH;
        default:
            throw new Error(`Unknown ML-KEM variant: ${variant}`);
    }
}

// Get ML-KEM public key length for a given variant
export function getMlKemPublicKeyLength(variant: MlKemVariant): number {
    switch (variant) {
        case MlKemVariant.ML_KEM_768:
            return ML_KEM_768_PUBLIC_KEY_LENGTH;
        case MlKemVariant.ML_KEM_1024:
            return ML_KEM_1024_PUBLIC_KEY_LENGTH;
        default:
            throw new Error(`Unknown ML-KEM variant: ${variant}`);
    }
}

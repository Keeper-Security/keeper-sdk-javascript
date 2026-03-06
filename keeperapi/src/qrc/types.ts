/**
 * TypeScript type definitions for Quantum Resistant Cryptography (QRC)
 */

/**
 * ML-KEM key pair
 */
export interface MlKemKeyPair {
    /** ML-KEM public key (1184 or 1568 bytes depending on variant) */
    publicKey: Uint8Array;
    /** ML-KEM private key (2400 or 3168 bytes depending on variant) */
    privateKey: Uint8Array;
}

/**
 * Result of QRC encryption operation
 */
export interface QrcEncryptionResult {
    /** Client's ephemeral EC public key */
    clientEcPublicKey: Uint8Array;
    /** ML-KEM encapsulated key (ciphertext) */
    mlKemEncapsulatedKey: Uint8Array;
    /** AES-GCM encrypted transmission key */
    encryptedData: Uint8Array;
    /** Protocol version (currently 1) */
    msgVersion: number;
}

/**
 * ML-KEM encapsulation result
 */
export interface MlKemEncapsulation {
    /** Encapsulated key (ciphertext) */
    ciphertext: Uint8Array;
    /** Shared secret */
    sharedSecret: Uint8Array;
}

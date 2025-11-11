/**
 * ML-KEM (Kyber) operations using @noble/post-quantum
 */

import * as mlKem from '@noble/post-quantum/ml-kem.js';
import type { MlKemKeyPair, MlKemEncapsulation } from './types';
import { MlKemVariant, getMlKemPublicKeyLength } from './constants';
import { extractRawMlKemPublicKey } from './utils';

/**
 * Generates an ML-KEM key pair
 * @param variant - ML-KEM variant (768, or 1024)
 * @param seed - Optional seed for deterministic key generation (for testing)
 * @returns ML-KEM key pair
 */
export function mlKemKeygen(variant: MlKemVariant, seed?: Uint8Array): MlKemKeyPair {
    let result: { publicKey: Uint8Array; secretKey: Uint8Array };

    switch (variant) {
        case MlKemVariant.ML_KEM_768:
            result = seed !== undefined ? mlKem.ml_kem768.keygen(seed) : mlKem.ml_kem768.keygen();
            break;
        case MlKemVariant.ML_KEM_1024:
            result = seed !== undefined ? mlKem.ml_kem1024.keygen(seed) : mlKem.ml_kem1024.keygen();
            break;
        default:
            throw new Error(`Unknown ML-KEM variant: ${variant}`);
    }

    return {
        publicKey: result.publicKey,
        privateKey: result.secretKey
    };
}

/**
 * Encapsulates a shared secret using ML-KEM
 * @param publicKey - ML-KEM public key (PEM-encoded or raw bytes)
 * @param variant - ML-KEM variant
 * @returns Encapsulation (ciphertext and shared secret)
 */
export function mlKemEncapsulate(
    publicKey: Uint8Array,
    variant: MlKemVariant
): MlKemEncapsulation {
    // Extract raw public key from PEM format if needed
    const expectedLength = getMlKemPublicKeyLength(variant);
    const rawPublicKey = extractRawMlKemPublicKey(publicKey, expectedLength);

    let result: { cipherText: Uint8Array; sharedSecret: Uint8Array };

    switch (variant) {
        case MlKemVariant.ML_KEM_768:
            result = mlKem.ml_kem768.encapsulate(rawPublicKey);
            break;
        case MlKemVariant.ML_KEM_1024:
            result = mlKem.ml_kem1024.encapsulate(rawPublicKey);
            break;
        default:
            throw new Error(`Unknown ML-KEM variant: ${variant}`);
    }

    return {
        ciphertext: result.cipherText,
        sharedSecret: result.sharedSecret
    };
}

/**
 * Decapsulates a shared secret using ML-KEM
 * @param ciphertext - ML-KEM ciphertext
 * @param privateKey - ML-KEM private key
 * @param variant - ML-KEM variant
 * @returns Shared secret
 */
export function mlKemDecapsulate(
    ciphertext: Uint8Array,
    privateKey: Uint8Array,
    variant: MlKemVariant
): Uint8Array {
    switch (variant) {
        case MlKemVariant.ML_KEM_768:
            return mlKem.ml_kem768.decapsulate(ciphertext, privateKey);
        case MlKemVariant.ML_KEM_1024:
            return mlKem.ml_kem1024.decapsulate(ciphertext, privateKey);
        default:
            throw new Error(`Unknown ML-KEM variant: ${variant}`);
    }
}

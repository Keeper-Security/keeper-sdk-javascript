/**
 * Context info builder for HKDF
 * Critical for security - binds key derivation to specific parameters
 */

import { concatUint8Arrays } from './utils';
import { Ciphersuite, EC_PUBLIC_KEY_LENGTH } from './constants';

/**
 * Builds the context info for HKDF key derivation
 *
 * The order and composition of fields is critical and must match the server implementation:
 * contextInfo = [optionalData] || ciphersuiteString || serverEcPublicKey ||
 *               clientEphemeralEcPublicKey || sha256(mlKemCiphertext) || version
 *
 * @param ciphersuite - Ciphersuite identifier
 * @param serverEcPublicKey - Server's EC public key (65 bytes)
 * @param clientEphemeralEcPublicKey - Client's ephemeral EC public key (65 bytes)
 * @param mlKemCiphertextHash - SHA-256 hash of ML-KEM ciphertext (32 bytes)
 * @param version - Protocol version (1 byte)
 * @param optionalData - Optional data for additional security (optional)
 * @returns Context info byte array
 */
export function buildContextInfo(
    ciphersuite: Ciphersuite,
    serverEcPublicKey: Uint8Array,
    clientEphemeralEcPublicKey: Uint8Array,
    mlKemCiphertextHash: Uint8Array,
    version: number,
    optionalData?: Uint8Array
): Uint8Array {
    const parts: Uint8Array[] = [];

    // Optional data (if present) comes first
    if (optionalData && optionalData.length > 0) {
        parts.push(optionalData);
    }

    // Ciphersuite string (UTF-8 encoded)
    const ciphersuiteBytes = new TextEncoder().encode(ciphersuite);
    parts.push(ciphersuiteBytes);

    // Server EC public key
    parts.push(serverEcPublicKey);

    // Client ephemeral EC public key
    parts.push(clientEphemeralEcPublicKey);

    // SHA-256 hash of ML-KEM ciphertext
    parts.push(mlKemCiphertextHash);

    // Protocol version (single byte)
    parts.push(new Uint8Array([version]));

    // Concatenate all parts
    return concatUint8Arrays(...parts);
}

/**
 * Validates context info parameters
 * @param serverEcPublicKey - Server's EC public key
 * @param clientEphemeralEcPublicKey - Client's ephemeral EC public key
 * @param mlKemCiphertextHash - SHA-256 hash of ML-KEM ciphertext
 * @throws Error if parameters are invalid
 */
export function validateContextInfoParams(
    serverEcPublicKey: Uint8Array,
    clientEphemeralEcPublicKey: Uint8Array,
    mlKemCiphertextHash: Uint8Array
): void {
    if (serverEcPublicKey.length !== EC_PUBLIC_KEY_LENGTH) {
        throw new Error(`Invalid server EC public key length: ${serverEcPublicKey.length}, expected ${EC_PUBLIC_KEY_LENGTH}`);
    }

    if (clientEphemeralEcPublicKey.length !== EC_PUBLIC_KEY_LENGTH) {
        throw new Error(`Invalid client EC public key length: ${clientEphemeralEcPublicKey.length}, expected ${EC_PUBLIC_KEY_LENGTH}`);
    }

    if (mlKemCiphertextHash.length !== 32) {
        throw new Error(`Invalid ML-KEM ciphertext hash length: ${mlKemCiphertextHash.length}, expected 32`);
    }
}

/**
 * HPKE (Hybrid Public Key Encryption) implementation
 * Combines ECDH-P256 and ML-KEM for quantum-resistant encryption
 */

import type { MlKemKeyPair, QrcEncryptionResult } from './types';
import {
    Ciphersuite,
    MlKemVariant,
    getMlKemVariant,
    getMlKemCiphertextLength,
    QRC_PROTOCOL_VERSION,
    AES_KEY_LENGTH,
    HKDF_SALT_LENGTH,
} from './constants';
import { mlKemKeygen, mlKemEncapsulate, mlKemDecapsulate } from './mlkem';
import { buildContextInfo, validateContextInfoParams } from './context';
import { concatUint8Arrays } from './utils';
import { platform } from '../platform';

/**
 * HPKE implementation with ECDH-P256 and ML-KEM
 */
export class HPKE_ECDH_KYBER {
    private readonly ciphersuite: Ciphersuite;
    private readonly mlKemVariant: MlKemVariant;
    private readonly mlKemCiphertextLength: number;

    /**
     * Creates a new HPKE instance
     * @param ciphersuite - Ciphersuite to use (defaults to ML-KEM-1024)
     */
    constructor(ciphersuite: Ciphersuite = Ciphersuite.HPKE_MLKEM1024_ECDHP256_HKDFSHA256_AESGCM256) {
        this.ciphersuite = ciphersuite;
        this.mlKemVariant = getMlKemVariant(ciphersuite);
        this.mlKemCiphertextLength = getMlKemCiphertextLength(this.mlKemVariant);
    }

    /**
     * Generates an ML-KEM key pair
     * @param seed - Optional seed for deterministic generation (testing only)
     * @returns ML-KEM key pair
     */
    generateMlKemKeys(seed?: Uint8Array): MlKemKeyPair {
        return mlKemKeygen(this.mlKemVariant, seed);
    }

    /**
     * Encrypts data using hybrid ECDH + ML-KEM approach
     *
     * @param message - Data to encrypt (e.g., transmission key)
     * @param serverEcPublicKey - Server's EC P-256 public key (65 bytes)
     * @param serverMlKemPublicKey - Server's ML-KEM public key
     * @param optionalData - Optional data for additional security (recommended: 16 bytes)
     * @returns Encryption result
     */
    async encrypt(
        message: Uint8Array,
        serverEcPublicKey: Uint8Array,
        serverMlKemPublicKey: Uint8Array,
        optionalData?: Uint8Array
    ): Promise<QrcEncryptionResult> {
        // Generate ephemeral ECDH key pair
        const ephemeralKeyPair = await platform.generateECKeyPair();

        // Perform ECDH with server's EC public key
        const ecSharedSecret = await platform.ecdhComputeSharedSecret(
            ephemeralKeyPair.privateKey,
            serverEcPublicKey,
            ephemeralKeyPair.publicKey
        );

        // Perform ML-KEM encapsulation
        const { ciphertext: mlKemCiphertext, sharedSecret: mlKemSharedSecret } =
            mlKemEncapsulate(serverMlKemPublicKey, this.mlKemVariant);

        // Combine both shared secrets (concatenate)
        const combinedSecret = concatUint8Arrays(ecSharedSecret, mlKemSharedSecret);

        // Hash the ML-KEM ciphertext for context binding
        const mlKemCiphertextHash = await platform.sha256(mlKemCiphertext);

        // Build context info for HKDF
        validateContextInfoParams(serverEcPublicKey, ephemeralKeyPair.publicKey, mlKemCiphertextHash);
        const contextInfo = buildContextInfo(
            this.ciphersuite,
            serverEcPublicKey,
            ephemeralKeyPair.publicKey,
            mlKemCiphertextHash,
            QRC_PROTOCOL_VERSION,
            optionalData
        );

        // Derive AES key using HKDF
        const salt = new Uint8Array(HKDF_SALT_LENGTH); // Empty salt (all zeros)
        const aesKey = await platform.hkdf(salt, combinedSecret, contextInfo, AES_KEY_LENGTH);

        // Encrypt data with AES-256-GCM
        const encryptedData = await platform.aesGcmEncrypt(message, aesKey);

        // Return encryption result
        return {
            clientEcPublicKey: ephemeralKeyPair.publicKey,
            mlKemEncapsulatedKey: mlKemCiphertext,
            encryptedData: encryptedData,
            msgVersion: QRC_PROTOCOL_VERSION,
        };
    }

    /**
     * Decrypts data using hybrid ECDH + ML-KEM approach
     *
     * @param clientEcPublicKey - Client's ephemeral EC public key (from QrcMessageKey)
     * @param mlKemEncapsulatedKey - ML-KEM ciphertext (from QrcMessageKey)
     * @param encryptedData - AES-GCM encrypted data (from QrcMessageKey)
     * @param msgVersion - Protocol version (from QrcMessageKey)
     * @param serverEcPrivateKey - Server's EC private key (32 bytes)
     * @param serverEcPublicKey - Server's EC public key (65 bytes)
     * @param serverMlKemPrivateKey - Server's ML-KEM private key
     * @param optionalData - Optional data used during encryption
     * @returns Decrypted plaintext
     */
    async decrypt(
        clientEcPublicKey: Uint8Array,
        mlKemEncapsulatedKey: Uint8Array,
        encryptedData: Uint8Array,
        msgVersion: number,
        serverEcPrivateKey: Uint8Array,
        serverEcPublicKey: Uint8Array,
        serverMlKemPrivateKey: Uint8Array,
        optionalData?: Uint8Array
    ): Promise<Uint8Array> {
        // Validate version
        if (msgVersion !== QRC_PROTOCOL_VERSION) {
            throw new Error(`Unsupported QRC protocol version: ${msgVersion}, expected ${QRC_PROTOCOL_VERSION}`);
        }

        // Perform ECDH with client's ephemeral public key
        const ecSharedSecret = await platform.ecdhComputeSharedSecret(
            serverEcPrivateKey,
            clientEcPublicKey,
            serverEcPublicKey
        );

        // Perform ML-KEM decapsulation
        const mlKemSharedSecret = mlKemDecapsulate(
            mlKemEncapsulatedKey,
            serverMlKemPrivateKey,
            this.mlKemVariant
        );

        // Combine both shared secrets (concatenate)
        const combinedSecret = concatUint8Arrays(ecSharedSecret, mlKemSharedSecret);

        // Hash the ML-KEM ciphertext for context binding
        const mlKemCiphertextHash = await platform.sha256(mlKemEncapsulatedKey);

        // Build context info for HKDF
        validateContextInfoParams(serverEcPublicKey, clientEcPublicKey, mlKemCiphertextHash);
        const contextInfo = buildContextInfo(
            this.ciphersuite,
            serverEcPublicKey,
            clientEcPublicKey,
            mlKemCiphertextHash,
            msgVersion,
            optionalData
        );

        // Derive AES key using HKDF
        const salt = new Uint8Array(HKDF_SALT_LENGTH); // Empty salt (all zeros)
        const aesKey = await platform.hkdf(salt, combinedSecret, contextInfo, AES_KEY_LENGTH);

        // Decrypt data with AES-256-GCM
        const plaintext = await platform.aesGcmDecrypt(encryptedData, aesKey);

        return plaintext;
    }
}

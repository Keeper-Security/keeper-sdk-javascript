/**
 * @jest-environment jsdom
 */

// @ts-ignore
import crypto from 'crypto';
import { browserPlatform } from '../browser/platform';
import { connectPlatform, platform } from '../platform';
import {
    HPKE_ECDH_KYBER,
    Ciphersuite,
    MlKemVariant,
    concatUint8Arrays,
    mlKemKeygen,
    mlKemEncapsulate,
    mlKemDecapsulate,
    ML_KEM_768_CIPHERTEXT_LENGTH,
    encodeMlKemPublicKeyToPem,
} from '../qrc';
import { EC_PUBLIC_KEY_LENGTH, EC_SHARED_SECRET_LENGTH, ML_KEM_1024_CIPHERTEXT_LENGTH } from '../qrc/constants';
import { getKeeperMlKemKeys, getKeeperMlKemKeyVariant, isAllowedMlKemKeyId } from '../transmissionKeys';

describe('ML-KEM Operations', () => {
    describe('mlKemEncapsulate and mlKemDecapsulate', () => {
        it('encapsulates and decapsulates with ML-KEM-768', () => {
            const keyPair = mlKemKeygen(MlKemVariant.ML_KEM_768);
            const { ciphertext, sharedSecret } = mlKemEncapsulate(keyPair.publicKey, MlKemVariant.ML_KEM_768);

            expect(ciphertext.length).toBe(ML_KEM_768_CIPHERTEXT_LENGTH);
            expect(sharedSecret.length).toBe(EC_SHARED_SECRET_LENGTH);

            const decapsulatedSecret = mlKemDecapsulate(ciphertext, keyPair.privateKey, MlKemVariant.ML_KEM_768);
            expect(decapsulatedSecret).toEqual(sharedSecret);
        });

        it('encapsulates and decapsulates with ML-KEM-1024', () => {
            const keyPair = mlKemKeygen(MlKemVariant.ML_KEM_1024);
            const { ciphertext, sharedSecret } = mlKemEncapsulate(keyPair.publicKey, MlKemVariant.ML_KEM_1024);

            expect(ciphertext.length).toBe(ML_KEM_1024_CIPHERTEXT_LENGTH);
            expect(sharedSecret.length).toBe(EC_SHARED_SECRET_LENGTH);

            const decapsulatedSecret = mlKemDecapsulate(ciphertext, keyPair.privateKey, MlKemVariant.ML_KEM_1024);
            expect(decapsulatedSecret).toEqual(sharedSecret);
        });

        it('generates different ciphertexts for same public key', () => {
            const keyPair = mlKemKeygen(MlKemVariant.ML_KEM_768);
            const result1 = mlKemEncapsulate(keyPair.publicKey, MlKemVariant.ML_KEM_768);
            const result2 = mlKemEncapsulate(keyPair.publicKey, MlKemVariant.ML_KEM_768);

            expect(result1.ciphertext).not.toEqual(result2.ciphertext);
            expect(result1.sharedSecret).not.toEqual(result2.sharedSecret);
        });
    });

    describe('PEM-encoded ML-KEM keys', () => {
        beforeAll(() => {
            connectPlatform(browserPlatform);
        });

        it('encapsulates with PEM-encoded ML-KEM-768 public key', () => {
            const keyPair = mlKemKeygen(MlKemVariant.ML_KEM_768);
            const pemPublicKey = encodeMlKemPublicKeyToPem(keyPair.publicKey, MlKemVariant.ML_KEM_768);

            // Encapsulate using PEM-encoded key
            const { ciphertext, sharedSecret } = mlKemEncapsulate(pemPublicKey, MlKemVariant.ML_KEM_768);

            expect(ciphertext.length).toBe(ML_KEM_768_CIPHERTEXT_LENGTH);
            expect(sharedSecret.length).toBe(EC_SHARED_SECRET_LENGTH);

            // Decapsulate should produce same shared secret
            const decapsulatedSecret = mlKemDecapsulate(ciphertext, keyPair.privateKey, MlKemVariant.ML_KEM_768);
            expect(decapsulatedSecret).toEqual(sharedSecret);
        });

        it('encapsulates with PEM-encoded ML-KEM-1024 public key', () => {
            const keyPair = mlKemKeygen(MlKemVariant.ML_KEM_1024);
            const pemPublicKey = encodeMlKemPublicKeyToPem(keyPair.publicKey, MlKemVariant.ML_KEM_1024);

            // Encapsulate using PEM-encoded key
            const { ciphertext, sharedSecret } = mlKemEncapsulate(pemPublicKey, MlKemVariant.ML_KEM_1024);

            expect(ciphertext.length).toBe(ML_KEM_1024_CIPHERTEXT_LENGTH);
            expect(sharedSecret.length).toBe(EC_SHARED_SECRET_LENGTH);

            // Decapsulate should produce same shared secret
            const decapsulatedSecret = mlKemDecapsulate(ciphertext, keyPair.privateKey, MlKemVariant.ML_KEM_1024);
            expect(decapsulatedSecret).toEqual(sharedSecret);
        });

        it('HPKE encrypts/decrypts with PEM-encoded ML-KEM-768 server key', async () => {
            const hpke = new HPKE_ECDH_KYBER(Ciphersuite.HPKE_MLKEM768_ECDHP256_HKDFSHA256_AESGCM256);

            // Generate server keys
            const serverEcKeyPair = await platform.generateECKeyPair();
            const serverMlKemKeys = hpke.generateMlKemKeys();

            // Convert ML-KEM public key to PEM format (simulating server-provided key)
            const pemMlKemPublicKey = encodeMlKemPublicKeyToPem(serverMlKemKeys.publicKey, MlKemVariant.ML_KEM_768);

            const message = platform.getRandomBytes(32);

            // Encrypt using PEM-encoded ML-KEM public key
            const result = await hpke.encrypt(
                message,
                serverEcKeyPair.publicKey,
                pemMlKemPublicKey
            );

            expect(result.clientEcPublicKey.length).toBe(EC_PUBLIC_KEY_LENGTH);
            expect(result.mlKemEncapsulatedKey.length).toBe(ML_KEM_768_CIPHERTEXT_LENGTH);

            // Decrypt (server uses raw private key)
            const decrypted = await hpke.decrypt(
                result.clientEcPublicKey,
                result.mlKemEncapsulatedKey,
                result.encryptedData,
                result.msgVersion,
                serverEcKeyPair.privateKey,
                serverEcKeyPair.publicKey,
                serverMlKemKeys.privateKey
            );

            expect(decrypted).toEqual(message);
        });

        it('HPKE encrypts/decrypts with PEM-encoded ML-KEM-1024 server key', async () => {
            const hpke = new HPKE_ECDH_KYBER(Ciphersuite.HPKE_MLKEM1024_ECDHP256_HKDFSHA256_AESGCM256);

            // Generate server keys
            const serverEcKeyPair = await platform.generateECKeyPair();
            const serverMlKemKeys = hpke.generateMlKemKeys();

            // Convert ML-KEM public key to PEM format (simulating server-provided key)
            const pemMlKemPublicKey = encodeMlKemPublicKeyToPem(serverMlKemKeys.publicKey, MlKemVariant.ML_KEM_1024);

            const message = platform.getRandomBytes(32);

            // Encrypt using PEM-encoded ML-KEM public key
            const result = await hpke.encrypt(
                message,
                serverEcKeyPair.publicKey,
                pemMlKemPublicKey
            );

            expect(result.clientEcPublicKey.length).toBe(EC_PUBLIC_KEY_LENGTH);
            expect(result.mlKemEncapsulatedKey.length).toBe(ML_KEM_1024_CIPHERTEXT_LENGTH);

            // Decrypt (server uses raw private key)
            const decrypted = await hpke.decrypt(
                result.clientEcPublicKey,
                result.mlKemEncapsulatedKey,
                result.encryptedData,
                result.msgVersion,
                serverEcKeyPair.privateKey,
                serverEcKeyPair.publicKey,
                serverMlKemKeys.privateKey
            );

            expect(decrypted).toEqual(message);
        });
    });
});

describe('ML-KEM Transmission Keys', () => {
    beforeAll(() => {
        connectPlatform(browserPlatform);
    });

    it('decodes and encapsulates with all configured ML-KEM transmission keys', () => {
        const mlKemKeys = getKeeperMlKemKeys((source: string) => platform.base64ToBytes(source));

        // Test every key in the array
        mlKemKeys.forEach((keyData, keyId) => {
            if (!keyData || !isAllowedMlKemKeyId(keyId)) {
                return;
            }

            const variant = getKeeperMlKemKeyVariant(keyId);
            const expectedCiphertextLength = variant === MlKemVariant.ML_KEM_768
                ? ML_KEM_768_CIPHERTEXT_LENGTH
                : ML_KEM_1024_CIPHERTEXT_LENGTH;

            // Encapsulate to verify the key can be decoded and used
            const { ciphertext, sharedSecret } = mlKemEncapsulate(keyData, variant);

            expect(ciphertext.length).toBe(expectedCiphertextLength);
            expect(sharedSecret.length).toBe(EC_SHARED_SECRET_LENGTH);
        });
    });
});

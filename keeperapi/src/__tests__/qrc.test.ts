/**
 * @jest-environment jsdom
 */

// @ts-ignore
import crypto from 'crypto';
import { browserPlatform } from '../browser/platform';
import { TextEncoder, TextDecoder } from 'util';
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
} from '../qrc';
import { EC_PUBLIC_KEY_LENGTH, EC_SHARED_SECRET_LENGTH, ML_KEM_1024_CIPHERTEXT_LENGTH } from '../qrc/constants';
import { getKeeperMlKemKeys, getKeeperMlKemKeyVariant, isAllowedMlKemKeyId } from '../transmissionKeys';

Object.assign(global, { TextDecoder, TextEncoder });

// Set up crypto for both global.self (browser APIs) and globalThis (noble libraries)
const cryptoObj = {
    subtle: crypto.webcrypto.subtle,
    getRandomValues: (array: Uint8Array) => {
        const randomData = crypto.randomBytes(array.length);
        array.set(randomData);
        return array;
    },
};

Object.defineProperty(global.self, 'crypto', { value: cryptoObj });
Object.defineProperty(globalThis, 'crypto', { value: cryptoObj });

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
        // ML-KEM OIDs from NIST
        // ML-KEM-768: 2.16.840.1.101.3.4.4.2 -> 06 0B 60 86 48 01 65 03 04 04 02
        // ML-KEM-1024: 2.16.840.1.101.3.4.4.3 -> 06 0B 60 86 48 01 65 03 04 04 03
        const ML_KEM_768_OID = new Uint8Array([0x06, 0x0B, 0x60, 0x86, 0x48, 0x01, 0x65, 0x03, 0x04, 0x04, 0x02]);
        const ML_KEM_1024_OID = new Uint8Array([0x06, 0x0B, 0x60, 0x86, 0x48, 0x01, 0x65, 0x03, 0x04, 0x04, 0x03]);

        /**
         * Encodes a length in DER format
         */
        function encodeLength(length: number): Uint8Array {
            if (length < 128) {
                return new Uint8Array([length]);
            } else if (length < 256) {
                return new Uint8Array([0x81, length]);
            } else if (length < 65536) {
                return new Uint8Array([0x82, (length >> 8) & 0xFF, length & 0xFF]);
            } else {
                throw new Error('Length too large for DER encoding');
            }
        }

        /**
         * Wraps data in a DER SEQUENCE
         */
        function derSequence(...items: Uint8Array[]): Uint8Array {
            const content = concatUint8Arrays(...items);
            const lengthBytes = encodeLength(content.length);
            return concatUint8Arrays(new Uint8Array([0x30]), lengthBytes, content);
        }

        /**
         * Wraps data in a DER BIT STRING (with 0 unused bits)
         */
        function derBitString(data: Uint8Array): Uint8Array {
            const lengthBytes = encodeLength(data.length + 1); // +1 for unused bits byte
            return concatUint8Arrays(new Uint8Array([0x03]), lengthBytes, new Uint8Array([0x00]), data);
        }

        /**
         * Encodes a raw ML-KEM public key to PEM format (SubjectPublicKeyInfo)
         */
        function encodeMlKemPublicKeyToPem(rawPublicKey: Uint8Array, variant: MlKemVariant): Uint8Array {
            const oid = variant === MlKemVariant.ML_KEM_768 ? ML_KEM_768_OID : ML_KEM_1024_OID;

            // AlgorithmIdentifier: SEQUENCE { OID }
            const algorithmIdentifier = derSequence(oid);

            // SubjectPublicKeyInfo: SEQUENCE { AlgorithmIdentifier, BIT STRING }
            const spki = derSequence(algorithmIdentifier, derBitString(rawPublicKey));

            // Encode to base64 and wrap in PEM
            const base64 = platform.bytesToBase64(spki);

            // Format with line breaks every 64 characters
            const lines: string[] = [];
            for (let i = 0; i < base64.length; i += 64) {
                lines.push(base64.slice(i, i + 64));
            }

            const pemString = `-----BEGIN PUBLIC KEY-----\n${lines.join('\n')}\n-----END PUBLIC KEY-----`;
            return new TextEncoder().encode(pemString);
        }

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

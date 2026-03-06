/**
 * PEM encoding utilities for ML-KEM keys
 */

import { platform } from '../platform';
import { concatUint8Arrays } from './utils';
import { MlKemVariant } from './constants';

// ML-KEM OIDs from NIST
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
export function encodeMlKemPublicKeyToPem(rawPublicKey: Uint8Array, variant: MlKemVariant): Uint8Array {
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

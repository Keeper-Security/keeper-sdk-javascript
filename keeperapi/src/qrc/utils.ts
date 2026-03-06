/**
 * Utility functions for QRC implementation
 * Leverages existing platform utilities where possible
 */

import { platform } from "../platform";

/**
 * Concatenates multiple Uint8Arrays into a single Uint8Array
 * @param arrays - Arrays to concatenate
 * @returns Concatenated array
 */
export function concatUint8Arrays(...arrays: Uint8Array[]): Uint8Array {
    // Calculate total length
    const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);

    // Create result array
    const result = new Uint8Array(totalLength);

    // Copy each array into result
    let offset = 0;
    for (const arr of arrays) {
        result.set(arr, offset);
        offset += arr.length;
    }

    return result;
}

/**
 * Decodes a PEM-encoded key to DER format
 * @param pemKey - PEM-encoded key as Uint8Array
 * @returns DER-encoded key bytes
 */
function decodePem(pemKey: Uint8Array): Uint8Array {
    // Convert to string
    const pemString = new TextDecoder().decode(pemKey);

    // Check if it's actually PEM
    if (!pemString.includes('-----BEGIN')) {
        throw new Error('Invalid PEM format: missing BEGIN header');
    }

    // Extract base64 content between headers
    const base64Match = pemString.match(/-----BEGIN [^-]+-----\s*([A-Za-z0-9+/=\s]+)\s*-----END [^-]+-----/);
    if (!base64Match) {
        throw new Error('Invalid PEM format: could not extract base64 content');
    }

    // Remove whitespace from base64 string
    const base64 = base64Match[1].replace(/\s/g, '');

    // Convert base64 to bytes
    return platform.base64ToBytes(base64);
}

/**
 * Extracts raw ML-KEM public key bytes from PEM-encoded SubjectPublicKeyInfo or raw bytes
 *
 * Expected format: PEM-encoded (-----BEGIN PUBLIC KEY-----) or raw key bytes
 *
 * The PEM contains DER-encoded SubjectPublicKeyInfo:
 *   SEQUENCE {
 *     AlgorithmIdentifier (SEQUENCE with OID),
 *     BIT STRING containing raw public key
 *   }
 *
 * @param keyData - PEM-encoded ML-KEM public key or raw key bytes
 * @param expectedRawLength - Expected length of raw key (800, 1184, or 1568 bytes)
 * @returns Raw ML-KEM public key bytes
 */
export function extractRawMlKemPublicKey(keyData: Uint8Array, expectedRawLength: number): Uint8Array {
    // If the key is already the expected raw length, return it directly
    if (keyData.length === expectedRawLength) {
        return keyData;
    }

    // Otherwise, try to parse it as PEM
    const spkiDER = decodePem(keyData);
    const spki = parseDER(spkiDER);           // SEQUENCE (outer)
    const algId = parseDER(spki.data);         // SEQUENCE (AlgorithmIdentifier)
    const pubKey = parseDER(spki.data, algId.next); // BIT STRING
    const rawPublicKey = pubKey.data.subarray(1);            // skip unused-bits byte
    if (rawPublicKey.length !== expectedRawLength) {
        throw new Error(`Extracted key length ${rawPublicKey.length} does not match expected ${expectedRawLength}`);
    }
    // Ensure we return a proper Uint8Array (not a Buffer subarray if this is node)
    return new Uint8Array(rawPublicKey);
}

type DERElement = {
    tag: number;
    len: number;
    data: Uint8Array;
    next: number;
}

function parseDER(buf: Uint8Array, offset: number = 0): DERElement {
    const tag = buf[offset];
    let len = buf[offset + 1];
    let dataOffset = offset + 2;

    if (len & 0x80) {
        const lenBytes = len & 0x7f;
        len = 0;
        for (let i = 0; i < lenBytes; i++) {
            len = (len << 8) | buf[offset + 2 + i];
        }
        dataOffset += lenBytes;
    }

    return { tag, len, data: buf.subarray(dataOffset, dataOffset + len), next: dataOffset + len };
}

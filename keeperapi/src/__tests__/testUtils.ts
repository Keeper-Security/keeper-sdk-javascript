const base64UrlToBytes = (base64url: string): Uint8Array => {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4;
  const padded = pad ? base64 + '='.repeat(4 - pad) : base64;
  const buffer = Buffer.from(padded, 'base64');
  return new Uint8Array(buffer);
}

const jwkToUint8Arrays = (privateJwk: JsonWebKey, publicJwk: JsonWebKey) => {
  if (!privateJwk.d || !publicJwk.x || !publicJwk.y) {
    throw new Error('Invalid JWK: missing required parameters');
  }

  // Private key scalar 'd'
  const privateKey = base64UrlToBytes(privateJwk.d);

  // Public key as uncompressed EC point: 0x04 | X | Y
  const x = base64UrlToBytes(publicJwk.x);
  const y = base64UrlToBytes(publicJwk.y);

  const publicKey = new Uint8Array(1 + x.length + y.length);
  publicKey[0] = 0x04; // uncompressed point prefix
  publicKey.set(x, 1);
  publicKey.set(y, 1 + x.length);

  return { privateKey, publicKey };
}


export const generateTestEccKeyPair = async () => {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'ECDH',          // algorithm
      namedCurve: 'P-256',   // curve; can also be P-384, P-521
    },
    true,                    // extractable
    ['deriveBits']           // key usages
  );

  const privateJwk = await crypto.subtle.exportKey('jwk', keyPair.privateKey);
  const publicJwk = await crypto.subtle.exportKey('jwk', keyPair.publicKey);

  return jwkToUint8Arrays(privateJwk, publicJwk)
}
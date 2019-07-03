// Random number generator - requires a PRNG backend, e.g. prng4.js

// For best results, put code like
// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
// in your main HTML document.

function rng_get_bytes(ba) {
    let data = new Uint8Array(ba.length);
    crypto.getRandomValues(data);
    for(let i = 0; i < ba.length; ++i) ba[i] = data[i];
}

export function SecureRandom() {}

SecureRandom.prototype.nextBytes = rng_get_bytes;

/**
 * Jest setup file for jsdom environment
 * This file is automatically loaded before each test file runs
 */

// @ts-ignore
import crypto from 'crypto'
import { TextEncoder, TextDecoder } from 'util'

// Set up global TextEncoder and TextDecoder for jsdom environment
Object.assign(global, { TextDecoder, TextEncoder })

// Set up crypto object with Web Crypto API for both browser and node environments
const cryptoObj = {
    subtle: crypto.webcrypto.subtle,
    getRandomValues: (array: Uint8Array) => {
        const randomData = crypto.randomBytes(array.length)
        array.set(randomData)
        return array
    }
}

// Set up crypto for global.self (browser APIs) - only if self exists (jsdom environment)
if (typeof global.self !== 'undefined') {
    Object.defineProperty(global.self, 'crypto', { value: cryptoObj })
}

// Set up crypto for globalThis (noble libraries)
Object.defineProperty(globalThis, 'crypto', { value: cryptoObj })

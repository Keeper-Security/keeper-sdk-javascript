export function utf8ToBase64Url(s: string): string {
    const bytes = new TextEncoder().encode(s)
    let b64: string
    if (typeof Buffer !== 'undefined') {
        b64 = Buffer.from(bytes).toString('base64')
    } else {
        let bin = ''
        for (let i = 0; i < bytes.length; i++) {
            bin += String.fromCharCode(bytes[i]!)
        }
        b64 = globalThis.btoa(bin)
    }
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function recordUid(rec: { uid?: string }): string {
    return rec.uid || '(unknown uid)'
}

export function webSafe64(source: string) {
    return source.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function normal64(source: string) {
    return source.replace(/-/g, '+').replace(/_/g, '/') + '=='.substring(0, (3 * source.length) % 4);
}

export function isTwoFactorResultCode(resultCode: string): boolean {
    return ["need_totp", "invalid_device_token", "invalid_totp"].includes(resultCode);
}

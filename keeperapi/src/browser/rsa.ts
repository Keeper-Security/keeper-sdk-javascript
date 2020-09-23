import {BigInteger, parseBigInt} from "./jsbn";
import {SecureRandom} from "./rng";
import {_rsapem_getHexValueArrayOfChildrenFromHex} from './asn1hex';
// Depends on jsbn.js and rng.js

// Version 1.1: support utf-8 encoding in pkcs1pad2

function linebrk(s,n) {
    var ret = "";
    var i = 0;
    while(i + n < s.length) {
        ret += s.substring(i,i+n) + "\n";
        i += n;
    }
    return ret + s.substring(i,s.length);
}

function byte2Hex(b) {
    if(b < 0x10)
        return "0" + b.toString(16);
    else
        return b.toString(16);
}

// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s,n) {
    if(n < s.length + 11) { // TODO: fix for utf-8
        alert("Message too long for RSA");
        return null;
    }
    var ba = new Array();
    var i = s.length - 1;
    while(i >= 0 && n > 0) {
        var c = s.charCodeAt(i--);
        if(c < 128) { // encode using utf-8
            ba[--n] = c;
        }
        else if((c > 127) && (c < 2048)) {
            ba[--n] = (c & 63) | 128;
            ba[--n] = (c >> 6) | 192;
        }
        else {
            ba[--n] = (c & 63) | 128;
            ba[--n] = ((c >> 6) & 63) | 128;
            ba[--n] = (c >> 12) | 224;
        }
    }
    ba[--n] = 0;
    var rng = new SecureRandom();
    var x = new Array();
    while(n > 2) { // random non-zero pad
        x[0] = 0;
        while(x[0] == 0) rng.nextBytes(x);
        ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba);
}

// "empty" RSA key constructor
export function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null;
}

// Set the public key fields N and e from hex strings
function RSASetPublic(N,E) {
    if(N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N,16);
        this.e = parseInt(E,16);
    }
    else
        alert("Invalid RSA public key");
}

// Perform raw public operation on "x": return x^e (mod n)
function RSADoPublic(x) {
    return x.modPowInt(this.e, this.n);
}

function RSADoPrivate(x) {
    if(this.p == null || this.q == null)
        return x.modPow(this.d, this.n);

    // TODO: re-calculate any missing CRT params
    var xp = x.mod(this.p).modPow(this.dmp1, this.p);
    var xq = x.mod(this.q).modPow(this.dmq1, this.q);

    while(xp.compareTo(xq) < 0)
        xp = xp.add(this.p);
    return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
}

// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
function RSAEncrypt(text) {
    var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
    if(m == null) return null;
    var c = this.doPublic(m);
    if(c == null) return null;
    var h = c.toString(16);
    if((h.length & 1) == 0) return h; else return "0" + h;
}

// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
//function RSAEncryptB64(text) {
//  var h = this.encrypt(text);
//  if(h) return hex2b64(h); else return null;
//}


// Binary safe pkcs1 type 2 padding
function pkcs1pad2hex(hexPlaintext,n) {
    if(n < hexPlaintext.length/2 + 11) {
        alert("Message too long for RSA");
        return null;
    }
    var ba = new Array();
    var i = hexPlaintext.length;
    while(i >= 2 && n > 0) {
        ba[--n] = parseInt(hexPlaintext.slice(i-2, i), 16);
        i -= 2;
    }
    ba[--n] = 0;
    var rng = new SecureRandom();
    var x = new Array();
    while(n > 2) { // random non-zero pad
        x[0] = 0;
        while(x[0] == 0) rng.nextBytes(x);
        ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba);
}

//Binary safe pkcs1 type 2 un-padding
function pkcs1unpad2hex(d,n) {
    var b = d.toByteArray();
    var i = 0;
    while(i < b.length && b[i] == 0) ++i;
    if(b.length-i != n-1 || b[i] != 2)
        return null;
    ++i;
    while(b[i] != 0)
        if(++i >= b.length) return null;
    var ret = "";
    while(++i < b.length) {
        var c = b[i] & 255;
        ret += (c < 16) ? '0' + c.toString(16) : c.toString(16);
    }
    return ret;
}

/**
 * Generates a ASN.1 Hex string.
 * @param {boolean} include_private Set to true to include the private bits as well.
 * @returns
 */
function RSAtoASN1Hex (include_private) {
    var v = asn('00');
    var n = asn(this.n.toString(16));
    var e = asn(this.e.toString(16));
    var d = asn(this.d.toString(16));
    var p = asn(this.p.toString(16));
    var q = asn(this.q.toString(16));
    var dmp1 = asn(this.dmp1.toString(16));
    var dmq1 = asn(this.dmq1.toString(16));
    var coeff = asn(this.coeff.toString(16));

    if (typeof include_private !== 'undefined' && include_private)
        return asn(v + n + e + d + p + q + dmp1 + dmq1 + coeff, '30');
    else
        return asn(n + e, '30');


    function asn (data?, type?) {
        if (typeof type === 'undefined') type = '02';

        // Pad the data with a leading '0' if necessary
        data = (data.length % 2 === 0) ? data : '0' + data;

        // Pad the data again with a '00' to ensure its positive.  Some parser
        // stupid implementations will freak out on negative RSA bits.
        if (parseInt(data.substr(0,2), 16) > 127)
            data = '00' + data;

        return type + asn_length(data) + data;
    }

    function asn_length (item) {
        var length = item.length / 2;   // We're dealing with hex here
        var length_hex = (length.toString(16).length % 2 === 0) ? length.toString(16) : '0' + length.toString(16);

        if (length < 128) {
            return length_hex;
        } else {
            var length_length = 128 + length_hex.length / 2;
            var length_length_hex = (length_length.toString(16).length % 2 === 0) ? length_length.toString(16) : '0' + length_length.toString(16);

            return length_length_hex + length_hex;
        }
    }
}

function RSAEncryptBinary(hex) {
    var m = pkcs1pad2hex(hex,(this.n.bitLength()+7)>>3);
    if(m == null) return null;
    var c = this.doPublic(m);
    if(c == null) return null;
    var h = c.toString(16);
    if((h.length & 1) == 0) return h; else return "0" + h;
}

function RSADecryptBinary(ctext) {
    var c = parseBigInt(ctext, 16);
    var m = this.doPrivate(c);
    if(m == null) return null;
    return pkcs1unpad2hex(m, (this.n.bitLength()+7)>>3);
}

function RSASetPrivateEx(N,E,D,P,Q,DP,DQ,C) {
    if(N != null && E != null && N.length > 0 && E.length > 0) {
        this.n = parseBigInt(N,16);
        this.e = parseInt(E,16);
        this.d = parseBigInt(D,16);
        this.p = parseBigInt(P,16);
        this.q = parseBigInt(Q,16);
        this.dmp1 = parseBigInt(DP,16);
        this.dmq1 = parseBigInt(DQ,16);
        this.coeff = parseBigInt(C,16);
    }
    else
        alert("Invalid RSA private key");
}

function RSASetPrivateKeyFromASN1HexString(keyHex) {
    const a = _rsapem_getHexValueArrayOfChildrenFromHex(keyHex);
    this.setPrivateEx(a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
}

// protected
RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.doPrivate = RSADoPrivate;

// public
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
//RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

RSAKey.prototype.encryptBinary = RSAEncryptBinary;
RSAKey.prototype.decryptBinary = RSADecryptBinary;
RSAKey.prototype.toASN1HexString = RSAtoASN1Hex;
RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
RSAKey.prototype.setPrivateKeyFromASN1HexString = RSASetPrivateKeyFromASN1HexString;


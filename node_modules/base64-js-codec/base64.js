/** @license MIT License (c) copyright 2013 original author or authors */

/**
 * base64.js
 *
 * JavaScript Base64 codec for WebBrowser
 *
 * @author Andrey Zaytsev <za@zalab.net>
 */

;(function (define) {
define('base64', [], function() {

var fromCharCode = String.fromCharCode;

function encodeUTF8(str) {
    // Normalize line endings.
    str = str.replace(/\r\n/g, '\n');

    // Encode each character.
    var utftext = '';
    for (var i = 0, c; i < str.length; i++) {
        c = str.charCodeAt(i);
        if (c < 128) {
            utftext += fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
            utftext += fromCharCode((c >> 6) | 192);
            utftext += fromCharCode((c & 63) | 128);
        }
        else {
            utftext += fromCharCode((c >> 12) | 224);
            utftext += fromCharCode(((c >> 6) & 63) | 128);
            utftext += fromCharCode((c & 63) | 128);
        }
    }

    // Return the encoded UTF8 string.
    return utftext;
}

function decodeUTF8(utftext) {
    var str = '', i = 0, c1, c2, c3;
    while (i < utftext.length) {
        c1 = utftext.charCodeAt(i);
        if (c1 < 128) {
            str += fromCharCode(c1);
            i++;
        }
        else if ((c1 > 191) && (c1 < 224)) {
            c2 = utftext.charCodeAt(i + 1);
            str += fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            str += fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return str;
}


var btoa = window.btoa, // It turns binary data to base64-encoded ascii.
    atob = window.atob, // It turns base64-encoded ascii data back to binary.
    reCheck = /[^A-Za-z0-9\+\/=]/g;

if (!btoa || !atob) {
    // old IE < 10
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    btoa = function(str) {
        var r = '', c1, c2, c3, e1, e2, e3, e4, i = 0;
        while (i < str.length) {
            c1 = str.charCodeAt(i++);
            c2 = str.charCodeAt(i++);
            c3 = str.charCodeAt(i++);
    
            e1 = c1 >> 2;
            e2 = ((c1 & 3) << 4) | (c2 >> 4);
            e3 = ((c2 & 15) << 2) | (c3 >> 6);
            e4 = c3 & 63;
    
            if (isNaN(c2)) {
                e3 = e4 = 64;
            }
            else if (isNaN(c3)) {
                e4 = 64;
            }
    
            r = r + alphabet.charAt(e1) + alphabet.charAt(e2) + alphabet.charAt(e3) + alphabet.charAt(e4);
        }
        return r;
    };

    atob = function(str) {
        var r = '', i = 0, c1, c2, c3, e1, e2, e3, e4;
        if (str.length % 4 !== 0 || reCheck.test(str)) {
            throw new Error('The string to be decoded is not correctly encoded.');
        }
        while (i < str.length) {
            e1 = alphabet.indexOf(str.charAt(i++));
            e2 = alphabet.indexOf(str.charAt(i++));
            e3 = alphabet.indexOf(str.charAt(i++));
            e4 = alphabet.indexOf(str.charAt(i++));
    
            c1 = (e1 << 2) | (e2 >> 4);
            c2 = ((e2 & 15) << 4) | (e3 >> 2);
            c3 = ((e3 & 3) << 6) | e4;
    
            r = r + fromCharCode(c1);
    
            if (e3 != 64) {
                r = r + fromCharCode(c2);
            }
            if (e4 != 64) {
                r = r + fromCharCode(c3);
            }
        }
        return r;
    };
}

var mapURI = {
    "+": "-",
    "/": "_",
    "=": "",
    "-": "+",
    "_": "/"
};

function encodeURI(str) {
    return str.replace(/[+\/=]/g, function(c) {
        return mapURI[c];
    });
}

function decodeURI(str) {
    str = str.replace(/[\-_]/g, function(c) {
        return mapURI[c];
    });
    while (str.length % 4 !== 0) {
        str += '=';
    }
    return str;
}

function encode(str, urisafe) {
    str = btoa(encodeUTF8(str));
    return urisafe ? encodeURI(str) : str;
}

function decode(str, urisafe) {
    return decodeUTF8(atob(urisafe ? decodeURI(str) : str));
}

return {
    _internal: {
        encodeUTF8: encodeUTF8,
        decodeUTF8: decodeUTF8,
        encodeURI: encodeURI,
        decodeURI: decodeURI
    },

    version: "1.0.0",

    encode: encode,
    decode: decode,

    btoa: btoa,
    atob: atob,

    extendString: function() {
        var defProp;
        if (Object.defineProperty) {
            defProp = function(name, method) {
                Object.defineProperty(String.prototype, name, { value: method, enumerable: false, writable: true, configurable: true });
            };
        }
        else {
            defProp = function(name, method) {
                String.prototype[name] = method;
            };
        }

        defProp('toBase64', function(urisafe) {
            return encode(this, urisafe);
        });
        defProp('fromBase64', function(urisafe) {
            return decode(this, urisafe);
        });
    }
};

});
})(typeof define === 'function' && define.amd ? define : function(name, deps, factory) {
    var _base64 = window.base64,
        base64 = factory();
    window.base64 = base64;
    base64.noConflict = function() {
        window.base64 = _base64;
        return base64;
    };
});

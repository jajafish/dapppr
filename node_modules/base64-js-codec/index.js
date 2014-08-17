/** @license MIT License (c) copyright 2013 original author or authors */

/**
 * base64/index.js
 *
 * JavaScript Base64 codec for Node.js
 *
 * @author Andrey Zaytsev <za@zalab.net>
 */

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
    str = (str instanceof Buffer ? str : new Buffer(str + '', 'utf8')).toString('base64');
    return urisafe ? encodeURI(str) : str;
}

function decode(str, urisafe) {
    return (new Buffer(urisafe ? decodeURI(str) : str, 'base64')).toString('utf8');
}

module.exports = {
    _internal: {
        encodeURI: encodeURI,
        decodeURI: decodeURI
    },

    version: "1.0.0",

    encode: encode,
    decode: decode
};
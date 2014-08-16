describe('base64', function() {

    var assert = require('assert');
    var base64 = require(typeof window !== 'undefined' ? 'base64' : '../index.js');

    it('Latin string', function() {
        assert.equal(base64.encode('Hello, World!'), 'SGVsbG8sIFdvcmxkIQ==', 'encode');
        assert.equal(base64.decode('SGVsbG8sIFdvcmxkIQ=='), 'Hello, World!', 'decode');
    });

    it('UTF-8 string with 2 bytes chars', function() {
        assert.equal(base64.encode('Привет, Мир!'), '0J/RgNC40LLQtdGCLCDQnNC40YAh', 'encode');
        assert.equal(base64.decode('0J/RgNC40LLQtdGCLCDQnNC40YAh'), 'Привет, Мир!', 'decode');
    });

    it('UTF-8 string with 3 bytes chars', function() {
        assert.equal(base64.encode('Hello, 世界'), 'SGVsbG8sIOS4lueVjA==', 'encode');
        assert.equal(base64.decode('SGVsbG8sIOS4lueVjA=='), 'Hello, 世界', 'decode');
    });

    it('URI safe coding', function() {
        assert.equal(base64.encode('ab>rt?ee>r', true), 'YWI-cnQ_ZWU-cg', 'encode');
        assert.equal(base64.decode('YWI-cnQ_ZWU-cg', true), 'ab>rt?ee>r', 'decode');
    });

});
#base64js

JavaScript Base64 codec

## Installing

For Node.js

```
npm install base64-js-codec
```
```js
var base64 = require('base64-js-codec');
```

For browser

```
bower install base64js
```
```html
<script src="base64js/base64.js"></script>
```

## API

### base64.encode(text, [ urisafe ])

* `text` string. Text for encoding to Base64 string.
* `urisafe` boolean, optional. If true a result will be URI Safe Base64. This function encodes to the [RFC 4648](http://en.wikipedia.org/wiki/Base64#RFC_4648) Spec where `'+'` is encoded as `'-'` and `'/'` is encoded as `'_'`. The padding character `'='` is removed.
 
### base64.decode(text, [ urisafe ])

* `text` string. Base64 string for decoding.
* `urisafe` boolean, optional. Must be true for decoding of URI Safe Base64 string.

## Usage

```js
// Classic Base64
var encoded = base64.encode('Hello, World!'); // => 'SGVsbG8sIFdvcmxkIQ=='
var decoded = base64.encode('SGVsbG8sIFdvcmxkIQ=='); // => 'Hello, World!'

// URI-safe encoding
var component = base64.encode('ab>rt?ee>r', true); // => 'YWI-cnQ_ZWU-cg', no need encodeURIComponent applying
var value base64.decode('YWI-cnQ_ZWU-cg', true); // => 'ab>rt?ee>r', second parameter must be true
```

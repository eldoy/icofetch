# Icofetch

Fetch favicon images from web sites.

### Install

```
npm i icofetch
```

### Usage

```js
const icofetch = require('icofetch')

// Store file in current directory
await icofetch('https://example.com')

// Store file in specified path
await icofetch('https://example.com', { dir: os.tmpdir() })
```

MIT Licensed. Enjoy!

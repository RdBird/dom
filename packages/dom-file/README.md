[<img src="https://rawgit.com/RdBird/rdbird.io/master/RDBIRD_logo.svg" alt="RdBird Project" height="40" />](//rdbird.io)

# DOM File

[![NPM Version][package-version-svg]][package-url] 
[![Build Status][circleci-svg]][circleci-url] 
[![License][license-image]][license-url]

Promise based module to read DOM Blob content

## Getting started

### Installation
```sh
npm install @rdbird/dom-file --save
```

### Flow support

Every `.js` file provides a flow definition file `.js.flow` containing type annotations.

### Usage
```javascript
import { readAsDataURL } from '@rdbird/dom-file';

async function readData(blobFile: Blob) {
  const dataURLContent = await readAsDataURL(blobFile);
  // Do something...
  return dataURLContent;
}
```

## License

This project is licensed under the MIT License

## Aknowledgements

* Inspired by [https://github.com/jahredhope/promise-file-reader]()

[package-version-svg]: https://img.shields.io/npm/v/@rdbird/dom-file.svg?style=flat-square
[package-url]: https://www.npmjs.com/package/@rdbird/dom-file
[circleci-svg]: https://circleci.com/gh/RdBird/dom.svg?style=shield
[circleci-url]: https://circleci.com/gh/RdBird/dom
[license-image]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE

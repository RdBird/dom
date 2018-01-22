[<img src="https://rawgit.com/RdBird/rdbird.io/master/RDBIRD_logo.svg" alt="RdBird Project" height="40" />](//rdbird.io)

# DOM File

[![NPM Version][package-version-svg]][package-url] 
[![Build Status][circleci-svg]][circleci-url] 
[![License][license-image]][license-url]

Promise based module to read DOM Blob content

## Installation
```sh
npm install @rdbird/dom-file --save
```

## Usage
```javascript
import { readAsDataURL } from '@rdbird/dom-file';

async function readData(blobFile: Blob) {
  const dataURLContent = await readAsDataURL(blobFile);
  // Do something...
  return dataURLContent;
}
```
[package-version-svg]: https://img.shields.io/npm/v/@rdbird/dom-file.svg?style=flat-square
[package-url]: https://www.npmjs.com/package/@rdbird/dom-file
[circleci-svg]: https://circleci.com/gh/RdBird/dom.svg?style=shield
[circleci-url]: https://circleci.com/gh/RdBird/dom
[license-image]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE

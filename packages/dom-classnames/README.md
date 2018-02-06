[<img src="https://rawgit.com/RdBird/rdbird.io/master/RDBIRD_logo.svg" alt="RdBird Project" height="40" />](//rdbird.io)

# DOM Classname helper

[![NPM Version][package-version-svg]][package-url] 
[![Build Status][circleci-svg]][circleci-url] 
[![License][license-image]][license-url]

The goal of this project is to experiment and improve on a simple project all rdbird build/test system.

## Getting started

### Installation

```sh
npm install @rdbird/dom-classnames --save
```
### Flow support

Every `.js` file provides a flow definition file `.js.flow` containing type annotations.

### Usage

```javascript
import classNames from '@rdbird/dom-classnames';

classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```

## License

This project is licensed under the MIT License

## Aknowledgements

*   Rewrite of [https://github.com/JedWatson/classnames]()


[package-version-svg]: https://img.shields.io/npm/v/@rdbird/dom-classnames.svg?style=flat-square
[package-url]: https://www.npmjs.com/package/@rdbird/dom-classnames
[circleci-svg]: https://circleci.com/gh/RdBird/dom.svg?style=shield
[circleci-url]: https://circleci.com/gh/RdBird/dom
[license-image]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE

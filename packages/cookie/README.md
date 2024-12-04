[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

[npm-version-src]: https://img.shields.io/npm/v/@curong/cookie?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@curong/cookie
[npm-downloads-src]: https://img.shields.io/npm/dm/@curong/cookie?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@curong/cookie
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@curong/cookie?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@curong/cookie
[license-src]: https://img.shields.io/github/license/wtklbm/curong.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/wtklbm/curong/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@curong/cookie

# `@curong/cookie`

`@curong/cookie` 包含以下方法:

## `cookie`

- `createCookie`: 通过设置 `name`、`value` 和 `options` 属性配置，生成一个 `cookie` 字符串
- `parseCookie`: 解析 `cookie`, 把 `cookie` 字符串转换为`key: value` 形式的 `cookie` 对象

## `setCookie`

- `joinSetCookie`:  将解析后的 `set-cookie` 对象转换为一个 `key=value; key=value` 形式的 `cookie` 字符串
- `parseSetCookie`: 解析 `set-cookie` 字符串数组
- `splitSetCookie`: 将以逗号合并在一起的 `set-cookie` 字符串转换为 `set-cookie` 字符串数组

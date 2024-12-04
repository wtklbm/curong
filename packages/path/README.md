[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

[npm-version-src]: https://img.shields.io/npm/v/@curong/path?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@curong/path
[npm-downloads-src]: https://img.shields.io/npm/dm/@curong/path?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@curong/path
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@curong/path?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@curong/path
[license-src]: https://img.shields.io/github/license/wtklbm/curong.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/wtklbm/curong/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@curong/path

# `@curong/path`

`@curong/path` 主要包含以下的方法:

- `normalize`: 标准化字符串路径
- `toAbsolute`: 将路径转换为绝对路径
- `unifiedSeparator`: 统一路径分隔符，将所有的分隔符转换为 `/`

## `windows`

- `isWindowsExtendedLengthPath`: 是不是一个 `Windows` 的扩展长度路径
- `isWindowsPath`: 是否为合法的 `Windows` 路径地址
- `windowsPathSource`: 验证 `Windows` 路径的正则字符串

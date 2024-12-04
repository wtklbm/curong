[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

[npm-version-src]: https://img.shields.io/npm/v/@curong/number?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@curong/number
[npm-downloads-src]: https://img.shields.io/npm/dm/@curong/number?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@curong/number
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@curong/number?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@curong/number
[license-src]: https://img.shields.io/github/license/wtklbm/curong.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/wtklbm/curong/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@curong/number

# `@curong/number`

`@curong/number` 主要包含以下的方法:

- `inRange`: 判断一个数字的值是否在指定的范围内
- `random`: 生成一个不安全的随机浮点数
- `randomSafe`: 生成一个安全的随机浮点数
- `range`: 生成一个从开始位置到结束位置的不安全的随机整数
- `rangeSafe`: 生成一个从开始位置到结束位置的安全的随机整数
- `stringify`: 将数字转换为字符串
- `toFiniteNumber`: 将值转换为有限数值。如果无法转换为有限数值，则返回默认值
- `toInt`: 将给定的值转换为整数
- `withDelimiter`: 将数字或数字字符串格式化为带有分隔符的样式

## `amount`

-  `amountInWords`: 将金额转换为中文大写的样式

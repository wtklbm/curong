[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

[npm-version-src]: https://img.shields.io/npm/v/@curong/term?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@curong/term
[npm-downloads-src]: https://img.shields.io/npm/dm/@curong/term?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@curong/term
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@curong/term?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@curong/term
[license-src]: https://img.shields.io/github/license/wtklbm/curong.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/wtklbm/curong/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@curong/term

# `@curong/term`

`@curong/term` 主要包含以下的方法:

- `ansiFormat`: 使用 `ANSI` 转义序列来格式化一段在终端使用的文本字符串
- `colorCode8bit`: 使用从0到255的任意数字生成8位的终端颜色代码
- `colorCode24bit`: 根据 `RGB` 数组，使用从0到255的任意数字生成24位的终端颜色代码
- `colorNameCode3bit`: 通过颜色名生成3位的终端颜色代码
- `colorNameCode8bit`: 通过颜色名生成8位的终端颜色代码
- `colorNameCode24bit`: 通过颜色名生成24位的终端颜色代码
- `fontColor`: 创建一个在终端使用的带有样式的字符串
- `format`: 根据传递的内容来格式化用于终端调试的文本信息
- `formatFromError`: 将 `Error` 对象格式为用于终端调试的文本信息
- `printError`: 在终端打印一段错误消息
- `printInfo`: 在终端打印一段文本消息
- `printWarn`: 在终端打印一段警告消息
- `ProgressBar`: 终端进度条
- `readByQuestion`: 从终端中读取用户输入的内容

`@curong/term` 还包含一些控制序列，通过控制序列可以用来在终端中移动光标和滚动屏幕，还可以对一行上的内容进行操作。

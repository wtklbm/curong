[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

[npm-version-src]: https://img.shields.io/npm/v/@curong/regexp?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@curong/regexp
[npm-downloads-src]: https://img.shields.io/npm/dm/@curong/regexp?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@curong/regexp
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@curong/regexp?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@curong/regexp
[license-src]: https://img.shields.io/github/license/wtklbm/curong.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/wtklbm/curong/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@curong/regexp

# `@curong/regexp`

`@curong/regexp` 主要包含以下的方法：

- `execAll`: 循环遍历 `RegExp.exec` 方法捕获到的内容
- `mapReplace`: 使用一组正则表达式来替换字符串中的内容
- `matchNextIndex`: 获取正则匹配对象的当前项的下一个字符的开始索引位置
- `testEvery`: 使用一组正则来验证一个字符串是否符合预期
- `testSome`: 使用一组正则来验证一个字符串是否符合预期

## `account`

- `isChinaIdCard`: 是不是一个中国的 `18` 位身份证号码
- `isChinaMobilePhone`: 是不是一个中国的手机号码
- `isEmail`: 是否为合法的邮箱地址

包含以下属性:

- `email`: 验证邮箱的正则字符串

## `character`

- `isASCII`: 是不是一个 ASCII 字符串
- `isCharacter`: 是不是一个字母字符串 (包括小写字母 `a-z` 和大写字母 `A-Z`)
- `isDigit`: 是不是一个由 `0-9` 组成的数字或数字字符串
- `isLowerCase`: 是不是一个由 `a-z` 组成的小写字母字符串
- `isUpperCase`: 是不是一个由 `A-Z` 组成的大写字母字符串

## `crypto`

- `isBase64`: 是不是一个 `base64`

## `id`

- `isCUID`: 是不是一个 `cuid`
- `isCUID2`: 是不是一个 `cuid2`
- `isNanoID`: 是不是一个 `nanoid`
- `isULID`: 是不是一个 `ulid`
- `isUUID`: 是不是一个 `uuid`

包含以下属性:

- `cuid`: 验证 `cuid` 的正则字符串
- `cuid2`: 验证 `cuid2` 的正则字符串
- `nanoid`: 验证 `nanoid` 的正则字符串
- `ulid`: 验证 `ulid` 的正则字符串
- `uuid`: 验证 `uuid` 的正则字符串

## `net`

- `isIP`: 是不是一个 `IP` 地址
- `isIPv4`: 是不是一个 `IPv4` 地址
- `isIPv6`: 是不是一个 `IPv6` 地址
- `isPort`: 是不是一个端口号，即 `0` 到 `65535` 之间的正整数

包含以下属性:

- `ip`: 验证 `IP` 地址的正则字符串
- `ipv4`: 验证 `IPv4` 地址的正则字符串
- `ipv6`: 验证 `IPv6` 地址的正则字符串

## `unicode`

- `inChinese`: 是否包含中文汉字
- `inChkPunctuation`: 是否包含中日韩标点符号
- `inJapanese`: 是否包含日文
- `inEmoji`: 是否包含表情符号

主要包含以下的属性：

- `ascii`: 验证 `ASCII` 的正则字符串
- `blank`: 验证所有的空白字符的正则字符串，比如空格
- `chkPunctuation`: 验证中日韩的标点符号的正则字符串
- `control`: 验证所有的控制字符的正则字符串，包含 `\r`、`\n`、`\t` 等等
- `emoji`: 验证 `Emoji` 的正则表达式字符串
- `han`: 验证汉文的正则字符串 (包含特殊字符)
- `hiragana`: 验证平假名的正则字符串
- `ideographic`: 验证与汉语书写相关的其他表意文字
- `japanese`: 验证日文的正则字符串
- `katakana`: 验证片假名的正则字符串
- `korean`: 验证韩文的正则字符串
- `punctuation`: 验证所有的标点符号的正则字符串
- `surrogatePair`: 验证 `Unicode` 代理对 (`surrogate pair`) 的正则字符串
- `unifiedIdeograph`: 验证中文汉字的正则字符串

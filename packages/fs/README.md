[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

[npm-version-src]: https://img.shields.io/npm/v/@curong/fs?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@curong/fs
[npm-downloads-src]: https://img.shields.io/npm/dm/@curong/fs?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@curong/fs
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@curong/fs?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@curong/fs
[license-src]: https://img.shields.io/github/license/wtklbm/curong.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/wtklbm/curong/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@curong/fs

# `@curong/fs`

`@curong/fs` 包含以下方法：

## `copy`

- `copy`: 将内容从 `fromPath` 拷贝到 `toPath`
- `copyFile`: 把一个文件，从一个目录拷贝到另一个目录中
- `copySymbolicLink`: 将一个符号链接拷贝到另一个路径

## `create`

- `mkdir`: 创建一个文件夹

## `diff`

- `diffFile`: 比较两个文件的内容是否相等

## `find`

- `findDir`: 从一个文件夹中查找指定的文件夹

## `is`

- `exists`: 指定路径的文件是不是存在
- `isDir`: 是不是一个文件夹
- `isFile`: 是不是一个文件
- `isFileOrDir`: 是不是一个文件或目录
- `isSymbolicLink`: 是不是一个符号链接

## `move`

- `destPath`: 获取目标路径和目标文件夹
- `move`: 将文件或文件夹移动到新的位置

## `read`

- `readDir`: 获取一个文件夹的所有文件名的列表
- `readFile`: 将文件的内容读取为指定格式的字符串
- `readFragment`: 从一个文件中读取一段长度的内容
- `readline`: 一行一行地读取文本中的内容
- `readlineFromCode`: 一行一行地读取源代码中的文本内容
- `readlineStream`: 基于流的形式一行一行的读取文件的内容
- `readLnk`: 解析 `lnk` 文件的原始地址
- `readSymbolicLink`: 读取符号链接所指向的原始路径

## `remove`

- `clearDir`: 清空一个文件夹
- `rm`: 删除一个文件或一个文件夹
- `trimUtf8Bom`: 删除字节顺序标记 (BOM)，编码为 `0xFEFF`

## `write`

- `writeFile`: 将数据写入到文件
- `Writer`: 具有原子写入的、带有锁机制的、支持重试的超快速异步文件写入器

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

[npm-version-src]: https://img.shields.io/npm/v/@curong/os?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@curong/os
[npm-downloads-src]: https://img.shields.io/npm/dm/@curong/os?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@curong/os
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@curong/os?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@curong/os
[license-src]: https://img.shields.io/github/license/wtklbm/curong.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/wtklbm/curong/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@curong/os

# `@curong/os`

`@curong/os` 主要包含以下的方法:

- `asyncKill`: 终止进程树中的所有进程，包括根进程
- `isLocal`: 是不是一个区域设置字符串
- `kill`: 终止进程树中的所有进程，包括根进程

## `windows`

- `appendCmd`: 获取执行的命令名称(名字 + 后缀)，进行命令的跨平台兼容处理
- `findWindowsTask`: 查找正在运行的 `Windows` 系统平台上的映像进程
- `killWindowsTask`: 结束一个正在运行的 `Windows` 系统平台上的映像进程
- `windowsLocal`: 获取 `Windows` 系统的区域语言设置
- `windowsMakeShortcut`: 创建 Windows 系统的快捷方式文件 (.link)
- `windowsTaskList`: 获取 `Windows` 平台上正在运行的映像进程列表

## 包含以下的属性:

- `isWindows`: 是不是 `Windows` 系统平台
- `isMacOS`: 是不是 `macOS` 系统平台
- `isLinux`: 是不是 `Linux` 系统平台
- `isWSL`: 是不是 `Windows` 系统平台上的 `Linux` 子系统

# `@curong/os`


`@curong/os` 主要包含以下的方法:

- `appendCmd`: 获取执行的命令名称(名字 + 后缀)，进行命令的跨平台兼容处理
- `findWindowsTask`: 查找正在运行的 `Windows` 系统平台上的映像进程
- `killWindowsTask`: 结束一个正在运行的 `Windows` 系统平台上的映像进程
- `windowsLocal`: 获取 `Windows` 系统的区域语言设置
- `windowsTaskList`: 获取 `Windows` 平台上正在运行的映像进程列表


`@curong/os` 主要包含以下的属性:

- `isWindows`: 是不是 `Windows` 系统平台
- `isMacOS`: 是不是 `macOS` 系统平台
- `isLinux`: 是不是 `Linux` 系统平台
- `isWSL`: 是不是 `Windows` 系统平台上的 `Linux` 子系统

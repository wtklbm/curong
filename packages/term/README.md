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
- `printError`: 在终端打印一段错误消息
- `printInfo`: 在终端打印一段文本消息
- `printWarn`: 在终端打印一段警告消息
- `ProgressBar`: 终端进度条

`@curong/term` 还包含一些控制序列，通过控制序列可以用来在终端中移动光标和滚动屏幕，还可以对一行上的内容进行操作。

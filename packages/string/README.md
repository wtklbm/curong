# `@curong/string`


`@curong/string` 主要包含以下的方法:

- `multiReplace`: 根据一组规则替换字符串的内容
- `parseJson`: 将 `JSON` 格式的字符串转换为一个 `JavaScript` 对象

## `bytes`

- `bytesArray`: 将 `UTF-8` 字符串转换为字节数组
- `bytesLength`: 计算 `UTF-8`、`UTF-16` 的字符串编码长度，计算的长度值与 `Buffer.from(str).length` 等同
- `formatBytesSize`: 将字节数格式化为更易读的字符串表示形式，支持 `SI` 或 `IEC` 单位制，并允许指定小数位数
- `parseBytesSize`: 解析字节字符串并将其转换为数字表示的字节数
- `splitByBytes`: 将一个字符串根据字节拆分为一个字符串数组

## `chars`

- `chars`: 将字符串转换为字符数组
- `fromChars`: 将字符数组转换为字符串

## `corrector`

- `corrector`: 在指定的位置处来添加一些空格，美化中文语句的排版

## `entity-code`

- `codePointAt`: 计算 `UTF-8`、`UTF-16` 的代码点
- `decodeEntity`: 解码包含 `HTML` 实体名称 (`&name;`) 和实体编号 (`&#point;`) 的字符串
- `decodeEntityByName`: 解码包含 `HTML` 实体名称 (`&name;`) 的字符串
- `decodeEntityByPoint`: 解码包含 `HTML` 实体编号 (`&#point;`) 的字符串
- `encodeEntityToName`: 将字符串中的特殊字符编码为 `HTML` 实体名称 (`&name;`)
- `encodeEntityToPoint`: 将字符串中的特殊字符编码为 `HTML` 实体编号 (`&#point;`)

## `find`

- `behindOf`: 从一个字符串的指定索引的后面查找是否包含某个字符串
- `frontOf`: 从一个字符串的指定索引的前面查找是否包含某个字符串

## `indent`

- `findMinIndent`: 查找字符串每一行开头的公共前导空格数
- `padIndent`: 对字符串的每一行进行缩进
- `trimIndent`: 删除字符串每一行开头的公共前导空格

## `inside`

- `bindInside`: 在被包裹的值的里面处理字符串中的内容
- `bindOutside`: 在被包裹的值的外面处理字符串中的内容

## `match`

- `matchOrder`: 遍历一组正则表达式来验证一个字符串，当任意一个正则表达式符合字符串时，则返回该正则捕获到的结果
- `matchSplit`: 使用正则表达式来拆分一个字符串，最后返回拆分后的结果

## `quote`

- `quoteClosed`: `简单` 的判断 `代码字符串` 在指定的符号之后是否含有未闭合的引号
- `quotePair`: 从一个字符串中获取未闭合的引号

## `random`

- `randomBoolean`: 生成一个随机的布尔值
- `randomHexColor`: 生成一个随机的十六进制颜色字符串
- `randomLower`: 生成一个随机的小写字母
- `randomNumber`: 生成一个安全的随机数字符串
- `randomUpper`: 生成一个随机的大写字母

## `regexp`

- `toRegExp`: 将一个字符串转换为一个正则表达式，用于在 `str.replace` 中使用
- `toRegExpSource`: 转义一个字符串，并让这个字符串通过 `new RegExp()` 方法来创建正则表达式

## `sentences`

- `toSentences`: 将一个字符串拆分为句子数组

## `spaces`

- `isSpaceString`: 验证一个非空字符串是不是一个空字符字符串
- `rmControl`: 删除字符串中所有的控制字符(包含回车、换行、制表符等)
- `rmControlEnd`: 删除字符串结尾的控制字符(包含回车、换行、制表符等)
- `rmControlStart`: 删除字符串开头的控制字符(包含回车、换行、制表符等)
- `rmLikeSpace`: 将字符串中开头和结尾的像空格的字符删除，并将其余所有的像空格的字符替换为空格
- `rmLikeSpaceEnd`: 删除字符串结尾像空格的字符
- `rmLikeSpaceStart`: 删除字符串开头像空格的字符
- `rmZeroWidth`: 删除字符串中所有的零宽字符
- `rmZeroWidthEnd`: 删除字符串结尾的零宽字符
- `rmZeroWidthStart`: 删除字符串开头的零宽字符
- `startSpacesLength`: 获取字符串开头所包含的空格的数量
- `startTabsLength`: 获取字符串开头所包含的 `Tab` 的数量
- `subSpaces`: 基于正则所匹配到的结果添加适当的空格

## `split`

- `splitLine`: 将文本以换行符拆分为多行
- `splitOnFirst`: 在字符串中查找并分割第一个出现的分隔符，将字符串分割成两部分

## `starts`

- `notStarts`: 判断一个字符串是否不是以某些字符串开头
- `startsSlice`: 判断一个字符串是不是以某个字符串开头，如果是则截取该字符串

## `template`

- `template`: 对模板字符串执行插值操作
- `createTemplate`: 配置插值选项并返回一个执行插值操作的函数

## `trim`

- `trim`: 删除字符串开头和结尾的特定字符
- `trimAll`: 删除字符串中所有的特定字符
- `trimEnd`: 删除字符串结尾的特定字符
- `trimStart`: 删除字符串开头的特定字符

## `words`

- `word`: 从字符串中找到不为空的字符的索引位置
- `wordEnd`: 从字符串中按照从右向左的顺序找到不为空的字符的索引位置
- `wordStart`: 从字符串中按照从左向右的顺序找到不为空的字符的索引位置

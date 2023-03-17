# `@curong/string`


`@curong/string` 主要包含以下的方法:

- `behindOf`: 从一个字符串的指定索引的后面查找是否包含某个字符串
- `bindInside`: 在被包裹的值的里面处理字符串中的内容
- `bindOutside`: 在被包裹的值的外面处理字符串中的内容
- `bytesArray`: 将 `UTF-8` 字符串转换为字节数组
- `bytesLength`: 计算 `UTF-8`、`UTF16` 的字符串编码长度，计算的长度值与 `Buffer.from(str).length` 等同
- `chars`: 将字符串转换为字符数组
- `codePointAt`: 计算 `UTF-8`、`UTF16` 的代码点
- `corrector`: 在指定的位置处来添加一些空格，美化中文语句的排版
- `decodeEntity`: 解码包含 `HTML` 实体名称 (`&name;`) 和实体编号 (`&#point;`) 的字符串
- `decodeEntityByName`: 解码包含 `HTML` 实体名称 (`&name;`) 的字符串
- `decodeEntityByPoint`: 解码包含 `HTML` 实体编号 (`&#point;`) 的字符串
- `encodeEntityToName`: 将字符串中的特殊字符编码为 `HTML` 实体名称 (`&name;`)
- `encodeEntityToPoint`: 将字符串中的特殊字符编码为 `HTML` 实体编号 (`&#point;`)
- `fromBytes`: 将字符数组转换为字符串
- `frontOf`: 从一个字符串的指定索引的前面查找是否包含某个字符串
- `matchOrder`: 遍历一组正则表达式来验证一个字符串，当任意一个正则表达式符合字符串时，则返回该正则捕获到的结果
- `matchSplit`: 使用正则表达式来拆分一个字符串，最后返回拆分后的结果
- `notStarts`: 判断一个字符串是否不是以某些字符串开头
- `parseJson`: 将 `JSON` 格式的字符串转换为一个 `JavaScript` 对象
- `quoteClosed`: `简单` 的判断 `代码字符串` 在指定的符号之后是否含有未闭合的引号
- `quotePair`: 从一个字符串中获取未闭合的引号
- `random`: 生成安全的随机数字符串
- `rmControl`: 删除字符串中所有的控制字符(包含回车、换行、制表符等)
- `rmControlEnd`: 删除字符串结尾的控制字符(包含回车、换行、制表符等)
- `rmControlStart`: 删除字符串开头的控制字符(包含回车、换行、制表符等)
- `rmLikeSpace`: 将字符串中开头和结尾的像空格的字符删除，并将其余所有的像空格的字符替换为空格
- `rmLikeSpaceEnd`: 删除字符串结尾像空格的字符
- `rmLikeSpaceStart`: 删除字符串开头像空格的字符
- `rmZeroWidth`: 删除字符串中所有的零宽字符
- `rmZeroWidthEnd`: 删除字符串结尾的零宽字符
- `rmZeroWidthStart`: 删除字符串开头的零宽字符
- `splitByBytes`: 将一个字符串根据字节拆分为一个字符串数组
- `startSpacesLength`: 获取字符串开头所包含的空格的数量
- `startsSlice`: 判断一个字符串是不是以某个字符串开头，如果是则截取该字符串
- `startTabsLength`: 获取字符串开头所包含的 `Tab` 的数量
- `subSpaces`: 基于正则所匹配到的结果添加适当的空格
- `toRegExp`: 将一个字符串转换为一个正则表达式，用于在 `str.replace` 中使用
- `toRegExpSource`: 转义一个字符串，并让这个字符串通过 `new RegExp()` 方法来创建正则表达式
- `toSentences`: 将一个字符串拆分为句子数组
- `trim`: 删除字符串开头和结尾的特定字符
- `trimEnd`: 删除字符串结尾的特定字符
- `trimStart`: 删除字符串开头的特定字符
- `word`: 从字符串中找到不为空的字符的索引位置
- `wordEnd`: 从字符串中按照从右向左的顺序找到不为空的字符的索引位置
- `wordStart`: 从字符串中按照从左向右的顺序找到不为空的字符的索引位置

`@curong/string` 主要包含以下的属性:

- `zeroWidthChars`: 零宽字符对象
- `likeSpaceChars`: 看起来像空格的字符对象
- `controlChars`: 控制符对象(包含换行、回车、制表符等)
- `specialChars`: 特殊字符集对象，包含零宽字符、像空格的字符、控制符

# `@curong/string`


`@curong/string` 主要包含以下的方法:

 - `behindOf`: 从一个字符串的指定索引的后面查找是否包含某个字符串
 - `bytesArray`: 将 `UTF-8` 字符串转换为字节数组
 - `bytesLength`: 计算 `UTF-8`、`UTF16` 的字符串编码长度，计算的长度值与 `Buffer.from(str).length` 等同
 - `chars`: 将字符串转换为字符数组
 - `codePointAt`: 计算 `UTF-8`、`UTF16` 的代码点
 - `fromBytes`: 将字符数组转换为字符串
 - `decodeEntity`: 解码包含 `HTML` 实体名称 (`&name;`) 和实体编号 (`&#point;`) 的字符串
 - `decodeEntityByName`: 解码包含 `HTML` 实体名称 (`&name;`) 的字符串
 - `decodeEntityByPoint`: 解码包含 `HTML` 实体编号 (`&#point;`) 的字符串
 - `encodeEntityToName`: 将字符串中的特殊字符编码为 `HTML` 实体名称 (`&name;`)
 - `encodeEntityToPoint`: 将字符串中的特殊字符编码为 `HTML` 实体编号 (`&#point;`)
 - `frontOf`: 从一个字符串的指定索引的前面查找是否包含某个字符串
 - `matchOrder`: 遍历一组正则表达式来验证一个字符串，当任意一个正则表达式符合字符串时，则返回该正则捕获到的结果
 - `matchSplit`: 使用正则表达式来拆分一个字符串，最后返回拆分后的结果
 - `notStarts`: 判断一个字符串是否不是以某些字符串开头
 - `quoteClosed`: `简单` 的判断 `代码字符串` 在指定的符号之后是否含有未闭合的引号
 - `quotePair`: 从一个字符串中获取未闭合的引号
 - `rmControl`: 删除字符串中所有的控制字符(包含回车、换行、制表符等)
 - `rmControlLeft`: 删除字符串开头的控制字符(包含回车、换行、制表符等)
 - `rmControlRight`: 删除字符串结尾的控制字符(包含回车、换行、制表符等)
 - `rmLikeSpace`: 将字符串中开头和结尾的像空格的字符删除，并将其余所有的像空格的字符替换为空格
 - `rmLikeSpaceLeft`: 删除字符串开头像空格的字符
 - `rmLikeSpaceRight`: 删除字符串结尾像空格的字符
 - `rmZeroWidth`: 删除字符串中所有的零宽字符
 - `rmZeroWidthLeft`: 删除字符串开头的零宽字符
 - `rmZeroWidthRight`: 删除字符串结尾的零宽字符
 - `startsSlice`: 判断一个字符串是不是以某个字符串开头，如果是则截取该字符串
 - `toRegExp`: 将一个字符串转换为一个正则表达式，用于在 `str.replace` 中使用
 - `toRegExpSource`: 转义一个字符串，并让这个字符串通过 `new RegExp()` 方法来创建正则表达式
 - `trim`: 删除字符串开头和结尾的特定字符
 - `trimLeft`: 删除字符串开头的特定字符
 - `trimRight`: 删除字符串结尾的特定字符
 - `word`: 从字符串中找到不为空的字符的索引位置
 - `wordLeft`: 从字符串中按照从左向右的顺序找到不为空的字符的索引位置
 - `wordRight`: 从字符串中按照从右向左的顺序找到不为空的字符的索引位置


`@curong/string` 主要包含以下的属性:

- `zeroWidthChars`: 零宽字符对象
- `likeSpaceChars`: 看起来像空格的字符对象
- `controlChars`: 控制符对象(包含换行、回车、制表符等)
- `specialChars`: 特殊字符集对象，包含零宽字符、像空格的字符、控制符

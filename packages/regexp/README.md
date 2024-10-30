# `@curong/regexp`


`@curong/regexp` 主要包含以下的方法：

- `execAll`: 循环遍历 `RegExp.exec` 方法捕获到的内容
- `inChinese`: 是否包含中文汉字
- `inChkPunctuation`: 是否包含中日韩标点符号
- `inJapanese`: 是否包含日文
- `isChinaPhoneNumber`: 是不是一个中国的手机号码
- `isEmail`: 是否为合法的邮箱地址
- `isIp`: 是不是一个 `IP` 地址
- `mapReplace`: 使用一组正则表达式来替换字符串中的内容
- `matchNextIndex`: 获取正则匹配对象的当前项的下一个字符的开始索引位置
- `testEvery`: 使用一组正则来验证一个字符串是否符合预期
- `testSome`: 使用一组正则来验证一个字符串是否符合预期


`@curong/regexp` 主要包含以下的属性：

- `ascii`: 验证 `ASCII` 的正则字符串
- `blank`: 验证所有的空白字符的正则字符串，比如空格
- `chkPunctuation`: 验证中日韩的标点符号的正则字符串
- `control`: 验证所有的控制字符的正则字符串，包含 `\r`、`\n`、`\t` 等等
- `email`: 验证邮箱的正则字符串
- `han`: 验证汉文的正则字符串 (包含特殊字符)
- `hiragana`: 验证平假名的正则字符串
- `japanese`: 验证日文的正则字符串
- `katakana`: 验证片假名的正则字符串
- `korean`: 验证韩文的正则字符串
- `punctuation`: 验证所有的标点符号的正则字符串
- `unifiedIdeograph`: 验证中文汉字的正则字符串

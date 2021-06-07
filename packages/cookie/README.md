# `@curong/cookie`

`@curong/cookie` 包含以下方法:

- `parseCookie`: 解析 `cookie`, 把 `cookie` 字符串转换为`key: value` 形式的 `cookie` 对象
- `createCookie`: 通过设置 `name`、`value` 和 `options` 属性配置，生成一个 `cookie` 字符串
- `joinSetCookie`:  将解析后的 `set-cookie` 对象转换为一个 `key=value; key=value` 形式的 `cookie` 字符串
- `parseSetCookie`: 解析 `set-cookie` 字符串数组
- `splitSetCookie`: 将以逗号合并在一起的 `set-cookie` 字符串转换为 `set-cookie` 字符串数组

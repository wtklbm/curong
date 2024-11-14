/**
 * 将文本以换行符拆分为多行
 *
 * @param value 要拆分的文本
 * @param limit 用于限制数组中返回的元素数量的值
 * @returns 返回拆分好的字符串数组
 * @note
 *
 * 该方法将以下字符设为换行分隔符:
 *  - `\u000A`: 行结束符，即 `\n`
 *  - `\u000B`: 垂直制表符，即 `\v`，将光标移到下一个垂直制表符对齐处位置
 *  - `\u000C`: 换页符，即 `\f`，将光标移到下一页开头
 *  - `\u000D`: 回车符，即 `\r`
 *  - `\u0085`: 下一行，用于表示文本流中的下一行
 *  - `\u2028`: 行分隔符，用于分隔文本行而不引入换行符
 *  - `\u2029`: 段落分隔符，用于指示段落的结束
 *
 * 需要注意的是：`\r\n` 会被视为一个分隔符。
 *
 * 有关更多的内容，也可以看看 `@curong/fs` 的 `readlineFromCode` 方法。
 */
export default function splitLine(value: string, limit?: number) {
    return value.split(/\r\n|[\u000A-\u000D\u0085\u2028\u2029]/, limit);
}

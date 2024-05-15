import { isFunctionHave, isString, isBuffer } from '@curong/types';

import type { ReadlineCallback } from './types';

/**
 * 一行一行地读取编程语言文件中的文本内容
 *
 * @param chunk 要读取的文本内容
 * @param encoding 转换 `Buffer` 用到的编码，默认为 `utf8`
 * @param callback 回调函数
 * @throws
 *
 * - 如果 `chunk` 不是 `Buffer` 或 `string`，则会抛出异常
 *
 * ### 终止符对照表
 *
 * 我们需要使用多种文件，每个文件都有自己的行终止符定义。
 *
 * |          |         |      |      |      |        |      |      |      |
 * | -------- | ------- | ---- | ---- | ---- | ------ | ---- | ---- | ---- |
 * | char/seq | Unicode | JS   | C#   | HTML | Python | PHP  | Java | YAML |
 * | CRLF     |   YES   | YES  | YES  | YES  | YES    | YES  | YES  | YES  |
 * | CR       |   YES   | YES  | YES  | YES  | YES    | YES  | YES  | YES  |
 * | LF       |   YES   | YES  | YES  | YES  | YES    | YES  | YES  | YES  |
 * | LS       |   YES   | YES  | YES  | YES  |        |      |      |      |
 * | PS       |   YES   | YES  | YES  | YES  |        |      |      |      |
 * | NEL      |   YES   | YES  |      |      |        |      |      |      |
 * | FF       |   YES   |      |      |      |        |      |      |      |
 * | VT       |   YES   |      |      |      |        |      |      |      |
 *
 * LB4. Always break after hard line breaks (BK). In the BK class there are the following:
 *   - `\u000C` - FORM FEED (FF)
 *   - `\u000B` - LINE TABULATION (VT) - [OPTIONAL]
 *   - `\u2028` - LINE SEPARATOR (LS)
 *   - `\u2029` - PARAGRAPH SEPARATOR (PS)
 *
 * LB5. Treat CR followed by LF, as well as CR, LF, and NL as hard line breaks:
 *   - `\u000D\u000A` - CARRIAGE RETURN (CR) x LINE FEED (LF)
 *   - `\u000D`       - CARRIAGE RETURN (CR)
 *   - `\u000A`       - LINE FEED (LF)
 *   - `\u0085`       - NEXT LINE (NEL)
 *
 * 附录：
 *
 * - [HTML](https://html.spec.whatwg.org/#newlines)
 * - [Java](https://docs.oracle.com/javase/specs/jls/se7/html/jls-3.html#jls-3.4)
 * - [YAML section 3.1.4 Line Breaks](https://yaml.org/spec/history/2002-10-31.html)
 * - [Python](https://docs.python.org/3/reference/lexical_analysis.html#physical-lines)
 * - [JS spec Table 33](https://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf)
 * - [PHP](https://github.com/php/php-langspec/blob/fe55bee01293a925120cfe330b62a94fc5140e35/spec/09-lexical-structure.md#comments)
 * - [C# spec A.1.1 Line terminators](https://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-334)
 *
 *
 * ### `JavaScript` 特殊字符转义字符对照表
 *
 * | Unicode | 转义序列 | 含义         | 类别 |
 * | ------- | -------- | ---------- | -------- |
 * | \u0008	 | \b      | Backspace   |     |
 * | \u0009	 | \t      | Tab         | 空白 |
 * | \u000B	 | \v      | 垂直制表符	   | 空白 |
 * | \u000C	 | \f      | 换页         | 空白 |
 * | \u0020	 | space   | 空格         | 空白 |
 * | \u0022	 | \"      | 双引号       | (") |
 * | \u0027	 | \'      | 单引号       | (') |
 * | \u005C	 | \\      | 反斜杠       | (\) |
 * | \u00A0	 |         | 不间断空格    | 空白 |
 * | \uFEFF	 |         | 字节顺序符	   | 空白 |
 * | \u000D	 | \r      | 回车         | 行结束符 |
 * | \u000A	 | \n      | 换行         | 行结束符 |
 * | \u2028	 |         | 换行分隔符    | 行结束符 |
 * | \u2029	 |         | 段落分隔符    | 行结束符 |
 */
export default function readlineFromCode(
    chunk: string | Buffer,
    encoding?: BufferEncoding | undefined | null | ReadlineCallback,
    callback?: ReadlineCallback
): Array<string> | null {
    const contents: Array<string> = [];
    const buffer: any[] = [];
    let toString: (data: any) => string;
    let flag: boolean;

    do {
        if ((flag = !isFunctionHave(callback))) {
            if (isFunctionHave(encoding)) {
                callback = encoding as ReadlineCallback;
                encoding = 'utf8';
            } else {
                callback = (value, _done) => contents.push(value);
                encoding = encoding ?? 'utf8';
            }
        }

        // 根据 `chunk` 的类型来处理换行
        if (isString(chunk)) {
            toString = data => data.join('');
            break;
        }

        if (isBuffer(chunk)) {
            toString = data =>
                Buffer.from(data).toString(encoding as BufferEncoding);
            break;
        }

        throw new TypeError(`[readline] 数据必须是 Buffer 或 string`);
    } while (false);

    for (let i = 0, len = chunk.length; i < len; i++) {
        const byte: string | number = chunk[i];

        switch (byte) {
            // '\r'
            case '\u000D':
                callback(toString(buffer), false);
                const next = chunk[i + 1];
                next && next === '\u000A' && i++;
                buffer.length = 0;
                break;

            // '\n'
            case '\u000A':
            // LINE SEPARATOR (LS)
            case '\u2028':
            // PARAGRAPH SEPARATOR (PS)
            case '\u2029':
            // NEXT LINE (NEL)
            case '\u0085':
                callback(toString(buffer), false);
                buffer.length = 0;
                break;

            default:
                buffer.push(byte);
                break;
        }
    }

    callback(buffer.length ? toString(buffer) : '', true);

    if (flag) {
        return contents;
    }

    return null;
}

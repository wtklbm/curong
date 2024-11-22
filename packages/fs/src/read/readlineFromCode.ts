import { isBuffer, isFunction, isString } from '@curong/types';

import type { ReadlineCallback } from './types';

/**
 * 一行一行地读取源代码中的文本内容
 *
 * @param chunk 要读取的文本内容
 * @param encoding 转换 `Buffer` 用到的编码，默认为 `utf8`
 * @param callback 回调函数
 * @throws 如果 `chunk` 不是 `Buffer` 或 `string`，则会抛出异常
 * @note
 *  - 在调用 `readlineFromCode()` 之前，请勿使用 `access()` 检查文件的可访问性。
 *   这样做会引入竞态条件，因为其他进程可能会在两次调用之间更改文件的状态。
 *   相反，用户代码应该直接 `read` 文件并处理文件不可访问时引发的错误。
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
    encoding?: BufferEncoding
): string[];

export default function readlineFromCode(
    chunk: string | Buffer,
    callback: ReadlineCallback
): null;

export default function readlineFromCode(
    chunk: string | Buffer,
    encoding: BufferEncoding,
    callback: ReadlineCallback
): null;

export default function readlineFromCode(
    chunk: string | Buffer,
    encoding?: BufferEncoding | undefined | null | ReadlineCallback,
    callback?: ReadlineCallback
): string[] | null {
    const contents: string[] = [];
    const buffer: unknown[] = [];

    if (!isFunction(callback)) {
        if (isFunction(encoding)) {
            callback = encoding as ReadlineCallback;
            encoding = 'utf8';
        } else {
            callback = (value, _done) => contents.push(value);
            encoding = encoding ?? 'utf8';
        }
    }

    // 根据 `chunk` 的类型来处理换行
    let toString: (data: any) => string;

    if (isString(chunk)) {
        toString = data => data.join('');
    } else if (isBuffer(chunk)) {
        toString = data => {
            return Buffer.from(data).toString(encoding as BufferEncoding);
        };
    } else {
        throw new TypeError('chunk 必须是 Buffer 或 string', {
            cause: { function: 'readlineFromCode', chunk, encoding, callback }
        });
    }

    for (let i = 0, len = chunk.length; i < len; i++) {
        const byte: string | number = chunk[i];

        switch (byte) {
            // 回车 (Carriage Return)，即 `\r`
            case '\u000D':
                callback(toString(buffer), false);
                const next = chunk[i + 1];
                next && next === '\u000A' && i++;
                buffer.length = 0;
                break;

            // 行结束 (End of Line)，即 `\n`
            case '\u000A':
            // 垂直制表符，将光标移到下一个垂直制表符对齐处位置
            case '\u000B':
            // 换页符，将光标移到下一页开头
            case '\u000C':
            // 下一行 (Next Line)，用于表示文本流中的下一行
            case '\u0085':
            // 行分隔符，用于分隔文本行而不引入换行符
            case '\u2028':
            // 段落分隔符，用于指示段落的结束
            case '\u2029':
                callback(toString(buffer), false);
                buffer.length = 0;
                break;

            default:
                buffer.push(byte);
                break;
        }
    }

    callback(toString(buffer), true);

    return contents.length ? contents : null;
}

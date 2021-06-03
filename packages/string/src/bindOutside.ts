import { isUndefined } from '@curong/types';

import { BindOutsideCallback, BindOutsideOptions } from './types/bindOutside';

/**
 * 被包裹的值的映射对象
 */
const quoteMap = {
    // 英文
    "'": "'",
    '"': '"',
    '`': '`',
    '(': ')',
    '[': ']',
    '{': '}',

    // 中文
    '‘': '’',
    '“': '”',
    '（': '）',
    '【': '】',
    '《': '》'
};

type QuoteMapType = keyof typeof quoteMap;

/** 判断是不是英文单词后面的 `'` 的正则表达式 */
const wordReg = /^[a-zA-Z]'[a-zA-Z]{1,2}[^a-zA-Z]/;

/**
 * 在被包裹的值的外面处理字符串中的内容
 *
 * @param value 要处理的值
 * @param callback 回调函数，如何来处理被包裹的值的外面的值
 * @returns 返回处理好的字符串
 * @example
 *
 * ```javascript
 * const v = 'the [`crate`] is very good.';
 * const ret = bindOutside(v, v => v.replace('very', 'very very'));
 * console.log(ret); // "the [`crate`] is very very good."
 * ```
 */
export default function bindOutside(
    value: string,
    callback: (value: string) => string
): string;

/**
 * 在被包裹的值的外面处理字符串中的内容
 *
 * @param value 要处理的值
 * @param options 配置选项
 *
 * - `escape`: 是否支持转义字符，也就是 `\`，默认为 `false`
 *
 * @param callback 回调函数，如何来处理被包裹的值的外面的值
 * @returns 返回处理好的字符串
 * @example
 *
 * ```javascript
 * const v = "that is 'box\\'s'";
 *
 * let ret = bindOutside(v, { escape: true }, v => v.replace("s", ''));
 * console.log(ret); // "that i 'box\'s'"
 *
 * ret = bindOutside(v, { escape: false }, v => v.replace("s", ''));
 * console.log(ret); // "that i 'box\''"
 * ```
 */
export default function bindOutside(
    value: string,
    options: BindOutsideOptions | undefined,
    callback: BindOutsideCallback
): string;
export default function bindOutside(
    value: string,
    options?: any,
    callback?: any
): string {
    if (!isUndefined(options) && isUndefined(callback)) {
        callback = options;
        options = { escape: false };
    }

    const ret: string[] = [];
    const { escape = false } = options ?? {};
    const len = (value = value.trim()).length;

    // 设置 `token` 的值
    const setToken = (char: QuoteMapType, equal: boolean) => {
        (!token && (token = quoteMap[char])) || (equal && (token = ''));
    };

    let token: string = '';
    let idleStart: number = 0;
    let i = 0;

    for (let j = 0, char: any, qc, isToken, headToken; i < len; i++) {
        char = value[i];
        isToken = token === char;

        // 如果支持转义字符
        if (escape && char === '\\') {
            value[i + 1] === token && i++;
            continue;
        }

        // 如果为单引号，就判断是不是用来包裹内容的引号
        if (char === "'" && value.slice(i - 1, i + 3).match(wordReg)) {
            i++;
            continue;
        }

        // 如果是嵌套的括号
        if (!/['"`]/.test(char) && char === headToken) {
            j++;
            continue;
        }

        // 如果括号已经解析完成
        if (isToken && j-- <= 0) {
            ret.push(value.slice(idleStart, (idleStart = i + 1)));
            token = '';
            j = 0;
            headToken = '';
            continue;
        }

        qc = quoteMap[char as QuoteMapType];

        // 如果是括号或引号的开始位置
        if ((!headToken && qc) || qc === token) {
            // 保存括号或引号前面的内容
            ret.push(callback(value.slice(idleStart, i), i, value));

            // 保存开始的括号字符
            headToken = char;

            // 保存剩余位置
            idleStart = i;

            // 设置 `token`
            setToken(char, isToken);
        }
    }

    return ret.concat(callback(value.slice(idleStart), i, value)).join('');
}

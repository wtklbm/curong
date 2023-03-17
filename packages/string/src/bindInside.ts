import { isUndefined } from '@curong/types';

import { defaultMarks, DefaultMarksType } from './bindOutside';

import { BindSideCallback, BindSideOptions } from './types';

/** 判断是不是英文单词后面的 `'` 的正则表达式 */
const wordReg = /^[a-zA-Z]'[a-zA-Z]{1,2}[^a-zA-Z]/;

/**
 * 在被包裹的值的里面处理字符串中的内容
 *
 * @param value 要处理的值
 * @param callback 回调函数，如何来处理被包裹的值的里面的值
 * @returns 返回处理好的字符串
 * @example
 *
 * ```javascript
 * const v = 'the [`crate`] is very good.';
 * const ret = bindInside(v, v => v.replace('crate', 'pkg'));
 * console.log(ret); // "the [`pkg`] is very good."
 * ```
 */
export default function bindInside(
    value: string,
    callback: BindSideCallback
): string;

/**
 * 在被包裹的值的里面处理字符串中的内容
 *
 * @param value 要处理的值
 * @param options 配置选项
 *
 * - `escape`: 是否支持转义字符，也就是 `\`，默认为 `false`
 *
 * @param callback 回调函数，如何来处理被包裹的值的里面的值
 * @returns 返回处理好的字符串
 * @example
 *
 * ```javascript
 * const v = "that is 'box\\'s'";
 *
 * let ret = bindInside(v, { escape: true }, v => v.replace('box', 'pkg'));
 * console.log(ret); // "that is 'pkg\'s'"
 *
 * ret = bindInside(v, { escape: true }, v => v.replace('s', 'th'));
 * console.log(ret); // "that is 'pkg\'th'"
 * ```
 */
export default function bindInside(
    value: string,
    options: BindSideOptions | undefined,
    callback: BindSideCallback
): string;
export default function bindInside(
    value: string,
    options?: any,
    callback?: any
): string {
    if (!isUndefined(options) && isUndefined(callback)) {
        callback = options;
        options = { escape: false };
    }

    const ret: string[] = [];
    const { escape = false, marks = defaultMarks } = options ?? {};
    const len = value.length;

    // 设置 `token` 的值
    const setToken = (char: DefaultMarksType, equal: boolean) => {
        (!token && (token = marks[char])) || (equal && (token = ''));
    };

    let token: string = '';
    let idleStart: number = 0;
    let i = 0;

    for (let j = 0, char: any, qc, isToken, headToken; i < len; i++) {
        char = value[i];
        isToken = token === char;

        // 如果支持转义字符
        if (escape && char === '\\') {
            if (!token) {
                i++;
                continue;
            }

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

        // 如果括号或引号已经解析完成
        if (isToken && --j <= 0) {
            // 如果紧挨着的仍然是括号或引号
            if ((token = marks[value[i + 1] as DefaultMarksType])) {
                headToken = value[i + 1];
                continue;
            }

            ret.push(
                callback(value.slice(idleStart, (idleStart = i + 1)), i, value)
            );
            token = '';
            j = 0;
            headToken = '';
            continue;
        }

        qc = marks[char as DefaultMarksType];

        // 如果当前位置是括号或引号的开始位置
        if ((!headToken && qc) || qc === token) {
            // 保存一下中间的值，也就是第一个匹配和第二个匹配之间的值
            if (idleStart < i) {
                ret.push(value.slice(idleStart, i));
            }

            // 保存开始的括号字符
            headToken = char;

            // 保存剩余位置
            idleStart = i;

            // 设置 `token`
            setToken(char, isToken);
        }
    }

    if (idleStart !== len) {
        ret.push(value.slice(idleStart));
    }

    return ret.join('');
}

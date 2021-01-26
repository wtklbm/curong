import { isUint } from '@curong/types';

/**
 * 计算 `UTF-8`、`UTF16` 的代码点
 *
 * 该方法与 `String.codePointAt` 方法的作用相同，只是做了兼容性处理而已。
 *
 * @param value 字符串
 * @param index 计算字符串中的哪个位置的代码点
 * @returns 如果有代码点则返回代码点，否则返回 `null`
 * @example
 *
 * ```javascript
 * const ret = codePointAt('中国', 1);
 * console.log(ret); // 22269
 * ```
 */
export default function codePointAt(
    value: string = '',
    index: number = 0
): number | null {
    const length = value.length;

    if (!isUint((index = Number(index))) || index >= length) {
        return null;
    }

    const first: number = value.charCodeAt(index);

    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
    if (first >= 55296 && first <= 56319 && length > index + 1) {
        const second: number = value.charCodeAt(index + 1);

        if (second >= 56320 && second <= 57343) {
            return (first - 55296) * 1024 + second - 56320 + 65536;
        }
    }

    return first;
}

import { isEqual, isZero } from '@curong/types';

/**
 * 获取字符串数组中最大长度的项的索引位置
 *
 * @param lines 字符串数组
 * @returns 如果数组不为空则返回找到的最大长度的索引，否则返回 `null`
 * @example
 *
 * ```javascript
 * const lines = ['hello.', 'this is a test.', 'very match.'];
 * console.log(maxLengthIndex(lines)); // 1
 * ```
 */
export default function maxLengthIndex(lines: string[]): number | null {
    const linesLength = lines.length;

    if (isZero(linesLength)) {
        return null;
    }

    let maxIdx = 0;

    if (isEqual(linesLength, 1)) {
        return maxIdx;
    }

    let maxLen = lines[0].length;

    for (let i = 1, len = lines.length, lineLen; i < len; i++) {
        if ((lineLen = lines[i].length) > maxLen) {
            maxLen = lineLen;
            maxIdx = i;
        }
    }

    return maxIdx;
}

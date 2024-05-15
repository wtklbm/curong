import { isEqual, isZero } from '@curong/types';

/**
 * 获取字符串数组中最小长度的项的索引位置
 *
 * @param lines 字符串数组
 * @returns 如果数组不为空则返回找到的最小长度的索引，否则返回 `null`
 * @example
 *
 * ```javascript
 * const lines = ['hello.', 'this is a test.', 'very match.'];
 * console.log(maxLengthIndex(lines)); // 0
 * ```
 */
export default function minLengthIndex(lines: string[]): number | null {
    const linesLength = lines.length;

    if (isZero(linesLength)) {
        return null;
    }

    let minIdx = 0;

    if (isEqual(linesLength, 1)) {
        return minIdx;
    }

    let minLen = lines[0].length;

    for (let i = 1, len = lines.length, lineLen; i < len; i++) {
        if ((lineLen = lines[i].length) < minLen) {
            minLen = lineLen;
            minIdx = i;
        }
    }

    return minIdx;
}

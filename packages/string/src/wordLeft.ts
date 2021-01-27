import { isUint, isNotZero } from '@curong/types';

/**
 * 从字符串中按照从左向右的顺序找到不为空的字符的索引位置
 *
 * @param str 字符串
 * @param position 偏移位置索引
 * @returns 返回左侧的索引位置，如果没有找到字符，则返回 `null`
 *
 * @example
 *
 * ```javascript
 * const ret = wordLeft('xx    xx    ', 2);
 * console.log(ret); // 6
 * ```
 */
export default function wordLeft(
    str: string,
    position: number = 0
): number | null {
    if (!isUint(position)) {
        throw new TypeError(`[wordLeft]: position不是索引，"${position}"`);
    }

    let ret = null;

    if (isNotZero(str.length) && str.length > position) {
        if ((ret = str.match(new RegExp(`^[\\S\\s]{${position}}\\s+`)))) {
            const value = (ret.index as number) + ret[0].length;

            return value === str.length ? null : value;
        }

        return position;
    }

    return ret;
}

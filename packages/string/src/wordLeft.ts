import { isStringHave, isUint } from '@curong/types';

/**
 * 从字符串中按照从左向右的顺序找到不为空的字符的索引位置
 *
 * @param str 字符串
 * @param position 偏移位置索引
 * @returns 返回左侧的索引位置，如果没有找到字符，则返回 `null`
 */
export default function wordLeft(
    str: string,
    position: number = 0
): number | null {
    if (typeof str !== 'string') {
        throw new TypeError(`[wordLeft]: str不是一个字符串, "${str}"`);
    }

    if (!isUint(position)) {
        throw new TypeError(`[wordLeft]: position不是索引，"${position}"`);
    }

    let ret = null;

    if (isStringHave(str) && str.length > position) {
        if ((ret = str.match(new RegExp(`^[\\S\\s]{${position}}\\s+`)))) {
            const value = (ret.index as number) + ret[0].length;

            return value === str.length ? null : value;
        }

        return position;
    }

    return ret;
}

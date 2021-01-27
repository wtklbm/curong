import { isUint, isNotZero } from '@curong/types';

/**
 * 从字符串中按照从右向左的顺序找到不为空的字符的索引位置
 *
 * @param str 字符串
 * @param position 偏移位置索引
 * @returns 返回右侧的字符的索引位置，如果没有找到字符，则返回 `null`
 * @info 依据 `含头不含尾` 规则，在使用该索引调用 `slice` 方法时，需要进行加一操作
 * @example
 *
 * ```javascript
 * const ret = wordRight('xx    xx    ', 2);
 * console.log(ret); // 7
 * ```
 */
export default function wordRight(
    str: string,
    position: number = 0
): number | null {
    if (!isUint(position)) {
        throw new TypeError(`[wordRight]: position不是索引, "${position}"`);
    }

    /** 验证右侧的空字符的正则表达式 */
    const rightSpaceReg = /\s+$/i;

    let ret = null;

    if (isNotZero(str.length) && str.length > position) {
        if ((ret = str.match(rightSpaceReg))) {
            const value = (ret.index as number) - 1;

            return value >= position ? value : null;
        }

        const value = str.length - 1;

        return value === position ? position : value;
    }

    return ret;
}

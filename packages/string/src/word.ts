import { isUint, isNotZero } from '@curong/types';

import wordLeft from './wordLeft';
import wordRight from './wordRight';

import { WordResult } from './types/word';

/**
 * 从字符串中找到不为空的字符的索引位置
 *
 * @param str 字符串
 * @param position 偏移量索引
 * @returns 返回包含左侧和右侧的索引位置对象，如果没有找到字符，则返回 `null`
 *
 * - `left` 左侧的索引位置
 * - `right` 右侧的索引位置
 */
export default function word(
    str: string,
    position: number = 0
): WordResult | null {
    if (!isUint(position)) {
        throw new TypeError(`[word]: position不是索引, "${position}"`);
    }

    const ret: WordResult = { left: null, right: null };

    if (
        isNotZero(str.length) &&
        str.length > position &&
        isUint((ret.right = wordRight(str, position))) &&
        isUint((ret.left = wordLeft(str, position)))
    ) {
        return ret;
    }

    return null;
}

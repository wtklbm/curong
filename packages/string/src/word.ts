import { isUint, isNotZero } from '@curong/types';

import wordStart from './wordStart';
import wordEnd from './wordEnd';

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
 *
 * @throws
 *
 * - 如果 `position` 不是索引，则会抛出异常
 *
 * @example
 *
 * ```javascript
 * const ret = word('xx    xx    ', 2);
 * console.log(ret); // { left: 6, right: 7 }
 * ```
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
        isUint((ret.right = wordEnd(str, position))) &&
        isUint((ret.left = wordStart(str, position)))
    ) {
        return ret;
    }

    return null;
}

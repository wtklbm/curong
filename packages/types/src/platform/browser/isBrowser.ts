import getTagEqual from '../../type/getTagEqual';

import isFuzzyBrowser from '../constants/isFuzzyBrowser';
import isFuzzyJsDom from '../constants/isFuzzyJsDom';

/**
 * 当前的执行环境是不是浏览器
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
 */
export default function isBrowser(): boolean {
    return (
        !isFuzzyJsDom() &&
        isFuzzyBrowser() &&
        // 浏览器是 `HTMLDocument`，`jsdom` 是 `Document`
        getTagEqual(globalThis.document, 'HTMLDocument')
    );
}

import isFuzzyBrowser from '../constants/isFuzzyBrowser';
import isFuzzyJsDom from '../constants/isFuzzyJsDom';

/**
 * 当前的执行环境是不是 `JsDom`
 *
 * @param window `jsdom` 中的 `Window` 对象，默认为 `globalThis.window` (即当前执行环境的全局根属性)
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * import { JSDOM } from 'jsdom';
 *
 * const { window } = new JSDOM(`<!DOCTYPE html><html><body><p>Hello, World!</p></body></html>`);
 * console.log(isJsDom(window)); // true
 * ```
 */
export default function isJsDom(window = globalThis.window): boolean {
    return isFuzzyJsDom(window) && isFuzzyBrowser();
}

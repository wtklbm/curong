import { getTagEqual, isDocument, isWindow } from '..';

/**
 * 当前的执行环境是不是浏览器
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBrowser() {
    return (
        typeof window !== 'undefined' &&
        isWindow(window) &&
        isDocument(window.document) &&
        getTagEqual(window.history, 'History') &&
        getTagEqual(window.navigator, 'Navigator') &&
        typeof HTMLImageElement === 'function' &&
        typeof HTMLCanvasElement === 'function' &&
        typeof HTMLVideoElement === 'function'
    );
}

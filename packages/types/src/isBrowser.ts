import getTag from './getTag';

/**
 * 当前的执行环境是不是浏览器
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBrowser() {
    return (
        typeof window !== 'undefined' &&
        window.window === window &&
        typeof window.document !== 'undefined' &&
        typeof window.history !== 'undefined' &&
        getTag(window.history) === 'History' &&
        typeof window.navigator !== 'undefined' &&
        getTag(window.navigator) === 'Navigator' &&
        typeof HTMLImageElement === 'function' &&
        typeof HTMLCanvasElement === 'function' &&
        typeof HTMLVideoElement === 'function'
    );
}

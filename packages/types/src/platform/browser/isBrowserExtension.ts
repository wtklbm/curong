interface BrowserRuntime {
    id?: unknown;
}
declare const chrome: { runtime?: BrowserRuntime };
declare const browser: { runtime?: BrowserRuntime };

/**
 * 当前的执行环境是不是浏览器扩展
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBrowserExtension(): boolean {
    const runtime =
        (typeof chrome === 'object' && chrome?.runtime) ||
        (typeof browser === 'object' && browser?.runtime);

    return typeof runtime === 'object' && runtime?.id !== undefined;
}

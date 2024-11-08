import isTypeofObject from '../../object/isTypeofObject';

interface BrowserRuntime {
    id?: unknown;
}

declare global {
    var chrome: { runtime?: BrowserRuntime };
    var browser: { runtime?: BrowserRuntime };
}

/**
 * 当前的执行环境是不是浏览器扩展
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
 */
export default function isBrowserExtension(): boolean {
    const runtime =
        (isTypeofObject(globalThis.chrome) && globalThis.chrome.runtime) ||
        (isTypeofObject(globalThis.browser) && globalThis.browser.runtime);

    return isTypeofObject(runtime) && runtime.id != undefined;
}

/**
 * 当前的执行环境是不是微信的内置浏览器
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isWechatBrowser() {
    return /MicroMessenger/i.test(globalThis.navigator?.userAgent)
}

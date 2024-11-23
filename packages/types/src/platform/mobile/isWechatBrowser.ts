import isNavigator from '../constants/isNavigator';

/**
 * 当前的执行环境是不是微信的内置浏览器
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
 */
export default function isWechatBrowser() {
    return (
        isNavigator() && /MicroMessenger/i.test(globalThis.navigator.userAgent)
    );
}

import isNavigator from './isNavigator';

/**
 * 获取 `userAgent` 字符串
 *
 * @param ua 要使用的后备值
 * @returns 如果 `navigator.userAgent` 存在则返回该值，否则返回后备值
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
 */
export default function getUserAgent(ua: string = '') {
    return isNavigator() ? (globalThis.navigator.userAgent ?? ua) : ua;
}

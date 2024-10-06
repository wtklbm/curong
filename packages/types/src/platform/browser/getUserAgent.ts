/**
 * 获取 `userAgent` 字符串
 *
 * @param ua 要使用的后备值
 * @returns 如果 `navigator.userAgent` 存在则返回该值，否则返回后备值
 */
export default function getUserAgent(ua: string = '') {
    return globalThis.navigator?.userAgent ?? ua;
}

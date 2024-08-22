import isBrowser from './isBrowser';

/**
 * 获取 `userAgent` 字符串
 *
 * @param ua 要使用的后备值
 * @returns 如果是浏览器且 `window.navigator.userAgent` 存在则返回该值，否则返回后备值
 */
function getUserAgent(ua: string = '') {
    try {
        return isBrowser() ? window.navigator.userAgent : ua;
    } catch {}

    return ua;
}

const userAgent = getUserAgent();

export default userAgent;

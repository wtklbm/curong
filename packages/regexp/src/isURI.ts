import { uri as sourceURI } from './source';

/**
 * 验证是否为合法的链接地址
 *
 * @param uri 要判断的连接地址
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * const ret = isURI('https://www.wtklbm.com?name=wtklbm&age=29#good');
 * console.log(ret); // true
 * ```
 *
 * @note 各个浏览器对 `HTTP` 连接的长度都有所限制，其中最小的是两千多个，
 * 为了兼容所有的浏览器，所以这里规定两千之内的长度为有效的长度。
 *
 * - 根据HTTP规范，URL的长度没有限制。
 * - 网址保持2048个字符以下可以确保网址在所有客户端和服务器配置中均有效。
 * - 搜索引擎的字符数不得超过2000个字符。
 * - `IIS` 会限制了请求中 `URL` 的大小。
 *
 * #### 各浏览器的差异：
 *
 * @link [Quora](https://www.quora.com/What-is-the-max-length-for-URLs-in-each-browser)
 * ##### IE v11 2047
 * Microsoft声明，Internet Explorer中URL的最大长度为2083个字符，URL的路径部分中最多不超过2048个字符。
 *
 * ##### Firefox > 64k
 * 在65,536个字符之后，位置栏不再显示Windows Firefox 1.5.x中的URL。100,000个字符后，我们应该停止测试。
 *
 * ##### Safari > 64k
 * 至少可以使用80,000个字符。80,000个字符后，我们应该停止测试。
 *
 * ##### Chrome = 32770
 * 至少190,000个字符将起作用。我们应该在190,000个字符后停止测试。Windows的Opera 9继续在位置栏中显示一个完全可编辑，可复制和可粘贴的URL，即使是190,000个字符也是如此。
 *
 * ##### Apache
 * 早期尝试在Web浏览器中测量最大URL长度的尝试碰到了大约4000个字符的服务器URL长度限制，此后Apache产生了“ 413 Entity Too Large”错误。
 *
 * ##### Android 8192
 *
 * ##### Edge v16 2047
 */
export default function isURI(uri: string): boolean {
    const reg = new RegExp(`^${sourceURI}$`);

    return reg.test(uri) && encodeURI(decodeURI(uri)).length <= 2e3;
}

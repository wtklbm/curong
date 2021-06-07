export type CreateCookieOptions = {
    /**
     * @param encode 给一个值进行编码的回调函数，默认为 `encodeURIComponent`
     */
    encode?: (value: string) => string;

    /**
     * @param maxAge 以秒为单位，指定有效期
     * `maxAge` 和 `expires` 同时存在时，`maxAge` 优先，但客户端不一定遵守
     */
    maxAge?: number;

    /**
     * @param domain 设置 `cookie` 有效的域，未指定对所有子域有效
     */
    domain?: any;

    /**
     * @param path 限制 `cookie` 有效路径
     */
    path?: any;

    /**
     * @param expires 设置失效时间，必须为 `Date` 对象，最终为 `GMT` 格式的日期
     */
    expires?: Date;

    /**
     * @param httpOnly 设置为 `true` 时，浏览器不允许操作此 `cookie`
     */
    httpOnly?: boolean;

    /**
     * @param secure 设置为 `true` 时，如果不是 `HTTPS` 连接，客户端不会将 `cookie` 发回服务器。
     */
    secure?: boolean;

    /**
     * @param sameSite 将 `cookie` 标注为同站 `cookie`，防止 `CSRF/XSRF` 网络攻击
     *
     * - `strict` 严格禁止作为第三方cookie
     * - `lax` 在同步且为 `GET` 请求是允许发送
     */
    sameSite?: true | 'lax' | 'strict' | 'none';
};

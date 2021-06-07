export type ParseCookieOptions = {
    /**
     * @param decode 解析一个值的编码回调函数，比如设置为 `decodeURIComponent`
     */
    decode?: (value: string) => string;
};

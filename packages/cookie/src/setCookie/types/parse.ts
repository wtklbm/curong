/** 每一个 `Cookie` 字段的描述对象 */
export type SetCookieItem = Record<string, string> & {
    name: string;
    value: any;
    expires: Date;
    maxAge: number;
    secure: boolean;
    httpOnly: boolean;
    sameSite: string;
};

export type SetCookieParseResult =
    | Record<string, SetCookieItem>
    | SetCookieItem[];

export type ParseSetCookieOptions = {
    /** 时候解析为对象的格式 */
    map?: boolean;

    /** 时候对 `cookie` 字符串解码 */
    decode?: boolean;
};

export type TrimOptions = {
    /** 是否删除空格 */
    space?: boolean;

    /** 是否删除零宽字符 */
    zeroWidth?: boolean;

    /** 是否删除像空格的字符 */
    likeSpace?: boolean;

    /** 是否删除控制字符(回车、换行、制表符等) */
    control?: boolean;
};

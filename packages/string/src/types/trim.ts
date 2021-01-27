export type TrimOptions = {
    /** 是否删除空格，默认为 `true` */
    space?: boolean;

    /** 是否删除零宽字符，默认为 `true` */
    zeroWidth?: boolean;

    /** 是否删除像空格的字符，默认为 `true` */
    likeSpace?: boolean;

    /** 是否删除控制字符(回车、换行、制表符等)，默认为 `true` */
    control?: boolean;
};

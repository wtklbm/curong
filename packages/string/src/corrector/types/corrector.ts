/** 中文美化配置选项 */
export type CorrectorOptions = {
    /** 是否使用增强的美化规则，默认为 `true` */
    enhanceRule?: boolean;

    /** 是否将全角字符转换为半角字符，默认为 `true` */
    toHalfWith?: boolean;
};

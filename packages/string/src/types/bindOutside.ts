/** 配置选项 */
export type BindOutsideOptions = {
    /** 是否支持转义字符，也就是 `\`，默认为 `false` */
    escape?: boolean;
};

/** 处理未包裹的值的回调函数 */
export type BindOutsideCallback = (
    /** 没有被包裹的值的截取字符串 */
    value: string,

    /** 当前的索引 */
    index: number,

    /** 原始字符串 */
    source: string
) => string;

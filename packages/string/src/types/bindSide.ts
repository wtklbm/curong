/** 配置选项 */
export type BindSideOptions = {
    /** 是否支持转义字符，也就是 `\`，默认为 `false` */
    escape?: boolean;

    /**
     * 自定义的处理被包裹值的开始和结束标记对象
     *
     * 对象是一个包含单个字符的键值对，其中 `key` 是标记的开始字符，`value` 是标记的结束字符，
     * 例如 `{ '<': '>' }`
     *
     * @default 如果没有传递该选项，则使用函数自带的标记对象
     */
    marks?: Record<string, string>;
};

/** 处理未包裹的值的回调函数 */
export type BindSideCallback = (
    /** 没有被包裹的值的截取字符串 */
    chunk: string,

    /** 当前的索引 */
    index: number,

    /** 原始字符串 */
    value: string
) => string;

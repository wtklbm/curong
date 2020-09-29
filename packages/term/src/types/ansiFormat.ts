export type AnsiFormatOptions = {
    /** 文字是否加粗或高亮。有的终端是实现加粗效果，有的终端是实现高亮效果(即浅色显示前景色) */
    bold?: boolean;

    /** 文字是否弱化(变暗变灰)。未广泛支持 */
    dim?: boolean;

    /** 文字是否斜体。未广泛支持。有时视为反相显示 */
    italic?: boolean;

    /** 文字是否存在下划线 */
    underlined?: boolean;

    /** 文字是否闪烁 */
    blink?: boolean;

    /** 文字是否以每分钟150以上的快速闪烁。未广泛支持 */
    rapidBlink?: boolean;

    /** 文字是否反转前景色和背景色 */
    reverse?: boolean;

    /** 文字是否隐藏文字(密码框)。未广泛支持 */
    hidden?: boolean;

    /** 文字是否划除。字符清晰，但标记为删除。未广泛支持 */
    crossedOut?: boolean;
};

export type AnsiFormatResult = {
    /** 文本格式化代码 */
    set: string;

    /** 恢复终端默认样式代码 */
    reset: string;
};

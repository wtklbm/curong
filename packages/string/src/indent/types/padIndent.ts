export type PadIndentOptions = {
    /** 当缩进时要填充的内容，默认为 ` ` */
    indent?: string;

    /** 重复几次填充的内容，默认为 `1` */
    count?: number;

    /** 是否将空行也包含在内，默认为 `true` */
    emptyLines?: boolean;
};

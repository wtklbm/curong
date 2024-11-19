export type ReadFragmentOptions = {
    /** 开始索引，默认为 `0` */
    start?: number;

    /** 结束索引，默认为 `0` */
    end?: number;

    /** 是否只读取第一行，默认为 `false` */
    firstLine?: boolean;
};

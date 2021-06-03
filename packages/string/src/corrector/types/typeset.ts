/** 提取中文项和非中文项 */
export type TypesetItem = {
    /** 是否匹配到了中文 */
    match: boolean;

    /** 该匹配项中的内容 */
    data: string;
};

export type TypesetResult = TypesetItem[];

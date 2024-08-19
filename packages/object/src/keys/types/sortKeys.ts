export type SortOptions = {
    /** 是否进行深度排序 */
    deep?: boolean;

    /** 自定义比较函数 */
    compare?: (a: string, b: string) => number;
};

/** 具有 `toString` 方法的值的类型定义 */
export interface ToStringAble {
    /** 返回字符串形式的内容 */
    readonly toString: () => string;
}

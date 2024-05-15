/** 具有 `length` 属性的值的类型定义 */
export type Lengthy<T extends {} = {}> = T & { length: number };

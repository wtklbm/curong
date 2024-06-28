/** 类的类型定义 */
export type Class<R = unknown, A extends unknown[] = unknown[]> = (new (
    ...args: A
) => R) & {
    readonly prototype: R;
};

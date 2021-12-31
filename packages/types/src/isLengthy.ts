import isUint from './isUint';

export type Lengthy<T extends {} = {}> = T & { length: number };

/**
 * 是不是一个具有 `length` 属性的类型，其 `length` 的值是一个大于或等于 0 的整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isLengthy<T>(value: unknown): value is Lengthy<T> {
    return isUint((value as any)?.length);
}

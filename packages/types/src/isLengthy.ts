import isUint from './isUint';
import isNullOrUndefined from './isNullOrUndefined';

/** 具有 `length` 属性的值的类型定义 */
export type Lengthy<T extends {} = {}> = T & { length: number };

/**
 * 是不是一个具有 `length` 属性的类型，其 `length` 的值是一个大于或等于 0 的整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isLengthy<T extends {}>(
    value: unknown
): value is Lengthy<T> {
    return !isNullOrUndefined(value) && isUint((value as any).length);
}

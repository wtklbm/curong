import isLengthy, { Lengthy } from './isLengthy';

/**
 * 是不是一个具有 `length` 属性的类型，其 `length` 的值是一个大于 0 的整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isLengthyHave<T extends {}>(value: unknown): value is Lengthy<T> {
    return isLengthy(value) && value.length > 0;
}

import isSizey, { Sizey } from './isSizey';

/**
 * 是不是一个具有 `size` 属性的类型，其 `size` 的值是一个大于 0 的整数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info 一些 `HTML` 元素也有 `size` 属性，比如 `input` 元素
 */
export default function isSizeyHave<T extends {}>(
    value: unknown
): value is Sizey<T> {
    return isSizey(value) && value.size > 0;
}

import isNaN from './isNaN';

/**
 * 是不是一个基本的数字，即 `number` || `Number()`
 *
 * @param value 要验证的值
 * @param isAllowNaN 当值为 `NaN` 时是否返回 `true`，默认为 `false`
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNumberPrimitive(
    value: unknown,
    isAllowNaN: boolean = false
): value is number {
    return typeof value === 'number' && (isAllowNaN || !isNaN(value));
}

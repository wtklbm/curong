import isFunction from './isFunction';

/**
 * 是不是一个参数个数大于 `0` 的函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFunctionHave(value: any): value is Function {
    return isFunction(value) && value.length > 0;
}

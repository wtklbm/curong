import isArray from './isArray';
import isSymbol from './isSymbol';

/**
 * 是不是一个数组，且每一项的值都是 `symbol` 或被包装后的 `Symbol` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSymbolArray(value: unknown): value is symbol[] {
    return isArray(value) && value.every(isSymbol);
}

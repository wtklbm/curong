import isSymbolObject from './isSymbolObject';
import isSymbolPrimitive from './isSymbolPrimitive';

/**
 * 是不是一个 `symbol` 或被包装后的 `Symbol` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @info `Symbol` 是一个基本类型的值
 *
 * @polyfill
 * ```javascript
 * try {
 *     const reg = /^Symbol\(.*\)$/;
 *
 *     if (typeof value.valueOf() !== 'symbol') {
 *         return false;
 *     }
 *
 *     return reg.test(Symbol.prototype.toString.call(value));
 * } catch (_e) {}
 *
 * return false;
 * ```
 */
export default function isSymbol(value: unknown): value is symbol {
    return isSymbolPrimitive(value) || isSymbolObject(value);
}

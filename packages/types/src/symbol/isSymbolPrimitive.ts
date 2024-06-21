import typeofEqual from '../type/typeofEqual';

/**
 * 是不是一个基本的 `symbol` || `Symbol()`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSymbolPrimitive(value: unknown): value is symbol {
    return typeofEqual(value, 'symbol');
}

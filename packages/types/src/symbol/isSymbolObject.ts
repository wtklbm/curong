import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个被包装后的 `Symbol` 对象，即 `Object(Symbol())`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSymbolObject(value: unknown): value is Symbol {
    return typeof value === 'object' && getTagEqual(value, 'Symbol');
}

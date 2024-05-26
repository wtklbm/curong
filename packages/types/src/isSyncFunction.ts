import getTagEqual from './getTagEqual';

/**
 * 是不是一个同步函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSyncFunction(value: unknown): value is Function {
    return getTagEqual(value, 'Function');
}

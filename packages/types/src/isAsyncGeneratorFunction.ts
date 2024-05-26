import getTagEqual from './getTagEqual';

/**
 * 是不是一个异步的 `Generator` 函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isAsyncGeneratorFunction(
    value: unknown
): value is AsyncGeneratorFunction {
    return getTagEqual(value, 'AsyncGeneratorFunction');
}

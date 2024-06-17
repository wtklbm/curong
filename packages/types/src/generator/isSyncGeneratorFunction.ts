import { getTagEqual } from '..';

/**
 * 是不是一个同步的 `Generator` 函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isSyncGeneratorFunction(
    value: unknown
): value is GeneratorFunction {
    return getTagEqual(value, 'GeneratorFunction');
}

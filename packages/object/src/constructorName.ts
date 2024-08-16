import constructor from './constructor';

/**
 * 获取一个值的构造函数的名称
 *
 * @param value 要使用的值
 * @returns 返回其构造函数的名称
 * @example
 *
 * ```typescript
 * const ret = constructorName('');
 * console.log(ret); // String
 * ```
 */
export default function constructorName(value: unknown): string | null {
    try {
        return constructor(value)!.name;
    } catch {}

    return null;
}

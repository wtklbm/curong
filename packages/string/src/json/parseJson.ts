import type { Json } from '@curong/types';

/**
 * 将 `JSON` 格式的字符串转换为一个 `JavaScript` 对象
 *
 * @param value `JSON` 格式的字符串
 * @param reviver 一个转换结果的函数。这个函数被对象的每个成员调用。
 *   如果成员包含嵌套对象，则嵌套对象先于父对象进行转换。
 * @returns 返回 `JavaScript` 对象
 * @throw 如果转换失败，则会抛出异常
 * @example
 * ```typescript
 * const s = '{"value":"","number":0,"bool":false}';
 * const ret = await parseJson(s);
 * console.log(ret); // { value: '', number: 0, bool: false }
 * ```
 */
export default function parseJson<T = Json>(
    value: string,
    reviver?: (key: string, value: any) => any
): Promise<T> {
    return new Promise(resolve => {
        try {
            resolve(JSON.parse(value, reviver));
        } catch (error) {
            throw new Error('[parseJson] 解析 JSON 对象失败', {
                cause: { value, reviver, error }
            });
        }
    });
}

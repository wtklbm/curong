/** 任何与 JSON 兼容的值 */
/* prettier-ignore */
type Json =
    | null | boolean | number | string | Json[]
    | { [prop: string]: Json; };

/**
 * 将 `JSON` 格式的字符串转换为一个 `JavaScript` 对象
 *
 * @param value `JSON` 格式的字符串
 * @param reviver 一个转换结果的函数。这个函数被对象的每个成员调用。
 *   如果成员包含嵌套对象，则嵌套对象先于父对象进行转换。
 * @returns 返回 `JavaScript` 对象
 * @throw
 *  - 如果转换失败，则会抛出异常
 *  - 如果要解析的内容中包含 `__proto__` 和 `constructor` 属性，则会抛出异常
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
            const ignoreKeysReg = /^(?:__proto__|constructor)$/;

            resolve(
                JSON.parse(value, (key: string, value: any) => {
                    // 剥离原型和构造函数属性以防止原型污染
                    if (ignoreKeysReg.test(key)) {
                        throw new Error(
                            '[parseJson] 在解析的 JSON 中，不可以包含 "__proto__" 和 "constructor" 属性，必须要防止原型污染',
                            { cause: { value, reviver } }
                        );
                    }

                    return reviver ? reviver(key, value) : value;
                })
            );
        } catch (error) {
            throw new Error('[parseJson] 解析 JSON 对象失败', {
                cause: { value, reviver, error }
            });
        }
    });
}

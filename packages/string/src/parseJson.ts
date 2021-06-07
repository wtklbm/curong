import { format } from '@curong/term';

/**
 * 将 `JSON` 格式的字符串转换为一个 `JavaScript` 对象
 *
 * @param value `JSON` 格式的字符串
 *
 * @returns 返回 `JavaScript` 对象
 * @throw 如果转换失败，则会抛出异常
 * @example
 *
 * ```javascript
 * const s = '{"value":"","number":0,"bool":false}';
 * const ret = await parseJson(s);
 * console.log(ret); // { value: '', number: 0, bool: false }
 * ```
 */
export default function parseJson<T = any>(value: string): Promise<T> {
    return new Promise(resolve => {
        try {
            resolve(JSON.parse(value));
        } catch (error) {
            throw format({
                name: 'parseJson',
                message: '解析JSON对象失败',
                data: { value, error }
            });
        }
    });
}

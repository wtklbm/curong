import { format } from '@curong/term';

/**
 * 将一个值转换为一个字符串
 *
 * @param value 要转换的值
 *
 * @returns 返回一个字符串
 * @throw 如果转换失败，则会抛出异常
 * @example
 *
 * ```javascript
 * const s = { value: '', number: 0, bool: false };
 * const ret = await stringify(s);
 * console.log(ret); // '{"value":"","number":0,"bool":false}'
 * ```
 */
export default function stringify(value: any): Promise<string> {
    return new Promise(resolve => {
        try {
            resolve(JSON.stringify(value));
        } catch (error) {
            throw format({
                name: 'stringify',
                message: '转换字符串失败',
                data: { value, error }
            });
        }
    });
}

import { chars } from '@curong/string';
import { format } from '@curong/term';
import { isArrayIndex } from '@curong/types';

import { ObjectType } from './types';

/**
 * 将级联属性字符串转换为一个级联属性数组
 *
 * @param value 级联属性字符串
 * @param dependencies 存储级联属性字符串中所依赖的外部变量的对象
 * @returns 返回一个属性数组
 * @throws
 *
 *  - 如果参数 value 中出现了为空的属性名，则会抛出异常
 *  - 如果依赖的属性并未在 dependencies 参数中定义，则会抛出异常
 *  - 在查找属性时，如果找到了 "[" 但是后面没有找到 "]"，则会抛出异常
 *  - 在查找属性时，如果找到了 "]" 但是之前没有找到 "["，则会抛出异常
 *
 * @example
 *
 * ```javascript
 * let o = { value: 'test' };
 * let ret = toCascadeKeys('.key[0].value');
 * console.log(ret); // [ 'key', 0, 'value' ]
 *
 * ret = toCascadeKeys('key[0][value]', o);
 * console.log(ret); // [ 'key', 0, 'test' ]
 * ```
 */
export default function toCascadeKeys(
    value: string,
    dependencies: ObjectType = {}
): Array<string | number> {
    let ret = [];
    let tmpKey = '';

    const name = 'toCascadeKeys';
    const charsArray = chars(value);
    const pushK = (key: string) => (key = key.trimEnd()) && ret.push(key);

    const vKey = (key: string) => {
        if (!key) {
            throw format({
                name,
                message: '参数 value 中出现了为空的属性名',
                data: { value, key }
            });
        }
    };

    const removeWarp = (key: string) => {
        vKey(key);

        // 处理字符串
        if (/^(?:'[^']+'|"[^"]+")$/.test(key)) {
            key = key.slice(1, -1).trim();
            vKey(key);
            return key;
        }

        const nk = Number(key);

        // 处理数组下标
        if (isArrayIndex(nk)) {
            return nk;
        }

        const v = dependencies[key];

        if (!v) {
            throw format({
                name,
                message: `"${key}" 属性并未在 dependencies 参数中定义`,
                data: { value, key, dependencies }
            });
        }

        return v;
    };

    for (let i = 0, m = -1, len = charsArray.length; i < len; i++) {
        const char = charsArray[i];

        switch (char) {
            case '.':
                pushK(tmpKey);
                tmpKey = '';
                break;

            case '[':
                m = value.indexOf(']', i + 1);

                if (m !== -1) {
                    pushK(tmpKey);
                    tmpKey = '';
                    ret.push(removeWarp(value.slice(i + 1, m).trim()));
                    i = m;
                } else {
                    throw format({
                        name,
                        message: '找到了 "[" 但是后面没有找到 "]"',
                        data: { value }
                    });
                }

                break;

            case ']':
                throw format({
                    name,
                    message: '找到了 "]" 但是之前没有找到 "["',
                    data: { value }
                });

            default:
                tmpKey += char;
                break;
        }
    }

    tmpKey && pushK(tmpKey);

    return ret;
}

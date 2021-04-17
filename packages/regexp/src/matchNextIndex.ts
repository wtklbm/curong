import { RegExpExecOrigin } from './types/execAll';

/**
 * 获取正则匹配对象的当前项的下一个字符的开始索引位置
 *
 * @param match 正则匹配对象
 * @returns 返回正则匹配对象匹配值后面的索引位置
 * @example
 *
 * ```javascript
 * const r = /\d+/g;
 * const v = 'hello123world';
 * console.log(matchNextIndex(r.exec(v)!)); // 8
 * ```
 */
export default function matchNextIndex(
    match: RegExpExecArray | RegExpMatchArray | RegExpExecOrigin
): number {
    return match[0].length + match.index!;
}

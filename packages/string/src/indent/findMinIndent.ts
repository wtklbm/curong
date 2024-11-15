import { trimRegSource } from '../trim/trimRegSource';

import type { MinIndentOptions } from './types';

/**
 * 查找字符串每一行开头的公共前导空格数
 *
 * @param lines 要操作的每个元素
 * @param options 配置选项
 *  - `emptyLines`: 是否将空行也包含在内，默认为 `true`
 * @returns 返回公共前导空格数
 * @example
 *
 * ```typescript
 * const value = ['\t// title', '\t//', '\t// description.'].join('\n');
 * const ret = findMinIndent(value); // 1
 * console.log(ret);
 * ```
 */
export default function findMinIndent(
    value: string,
    options?: MinIndentOptions
) {
    const { emptyLines } = { emptyLines: true, ...options };
    const regex = new RegExp(
        `^${trimRegSource(
            {
                zeroWidth: false,
                control: false
            },
            '\t'
        )}${emptyLines ? '*' : '+'}(?=.?)`,
        'gm'
    );
    const match = value.match(regex);

    return match ? match.reduce((r, a) => Math.min(r, a.length), Infinity) : 0;
}

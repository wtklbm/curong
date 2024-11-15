import { isZero } from '@curong/types';

import { trimRegSource } from '../trim/trimRegSource';

import findMinIndent from './findMinIndent';
import type { MinIndentOptions } from './types';

/**
 * 删除字符串每一行开头的公共前导空格
 *
 * @param lines 要操作的每个元素
 * @param options 配置选项
 *  - `emptyLines`: 是否将空行也包含在内，默认为 `true`
 * @returns 返回处理好的内容
 * @example
 *
 * ```typescript
 * const value = ['\t// title', '\t//', '\t// description.'].join('\n');
 * const ret = trimIndent(value);
 * console.log(ret); // "// title\n//\n// description."
 * ```
 */
export default function trimIndent(
    value: string,
    options?: MinIndentOptions
): string {
    const indent = findMinIndent(value, options);
    const regex = new RegExp(
        `^${trimRegSource(
            { zeroWidth: false, control: false },
            '\t'
        )}{${indent}}`,
        'gm'
    );

    return isZero(indent) ? value : value.replace(regex, '');
}

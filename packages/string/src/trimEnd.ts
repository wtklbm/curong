import { isZero } from '@curong/types';

import { trimRegSource } from './trimRegSource';
import { SpecialCharNames, TrimOptions } from './types';

/**
 * 删除字符串结尾的特定字符
 *
 * @param value 要处理的字符串
 * @param options 配置选项
 *   - `space`: 是否删除空格，默认为 `true`
 *   - `zeroWidth`: 是否删除零宽字符，默认为 `true`
 *   - `likeSpace`: 是否删除像空格的字符，默认为 `true`
 *   - `control`: 是否删除控制字符(回车、换行、制表符等)，默认为 `true`
 *
 * @param chars 自定义要删除的字符
 * @returns 返回处理好的字符串
 * @example
 *
 * ```javascript
 * const ret = trimEnd(`xxx\t \u3000`, { control: false });
 * console.log(ret); // 'xxx\t'
 * ```
 */
export default function trimEnd(
    value: string,
    options?: TrimOptions,
    chars?: SpecialCharNames[]
): string {
    if (isZero(value.length)) {
        return value;
    }

    return value.replace(new RegExp(`${trimRegSource(options, chars)}$`), '');
}

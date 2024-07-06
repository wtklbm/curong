import { trimRegSource } from './trimRegSource';
import type { TrimOptions } from './types';

/**
 * 验证一个非空字符串是不是一个空字符字符串
 *
 * @param value 要验证的字符串
 * @param options 配置选项
 *   - `space`: 是否验证空格，默认为 `true`
 *   - `zeroWidth`: 是否验证零宽字符，默认为 `true`
 *   - `likeSpace`: 是否验证像空格的字符，默认为 `true`
 *   - `control`: 是否验证控制字符(回车、换行、制表符等)，默认为 `true`
 * @param extras 要验证的额外的自定义字符
 * @returns 是则返回 `true`，否则为 `false` (空字符串的结果为 `false`)
 * @example
 *
 * ```typescript
 * const ret = isSpaceString(` \u3000 \u200B`);
 * console.log(ret); // true
 * ```
 */
export default function isSpaceString(
    value: string,
    options?: TrimOptions,
    extras?: string | string[]
): boolean {
    return new RegExp(`^${trimRegSource(options, extras)}$`).test(value);
}

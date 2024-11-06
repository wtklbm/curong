import { emoji } from './source';

let _: RegExp;

/**
 * 是否包含表情符号
 *
 * @param str 要验证的字符串
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * const ret = inEmoji('✅');
 * console.log(ret); // true
 * ```
 */
export default function inEmoji(value: string): boolean {
    return (_ ?? (_ = new RegExp(emoji))).test(value);
}

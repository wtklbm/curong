import { isStringFilled } from '@curong/types';

const localeReg =
    /^[A-z]{2,4}([_-]([A-z]{4}|[\d]{3}))?([_-]([A-z]{2}|[\d]{3}))?$/;

/**
 * 是不是一个区域设置字符串
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 * ```typescript
 * console.log(isLocale('en_US')); // true
 * console.log(isLocale('zh_CN')); // true
 * console.log(isLocale('en_US_POSIX')); // true
 * console.log(isLocale('invalid_locale')); // false
 * ```
 * @note
 *  - 特殊的区域设置如 `en_US_POSIX` 和 `ca_ES_VALENCIA` 被视为有效
 *  - 支持的区域设置格式包括语言代码 (2-4 个字母) 和可选的地区代码 (2 个字母或 3 位数字)
 */
export default function isLocale(value: unknown): boolean {
    return (
        isStringFilled(value) &&
        (value === 'en_US_POSIX' ||
            value === 'ca_ES_VALENCIA' ||
            localeReg.test(value))
    );
}

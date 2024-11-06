import { ipv6 } from './source';

let _: RegExp;

/**
 * 是不是一个 `IPv6` 地址
 *
 * @param value 要验证的 `IP` 地址字符串
 * @returns 是则返回 `true`，否则为 `false`
 * @see https://en.wikipedia.org/wiki/IPv6
 * @example
 *
 * ```typescript
 * console.log(isIPv6('::1')); // true
 * ```
 */
export default function isIPv6(value: string): boolean {
    return (_ ?? (_ = new RegExp(`^${ipv6}$`))).test(value);
}

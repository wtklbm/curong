import { ipv4 } from './source';

let _: RegExp;

/**
 * 是不是一个 `IPv4` 地址
 *
 * @param value 要验证的 `IP` 地址字符串
 * @returns 是则返回 `true`，否则为 `false`
 * @see https://en.wikipedia.org/wiki/IPv4
 * @example
 *
 * ```typescript
 * console.log(isIPv4('127.0.0.1')); // true
 * ```
 */
export default function isIPv4(value: string): boolean {
    return (_ ?? (_ = new RegExp(`^${ipv4}$`))).test(value);
}

import { ip } from './source';

let _: RegExp;

/**
 * 是不是一个 `IP` 地址 (包括 `IPv4` 和  `IPv6`)
 *
 * @param value 要验证的 `IP` 地址字符串
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * console.log(isIP('127.0.0.1')); // true
 * console.log(isIP('2409:8054:48::1006')); // true
 * ```
 */
export default function isIP(value: string): boolean {
    return (_ ?? (_ = new RegExp(`^${ip}$`))).test(value);
}

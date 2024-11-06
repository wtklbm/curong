import { base64 } from './source';

let _: RegExp;

/**
 * 是不是一个 `base64`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * const ret = isBase64('YmFzZTY0');
 * console.log(ret); // true
 * ```
 */
export default function isBase64(value: string): boolean {
    return (_ ?? (_ = new RegExp(`^(${base64})$`))).test(value);
}

import { uuid } from './source';

let _: RegExp;

/**
 * 是不是一个 `uuid`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * const ret = isUUID('123e4567-e89b-12d3-a456-426614174000');
 * console.log(ret); // true
 * ```
 */
export default function isUUID(value: string): boolean {
    return (_ ?? (_ = new RegExp(`^${uuid}$`))).test(value);
}

import { ulid } from './source';

let _: RegExp;

/**
 * 是不是一个 `ulid`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * const ret = isULID('01ARZ3NDEKTSV4RRFFQ69G5FAV');
 * console.log(ret); // true
 * ```
 */
export default function isULID(value: string): boolean {
    return (_ ?? (_ = new RegExp(`^${ulid}$`))).test(value);
}

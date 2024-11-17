import { nanoid } from './source';

let _: RegExp;

/**
 * 是不是一个 `nanoid`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
* const ret = isNanoID('V1StGXR8_Z5jadHi6B5c8');
* console.log(ret); // true
* ```
*/
export default function isNanoID(value: string): boolean {
    return (_ ?? (_ = new RegExp(`^${nanoid}$`))).test(value);
}

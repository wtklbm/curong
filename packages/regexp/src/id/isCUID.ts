import { cuid } from './source';

let _: RegExp;

/**
 * 是不是一个 `cuid`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
* const ret = isCUID('cjld2cjxh0000qzrmn831i7rn');
* console.log(ret); // true
* ```
*/
export default function isCUID(value: string): boolean {
    return (_ ?? (_ = new RegExp(`^${cuid}$`))).test(value);
}

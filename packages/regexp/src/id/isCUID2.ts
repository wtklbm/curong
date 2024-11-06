import { cuid2 } from './source';

let _: RegExp;

/**
 * 是不是一个 `cuid2`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
* const ret = isCUID2('pj17j4wheabtydu00x2yuo8s');
* console.log(ret); // true
* ```
*/
export default function isCUID2(value: string): boolean {
    return (_ ?? (_ = new RegExp(`^${cuid2}$`))).test(value);
}

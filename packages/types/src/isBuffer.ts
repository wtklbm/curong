import isNullOrUndefined from './isNullOrUndefined';
import isFunctionHave from './isFunctionHave';

/**
 * 是不是一个 `Buffer`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 *
 * @source
 * ```javascript
 * Buffer.isBuffer = function isBuffer(b) {
 *   return b instanceof Buffer;
 * };
 * ```
 */
export default function isBuffer(value: any): value is Buffer {
    return (
        !isNullOrUndefined(Buffer) &&
        isFunctionHave(Buffer.isBuffer) &&
        Buffer.isBuffer(value)
    );
}

import isFunction from './isFunction';
import isNullOrUndefined from './isNullOrUndefined';

const r = (t: any) => {
    try {
        return t.constructor.isBuffer(t);
    } catch {}
    return false;
};

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
        !isNullOrUndefined(value) &&
        (r(value) ||
            (isFunction(value.readFloatLE) &&
                isFunction(value.slice) &&
                r(value.slice(0, 0))))
    );
}

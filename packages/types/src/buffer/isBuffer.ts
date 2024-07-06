const r = (value: any) => value.constructor.isBuffer(value);

/**
 * 是不是一个 `Buffer`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @source
 *
 * ```typescript
 * Buffer.isBuffer = function isBuffer(b) {
 *   return b instanceof Buffer;
 * };
 * ```
 *
 * @note
 *
 * `Buffer` 类是 JavaScript `Uint8Array` 类的子类，并使用涵盖额外用例的方法对其进行扩展。
 * `Node.js` API 在支持 `Buffer` 的地方也接受纯 `Uint8Array`。
 *  在进行类型判断时，应该始终使用 `isBuffer` 方法。而不是使用 `isUint8Array`。
 */
export default function isBuffer(value: unknown): value is Buffer {
    try {
        return (
            r(value) ||
            ((value as Buffer).readFloatLE &&
                r((value as Buffer).subarray(0, 1)))
        );
    } catch {}

    return false;
}

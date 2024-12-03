import getCrypto from '../../../../number/src/constants/getCrypto';

const crypto = getCrypto();

/**
 * 生成一个指定长度的随机 `Uint8Array` 数组，并返回一个包含该数组元素的普通数组
 *
 * 该函数使用 `getRandomValues` 方法生成指定长度的随机字节，并将其作为一个 `Uint8Array` 返回。然后将其转换为普通数组并返回。
 *
 * @param length 生成的随机字节数组的长度，默认值为 `1`
 * @returns 返回一个包含随机字节的普通数组，数组长度为 `length`
 * @example
 * ```typescript
 * console.log(randomUint8(5)); // [157, 45, 81, 128, 34]
 * console.log(randomUint8()); // 默认长度为 1，例如 [42]
 * ```
 * @note
 *  - 返回的数组包含在 `0` 到 `255` 之间的整数，因为 `Uint8Array` 的元素范围为 `0` 到 `255`
 *  - 该方法非常适合生成随机数、密钥、令牌等安全性要求较高的场景
 */
export default function randomUint8(length: number = 1): number[] {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array);
}

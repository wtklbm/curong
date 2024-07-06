import getCrypto from '../../number/src/constants/getCrypto';

// `getRandomValues` 方法所支持的最大长度，超过此长度就会报错
const MAX_LENGTH = 65536;
const crypto = getCrypto();
const creator = (length: number) =>
    crypto.getRandomValues(new Uint8Array(length)).join('');

/**
 * 生成安全的随机数字符串
 *
 * @param length 要返回的随机数的长度，默认为 15 位 (可安全的转换为无符号整数)
 * @returns 返回一个随机数字符串
 *  - 该方法严重依赖高版本的 `Node.js` (>= v15.0.0)，在低版本上无法生成随机数
 *  - 如果将随机数字符串转换为无符号整数，则需保证值不能超过 `Number.MAX_SAFE_INTEGER`
 * @throws 如果 `crypto.getRandomValues` 方法不存在，则会抛出异常
 * @example
 *
 * ```JavaScript
 * // 生成一个长度为 10 的随机数字符串
 * const n = random(10);
 *
 * // 如果想使用随机数数字，可以调用 `parseInt(n)` 或 `Number(n)`
 * // 如果要转换的数字的值超过了 `Number.MAX_SAFE_INTEGER`，则可能会导出不安全
 * // 为了实现安全的存储和计算，可以使用 `BigInt` 进行转换 (`BigInt(n)`)
 * console.log(n);
 * ```
 */
export default function random(length: number = 15): string {
    return (
        length < MAX_LENGTH
            ? creator(length)
            : Array.from({ length: Math.ceil(length / MAX_LENGTH) }, () =>
                  creator(MAX_LENGTH)
              ).join('')
    ).slice(-length);
}

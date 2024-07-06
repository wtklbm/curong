import getCrypto from './constants/getCrypto';

const crypto = getCrypto();

/**
 * 生成一个安全的随机浮点数
 *
 * @returns 返回安全的随机浮点数
 * @note
 *
 * - 与 {@link Math.random} 方法相同，生成的是一个大于等于 `0` 且小于 `1` 的浮点数，小数点后面包含 `11 - 21` 位数字。
 *   `Number` 的最大安全整数为 `2^53-1` (`9007199254740991`)，所以在转换为整数时，需要通过 `isIntSafe` 方法来判断数字是否安全
 * - `getRandomValues` 生成随机数的速度较 `Math.random` 慢，但是生成的随机数特别安全
 * - 如果想生成快速且不安全的随机数，请使用 `random` 方法
 */
export default function randomSafe(): number {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] * 2 ** -32;
}

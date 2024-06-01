import { format } from '@curong/term';
import { isBrowser, isNodejs } from '@curong/types';

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
 *
 * @note
 *
 * ### 伪随机数生成器
 *
 * 由于真随机数来自于计算机外部，获得的代价往往较高，
 * 而在计算机的应用场景中我们也并不总是要求随机数都有真随机那么高的不确定性，
 * 所以这就衍生出了对伪随机的需求。设计良好的算法产生的随机序列能够以假乱真，
 * 大部分计算机程序和语言中的随机函数，都是伪随机数生成器，它们都是由确定的算法，
 * 通过一个**种子** (比如：时间)，来产生**看起来随机**的结果。
 * 产生伪随机数的算法被叫做**伪随机数生成器**。
 *
 * JS 中的 `Math.random()` 是一个伪随机数生成器函数，它是不安全的。为了尽可能的保证安全，
 * 就需要 `Crypto` 对象，并调用其 `getRandomValues` 方法来获得一个相对安全的随机数。
 */
export default function random(length: number = 15): string {
    let crypto: Crypto;

    if (isBrowser()) {
        crypto =
            window.crypto ??
            (window as any).webkitCrypto ??
            (window as any).mozCrypto ??
            (window as any).oCrypto ??
            (window as any).msCrypto;
    } else if (isNodejs()) {
        crypto = globalThis.crypto ?? require('crypto').webcrypto;
    } else {
        throw format({
            name: 'random',
            message: '在浏览器或 Node.js 环境下没有检测到 crypto 对象'
        });
    }

    const creator = (length: number) =>
        crypto.getRandomValues(new Uint8Array(length)).join('');

    // `getRandomValues` 方法所支持的最大长度，超过此长度就会报错
    const MAX_LENGTH = 65536;

    return (
        length < MAX_LENGTH
            ? creator(length)
            : Array.from({ length: Math.ceil(length / MAX_LENGTH) }, () =>
                  creator(MAX_LENGTH)
              ).join('')
    ).slice(-length);
}

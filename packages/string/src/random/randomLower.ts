import randomUint8 from './constants/randomUint8';

/**
 * 生成一个随机的小写字母
 *
 * @param isSafe 是否生成安全的小写字母，默认为 `false`
 *  - `true`: 使用 `crypto.getRandomValues` 方法来生成随机数，运行速度慢，安全
 *  - `false`: 使用 `Math.random` 方法来生成随机数，运行速度快，不安全
 * @returns 返回一个随机的小写字母 (`a` 到 `z`)
 * @example
 * ```typescript
 * console.log(randomLower()); // g
 * console.log(randomLower(true)); // t
 * ```
 */
export default function randomLower(isSafe: boolean = false) {
    return String.fromCharCode(
        (isSafe ? randomUint8()[0] % 26 : Math.floor(Math.random() * 26)) + 97
    );
}

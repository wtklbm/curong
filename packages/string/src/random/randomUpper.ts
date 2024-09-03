import randomUint8 from './constants/randomUint8';

/**
 * 生成一个随机的大写字母
 *
 * @param isSafe 是否生成安全的大写字母，默认为 `false`
 * @returns 返回一个随机的大写字母 (`A` 到 `Z`)
 *
 * @example
 * ```typescript
 * console.log(randomUpper()); // M
 * console.log(randomUpper(true)); // Z
 * ```
 */
export default function randomUpper(isSafe: boolean = false) {
    return String.fromCharCode(
        (isSafe ? randomUint8()[0] % 26 : Math.floor(Math.random() * 26)) + 65
    );
}

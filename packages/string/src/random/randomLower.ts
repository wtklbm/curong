import randomUint8 from './constants/randomUint8';

/**
 * 生成一个随机的小写字母
 *
 * @param isSafe 是否生成安全的小写字母，默认为 `false`
 * @returns 返回一个随机的小写字母 (`a` 到 `z`)
 * @example
 *
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

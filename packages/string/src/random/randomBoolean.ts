import randomUint8 from './constants/randomUint8';

/**
 * 生成一个随机的布尔值
 *
 * @param isSafe 是否生成安全的布尔值，默认为 `false`
 *  - `true`: 使用 `crypto.getRandomValues` 方法来生成随机数，运行速度慢，安全
 *  - `false`: 使用 `Math.random` 方法来生成随机数，运行速度快，不安全
 * @returns 返回 `true` 或 `false`
 * @example
 * ```typescript
 * console.log(randomBoolean()); // true
 * console.log(randomBoolean(true)); // false
 * ```
 */
export default function randomBoolean(isSafe: boolean = false) {
    return (
        (isSafe ? randomUint8()[0] : Math.floor(Math.random() * 10)) % 2 === 0
    );
}

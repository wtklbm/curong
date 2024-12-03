import randomUint8 from './constants/randomUint8';

/**
 * 生成一个随机的十六进制颜色字符串
 *
 * 该颜色值的格式为 `#RRGGBB`，其中 `RR`、`GG` 和 `BB` 是从 `00` 到 `FF` 的随机十六进制数。
 *
 * @param isSafe 是否生成安全的颜色值，默认为 `false`
 *  - `true`: 使用 `crypto.getRandomValues` 方法来生成随机数，运行速度慢，安全
 *  - `false`: 使用 `Math.random` 方法来生成随机数，运行速度快，不安全
 * @returns 返回生成的十六进制颜色字符串
 * @example
 * ```typescript
 * console.log(randomHexColor()); // #A3E12F
 * console.log(randomHexColor(true)); // #09F166
 * ```
 */
export default function randomHexColor(isSafe: boolean = false) {
    return (
        '#' +
        (isSafe
            ? randomUint8(3)
                  .map(v => v.toString(16).padStart(2, '0'))
                  .join('')
            : `00000${((Math.random() * 0x1000000) << 0).toString(16)}`.slice(
                  -6
              )
        ).toUpperCase()
    );
}

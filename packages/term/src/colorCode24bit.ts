import { isUintSafe, isArray } from '@curong/types';

import { ColorCodeResult } from './types/color';

/**
 * 根据 `RGB` 数组，使用从0到255的任意数字生成24位的终端颜色代码
 *
 * @param colorCodes 长度为3的 `RGB` 数组，数组的每一项依次表示为 `red`, `green`, `blue`，值是从0到255的任意数字
 * @returns 返回生成好的前景色和背景色终端代码
 * @throws
 *
 * - 如果 `colorCodes` 不是一个有效RGB数组，则会抛出异常
 * - 如果 `colorCode` 不是一个有效数字，则会抛出异常
 *
 * @example
 *
 * ```javascript
 * const ret = colorCode24bit([128, 136, 255]);
 *
 * // {
 * //     foreground: '38;2;128;136;255',
 * //     background: '48;2;128;136;255'
 * // }
 * console.log(ret);
 * ```
 */
export default function colorCode24bit(colorCodes: number[]): ColorCodeResult {
    if (!isArray(colorCodes) || colorCodes.length !== 3) {
        throw new TypeError(
            `[colorCode24bit]: colorCodes不是一个有效RGB数组, "${colorCodes}"`
        );
    }

    colorCodes.forEach(colorCode => {
        if (!isUintSafe(colorCode) || colorCode < 0 || colorCode > 255) {
            throw new TypeError(
                `[colorCode24bit]: colorCode不是一个有效数字, "${colorCode}"`
            );
        }
    });

    const code = colorCodes.join(';');

    return {
        foreground: `38;2;${code}`,
        background: `48;2;${code}`
    };
}

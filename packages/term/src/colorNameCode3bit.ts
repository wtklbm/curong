import { isEqual, isNull } from '@curong/types';

import type { ColorName, ColorCodeResult } from './types';
import { COLORS_CODE } from './constants';

/**
 * 通过颜色名生成3位的终端颜色代码
 *
 * @param colorName 颜色名
 * @returns 返回生成好的终端代码，包含前景色代码和背景色代码
 * @throws
 *
 * - 如果 `colorName` 不是有效颜色值，则会抛出异常
 *
 * @example
 *
 * ```javascript
 * const ret = colorNameCode3bit('lightred');
 *
 * // {
 * //     foreground: '91',
 * //     background: '101'
 * // }
 * console.log(ret);
 * ```
 *
 * @info
 *
 * ### 并不是所有的系统平台都支持终端颜色代码
 *
 * 在 `Windows 10` 之前版本的 `CMD` 终端上不支持 `ANSI` 转移序列。
 *
 * ### 终端颜色上的区别
 *
 * 在终端上，颜色分为标准色和高亮色，其中标准色是偏暗的颜色，而高亮的颜色相当于普通色。
 * 比如在终端颜色中， `red` 就是暗红色，而 `lightred` 就是红色。
 * 在比如 `white` 就是灰色，`lightwhite` 就是纯白色，`black` 是黑色，`lightblack` 就是暗灰色。
 *
 * ### 如何使用生成好的终端颜色代码
 *
 * 当生成好终端颜色代码后，还需要在终端颜色代码上增加 `\u001B[` 前缀和 `m` 后缀，
 * 比如终端颜色red的前景色代码是 `31`，如果想要在终端上使用该代码展示出带有前景色的样式，则写为 `\u001B[31m`。
 * 如果需要同时展示 `red` 前景色和 `yellow` 背景色，则写为 `\u001B[31;103m`。
 *
 * ### 如何恢复为终端默认的前景色和背景色
 *
 * 如果设置了终端前景色或者背景色，想恢复成终端默认的颜色，则：
 *
 * - 如果设置了前景色，则向后追加代码 `\u001B[39m`
 * - 如果设置了背景色，则向后追加代码 `\u001B[49m`
 * - 如果同时设置了前景色和背景色，则向后追加代码 `\u001B[39;49m`
 */
export default function colorNameCode3bit(
    colorName: ColorName
): ColorCodeResult {
    const standardColors = COLORS_CODE.standard;
    let resultColor = null;

    for (let i = 0, len = standardColors.length; i < len; i++) {
        // 标准色和高强度色
        const standard = standardColors[i];
        const highIntensity = `light${standard}`;

        if (isEqual(colorName, standard)) {
            resultColor = 30 + i;
            break;
        } else if (isEqual(colorName, highIntensity)) {
            resultColor = 90 + i;
            break;
        }
    }

    if (isNull(resultColor)) {
        throw new Error(
            `[colorNameCode3bit]: colorName不是有效颜色值, "${colorName}"`
        );
    }

    return {
        foreground: resultColor.toString(),
        background: (resultColor + 10).toString()
    };
}

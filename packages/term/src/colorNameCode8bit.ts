import { ColorName, ColorCodeResult } from './types/color';
import { COLORS_CODE } from './constants';
import colorCode8bit from './colorCode8bit';

/**
 * 通过颜色名生成8位的终端颜色代码
 *
 * @param colorName 颜色名
 * @returns 返回生成好的终端代码，包含前景色代码和背景色代码
 * @example
 *
 * ```javascript
 * const ret = colorNameCode8bit('red');
 *
 * // {
 * //     foreground: '38;5;1',
 * //     background: '48;5;1'
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
 * 比如终端颜色red的前景色代码是 `1`，如果想要在终端上使用该代码展示出带有前景色的样式，则写为 `\u001B[38;5;1m`。
 * 如果需要同时展示 `red` 前景色和 `yellow` 背景色，则写为 `\u001B[38;5;1;38;5;3m`。
 *
 * ### 如何恢复为终端默认的前景色和背景色
 *
 * 如果设置了终端前景色或者背景色，想恢复成终端默认的颜色，则：
 *
 * - 如果设置了前景色，则向后追加代码 `\u001B[39m`
 * - 如果设置了背景色，则向后追加代码 `\u001B[49m`
 * - 如果同时设置了前景色和背景色，则向后追加代码 `\u001B[39;49m`
 */
export default function colorNameCode8bit(
    colorName: ColorName
): ColorCodeResult {
    const colors = COLORS_CODE.standard.concat(COLORS_CODE.highIntensity);

    return colorCode8bit(colors.findIndex(color => color === colorName));
}

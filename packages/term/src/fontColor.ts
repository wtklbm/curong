import { isUndefined, isZero } from '@curong/types';

import { CSI } from './sequence';
import ansiFormat from './ansiFormat';
import colorNameCode8bit from './colorNameCode8bit';

import { FontColorOptions } from './types/color';

/**
 * 创建一个在终端使用的带有样式的字符串
 *
 * @param value 要设置的值
 * @param options 配置选项
 *
 * - `foreground`: 要对文字设置的前景色
 * - `background`: 要对文字设置的背景色
 * - `bold`: 文字是否加粗或高亮。有的终端是实现加粗效果，有的终端是实现高亮效果(即浅色显示前景色)
 * - `dim`: 文字是否弱化(变暗变灰)。未广泛支持
 * - `italic`: 文字是否斜体。未广泛支持。有时视为反相显示
 * - `underlined`: 文字是否存在下划线
 * - `blink`: 文字是否闪烁
 * - `rapidBlink`: 文字是否以每分钟150以上的快速闪烁。未广泛支持
 * - `reverse`: 文字是否反转前景色和背景色
 * - `hidden`: 文字是否隐藏文字(密码框)。未广泛支持
 * - `crossedOut`:  文字是否划除。字符清晰，但标记为删除。未广泛支持
 *
 * @returns 返回带有样式的终端字符串
 * @example
 *
 * ```javascript
 * const text = fontColor('正在加载进度条...', {
 *     foreground: 'red',
 *     background: 'yellow',
 *     underlined: true,
 *     bold: true
 * });
 *
 * // '\u001B[38;5;1;48;5;3;1;4m正在加载进度条...\u001B[39;49;22;24m'
 * console.log(text);
 * ```
 */
export default function fontColor(
    value: string,
    options?: FontColorOptions
): string {
    if (isZero(value.length)) {
        return '';
    }

    if (isUndefined(options)) {
        return `${CSI}0m${value}`;
    }

    const setCodes: string[] = [];
    const resetCodes: string[] = [];
    const { foreground, background } = options;

    if (foreground) {
        setCodes.push(colorNameCode8bit(foreground).foreground);
        resetCodes.push('39');
    }

    if (background) {
        setCodes.push(colorNameCode8bit(background).background);
        resetCodes.push('49');
    }

    // 追加文字的格式化配置
    const { set, reset } = ansiFormat(options);
    set.length > 0 && setCodes.push(set);
    reset.length > 0 && resetCodes.push(reset);

    // 拼接数据并返回
    const left = `${CSI}${setCodes.join(';')}m`;
    const right = `${CSI}${resetCodes.join(';')}m`;

    return left + value + right;
}

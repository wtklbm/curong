import { isUndefined, isTrue, isFalse } from '@curong/types';

import { AnsiFormatOptions, AnsiFormatResult } from './types/ansiFormat';

/**
 * 使用 `ANSI` 转义序列来格式化一段在终端使用的文本字符串
 *
 * @param options 格式化选项
 *
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
 * @returns 返回格式化代码，包含设置代码和恢复设置代码
 * @example
 *
 * ```javascript
 * const ret = ansiFormat({
 *     bold: true,
 *     italic: true,
 *     blink: true,
 *     reverse: true
 * });
 *
 * // {
 * //     set: '1;3;5;7',
 * //     reset: '22;23;25;27'
 * // }
 * console.log(ret);
 * ```
 */
export default function ansiFormat(
    options: AnsiFormatOptions = {}
): AnsiFormatResult {
    const setColor: number[] = [];
    const resetColor: number[] = [];
    const formatKeys = [
        'bold',
        'dim',
        'italic',
        'underlined',
        'blink',
        'rapidBlink',
        'reverse',
        'hidden',
        'crossedOut'
    ];

    for (let i = 0, len = formatKeys.length; i < len; i++) {
        const key = formatKeys[i] as keyof AnsiFormatOptions;
        const value = options[key];
        let resetAppend = 21;

        if (isUndefined(value)) {
            continue;
        }

        switch (key) {
            case 'bold':
                // `22` 和 `21` 的作用相同
                resetAppend++;

            default:
                if (isTrue(value)) {
                    setColor.push(i + 1);
                    resetColor.push(i + resetAppend);
                } else if (isFalse(value)) {
                    resetColor.push(i + resetAppend);
                }
                break;
        }
    }

    return {
        set: setColor.join(';'),
        reset: resetColor.join(';')
    };
}

import type { PadIndentOptions } from './types';

/**
 * 对字符串的每一行进行缩进
 *
 * @param value 要填充的字符串
 * @param options 配置选项
 *  - `indent`: 当缩进时要填充的内容，默认为 ` `
 *  - `count`: 重复几次填充的内容，默认为 `1`
 *  - `emptyLines`: 是否将空行也包含在内，默认为 `true`
 * @returns 返回处理的字符串
 * @example
 *
 * ```typescript
 * const ret = padIndent('description.\n\nthis is a test.', {
 *     count: 4,
 *     emptyLines: false
 * });
 * console.log(ret); //  '    description.\n\n    this is a test.'
 * ```
 */
export default function padIndent(
    value: string,
    options: PadIndentOptions = {}
) {
    const { indent = ' ', count = 1, emptyLines = true } = options;

    return value.replace(
        emptyLines ? /^/gm : /^(?!^$)/gm,
        indent.repeat(count)
    );
}

import halfWidth from './basic/fullWith';
import general from './basic/general';
import plugins from './plugins';
import type { CorrectorOptions } from './types';

export * from './types';

/**
 * 在指定的位置处来添加一些空格，美化中文语句的排版
 *
 * @param value 要处理的字符串
 * @returns 返回处理好的字符串
 * @todo 支持 `Markdown` 语法
 * @example
 *
 * ```javascript
 * const v = '今天li Ming搬了一天的砖，赚了100元，花了2.5元坐车回家，其他的给老婆。';
 * const ret = corrector(v);
 * console.log(ret); // "今天 li Ming 搬了一天的砖，赚了 100 元，花了 2.5 元坐车回家，其他的交给老婆。"
 * ```
 */
export default function corrector(
    value: string,
    options?: CorrectorOptions
): string {
    if (!(value = value.trim())) {
        return value;
    }

    const { enhanceRule = true, toHalfWith = true } = options ?? {};

    if (toHalfWith) {
        value = halfWidth(value);
    }

    // 增强美化逻辑
    if (enhanceRule) {
        return plugins.reduce((memo, f) => f(memo), value);
    }

    return general(value);
}

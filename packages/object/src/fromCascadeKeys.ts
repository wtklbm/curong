import { isArrayFilled, isNumber } from '@curong/types';

import type { FromCascadeKeysOptions } from './types';

const addPack = (
    key: string | number,
    optionalChar: string,
    isAppendWen: boolean = true
) => {
    // 处理数字
    if (isNumber(key)) {
        // 数字后面不能带 `?`
        return `[${key}]`;
    }

    //# 处理字符串

    if (/^[^0-9][\w$]*$/.test(key)) {
        return isAppendWen ? `${optionalChar}.${key}` : `.${key}`;
    }

    if (/^('[^']+'|"[^"]+")$/.test(key)) {
        return `[${key}]`;
    }

    return `['${key}']`;
};

/**
 * 将级联属性数组转换为一个属性字符串
 *
 * @param keys 属性数组
 * @param options 配置选项
 * @returns 返回级联属性字符串
 * @example
 *
 * ```typescript
 * const ret = fromCascadeKeys(['a', 'b', 10, 'c']);
 * console.log(ret); // 'a.b[10].c'
 * ```
 */
export default function fromCascadeKeys(
    keys: Array<string | number>,
    options?: FromCascadeKeysOptions
): string {
    const { optional = false, startDot = false } = options ?? {};
    let oc = '';

    if (optional) {
        oc = '?';
    }

    // 如果属性数组中没有内容
    if (!isArrayFilled(keys)) {
        return '';
    }

    // 获取到第一项
    let first = addPack(keys.shift()!, oc, false);

    // 如果不需要给第一项的开头加 `.`
    if (!startDot && first.startsWith('.')) {
        first = first.slice(1);
    }

    // 如果属性数组中只有一项，则直接返回
    if (keys.length === 1) {
        return first;
    }

    // 遍历剩余项
    return keys.reduce((m, k) => (m.push(addPack(k, oc)), m), [first]).join('');
}

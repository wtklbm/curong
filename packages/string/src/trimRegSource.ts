import { isStringArray, isStringHave, isTrue } from '@curong/types';

import {
    controlRegSource,
    likeSpaceRegSource,
    specialChars,
    zeroWidthRegSource
} from './characters';
import type { SpecialCharNames, TrimOptions } from './types';

/**
 * 根据选项生成可以删除字符串特定字符串的正则表达式字符串
 *
 * @param options 配置选项
 *  - `space`: 是否删除空格，默认为 `true`
 *  - `zeroWidth`: 是否删除零宽字符，默认为 `true`
 *  - `likeSpace`: 是否删除像空格的字符，默认为 `true`
 *  - `control`: 是否删除控制字符(回车、换行、制表符等)，默认为 `true`
 * @param chars 特殊字符集的名称数组
 * @param extras 自定义的额外的字符
 * @returns 返回处理好的正则表达式字符串
 */
export const trimRegSource = (
    options: TrimOptions = {},
    chars?: SpecialCharNames[],
    extras?: string | string[]
): string => {
    const {
        space = true,
        zeroWidth = true,
        likeSpace = true,
        control = true
    } = options;

    const conditions: { is: () => boolean; ret: () => string }[] = [
        { is: () => isTrue(space), ret: () => ' ' },
        { is: () => isTrue(zeroWidth), ret: () => zeroWidthRegSource },
        { is: () => isTrue(likeSpace), ret: () => likeSpaceRegSource },
        { is: () => isTrue(control), ret: () => controlRegSource },
        {
            is: () => isStringArray(chars),
            ret: () => `[${chars!.map(v => specialChars[v]).join('')}]`
        },
        {
            is: () => isStringHave(extras) || isStringArray(extras),
            ret: () => `[${[extras].flat().join('')}]`
        }
    ];

    return `(?:${conditions
        .filter(v => v.is())
        .map(v => v.ret())
        .join('|')})+`;
};

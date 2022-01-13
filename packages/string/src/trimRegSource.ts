import { isArrayHave, isTrue } from '@curong/types';

import {
    likeSpaceRegSource,
    zeroWidthRegSource,
    controlRegSource,
    specialChars
} from './characters';

import { SpecialCharNames, TrimOptions } from './types';

/**
 * 根据选项生成可以删除字符串特定字符串的正则表达式字符串
 *
 * @param options 配置选项
 *   - `space`: 是否删除空格，默认为 `true`
 *   - `zeroWidth`: 是否删除零宽字符，默认为 `true`
 *   - `likeSpace`: 是否删除像空格的字符，默认为 `true`
 *   - `control`: 是否删除控制字符(回车、换行、制表符等)，默认为 `true`
 *
 * @param chars 自定义要删除的字符
 * @returns 返回处理好的正则表达式字符串
 */
export const trimRegSource = (
    options: TrimOptions = {},
    chars?: SpecialCharNames[]
): string => {
    const {
        space = true,
        zeroWidth = true,
        likeSpace = true,
        control = true
    } = options;

    const regexpSources = [];

    if (isTrue(space)) {
        regexpSources.push(' ');
    }

    if (isTrue(zeroWidth)) {
        regexpSources.push(zeroWidthRegSource);
    }

    if (isTrue(likeSpace)) {
        regexpSources.push(likeSpaceRegSource);
    }

    if (isTrue(control)) {
        regexpSources.push(controlRegSource);
    }

    if (isArrayHave(chars)) {
        regexpSources.push(`[${chars.map(v => specialChars[v]).join('')}]`);
    }

    return `(?:${regexpSources.join('|')})+`;
};

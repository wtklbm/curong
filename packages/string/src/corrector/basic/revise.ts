import { inChkPunctuation } from '@curong/regexp';
import { isEqual } from '@curong/types';
import { symbolMap } from '../constants';

/** 验证开头和结尾的句号的正则表达式 */
const bothSidesPunReg = /(?:^(\.{3,6}|[,.!?:;]) ?|(\.{3,6}|[,.!?:;])$)/g;

/** 验证结尾的标点的正则表达式 */
const endReg = /[,.!?:;]$/;

/**
 * 从编排后的语句片段中修正空格
 *
 * @param value 要处理的语句内容
 * @param preItem 该语句之前的上一个字符
 * @param sufItem 该语句之后的下一个字符
 * @returns 返回处理好的内容
 */
export default function revise(
    value: string,
    preItem: string,
    sufItem: string
): string {
    const fixSpace = (value: string) => {
        // 如果上一项的最后一个字符不是中文标点并且当前项的第一个字符不是中文标点
        if (
            !(preItem && inChkPunctuation(preItem[preItem.length - 1])) &&
            !inChkPunctuation(value[0])
        ) {
            value = ' ' + value;
        }

        // 如果下一项的第一个字符不是中文标点并且当前项的最后一个字符不是中文标点
        if (
            !(sufItem && inChkPunctuation(sufItem[0])) &&
            !inChkPunctuation(value[value.length - 1])
        ) {
            value += ' ';
        }

        return value;
    };

    //# 如果只有一项
    if (isEqual(value.length, 1)) {
        // 如果是任意英文标点，就判断在 `Map` 中有没有，有就转换并返回
        if (symbolMap.has(value)) {
            return symbolMap.get(value)!;
        }

        return fixSpace(value);
    }

    //# 如果有多项

    // 有可能是 `?Sized`、`!xxx`、`.xxx`、`$100`
    if (/^([!?.$][a-z][-$\w]?|'[a-z]{1,3} )/i.test(value)) {
        // 匹配末尾
        if (endReg.test(value)) {
            // @ts-ignore
            value = value.replace(endReg, v => {
                return symbolMap.has(v) ? symbolMap.get(v) : `${v} `;
            });
        } else {
            value += ' ';
        }

        return ` ${value}`;
    }

    // 其他情况直接替换
    value = value.replace(bothSidesPunReg, (v, $1, $2) => {
        const punctuation = $1 ?? $2;

        if (symbolMap.has(punctuation)) {
            return symbolMap.get(punctuation)!;
        }

        return v;
    });

    return fixSpace(value);
}

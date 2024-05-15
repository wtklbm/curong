import { execAll, matchNextIndex } from '@curong/regexp';
import { isEqual, isNotZero, isTypeofObject, isZero } from '@curong/types';

import { chkPunReg } from '../constants';
import type { TypesetResult } from '../types';

/**
 * 对文件进行编排，拆分出中日韩标点和汉字和其他字符
 *
 * @param value 要使用的字符串
 * @returns 返回一个编排对象数组，对象中包含 `type` 和 `data` 属性
 */
export default function typeset(value: string): TypesetResult {
    const matchResult = [];
    const matches = execAll(chkPunReg, value) ?? [];

    if (isZero(matches.length)) {
        matchResult.push({ match: false, data: value.trim() });

        return matchResult;
    }

    if (isTypeofObject(matches[0])) {
        const index = matches[0].index;

        if (isNotZero(index)) {
            const data = value.slice(0, index).trimEnd();
            matchResult.push({ match: false, data });
        }
    }

    for (let i = 0, len = matches.length, j = 1; i < len; i++, j++) {
        const match = matches[i];

        matchResult.push({ match: true, data: match[0] });
        const nextStart = matchNextIndex(match);

        if (isEqual(j, len)) {
            if (isEqual(nextStart, value.length)) {
                break;
            }

            const nextText = value.slice(nextStart).trim();
            nextText && matchResult.push({ match: false, data: nextText });
            break;
        }

        const nextText = value.slice(nextStart, matches[j].index).trim();
        nextText && matchResult.push({ match: false, data: nextText });
    }

    return matchResult;
}

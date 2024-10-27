import hasOwnProperty from '../../../property/hasOwnProperty';

import { functionToString } from '../../constants';
import type { Function } from '../../types';

/**
 * 找出第一对圆括号的结尾索引
 *
 * @param value 从哪个字符串中查找
 * @returns 如果找到了相匹配的右括号，则返回右括号的索引
 * @throws 如果没有找到右括号，则会抛出错误
 */
const findMatchingParenthesis = (value: string): number => {
    let count = 0;

    for (let i = 0; i < value.length; i++) {
        if (value[i] === '(') {
            count++;
        } else if (value[i] === ')') {
            count--;
            if (count === 0) {
                return i;
            }
        }
    }

    throw new Error(`[findMatchingParenthesis] 内部错误，无法继续执行`);
};

/**
 * 是不是一个箭头函数 (包含同步箭头函数、异步箭头函数)
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isArrowFunctionCore<
    R = unknown,
    A extends unknown[] = unknown[]
>(value: Function<R, A>): boolean {
    if (hasOwnProperty(value, 'prototype')) {
        return false;
    }

    const source = functionToString.call(value).trimStart();

    // function(){}
    // function foo(){}
    // async function(){}
    // async function foo(){}
    if (/^(?:async\s+)?function[\s(]/.test(source)) {
        return false;
    }

    // a => {}
    // async a => {}
    // NOTE 不带括号的 `=>` 不能出现在下一行，所以这里没有多行匹配
    if (/^(?:async\s+)?[a-zA-Z_$][\w$]*\s*=>/.test(source)) {
        return true;
    }

    // (a) => {}
    // async (a) => {}
    // async (a, b, c) => {}
    // async (a ={}, b =2, c= false) => {}
    // async (a ={}, b =2, c= false) => {}
    // NOTE 右括号后面的 `=>` 不能出现在下一行，所以后面不用匹配 `\n`
    return new RegExp(
        `^(.|[\r\n]){${findMatchingParenthesis(source) + 1}}\\s*=>`
    ).test(source);
}

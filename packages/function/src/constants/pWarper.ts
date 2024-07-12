import { isPromise } from '@curong/types';

import fCall from './fCall';

/**
 * 判断一个值的类型，如果是 `Promise` 就直接返回，如果是函数，就将函数执行，如果是值就直接返回该值
 *
 * @param value 要判断的值
 * @param args 要传递给函数的参数
 * @returns 返回一个包装的 `Promise`
 */
export default function pWarper<A extends unknown[], R = any>(
    value: any,
    args?: A
): Promise<R> {
    return isPromise<R>(value) ? value : fCall<A, R>(value, args);
}

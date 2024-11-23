import { isFunction } from '@curong/types';

/**
 * 如果传递的是一个函数，就将函数执行，否则返回该值
 *
 * @param value 要判断的值
 * @param args 要传递给函数的参数
 * @returns  返回一个包装的 `Promise`
 */
export default function executeToPromise<A extends unknown[], R = any>(
    value: any,
    args?: A
): Promise<R> {
    return new Promise<R>((resolve, reject) => {
        try {
            resolve(isFunction(value) ? value.apply(value, args ?? []) : value);
        } catch (error) {
            reject(error);
        }
    });
}

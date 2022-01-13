import { isFunction, isIterator } from '@curong/types';

/**
 * 获取值，但忽略抛出的错误
 *
 * @param value 要获取的值 (包括普通值、生成器、迭代器、同步函数和异步函数)
 * @returns 返回获取到的结果
 * @example
 *
 * ```javascript
 * const fn = () => new Promise(r => setTimeout(() => r('完成了'), 1e3));
 * const ret = await noCatch(fn);
 * console.log(ret); // 完成了
 * ```
 */
export default async function noCatch(value: any) {
    try {
        if (isFunction(value)) {
            value = value();
        }

        if (isIterator(value)) {
            return value.next().value;
        }

        return Promise.resolve(value).catch(() => {});
    } catch (_) {}
}

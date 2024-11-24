import { isFunction } from '@curong/types';

const execute = (value: any, args: any) => {
    return isFunction(value) ? value.apply(value, args) : value;
};

/**
 * 根据条件来返回相应的结果
 *
 * @param condition 一个布尔值条件，可以是布尔值或返回布尔值的同步函数
 * @param doIf 条件为真时要返回的值，或者要执行的同步函数或普通值
 * @param doElse 条件为假时要返回的后备值，或者要执行的同步函数或普通值
 * @param args 传递给 `condition`、`doIf` 和 `doElse` 的参数
 * @returns 返回指定条件的值
 * @example ````
 *
 * ### 常规用法
 *
 * ```typescript
 * const ret = selectSync(true, 1, 2);
 * console.log(ret); // 1
 * ```
 *
 * ### 区分开发环境和生成环境
 *
 * ```typescript
 * const devOrProd = (devValue: unknown, prodValue: unknown) => {
 *     return await selectSync(/dev|development/.test(process.env.NODE_ENV), devValue, prodValue);
 * };
 *
 * devOrProd(1, 2);
 * ```
 */
export default function selectSync<A extends unknown[], T>(
    condition: ((...args: A) => boolean) | boolean,
    doIf: ((...args: A) => any) | T | null | undefined,
    doElse?: ((...args: A) => any) | T | null | undefined,
    ...args: A
): T | null | undefined {
    return execute(condition, args)
        ? execute(doIf, args)
        : execute(doElse, args);
}

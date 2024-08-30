import executeToPromise from '../promise/executeToPromise';

/**
 * 根据条件来返回相应的结果
 *
 * @param condition 一个布尔值条件，可以是布尔值或返回布尔值的同步函数、异步函数、`Promise`
 * @param doIf 条件为真时要返回的值，或者要执行的同步函数、异步函数、`Promise` 或普通值
 * @param doElse 条件为假时要返回的后备值，或者要执行的同步函数、异步函数、`Promise` 或普通值
 * @param args 传递给 `condition`、`doIf` 和 `doElse` 的参数
 * @returns 返回指定条件的值
 * @example
 *
 * ```typescript
 * const ret = select(true, Promise.resolve(1), 2);
 * console.log(ret); // 1
 * ```
 */
export default async function select<A extends unknown[], T>(
    condition:
        | ((...args: A) => Promise<boolean> | boolean)
        | Promise<boolean>
        | boolean,
    doIf: ((...args: A) => any) | Promise<any> | T | null | undefined,
    doElse?: ((...args: A) => any) | Promise<any> | T | null | undefined,
    ...args: A
): Promise<T | null | undefined> {
    return (await executeToPromise(condition))
        ? executeToPromise(doIf, args)
        : executeToPromise(doElse, args);
}

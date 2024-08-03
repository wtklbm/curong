/**
 * 创建一个新的函数，该函数在调用目标函数后，会在执行一个后置函数，并返回目标函数的结果
 *
 * @param afterFunc 一个后置函数，在目标函数之后执行
 * @param afterArgs 要传递给后置函数的参数
 * @returns 返回一个包装后的新函数，该函数先执行目标函数，再执行后置函数。它的返回值为目标函数的结果
 * @example
 *
 * ```typescript
 * const log = after(() => console.log('结果: '));
 *
 * let ret = log((a, b) => a + b, 1, 2); // 结果:
 * console.log(ret); // 3
 *
 * ret = log((a, b) => a - b, 1, 2); // 结果:
 * console.log(ret); // -1
 * ```
 */
export default function after<R, A extends unknown[]>(
    afterFunc: (...afterArgs: A) => R,
    ...afterArgs: A
) {
    return <R, A extends unknown[]>(
        targetFunc: (...targetParams: A) => R,
        ...targetParams: A
    ): R => {
        const result = targetFunc.apply(targetFunc, targetParams);
        afterFunc.apply(afterFunc, afterArgs);
        return result;
    };
}

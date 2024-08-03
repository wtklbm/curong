/**
 * 创建一个新的函数，该函数在调用目标函数前，会先调用指定的前置函数，并将前置函数的返回值作为第一个参数传递给目标函数，并返回前置函数的结果
 *
 * @param beforeFunc 一个前置函数，在目标函数之前执行
 * @returns 返回一个包装后的新函数，该函数先执行前置函数，再执行目标函数。它的返回值为前置函数的结果
 * @example
 *
 * ```typescript
 * const f = withBefore((a, b) => a + b);
 *
 * let ret = f(data => console.log(`结果: ${data}`), 1, 2); // 结果: 3
 * console.log(ret); // 3
 *
 * ret = f(data => {
 *     if (data < 5) {
 *         throw new EvalError('值太小了');
 *     }
 * }, 1, 2);
 * console.log(ret); // EvalError: 值太小了
 * ```
 */
export default function withBefore<A extends unknown[], T>(
    beforeFunc: (...beforeArgs: A) => T
) {
    return <R>(targetFunc: (report: T) => R, ...beforeArgs: A): T => {
        const ret = beforeFunc.apply(beforeFunc, beforeArgs);
        targetFunc.call(targetFunc, ret);
        return ret;
    };
}

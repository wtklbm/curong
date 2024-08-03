/**
 * 创建一个新的函数，该函数在调用目标函数后，会将目标函数的返回值作为第一个参数传递给后置函数，并返回后置函数的结果
 *
 * @param afterFunc 一个后置函数，在目标函数之后执行
 * @param afterArgs 要传递给后置函数的参数 (从第二个参数开始)
 * @returns 返回一个包装后的新函数，该函数先执行目标函数，再执行后置函数。它的返回值为后置函数的结果
 * @example
 *
 * ```typescript
 * const log = applyAfter(data => console.log(`结果: ${data}`));
 *
 * let ret = log((a, b) => a + b, 1, 2); // 结果: 3
 * console.log(ret); // undefined
 *
 * ret = log((a, b) => a - b, 1, 2); // 结果: -1
 * console.log(ret); // undefined
 * ```
 */
export default function applyAfter<R, T, P extends unknown[]>(
    afterFunc: (report: T, ...afterArgs: P) => R,
    ...afterArgs: P
) {
    return <A extends unknown[]>(
        targetFunc: (...targetArgs: A) => T,
        ...targetArgs: A
    ): R => {
        return afterFunc.call(
            afterFunc,
            targetFunc.apply(targetFunc, targetArgs),
            ...afterArgs
        );
    };
}

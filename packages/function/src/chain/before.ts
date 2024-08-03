/**
 * 创建一个新的函数，该函数在调用目标函数前，会先执行一个前置函数，并返回目标函数的结果
 *
 * @param beforeFunc 一个前置函数，在目标函数之前执行
 * @param beforeArgs 要传递给前置函数的参数
 * @returns 返回一个包装后的新函数，该函数先执行前置函数，再执行目标函数。它的返回值为目标函数的结果
 * @example
 *
 * ```typescript
 * const log = () => console.log('结果:'); // 先执行
 * const add = (a, b) => a + b; // 再执行
 * const addWithLogging = before(log);
 * const ret = addWithLogging(add, 1, 2); // 结果:
 * console.log(); // 3
 * ```
 */
export default function before<R, A extends unknown[]>(
    beforeFunc: (...beforeArgs: A) => R,
    ...beforeArgs: A
) {
    return <R, A extends unknown[]>(
        targetFunc: (...targetParams: A) => R,
        ...targetParams: A
    ): R => (
        beforeFunc.apply(beforeFunc, beforeArgs),
        targetFunc.apply(targetFunc, targetParams)
    );
}

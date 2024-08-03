/**
 * 创建一个新的函数，该函数在调用目标函数前，会先调用指定的前置函数，并将前置函数的返回值作为第一个参数传递给目标函数，并返回目标函数的结果
 *
 * @param beforeFunc 一个前置函数，在目标函数之前执行
 * @returns 返回一个包装后的新函数，该函数先执行前置函数，再执行目标函数。它的返回值为目标函数的结果
 * @example
 *
 * ```typescript
 * const f = applyBefore((a, b) => a + b);
 *
 * let ret = f(data => console.log(`结果: ${data}`), 1, 2); // 结果: 3
 * console.log(ret); // undefined
 *
 * ret = f(data => data + 5, 1, 2);
 * console.log(ret); // 8
 * ```
 */
export default function applyBefore<A extends unknown[], T>(
    beforeFunc: (...beforeArgs: A) => T
) {
    return <R>(targetFunc: (report: T) => R, ...beforeArgs: A): R => {
        return targetFunc.call(
            targetFunc,
            beforeFunc.apply(beforeFunc, beforeArgs)
        );
    };
}

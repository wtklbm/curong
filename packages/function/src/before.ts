/**
 * 在执行某一个函数之前，先执行一个其他函数
 *
 * @param beforeFn 要在函数执行之前执行的函数
 * @param args 要传递给函数的参数
 * @returns 返回函数的返回值
 * @example
 *
 * ```javascript
 * const b = before(() => console.log('两数相加的结果为：'));
 *
 * // 两数相加的结果为：
 * // 3
 * console.log(b(() => 1 + 2));
 * ```
 */
export default function before<R, A extends unknown[]>(
    beforeFn: (...args: A) => R,
    ...args: A
) {
    return <R, A extends unknown[]>(fn: (...$args: A) => R, ...$args: A): R => (
        beforeFn.apply(beforeFn, args), fn.apply(fn, $args)
    );
}

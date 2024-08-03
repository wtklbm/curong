/**
 * 返回一个函数，确保 `fn` 只能被执行一次，之后的调用将返回第一次执行的结果，而不会重新执行 `fn`
 *
 * @param fn 只执行一次的函数。此函数可以接收任意数量的参数并返回任意类型的结果
 * @returns 返回一个新的函数，该函数在首次调用时会执行 `fn`，并返回其结果。在之后的调用中，直接返回第一次调用的结果
 * @note 如果 `fn` 函数中有副作用，则只有在第一次调用时副作用会发生。之后的调用不会触发副作用，只会返回缓存的结果
 * @example
 *
 * ```typescript
 * const getValue = once(() => {
 *     console.log('函数被执行');
 *     return 42;
 * });
 *
 * console.log(getValue()); // 输出: 函数被执行 \n 42
 * console.log(getValue()); // 输出: 42
 * ```
 */
function once<R, A extends unknown[]>(fn: (...args: A) => R): (...args: A) => R;
function once<R, A extends unknown[]>(
    fn: (...args: A) => R,
    ...args: A
): () => R;

function once<T extends (...args: any[]) => any, A extends unknown[]>(
    fn: T,
    ...args: A
): T {
    let result: ReturnType<T> | undefined;
    let executed = false;

    return ((...params: Parameters<T>): ReturnType<T> => {
        if (!executed) {
            result = fn.apply(fn, args.concat(params));
            executed = true;
        }
        return result as ReturnType<T>;
    }) as T;
}

export default once;

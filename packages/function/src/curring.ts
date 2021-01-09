/**
 * 把接受多个参数的函数变成接受任意多个参数的函数，并且返回接受余下的参数的新函数。
 *
 * @param fn 要接受多个参数的函数
 * @returns 返回 fn 函数的返回结果
 * @example
 * ```javascript
 * let c = curring((a: number, b: number): number => a + b);
 * let ret = c(1)(2);
 * console.log(ret); // 3
 * ```
 */
export default function curring<T, U>(
    fn: (...args: T[]) => U,
    store: T[] = []
): (...args: T[]) => any {
    return (...args: T[]) => {
        store = store.concat(args);

        return store.length < fn.length ? curring(fn, store) : fn(...store);
    };
}

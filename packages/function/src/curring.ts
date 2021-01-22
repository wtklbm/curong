/**
 * 把接受多个参数的函数变成接受任意多个参数的函数，并且返回接受余下的参数的新函数。
 *
 * @param fn 要接受多个参数的函数
 * @returns 返回 fn 函数的返回结果
 * @example
 *
 * ```javascript
 * let c = curring((a: number, b: number): number => a + b);
 * console.log(c(1)(2)); // 3
 * ```
 *
 * # 柯里化函数
 *
 * 该函数是柯里化函数，柯里化函数就是把一个大函数拆分成很多的具体的功能的小函数。
 * 高阶函数中包含柯里化，柯理化的好处是可以保留参数，它非常像 `bind` 方法。
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

type Currying1<T1, R> = {
    (): Currying1<T1, R>;
    (t1: T1): R;
};

type Currying2<T1, T2, R> = {
    (): Currying2<T1, T2, R>;
    (t1: T1): Currying1<T2, R>;
    (t1: T1, t2: T2): R;
};

type Currying3<T1, T2, T3, R> = {
    (): Currying3<T1, T2, T3, R>;
    (t1: T1): Currying2<T2, T3, R>;
    (t1: T1, t2: T2): Currying1<T3, R>;
    (t1: T1, t2: T2, t3: T3): R;
};

type Currying4<T1, T2, T3, T4, R> = {
    (): Currying4<T1, T2, T3, T4, R>;
    (t1: T1): Currying3<T2, T3, T4, R>;
    (t1: T1, t2: T2): Currying2<T3, T4, R>;
    (t1: T1, t2: T2, t3: T3): Currying1<T4, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4): R;
};

type Currying5<T1, T2, T3, T4, T5, R> = {
    (): Currying5<T1, T2, T3, T4, T5, R>;
    (t1: T1): Currying4<T2, T3, T4, T5, R>;
    (t1: T1, t2: T2): Currying3<T3, T4, T5, R>;
    (t1: T1, t2: T2, t3: T3): Currying2<T4, T5, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4): Currying1<T5, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R;
};

type Currying6<T1, T2, T3, T4, T5, T6, R> = {
    (): Currying6<T1, T2, T3, T4, T5, T6, R>;
    (t1: T1): Currying5<T2, T3, T4, T5, T6, R>;
    (t1: T1, t2: T2): Currying4<T3, T4, T5, T6, R>;
    (t1: T1, t2: T2, t3: T3): Currying3<T4, T5, T6, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4): Currying2<T5, T6, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): Currying1<T6, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): R;
};

/**
 * 把接受多个参数的函数变成接受任意多个参数的函数，并且返回接受余下的参数的新函数
 *
 * @param fn 要接受多个参数的函数
 * @param store 缓存容器，默认为 `[]`
 * @returns 返回 fn 函数的返回结果
 * @example
 *
 * ```typescript
 * const c = curring((a: number, b: number): number => a + b);
 * console.log(c(1)(2)); // 3
 * ```
 *
 * # 柯里化函数
 *
 * 该函数是柯里化函数，柯里化函数就是把一个大函数拆分成很多的具体的功能的小函数。
 * 高阶函数中包含柯里化，柯理化的好处是可以保留参数，它非常像 `bind` 方法。
 */
function currying<T1, R>(func: (t1: T1) => R, depth?: number): Currying1<T1, R>;

function currying<T1, T2, R>(
    func: (t1: T1, t2: T2) => R,
    depth?: number
): Currying2<T1, T2, R>;

function currying<T1, T2, T3, R>(
    func: (t1: T1, t2: T2, t3: T3) => R,
    depth?: number
): Currying3<T1, T2, T3, R>;

function currying<T1, T2, T3, T4, R>(
    func: (t1: T1, t2: T2, t3: T3, t4: T4) => R,
    depth?: number
): Currying4<T1, T2, T3, T4, R>;

function currying<T1, T2, T3, T4, T5, R>(
    func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R,
    depth?: number
): Currying5<T1, T2, T3, T4, T5, R>;

function currying<T1, T2, T3, T4, T5, T6, R>(
    func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => R,
    depth?: number
): Currying6<T1, T2, T3, T4, T5, T6, R>;

function currying(fn: (...args: any[]) => any): (...args: any[]) => any {
    const depth = fn.length;

    return function curried(...args: any[]) {
        return args.length >= depth
            ? fn.apply(fn, args)
            : (arg: any) => curried(...args, arg);
    };
}

export default currying;

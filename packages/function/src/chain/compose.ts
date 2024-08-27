/**
 * 按顺序组合多个函数，使其从左到右依次执行
 *
 * 第一个函数的输出将作为第二个函数的输入，第二个函数的输出作为第三个函数的输入，依此类推，最终返回最后一个函数的输出结果。
 *
 * `compose` 是一种函数组合模式，常用于将多个函数连接在一起，形成一个数据处理流水线。
 *
 * 该方法可以根据传入的函数数量动态生成适当的组合函数。
 *
 * @param ab 第一个函数，接受类型为 `A` 的参数，并返回类型为 `B` 的值
 * @param bc 第二个函数，接受类型为 `B` 的参数，并返回类型为 `C` 的值
 * @param cd 第三个函数，接受类型为 `C` 的参数，并返回类型为 `D` 的值（可选）
 * @param de 第四个函数，接受类型为 `D` 的参数，并返回类型为 `E` 的值（可选）
 * @param ef 第五个函数，接受类型为 `E` 的参数，并返回类型为 `F` 的值（可选）
 * @param fg 第六个函数，接受类型为 `F` 的参数，并返回类型为 `G` 的值（可选）
 * @param gh 第七个函数，接受类型为 `G` 的参数，并返回类型为 `H` 的值（可选）
 * @param hi 第八个函数，接受类型为 `H` 的参数，并返回类型为 `I` 的值（可选）
 * @param ij 第九个函数，接受类型为 `I` 的参数，并返回类型为 `J` 的值（可选）
 * @returns 返回最后一个函数执行的结果
 * @example
 *
 * ```typescript
 * const addOne = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * const subtractThree = (x: number) => x - 3;
 *
 * const pipeline = compose(addOne, double, subtractThree);
 *
 * console.log(pipeline(5)); // ((5 + 1) * 2) - 3 = 9
 * ```
 */
function compose<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C;

function compose<A, B, C, D>(
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D
): (a: A) => D;

function compose<A, B, C, D, E>(
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E
): (a: A) => E;

function compose<A, B, C, D, E, F>(
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F
): (a: A) => F;

function compose<A, B, C, D, E, F, G>(
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G
): (a: A) => G;

function compose<A, B, C, D, E, F, G, H>(
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H
): (a: A) => H;

function compose<A, B, C, D, E, F, G, H, I>(
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I
): (a: A) => I;

function compose<A, B, C, D, E, F, G, H, I, J>(
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
    fg: (f: F) => G,
    gh: (g: G) => H,
    hi: (h: H) => I,
    ij: (i: I) => J
): (a: A) => J;

function compose(...fns: ((...args: unknown[]) => unknown)[]) {
    return (value: unknown) => fns.reduce((acc, fn) => fn(acc), value);
}

export default compose;

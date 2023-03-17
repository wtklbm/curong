/**
 * 类的实例的方法名数组
 *
 * @example
 *
 * ```
 * class A {
 *     getA() {}
 *     getB() {}
 * }
 *
 * type keys = ClassInstanceKeys<A>; // "getA" | "getB"
 * ```
 */
export type ClassInstanceKeys<T, K = keyof T> = K extends keyof T
    ? T[K] extends (...args: any[]) => any
        ? K
        : never
    : never;

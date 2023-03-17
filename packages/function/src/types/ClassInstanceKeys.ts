/**
 * 类的实例方法名的类型数组
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

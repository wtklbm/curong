/**
 * 将函数绑定到指定的上下文对象上
 *
 * `bind` 函数用于将函数与特定的上下文对象绑定，确保函数在执行时使用正确的 `this` 上下文。
 *
 * @param method 要绑定的函数
 * @param ctx 要绑定的上下文对象
 * @returns 返回一个新的函数，该函数会在指定的上下文中执行原始函数，并传入相同的参数
 * @example
 *
 * ```typescript
 * const obj = {
 *   x: 42,
 *   getX() {
 *     return this.x;
 *   }
 * };
 *
 * const boundGetX = bind(obj.getX, obj);
 * console.log(boundGetX()); // 返回 42，因为 getX 在 obj 上下文中执行
 * ```
 */
export default function bind<
    F extends (...args: unknown[]) => unknown,
    T
>(method: F, ctx: T) {
    const bound = method.bind(ctx);
    return (...args: Parameters<F>) => bound(...args);
}

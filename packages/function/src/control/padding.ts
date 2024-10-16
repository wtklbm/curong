import executeToPromise from '../promise/executeToPromise';

/**
 * 执行任务并等待结果的返回
 *
 * @param task 要执行的任务
 * @param args 传递给 `task` 的参数
 * @returns 返回一个数组，数组的第一项为任务执行过程中所抛出的错误，第二项为该任务的结果。
 *  - 如果任务有返回结果，则数组的第一项为 `null`，第二项为任务的结果
 *  - 如果任务抛出错误，则数组的第一项为抛出的错误，该值可能是一个 `Error` 也可能是任意的值，第二项为 `null`
 * @example
 *
 * ```typescript
 * const [error, data] = await padding(Promise.resolve(1));
 * consol.log({data, error}); // { data: 1, error: null }
 * ```
 *
 * @note
 *
 * ### 安全赋值运算符 (Safe Assignment Operator)
 *
 * 在最新的 [`ECMAScript` 提案中](https://github.com/arthurfiorette/proposal-safe-assignment-operator)，添加了安全赋值运算符 (`?=`)，就是简化错误处理。
 *
 * 这一运算符支持 `Promise`、同步或异步函数以及任何实现了 `Symbol.result` 方法的值兼容。
 * 任何实现了 `Symbol.result` 方法的对象都可以与 `?=` 运算符一起使用。
 * `?=` 运算符调用运算符右侧对象或函数上的 `Symbol.result` 方法，确保以结构化方式一致地处理错误和结果。
 * `Symbol.result` 方法必须返回一个数组，其中第一个元素表示错误，第二个元素表示结果。
 * 结果应符合 `[error, null | undefined]` 或 `[null, data]` 的格式：
 *  - 如果函数抛出错误，则运算符返回 `[error, null]`
 *  - 如果函数成功执行，则返回 `[null, result]`
 *
 * [polyfill](https://github.com/arthurfiorette/proposal-safe-assignment-operator/blob/main/polyfill.js)
 *
 * ```typescript
 * const obj = {
 *     [Symbol.result]() {
 *         return [new Error("Error"), null];
 *     }
 * };
 *
 * const [error, data] ?= obj;
 * // const [error, data] = obj[Symbol.result]();
 * ```
 *
 * 优点：
 * - 简化错误处理：通过消除 `try-catch` 块，简化错误管理流程
 * - 增强代码可读性：减少嵌套，提高代码的清晰度，使错误处理的流程更直观
 * - 跨 API 一致性：在不同的 API 中建立统一的错误处理方法，确保行为一致性
 * - 提高安全性：减少忽略错误处理的风险，从而增强代码整体安全性
 */
export default async function padding<R, A extends unknown[], E>(
    task: ((...args: A) => Promise<R> | R) | Promise<R>,
    ...args: A
): Promise<[E | null, R | null]> {
    try {
        return [null, await executeToPromise(task, args)];
    } catch (error: any) {
        return [error, null];
    }
}

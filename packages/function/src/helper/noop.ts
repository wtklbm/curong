/**
 * 一个不执行任何操作的空函数
 *
 * 该函数是一个 "空操作" 函数，即调用它时不会执行任何操作。
 * 常用于占位符、默认回调、空函数或函数式编程中的占位符。
 * 该函数的作用是返回 `undefined`，不对外部环境产生任何副作用。
 *
 * @returns 不返回任何值 (`undefined`)
 * @example
 * ```typescript
 * // 用作默认回调函数
 * const handleEvent = (callback = noop) => {
 *   callback();
 * };
 * handleEvent(); // 不做任何事情
 * handleEvent(() => console.log('Event handled')); // 'Event handled'
 * ```
 * @note
 *  - `noop` 函数在性能方面非常高效，因为它什么都不做
 *  - 常用于作为函数默认值或函数占位符
 *  - 由于该函数不会改变任何外部状态或变量，使用时应确保这是预期行为
 *  - 虽然它不会影响程序的其他部分，但在设计 API 时需要明确是否期望调用方传入有效的函数逻辑
 */
export default function noop() {}

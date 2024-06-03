import { getTagEqual } from '..';

/**
 * 是不是一个 `SharedArrayBuffer`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * [`SharedArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) 对象用来表示一个通用的原始二进制数据缓冲区，类似于 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 对象，但它可以用来在共享内存上创建视图。与可转移的 `ArrayBuffer` 不同，`SharedArrayBuffer` 不是[可转移对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects)。
 *
 * 可以在 {@link Worker}、{@link WebAssembly} 中使用 `SharedArrayBuffer` 来共享内存。
 */
export default function isSharedArrayBuffer(
    value: unknown
): value is SharedArrayBuffer {
    return getTagEqual(value, 'SharedArrayBuffer');
}

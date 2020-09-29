import { Writable } from 'stream';

import isStream from './isStream';
import isFunction from './isFunction';
import isObject from './isObject';
import isTrue from './isTrue';

/**
 * 是不是一个 `Writable`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info 因为双工流包括可写流所以 `new Duplex()` 的结果返回 `true`
 */
export default function isWritable(value: any): value is Writable {
    return (
        isStream(value) &&
        // 所有可写流的实现必须提供 `writable._write()` 方法将数据发送到底层资源
        isFunction((value as Writable)._write) &&
        // `WritableState` 对象，里面包含一些属性，比如 `objectMode` 和 `highWaterMark`。
        // @ts-ignore
        isObject(value._writableState) &&
        // 如果调用 `writable.write()` 是安全的，则为 `true`。
        isTrue((value as Writable).writable)
    );
}

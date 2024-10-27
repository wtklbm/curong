import type { Writable } from 'stream';

import isTrue from '../boolean/isTrue';
import isFunction from '../function/function/isFunction';
import isObject from '../object/isObject';

import isStream from './isStream';

/**
 * 是不是一个可写流
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`。
 * 因为双工流包括可写流，所以 `new Duplex()` 的结果返回 `true`。
 */
export default function isWritable(value: unknown): value is Writable {
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

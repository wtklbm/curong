import type { Readable } from 'stream';

import isTrue from '../boolean/isTrue';
import isFunction from '../function/function/isFunction';
import isObject from '../object/isObject';

import isStream from './isStream';

/**
 * 是不是一个可读流
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`。
 * 因为双工流包括可读流，所以 `new Duplex()` 的结果返回 `true`。
 */
export default function isReadable(value: unknown): value is Readable {
    return (
        isStream(value) &&
        // 所有可读流的实现必须提供 `readable._read()` 方法从底层资源获取数据。
        isFunction((value as Readable)._read) &&
        // `ReadableState` 对象，里面包含一些属性，比如 `objectMode` 和 `highWaterMark`。
        // @ts-ignore
        isObject(value._readableState) &&
        // 如果调用 `readable.read()` 是安全的，则为 `true`。
        isTrue((value as Readable).readable)
    );
}

import type { Duplex } from 'stream';

import isReadable from './isReadable';
import isWritable from './isWritable';

/**
 * 是不是一个双工流
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`。
 * 因为 `Transform` 也是双工流，所以 `new Transform()` 返回 `true`。
 */
export default function isDuplex(value: unknown): value is Duplex {
    return isWritable(value) && isReadable(value);
}

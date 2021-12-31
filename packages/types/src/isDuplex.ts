import { Duplex } from 'stream';

import isWritable from './isWritable';
import isReadable from './isReadable';

/**
 * 是不是一个 `Duplex`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @info `Transform` 也是双工流，所以 `new Transform()` 返回 `true`
 */
export default function isDuplex(value: unknown): value is Duplex {
    return isWritable(value) && isReadable(value);
}

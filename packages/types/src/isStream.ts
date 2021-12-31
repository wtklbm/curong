import { Stream } from 'stream';

import isObject from './isObject';
import isFunction from './isFunction';

/**
 * 是不是一个 `Stream`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isStream(value: unknown): value is Stream {
    return (
        isObject(value) &&
        value instanceof Stream &&
        // `readable.pipe()` 方法绑定可写流到可读流，将可读流自动切换到流动模式，
        // 并将可读流的所有数据推送到绑定的可写流。数据流会被自动管理，
        // 所以即使可读流更快，目标可写流也不会超负荷。
        isFunction(value.pipe)
    );
}

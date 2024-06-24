import { Transform } from 'stream';

import isFunctionFilled from '../function/isFunctionFilled';

import isDuplex from './isDuplex';

/**
 * 是不是一个转换流
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isTransform(value: unknown): value is Transform {
    return isDuplex(value) && isFunctionFilled((value as Transform)._transform);
}

import { Transform } from 'stream';

import { isFunctionHave } from '..';

import isDuplex from './isDuplex';

/**
 * 是不是一个转换流对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isTransform(value: unknown): value is Transform {
    return isDuplex(value) && isFunctionHave((value as Transform)._transform);
}

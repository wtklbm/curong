import { Transform } from 'stream';

import isDuplex from './isDuplex';
import isFunctionHave from './isFunctionHave';
import isObject from './isObject';

/**
 * 是不是一个 `Transform`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isTransform(value: any): value is Transform {
    return (
        isDuplex(value) &&
        isFunctionHave((value as Transform)._transform) &&
        // @ts-ignore
        isObject(value._transformState)
    );
}

import { isPromise } from '@curong/types';

import fCall from './fCall';

export default function pWarper<A extends unknown[], R = any>(
    value: any,
    args?: A
): Promise<R> {
    return isPromise<R>(value) ? value : fCall<A, R>(value, args);
}

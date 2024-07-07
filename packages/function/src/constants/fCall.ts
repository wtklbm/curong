import { isFunction } from '@curong/types';

export default function fCall<A extends unknown[], R = any>(
    f: any,
    args?: A
): Promise<R> {
    return new Promise<R>((resolve, reject) => {
        try {
            resolve(isFunction(f) ? f.apply(f, args ?? []) : f);
        } catch (e) {
            reject(e);
        }
    });
}

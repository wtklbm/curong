import { isFunction } from '@curong/types';

export default async function mapCall(f: any) {
    return await (isFunction(f) ? f.call(f) : f);
}

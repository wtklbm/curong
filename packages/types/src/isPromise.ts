import getTag from './getTag';

/**
 * 是不是一个 `Promise`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isPromise(value: any): value is Promise<any> {
    return getTag(value) === 'Promise';
}

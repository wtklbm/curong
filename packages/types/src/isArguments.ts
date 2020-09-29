import getTag from './getTag';

/**
 * 是不是函数的形参
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isArguments(value: any): boolean {
    return getTag(value) === 'Arguments';
}

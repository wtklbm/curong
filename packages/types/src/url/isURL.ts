import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `URL` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isURL(value: unknown): value is URL {
    return getTagEqual(value, 'URL');
}

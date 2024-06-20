import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `Error` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note 如果想验证任意的错误对象，请使用 `isAnyError` 方法
 */
export default function isError(value: unknown): value is Error {
    return (
        getTagEqual(value, 'Error') &&
        Object.getPrototypeOf(value).name === 'Error'
    );
}

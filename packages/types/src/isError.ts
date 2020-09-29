import getTag from './getTag';

/**
 * 是不是一个 `Error` 对象
 *
 * @info 如果想验证任意的错误对象，请使用 `isAnyError` 方法
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isError(value: any): value is Error {
    return (
        getTag(value) === 'Error' &&
        Object.getPrototypeOf(value).name === 'Error'
    );
}

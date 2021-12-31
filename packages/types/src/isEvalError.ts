import isAnyError from './isAnyError';

/**
 * 是不是一个 `EvalError` 对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isEvalError(value: unknown): value is EvalError {
    return (
        isAnyError(value) && Object.getPrototypeOf(value).name === 'EvalError'
    );
}

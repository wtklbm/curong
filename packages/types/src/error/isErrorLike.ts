import isTypeofObject from '../object/isTypeofObject';
import isString from '../string/isString';
import isStringFilled from '../string/isStringFilled';

type ErrorLike = {
    name: string;
    message: string;
    stack: string;
};

/**
 * 是不是一个类错误对象
 *
 * 该函数会判断传入的值是否是一个对象，并且该对象是否具有 `name`、`message` 和 `stack` 属性。
 * `message` 的值可以为空，`name` 和 `stack` 的值不能为空。
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```typescript
 * const error = new Error('这是一个错误');
 * console.log(isErrorLike(error)); // true
 *
 * const partialError = { name: '错误', message: '这是一个错误信息', stack: undefined };
 * console.log(isErrorLike(partialError)); // false
 * ```
 */
export default function isErrorLike(value: unknown): value is ErrorLike {
    return (
        isTypeofObject(value) &&
        isStringFilled(value.name) &&
        isString(value.message) &&
        isStringFilled(value.stack)
    );
}

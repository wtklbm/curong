import isFunction from '../function/function/isFunction';
import isNullOrUndefined from '../nullable/isNullOrUndefined';
import isTypeofObject from '../object/isTypeofObject';
import getTagEqual from '../type/getTagEqual';

/**
 * 是不是一个 `FormData`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFormData(value: unknown): value is FormData {
    return (
        (typeof FormData === 'function' && value instanceof FormData) ||
        (!isNullOrUndefined(value) &&
            isFunction((value as FormData).append) &&
            (getTagEqual<FormData>(value, 'FormData') ||
                (isTypeofObject(value) &&
                    isFunction(value.toString) &&
                    value.toString() === '[object FormData]')))
    );
}

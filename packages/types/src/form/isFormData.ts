import { getTagEqual, isFunction, isNullOrUndefined, isTypeofObject } from '..';

/**
 * 是不是一个 `FormData`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isFormData(value: unknown): value is FormData {
    return (
        (isFunction(FormData) && value instanceof FormData) ||
        (!isNullOrUndefined(value) &&
            isFunction((value as FormData).append) &&
            (getTagEqual<FormData>(value, 'FormData') ||
                (isTypeofObject(value) &&
                    isFunction(value.toString) &&
                    value.toString() === '[object FormData]')))
    );
}

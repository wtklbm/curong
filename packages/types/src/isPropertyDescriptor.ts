import isBoolean from './isBoolean';
import isFunction from './isFunction';
import isObject from './isObject';
import isOwnProperty from './isOwnProperty';

/**
 * 是不是一个属性描述器
 *
 * @param value
 * @param allowExtraProperties 是否允许除 `configurable`、`enumerable`、`writable`、`get`、`set`、`value` 之外的其他属性，默认为 `true`
 * @returns
 */
export default function isPropertyDescriptor(
    value: unknown,
    allowExtraProperties: boolean = true
): value is PropertyDescriptor {
    if (!isObject(value)) {
        return false;
    }

    const isData = isOwnProperty(value, 'value');
    const IsAccessor =
        (isOwnProperty(value, 'get') && isFunction(value.get)) ||
        (isOwnProperty(value, 'set') && isFunction(value.set));

    // `value` 和 `get/set` 不能同时存在
    if (isData && IsAccessor) {
        return false;
    }

    const allowed = new Set(['configurable', 'enumerable', 'writable']);
    const ignored = new Set(['get', 'set', 'value']);

    for (const v of Object.keys(value)) {
        if (
            // 不能是上面已经判断过的属性
            !ignored.has(v) &&
            // 如果存在就判断是不是函数，如果不存在就判断是不是允许额外的属性
            (allowed.has(v) ? !isBoolean(value[v]) : !allowExtraProperties)
        ) {
            return false;
        }
    }

    return isData || IsAccessor;
}

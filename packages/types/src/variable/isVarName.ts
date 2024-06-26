import isString from '../string/isString';

/**
 * 是不是可以把值当做 `JavaScript` 的变量名
 *
 * @param value 想要当做变量名的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isVarName(value: unknown): value is string {
    if (!isString(value) || value.trim() !== value) {
        return false;
    }

    try {
        new Function('fn', `var ${value};`);
        return true;
    } catch {}

    return false;
}

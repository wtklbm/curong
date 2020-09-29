import isFunction from './isFunction';
import isString from './isString';
import isTrue from './isTrue';

/**
 * 获取原型上的类型标记
 *
 * @param value 要获取类型的数据
 * @param slice 是否截取出类型部分，比如将 `[object Object]` 截取为 `Object`。默认为 `true`
 * @returns
 * - 如果 `Object.prototype.toString` 不存在或者该函数返回的结果不是字符串，则返回 `null`，
 * 否则返回数据的类型的 `Tag`，比如 `String` 或者 `RegExp`。
 * - 如果 `slice` 的值为 `true`，如果 `Object.prototype.toString` 返回的结果不是以 `[object ` 开头
 * 并且不是以 `]` 结尾，则返回原始字符串，否则返回截取后的字符串。
 *
 * ### 笔记
 *
 * 1. 原型上的类型即父类的类型，类型名是大写的。
 * 2. `Object.prototype.toString` 方法默认会调用 `Symbol.toStringTag` 方法
 * 得到当前对象的类型标记，而该方法是 `ES6` 标准，它并不支持 `IE` 浏览器。
 * 3. `Object.prototype.toString` 方法有可能被改写，所以该方法返回的值仅做参考。
 *
 * ### 判断浏览器是否支持 `Symbol`
 *
 * ```javascript
 * typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
 * ```
 *
 * ### 在自定义的类上使用标记
 *
 * ```javascript
 * class ValidatorClass {
 *     get [Symbol.toStringTag]() {
 *       // "[object Validator]"
 *       return 'Validator';
 *     }
 * }
 *
 * Object.prototype.toString.call(new ValidatorClass());
 * ```
 */
export default function getTag(
    value: any,
    slice: boolean = true
): string | null {
    const toTag = Object.prototype.toString;
    let toStringTag = null;

    if (!isFunction(toTag) || !isString((toStringTag = toTag.call(value)))) {
        return toStringTag;
    }

    return isTrue(slice) &&
        toStringTag.startsWith('[object ') &&
        toStringTag.endsWith(']')
        ? toStringTag.slice(8, -1)
        : toStringTag;
}

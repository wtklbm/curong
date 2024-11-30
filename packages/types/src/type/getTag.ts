import isNativeFunction from '../function/function/isNativeFunction';

export default (() => {
    const store: Record<string, string> = {};
    const cachedToString = Object.prototype.toString;
    const tagExtractReg = /^\[object ([^\]]+)\]$/;

    if (!isNativeFunction(cachedToString)) {
        throw new TypeError(
            '[getTag] Object.prototype.toString 不是一个 JavaScript 原生方法',
            {
                cause: { toString: cachedToString }
            }
        );
    }

    /**
     * 获取原型上的类型标记
     *
     * @param value 要获取类型的数据
     * @param slice 是否截取出类型部分，比如将 `[object Object]` 截取为 `Object`。默认为 `true`
     *
     * @returns
     * - `Object.prototype.toString` 会返回一个数据的类型的 `Tag`，比如 `String` 或者 `RegExp`
     *   (原型上的类型即父类的类型，类型名的首字母是大写的)
     * - 如果 `slice` 的值为 `true`，如果 `Object.prototype.toString` 返回的结果不是以 `[object ` 开头
     *   并且不是以 `]` 结尾，则返回原始字符串，否则返回截取后的字符串。
     *
     * @throw `Object.prototype.toString` 方法有可能会被人为改写。
     *   如果它经过修改则会出现代码执行异常或不可预知的 **BUG**，所以在导入 `getTag` 方法时会对其进行判断，
     *   如果该函数经过了修改，则会抛出类型错误异常。需要注意的是，出于对性能的考虑，
     *   如果在导入 `getTag` 方法后修改了 `Object.prototype.toString`，
     *   那么当通过 `getTag` 进行类型标记获取时，还是使用的原来的缓存的 `toString` 方法，
     *
     * @note
     *
     * 除了使用 `Object.prototype.toString` 外，还可以通过 `Object.getPrototypeOf(value).constructor.name` 来判断。
     *
     * ### `Symbol.toStringTag`
     *
     * `Object.prototype.toString` 方法默认会调用 `Symbol.toStringTag` 方法
     * 得到当前对象的类型标记，而该方法是 `ES6` 标准，它并不支持 `IE` 浏览器。
     *
     * ```typescript
     * typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
     * ```
     *
     * ### 在自定义的类上使用标记
     *
     * ```typescript
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
    return function getTag(value: unknown, slice: boolean = true): string {
        const v = cachedToString.call(value);

        // 使用正则来保证字符串是以 '[object ' 开头且以 ']' 结尾
        return slice
            ? store[v] || (store[v] = v.replace(tagExtractReg, '$1'))
            : v;
    };
})();

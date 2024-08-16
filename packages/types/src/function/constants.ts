/** 验证异步函数的正则表达式 */
export const asyncPattern = /Async/;

/** 函数原型上的 `toString` 方法 */
export const functionToString = Function.prototype.toString;

/** 是否为原生的 `Function.prototype.toString` */
export const isNativeFunctionToString =
    functionToString.call(functionToString) ===
    'function toString() { [native code] }';

import isFunction from './isFunction';

/**
 * 是不是一个类
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isClass(value: any): value is Function {
    // 类不能直接执行，必须使用 `new` 关键字，
    // 类中无法访问 `caller`，`callee` 和 `arguments` 属性
    return (
        isFunction(value) &&
        Function.prototype.toString.call(value).trimStart().startsWith('class ')
    );
}

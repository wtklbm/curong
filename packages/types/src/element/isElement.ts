/**
 * 是不是一个 `Element`
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *
 * - `Element` 是最通用的基类，`Document` 中的所有对象都继承自该基类
 * - `Element` 里面定义了一些公共的方法和属性
 *
 */
export default function isElement(value: unknown): value is Element {
    return typeof Element === 'function' && value instanceof Element;
}

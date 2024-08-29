/**
 * 判断一个对象是否存在于另一个对象的原型链中
 *
 * @param o 要检查的对象
 * @param v 要检查其原型链的另一个对象
 */
export default function isPrototypeOf<T>(o: T, v: PropertyKey) {
    try {
        return Object.prototype.isPrototypeOf.call(o, v);
    } catch {}

    return false;
}

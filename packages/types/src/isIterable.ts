import isFunction from './isFunction';
import isNullOrUndefined from './isNullOrUndefined';

/**
 * 是不是一个可迭代的对象
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 * @example
 *
 * ```javascript
 * console.log(isIterable([])); // true
 * console.log(isIterable("")); // true
 * console.log(isIterable({})); // false
 * console.log(isIterable(new Set())); // true
 * console.log(isIterable(new WeakSet())); // false
 * console.log(isIterable(new Map())); // true
 * console.log(isIterable(new WeakMap())); // false
 * ```
 *
 * ### 可迭代对象
 *
 * 只要对象（或者它原型链上的某个对象）有一个为 `[Symbol.iterator]` 的属性，
 * 那么它就是一个可迭代的对象。`[Symbol.iterator]` 是一个不接收任何参数的函数，
 * 它的返回值是一个符合迭代器协议的对象。当一个对象被迭代的时候，
 * 会调用它的 `[Symbol.iterator]` 方法，然后会返回一个迭代器，
 * 我们可以从迭代器上获得要迭代的值。
 *
 * ### 常见的可迭代对象
 *
 * `String、Array、TypedArray、Map` 和 `Set`，它们的原型对象都实现了 `[Symbol.iterator]` 方法。
 *
 * ### 接受可迭代对象的类和方法
 *
 *  - `new Map([iterable])`
 *  - `new WeakMap([iterable])`
 *  - `new Set([iterable])`
 *  - `new WeakSet([iterable])`
 *  - `Promise.all(iterable)`
 *  - `Promise.race(iterable)`
 *  - `Array.from(iterable)`
 *
 * ### 需要可迭代对象的语法
 *
 *  - `for...of` 循环
 *  - `yield*`
 *  - 展开和解构赋值
 */
export default function isIterable(value: any): boolean {
    return !isNullOrUndefined(value) && isFunction(value[Symbol.iterator]);
}

/**
 * 在执行某一个函数之前，先执行一个其他函数
 *
 * @param beforeFn 要在函数执行之前执行的函数
 * @returns 返回函数的返回值
 * @example
 *
 * ```javascript
 * let b = before(() => console.log('两数相加的结果为：'));
 *
 * assert(b(() => 1 + 2) === 3);
 * assert(b(() => 2 + 2) === 4);
 * ```
 */
export default function before(beforeFn: Function) {
    return <T>(fn: () => T): T => (beforeFn(), fn());
}

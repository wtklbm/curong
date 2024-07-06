/**
 * 从数组中随机挑选一个元素
 *
 * @param value 要使用的数组
 * @returns 返回随机挑选的元素
 * @example
 *
 * ```javascript
 * const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
 * const ret = random(arr);
 * console.log(ret); // 'd'
 * ```
 */
export default function random<T>(value: T[]): T {
    return value[Math.floor(Math.random() * value.length)];
}

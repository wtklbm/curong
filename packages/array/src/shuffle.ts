import { isZero } from '@curong/types';

/**
 * 将一个数组随机打乱
 *
 * @param value 要打乱的数组
 * @returns 返回被打乱的数组
 * @example
 *
 * ```javascript
 * const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
 * const ret = shuffle(arr);
 * console.log(ret); // ['b', 'a', 'd', 'f', 'g', 'e', 'c'];
 * ```
 *
 * @info
 *
 * ### 使用 `Fisher-Yates` 算法生成随机数
 *
 * `ES` 中定义的 `sort` 方法使用了插入排序和快排两种方案。
 * 当目标数组长度小于 `10` 时，使用插入排序，反之，使用快速排序。
 * 所以，`sort` 自然也不能算作真正随机。
 * 它的时间复杂度介于 `O(n)` 到 `O(n²)` 之间。
 * 元素之间的比较次数通常情况下要远小于 `n(n-1)/2`，
 * 也就意味着有一些元素之间根本就没机会相比较。
 *
 * `Fisher-Yates` 算法满足随机数的要求，它可以保证每个元素在数组中出现的概率是等同的。
 */
export default function shuffle<T extends Array<any>>(value: T): T {
    if (isZero(value.length)) {
        return value;
    }

    let m = value.length;
    let current;

    while (m) {
        const i = Math.floor(Math.random() * m--);
        current = value[m];
        value[m] = value[i];
        value[i] = current;
    }

    return value;
}

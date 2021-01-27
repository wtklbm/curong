import { isIntSafe } from '@curong/types';

/**
 * 当函数执行到达指定次数后执行回调函数
 *
 * @param count 要等待的总次数 (必须大于 `0`)
 * @param callback 当次数到达时所要执行的回调函数
 * @throws
 *
 *  - 如果 `count` 不是大于或等于 0 的安全整数，则会抛出异常
 *
 * @example ````
 *
 * ### 常规示例
 *
 * ```javascript
 * const r = reach(3, () => 10);
 * console.log(r()()()); // 10
 * ```
 *
 * ### 异步读取文件，并等待所有文件读取完毕，然后打印出数据
 *
 * ```javascript
 * const data = {};
 * const ready = after(2, () => console.log(data));
 *
 * readFile('./a.txt', 'utf8', (_err, data) => {
 *     data['a'] = data;
 *     ready();
 * });
 *
 * readFile('./b.txt', 'utf8', (_err, data) => {
 *     data['b'] = data;
 *     ready();
 * });
 * ```
 *
 * # 柯里化函数
 *
 * 该函数是柯里化函数，柯里化函数就是把一个大函数拆分成很多的具体的功能的小函数。
 * 高阶函数中包含柯里化，柯理化的好处是可以保留参数，它非常像 `bind` 方法。
 */
export default function reach<T>(count: number, callback: () => T): () => any {
    if (!isIntSafe(count)) {
        throw new TypeError('[reach]: count 不是大于或等于0的安全整数');
    }

    const reachCall = () => (--count <= 0 ? callback() : reachCall);

    return reachCall;
}

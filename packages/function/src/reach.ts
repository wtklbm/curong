/**
 * 当函数执行到达指定次数后执行回调函数
 *
 * @param count 要等待的总次数 (必须大于 `0`)
 * @param callback 要执行的回调函数
 * @example
 * ```javascript
 * let r = reach(3, () => 10);
 * console.log(r()()()); // 10
 * ```
 */
export default function reach<T>(count: number, callback: () => T): () => any {
    const reachCall = () => (--count <= 0 ? callback() : reachCall);

    return reachCall;
}

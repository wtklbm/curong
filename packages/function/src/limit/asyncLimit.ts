import toPromise from '../promise/toPromise';

import type { AsyncLimitOptions } from './types';

/**
 * 一个异步函数包装器，用于控制并发执行任务
 *
 * @param tasks 要执行的任务，可以是一个同步函数、异步函数
 * @param options 配置选项
 *  - `concurrency`: 任务的最大并发数量。默认为 `1`，即一个一个的执行
 * @note 与该方法的调用方式不同，`parallel` 方法可以传递一个任务数组来并行执行它们
 * @example
 *
 * ```typescript
 * const product = (v: number) => Promise.resolve(v * v);
 * const wrapper = asyncLimit(product);
 * const pool = await Promise.all([
 *     wrapper(1),
 *     wrapper(2),
 *     wrapper(3),
 *     wrapper(4),
 * ]);
 * console.log(pool); // [1, 4, 9, 16]
 * ```
 */
export default function asyncLimit<R, A extends unknown[]>(
    task: (...args: A) => R,
    options: AsyncLimitOptions = {}
) {
    const { concurrency = 1 } = options;
    const queue: Array<[args: A, resolve: (res: any) => any]> = [];
    let activeCount = 0;

    const run = () => {
        if (activeCount < concurrency && queue.length) {
            activeCount++;
            const [args, resolve] = queue.shift()!;
            const res = toPromise(task, args);
            resolve(res);
            res.then(next, next);
        }
    };

    const next = () => {
        activeCount--;
        run();
    };

    return (...args: A): Promise<R> => {
        return new Promise(resolve => {
            queue.push([args, resolve]);
            run();
        });
    };
}

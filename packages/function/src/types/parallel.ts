/** 配置限流器函数的选项 */
export type ParallelOptions = {
    /** 任务的最大并发数量。默认为任务的长度，即所有任务并行执行 */
    concurrency?: number;

    /** 任务失败时的最大重试次数。默认为 `0`，即默认情况下不重试任务 */
    maxRetry?: number;

    /**
     * 重试失败任务之前等待的时间（以毫秒为单位）。默认为 `0`，即不等待
     *
     * 该选项可以传递一个数字，表示等待固定的毫秒数。
     * 也可以传递一个对象，表示生成从 `start` (包含) 到 `end` (包含) 之间的随机毫秒数。
     */
    retryWait?:
        | number
        /** 在每次重试时，都生成一个新的随机等待毫秒数 */
        | {
              /** 起始数字 (包含) */
              start: number;

              /** 结束数字 (包含) */
              end: number;
          };

    /**
     * 处理任务执行过程中发生的错误的函数
     *
     * 如果没有指定该函数，则当执行任务发生错误时，会立即抛出错误。
     * 且所有之前已成功的任务就白执行了。不会看到任何的结果。
     *
     * @param error 发生的错误
     * @returns 该方法可以返回一个值，该值可以作为该任务的最终值存储在结果数组中。
     * 也就是说，如果当前任务报错，就可以返回一个值作为该任务的默认值。
     * 需要注意的是，如果设置了 `maxRetry` 选项，则经过多次重试后，才会将这个默认值设置为该任务的最终值。
     */
    onError?: <T extends Error>(error: T) => any;

    /**
     * 每次任务完成时调用的回调函数
     *
     * @param index 任务的索引
     * @param result 当前任务的执行结果
     */
    onProgress?: (index: number, result: any) => void;

    /**
     * 每次任务失败并重试时调用的回调函数
     *
     * @param index 任务的索引
     * @param error 发生的错误
     * @param attempts 这是第几次重试
     * @returns 如果该函数返回 `true`，则不再进行重试，而是执行下一个任务
     */
    onProgressRetry?: (index: number, error: Error, attempts: number) => boolean | void;
};

export interface AsyncLimitOptions {
    /** 任务的最大并发数量。默认为 `1`，即一个一个的串行执行 */
    concurrency?: number;
}

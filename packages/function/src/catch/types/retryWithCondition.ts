export type RetryWithConditionOptions = {
    /** 每次重试之间的等待毫秒数 */
    retryWait?: number;

    /** 最大重试次数，超过次数将抛出错误 */
    maxRetries?: number;
};

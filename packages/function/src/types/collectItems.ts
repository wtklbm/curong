/** 收集每一项后所计算出的结果 */
type CollectItemResult<T> = Promise<{
    /** 收集是否已经完成 */
    done: boolean;

    /** 收集的值 */
    value: Awaited<T>[] | undefined;
}>;

/** 收集的通用选项 */
export type CollectItemsOptions = {
    /** 是否在返回结果后，重新开始新的收集，默认为 `false` */
    isRestart?: boolean;

    /** 在开始新的收集时，是否和之前收集的结果进行累加，默认为 `false` */
    isAccumulate?: boolean;
};

/** 接收两个参数的收集方法 */
export type CollectItemsResult<T> = <T>(
    /** `Promise` 对象 */
    promise: Promise<T>,

    /** 是否完成本次收集，并返回收集的 `Promise` 数组的结果 */
    isDoneOnce?: boolean
) => CollectItemResult<T>;

/** 包含 `total` 属性的收集选项 */
export type CollectItemsLimitedOptions = CollectItemsOptions & {
    /** 接收多少项后返回结果 */
    total: number;
};

/** 接收一个参数的收集方法 */
export type CollectItemsLimitedResult<T> = <T>(
    /** `Promise` 对象 */
    promise: Promise<T>
) => CollectItemResult<T>;

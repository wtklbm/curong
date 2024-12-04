export type RandomOptions = {
    /** 要返回的随机元素的个数，默认为 `1` */
    length?: number;

    /**
     * 是否使用安全的 `random` 方法进行排序，默认为 `false`
     *
     * - `true`: 使用 `crypto.getRandomValues` 方法来生成随机数，运行速度慢，安全
     * - `false`: 使用 `Math.random` 方法来生成随机数，运行速度快，不安全
     */
    isSafe?: boolean;

    /** 是否允许数组中出现重复的元素，默认为 `true` */
    isRepeat?: boolean;
};

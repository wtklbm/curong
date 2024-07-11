import timeoutDurationResolve, {
    type ResolvableDuration
} from './timeoutDurationResolve';

/**
 * 设置一个定时器，一旦定时器到期，就会执行回调
 *
 * 该方法是 `setTimeout` 的增强版本，支持不同形式的超时时间。
 *
 * @param callback 当定时器到期时，要执行的回调
 * @param duration 以毫秒为单位的超时时间，即在回调之前要等待的时间
 * @param args 传递给 `callback` 的参数
 * @throws 如果超时时间不是一个大于或等于 `0` 且小于 `2147483648` 的整数，则会抛出类型异常
 * @note
 *
 * - 如果要重复调用某个函数（如每 N 毫秒调用一次），请使用 {@link setInterval} 方法
 *
 * ### 无论是哪种情况，实际延迟可能会比预期长一些
 *
 * - 嵌套超时: 一旦对 `setTimeout` 的嵌套调用被安排了 `5` 次，浏览器将强制执行 `4` 毫秒的最小超时
 * - 非活动标签的超时: 为了优化后台标签的加载损耗 (以及降低耗电量)，浏览器会在非活动标签中强制设置一个最小的超时延迟 (具体细节取决于浏览器)
 * - 跟踪脚本的限制: `Firefox` 会针对被识别为跟踪脚本的脚本强制实施额外的限制。当在前台运行时，限制最小延迟仍为 `4ms`。然而，但在后台选项卡中，限制最小延迟为 `10000` 毫秒，即 `10` 秒，在文档首次加载后 `30` 秒开始生效
 * - 超时延迟: 如果页面 (或操作系统/浏览器) 正忙于其他任务，超时触发时间也可能比预期晚
 * - 在加载页面时推迟超时: 当前标签页正在加载时，`Firefox` 将推迟触发 `setTimeout()` 计时器。直到主线程被认为是空闲的 (类似于 `window.requestIdleCallback()`)，或直到触发 `load` 事件
 */
export default function _<A extends unknown[], R>(
    callback: (...args: A) => R,
    duration: ResolvableDuration = 0,
    ...args: A
) {
    return setTimeout(
        () => callback.apply(callback, args),
        timeoutDurationResolve(duration)
    );
}

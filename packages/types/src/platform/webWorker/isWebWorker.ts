declare const WorkerGlobalScope: Function | undefined;

/**
 * 当前的执行环境是不是 `Web Worker`
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope)
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
 */
export default function isWebWorker(): boolean {
    return (
        typeof WorkerGlobalScope === 'function' &&
        globalThis instanceof WorkerGlobalScope
    );
}

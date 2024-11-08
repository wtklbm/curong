declare const SharedWorkerGlobalScope: Function | undefined;

/**
 * 当前的执行环境是不是 `SharedWorker`
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorkerGlobalScope)
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
 */
export default function isSharedWorker(): boolean {
    return (
        typeof SharedWorkerGlobalScope === 'function' &&
        globalThis instanceof SharedWorkerGlobalScope
    );
}

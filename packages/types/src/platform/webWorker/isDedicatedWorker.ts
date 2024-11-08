declare const DedicatedWorkerGlobalScope: Function | undefined;

/**
 * 当前的执行环境是不是 `DedicatedWorker`
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope)
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
 */
export default function isDedicatedWorker(): boolean {
    return (
        typeof DedicatedWorkerGlobalScope === 'function' &&
        globalThis instanceof DedicatedWorkerGlobalScope
    );
}

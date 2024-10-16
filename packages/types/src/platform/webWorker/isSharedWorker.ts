declare const SharedWorkerGlobalScope: Function | undefined;

/**
 * 当前的执行环境是不是 `SharedWorker`
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorkerGlobalScope)
 */
export default function isSharedWorker(): boolean {
    return (
        typeof SharedWorkerGlobalScope === 'function' &&
        globalThis instanceof SharedWorkerGlobalScope
    );
}

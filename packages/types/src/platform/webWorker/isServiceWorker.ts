declare const ServiceWorkerGlobalScope: Function | undefined;

/**
 * 当前的执行环境是不是 `ServiceWorker`
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope)
 */
export default function isServiceWorker(): boolean {
    return (
        typeof ServiceWorkerGlobalScope === 'function' &&
        globalThis instanceof ServiceWorkerGlobalScope
    );
}

/**
 * 当前的执行环境是不是 `Web Worker`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isWebWorker(): boolean {
    return (
        typeof self === 'object' &&
        self !== null &&
        self.constructor &&
        self.constructor.name === 'DedicatedWorkerGlobalScope'
    );
}

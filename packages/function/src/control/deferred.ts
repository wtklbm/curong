export interface Deferred<T> {
    /** 已推迟的 `Promise` */
    promise: Promise<T>;

    /** 解析 `Promise` 的函数 */
    resolve(value?: T | PromiseLike<T>): void;

    /** 拒绝 `Promise` 的函数 */
    reject(reason?: any): void;
}

/**
 * 创建一个可以受外部控制的 `Promise`
 *
 * 一个 `Deferred` 对象通常包含一个 `Promise`，以及用于手动控制这个 `Promise` 状态的 `resolve` 和 `reject` 方法。
 * 这个对象允许开发者在需要的时候解决 (`resolve`) 或拒绝 (`reject`) 一个异步操作，而不是在 `Promise` 创建的同时就确定其结果。
 *
 * @returns 返回一个包含 `Promise` 及其 `resolve` 和 `reject` 方法的对象
 * @example
 *
 * ```typescript
 * const p1 = deferred<number>();
 * p1.resolve(42);
 * //p1.promise.then(value => console.log(value)); // 42
 * console.log(await p1.promise); // 42
 *
 * const p2 = deferred<string>();
 * p2.reject(new Error('报错了'));
 * p2.promise.catch(error => console.error(error)); // Error: 报错了
 * ```
 */
export default function deferred<T>(): Deferred<T> {
    let resolve: Deferred<T>['resolve'];
    let reject: Deferred<T>['reject'];

    const promise = new Promise<T>((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });

    // @ts-expect-error 我们知道这些已分配，但 `TypeScript` 不知道
    return { promise, resolve, reject };
}

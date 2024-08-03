import { isSyncFunction, isUintSafe } from '@curong/types';

/**
 * 返回一个函数，当函数执行到达指定次数后就不再执行回调函数
 *
 * @param count 要执行的总次数，它是一个大于或等于 `0` 的安全整数
 * @param callback 当在次数范围内时所要执行的回调函数
 * @param args 传递给 `callback` 的参数
 * @returns 返回一个函数。
 *  每次调用该函数时，它会调用 `callback`，直到调用次数达到 `count`。
 *  达到次数限制后，返回的函数将不再调用 `callback`，并返回 `undefined`。
 * @throws
 *  - 如果 `count` 不是大于或等于 `0` 的安全整数，则会抛出类型错误异常
 *  - 如果 `callback` 不是同步函数，则会抛出类型错误异常
 * @example
 *
 * ```typescript
 * // 创建一个函数，最多调用 `3` 次
 * const limitedCallback = limited(3, data => data, 'Hello');
 *
 * console.log(limitedCallback()); // Hello
 * console.log(limitedCallback()); // Hello
 * console.log(limitedCallback()); // Hello
 * console.log(limitedCallback()); // undefined
 * console.log(limitedCallback()); // undefined
 * ```
 */
function limited<R, A extends unknown[]>(
    count: number,
    callback: (...args: A) => R,
    ...args: A
): () => R | undefined;

function limited<R, A extends unknown[]>(
    count: number,
    callback: (...args: A) => R
): (...args: A) => R | undefined;

function limited<R, A extends unknown[], A1>(
    count: number,
    callback: (a1: A1, ...args: A) => R,
    a1: A1
): (...args: A) => R | undefined;

function limited<R, A extends unknown[], A1, A2>(
    count: number,
    callback: (a1: A1, a2: A2, ...args: A) => R,
    a1: A1,
    a2: A2
): (...args: A) => R | undefined;

function limited<R, A extends unknown[], A1, A2, A3>(
    count: number,
    callback: (a1: A1, a2: A2, a3: A3, ...args: A) => R,
    a1: A1,
    a2: A2,
    a3: A3
): (...args: A) => R | undefined;

function limited<R, A extends unknown[], A1, A2, A3, A4>(
    count: number,
    callback: (a1: A1, a2: A2, a3: A3, a4: A4, ...args: A) => R,
    a1: A1,
    a2: A2,
    a3: A3,
    a4: A4
): (...args: A) => R | undefined;

function limited<R, A extends unknown[], A1, A2, A3, A4, A5>(
    count: number,
    callback: (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, ...args: A) => R,
    a1: A1,
    a2: A2,
    a3: A3,
    a4: A4,
    a5: A5
): (...args: A) => R | undefined;

function limited<R, A extends unknown[], A1, A2, A3, A4, A5, A6>(
    count: number,
    callback: (a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, ...args: A) => R,
    a1: A1,
    a2: A2,
    a3: A3,
    a4: A4,
    a5: A5,
    a6: A6
): (...args: A) => R | undefined;

function limited<R, A extends unknown[], A1, A2, A3, A4, A5, A6, A7>(
    count: number,
    callback: (
        a1: A1,
        a2: A2,
        a3: A3,
        a4: A4,
        a5: A5,
        a6: A6,
        a7: A7,
        ...args: A
    ) => R,
    a1: A1,
    a2: A2,
    a3: A3,
    a4: A4,
    a5: A5,
    a6: A6,
    a7: A7
): (...args: A) => R | undefined;

function limited<R, A extends unknown[], A1, A2, A3, A4, A5, A6, A7, A8>(
    count: number,
    callback: (
        a1: A1,
        a2: A2,
        a3: A3,
        a4: A4,
        a5: A5,
        a6: A6,
        a7: A7,
        a8: A8,
        ...args: A
    ) => R,
    a1: A1,
    a2: A2,
    a3: A3,
    a4: A4,
    a5: A5,
    a6: A6,
    a7: A7,
    a8: A8
): (...args: A) => R | undefined;

function limited<R, A extends unknown[], A1, A2, A3, A4, A5, A6, A7, A8, A9>(
    count: number,
    callback: (
        a1: A1,
        a2: A2,
        a3: A3,
        a4: A4,
        a5: A5,
        a6: A6,
        a7: A7,
        a8: A8,
        a9: A9,
        ...args: A
    ) => R,
    a1: A1,
    a2: A2,
    a3: A3,
    a4: A4,
    a5: A5,
    a6: A6,
    a7: A7,
    a8: A8,
    a9: A9
): (...args: A) => R | undefined;

function limited<R, A extends unknown[]>(
    count: number,
    callback: (...args: A) => R,
    ...args: any[]
): (...params: any[]) => any {
    if (!isUintSafe(count)) {
        throw new TypeError('[limited]: count 不是大于或等于 0 的安全整数');
    }

    if (!isSyncFunction(callback)) {
        throw new TypeError('[limited]: callback 必须是一个同步函数');
    }

    return (...params: A) => {
        if (--count >= 0) {
            return callback.apply(callback, args.concat(params));
        }
    };
}

export default limited;

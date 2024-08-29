// https://github.com/medikoo/next-tick/blob/d59185a20496cacc8ee24be4ebbd24e8ae8d63f9/index.js

import { type Function } from '@curong/types';

declare let WebKitMutationObserver: {
    prototype: MutationObserver;
    new (callback: MutationCallback): MutationObserver;
};

const byObserver = (
    Observer: typeof MutationObserver
): ((fn: Function) => void) => {
    const node = document.createTextNode('');
    let queue: any;
    let currentQueue: any;
    let bit = 0;
    let i = 0;

    new Observer(() => {
        let callback: Function;

        if (!queue) {
            if (!currentQueue) return;
            queue = currentQueue;
        } else if (currentQueue) {
            queue = currentQueue.slice(i).concat(queue);
        }

        currentQueue = queue;
        queue = null;
        i = 0;

        if (typeof currentQueue === 'function') {
            callback = currentQueue;
            currentQueue = null;
            callback();
            return;
        }

        node.data = `${(bit = ++bit % 2)}`;

        while (i < currentQueue.length) {
            callback = currentQueue[i];
            i++;
            if (i === currentQueue.length) currentQueue = null;
            callback();
        }
    }).observe(node, { characterData: true });

    return (fn: Function) => {
        if (queue) {
            if (typeof queue === 'function') {
                queue = [queue, fn];
            } else {
                queue.push(fn);
            }

            return;
        }

        queue = fn;
        node.data = `${(bit = ++bit % 2)}`;
    };
};

/**
 * `process.nextTick` 的 `polyfill`，用于将 `callback` 添加到 "下一个滴答队列"
 *
 * - 在 `Node.js` 环境中，使用 `process.nextTick`
 * - 在现代引擎中，`queueMicrotask` 确保微任务的解析
 * - 在旧版本浏览器中，使用 `MutationObserver` 作为后备
 * - 在其他引擎中，使用 `setImmediate` 或 `setTimeout(fn, 0)` 作为后备
 * - 如果以上都不支持，模块将抛出异常
 *
 * 如果递归地调用 `nextTick` 方法，则可能会创建无限的循环。有关更多背景信息，请参见
 * [Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#process-nexttick)
 *
 * @param callback 要调用的回调函数
 * @throws 如果当前环境不支持 `nextTick` 方法，则会直接在导入该方法时抛出异常
 * @example
 *
 * ```js
 * console.log('start');
 * nextTick(() => {
 *   console.log('nextTick callback');
 * });
 * console.log('scheduled');
 *
 * // Output:
 * // start
 * // scheduled
 * // nextTick callback
 * ```
 *
 * 这在开发 API 时非常重要，以便让用户有机会在构造对象之后但发生任何 I/O 之前分配事件处理程序:
 *
 * ```js
 * function MyThing(options) {
 *   this.setupOptions(options);
 *
 *   nextTick(() => {
 *     this.startDoingStuff();
 *   });
 * }
 *
 * const thing = new MyThing();
 * thing.getReadyForStuff();
 *
 * // thing.startDoingStuff() 现在被调用，而不是之前。
 * ```
 *
 * 对于 API 来说，100% 同步或 100% 异步非常重要。考虑这个例子:
 *
 * ```js
 * // 警告！请勿使用！糟糕的不安全隐患！
 * function maybeSync(arg, cb) {
 *   if (arg) {
 *     cb();
 *     return;
 *   }
 *
 *   fs.stat('file', cb);
 * }
 * ```
 *
 * 该 API 是危险的，因为在以下情况下:
 *
 * ```js
 * const maybeTrue = Math.random() > 0.5;
 *
 * maybeSync(maybeTrue, () => {
 *   foo();
 * });
 *
 * bar();
 * ```
 *
 * 目前尚不清楚 `foo()` 还是 `bar()` 会先被调用。
 *
 * 下面的方法要好得多:
 *
 * ```js
 * function definitelyAsync(arg, cb) {
 *   if (arg) {
 *     nextTick(cb);
 *     return;
 *   }
 *
 *   fs.stat('file', cb);
 * }
 * ```
 */
const nextTick = (() => {
    // process.nextTick: 仅 `Node.js` 支持
    if (
        typeof process === 'object' &&
        process &&
        typeof process.nextTick === 'function'
    ) {
        return (callback: Function) => {
            process.nextTick(callback);
        };
    }

    // queueMicrotask: 浏览器和 `Node.js` 支持
    if (typeof queueMicrotask === 'function') {
        return (callback: Function) => {
            queueMicrotask(callback);
        };
    }

    // MutationObserver: 仅浏览器支持
    if (
        typeof MutationObserver === 'function' &&
        Function.prototype.toString.call(MutationObserver).startsWith('class ')
    ) {
        return byObserver(MutationObserver);
    } else if (
        typeof WebKitMutationObserver === 'function' &&
        Function.prototype.toString
            .call(WebKitMutationObserver)
            .startsWith('class ')
    ) {
        return byObserver(WebKitMutationObserver);
    }

    // W3C Draft: 仅 `Node.js` 支持
    if (typeof setImmediate === 'function') {
        return (callback: Function) => {
            setImmediate(callback);
        };
    }

    // 后备: 浏览器和 `Node.js` 支持
    if (typeof setTimeout === 'function' || typeof setTimeout === 'object') {
        return (callback: Function) => {
            setTimeout(callback, 0);
        };
    }

    throw new Error(`[nextTick] 当前环境不支持 nextTick`);
})();

export default nextTick;

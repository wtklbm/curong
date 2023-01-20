import getTag from './getTag';

/**
 * 当前的执行环境是不是 `Node.js`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNodejs(): boolean {
    return (
        typeof global === 'object' &&
        global !== null &&
        typeof setImmediate === 'function' &&
        typeof clearImmediate === 'function' &&
        typeof Buffer === 'function' &&
        typeof Buffer.isBuffer === 'function' &&
        typeof Buffer.byteLength === 'function' &&
        typeof process === 'object' &&
        getTag(process) === 'process' &&
        typeof process.nextTick === 'function' &&
        typeof process.exit === 'function' &&
        typeof process.cwd === 'function'
    );
}

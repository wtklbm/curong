import getTagEqual from '../type/getTagEqual';

/**
 * 当前的执行环境是不是 `Node.js`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isNodejs(): boolean {
    return (
        typeof global === 'object' &&
        global !== null &&
        typeof global.clearImmediate === 'function' &&
        typeof process === 'object' &&
        getTagEqual(process, 'process') &&
        (process.release ?? {}).name === 'node' &&
        typeof Buffer === 'function' &&
        typeof Buffer.isBuffer === 'function'
    );
}

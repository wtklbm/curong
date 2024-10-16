import isNodejsProcess from './isNodejsProcess';

/**
 * 当前的执行环境是不是 `Bun`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBun(): boolean {
    return (
        isNodejsProcess() &&
        typeof globalThis.process.versions?.bun === 'string'
    );
}

import isString from '../../string/isString';

declare const Bun: any;

/**
 * 当前的执行环境是不是 `Bun`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isBun(): boolean {
    return (
        typeof Bun === 'object' &&
        isString(Bun?.version) &&
        isString(globalThis.process?.versions?.bun)
    );
}

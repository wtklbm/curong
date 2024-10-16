/**
 * 当前的执行环境是不是包含 `globalThis`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isGlobalThis(): boolean {
    return (
        typeof globalThis === 'object' &&
        globalThis !== null &&
        globalThis.self === globalThis &&
        globalThis.self.globalThis === globalThis
    );
}

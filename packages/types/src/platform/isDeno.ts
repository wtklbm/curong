declare global {
    export const Deno: any;
}

/**
 * 当前的执行环境是不是 `Deno`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isDeno(): boolean {
    return (
        typeof Deno !== 'undefined' &&
        typeof Deno.version !== 'undefined' &&
        typeof Deno.core !== 'undefined'
    );
}

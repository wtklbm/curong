import getUserAgent from '../constants/getUserAgent';

declare const Deno: any;

/**
 * 当前的执行环境是不是 `Deno`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isDeno(): boolean {
    return (
        typeof Deno === 'object' &&
        typeof Deno?.version?.deno === 'string' &&
        getUserAgent().startsWith('Deno/')
    );
}

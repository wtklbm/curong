import isTypeofObject from '../../object/isTypeofObject';
import isString from '../../string/isString';

import getUserAgent from '../constants/getUserAgent';

type Deno = {
    version?: {
        deno?: string;
    };
};

declare global {
    var Deno: Deno | undefined;
}

/**
 * 当前的执行环境是不是 `Deno`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isDeno(): boolean {
    return (
        isTypeofObject(globalThis.Deno) &&
        isString(globalThis.Deno.version?.deno) &&
        getUserAgent().startsWith('Deno/')
    );
}

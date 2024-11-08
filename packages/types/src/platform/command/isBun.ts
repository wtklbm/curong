import isTypeofObject from '../../object/isTypeofObject';
import isString from '../../string/isString';

declare global {
    var Bun: any;
}

/**
 * 当前的执行环境是不是 `Bun`
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
 */
export default function isBun(): boolean {
    return (
        isTypeofObject(globalThis.Bun) &&
        isString(globalThis.Bun.version) &&
        isString(globalThis.process?.versions?.bun)
    );
}

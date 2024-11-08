import isString from '../../string/isString';

import isNodejsProcess from '../command/isNodejsProcess';

/**
 * 当前的执行环境是不是 `Electron`
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
 */
export default function isElectron(): boolean {
    return isNodejsProcess() && isString(globalThis.process.versions?.electron);
}

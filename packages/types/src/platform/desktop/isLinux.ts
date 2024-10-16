import isNodejsProcess from '../command/isNodejsProcess';
import isNavigator from '../constants/isNavigator';

/**
 * 当前的执行环境是不是 `Linux`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isLinux(): boolean {
    return (
        (isNodejsProcess() && globalThis.process.platform === 'linux') ||
        (isNavigator() && // @ts-ignore
            (globalThis.navigator.userAgentData?.platform === 'Linux' ||
                globalThis.navigator.platform?.startsWith('Linux ')))
    );
}

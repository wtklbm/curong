import isNodejsProcess from '../command/isNodejsProcess';
import isNavigator from '../constants/isNavigator';

/**
 * 当前的执行环境是不是 `macOS`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isMacOS(): boolean {
    // NOTE 也可以判断 `globalThis.os.type()` 是否为 `Darwin`
    return (
        (isNodejsProcess() && globalThis.process.platform === 'darwin') ||
        (isNavigator() && // @ts-ignore
            (globalThis.navigator.userAgentData?.platform === 'macOS' ||
                globalThis.navigator.platform.startsWith('Mac')))
    );
}

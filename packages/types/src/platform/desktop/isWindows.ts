import isNodejsProcess from '../command/isNodejsProcess';
import isNavigator from '../constants/isNavigator';

/**
 * 当前的执行环境是不是 `Windows`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isWindows(): boolean {
    return (
        (isNodejsProcess() && globalThis.process.platform === 'win32') ||
        (isNavigator() && // @ts-ignore
            (globalThis.navigator.userAgentData?.platform === 'Windows' ||
                globalThis.navigator.platform === 'Win32'))
    );
}

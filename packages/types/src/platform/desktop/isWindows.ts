import isNodejsProcess from '../command/isNodejsProcess';
import isNavigator from '../constants/isNavigator';

/**
 * 当前的执行环境是不是 `Windows`
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
 */
export default function isWindows(): boolean {
    // NOTE 也可以判断 `globalThis.os.type()` 是否为 `Windows_NT`
    return (
        (isNodejsProcess() && globalThis.process.platform === 'win32') ||
        (isNavigator() && // @ts-ignore
            (globalThis.navigator.userAgentData?.platform === 'Windows' ||
                globalThis.navigator.platform === 'Win32'))
    );
}

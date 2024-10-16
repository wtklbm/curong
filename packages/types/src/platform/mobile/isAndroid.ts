import isNodejsProcess from '../command/isNodejsProcess';
import isNavigator from '../constants/isNavigator';

/**
 * 当前的执行环境是不是 `Android`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isAndroid(): boolean {
    return (
        (isNodejsProcess() && globalThis.process.platform === 'android') ||
        (isNavigator() && // @ts-ignore
            (globalThis.navigator.userAgentData?.platform === 'Android' ||
                globalThis.navigator.platform === 'Android'))
    );
}

import isNodejsProcess from '../command/isNodejsProcess';
import isNavigator from '../constants/isNavigator';

/**
 * 当前的执行环境是不是 `Android`
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
 */
export default function isAndroid(): boolean {
    // 在小程序中，可以通过 `globalThis.mp.getSystemInfoSync()` 获取系统信息
    // 判断 `platform` 是不是 `android`，`system` 是不是 `Android`
    return (
        (isNodejsProcess() && globalThis.process.platform === 'android') ||
        (isNavigator() && // @ts-ignore
            (globalThis.navigator.userAgentData?.platform === 'Android' ||
                globalThis.navigator.platform === 'Android'))
    );
}

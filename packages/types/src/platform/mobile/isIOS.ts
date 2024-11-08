import isNavigator from '../constants/isNavigator';

/**
 * 当前的执行环境是不是 `iOS`
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
 */
export default function isIOS(): boolean {
    // 在小程序中，可以通过 `globalThis.mp.getSystemInfoSync()` 获取系统信息
    // 判断 `platform` 是不是 `ios`，`system` 是不是 `iOS`
    return (
        isNavigator() && // @ts-ignore
        (globalThis.navigator.userAgentData?.platform === 'iOS' ||
            (globalThis.navigator.platform.startsWith('Mac') &&
                globalThis.navigator.maxTouchPoints > 1) ||
            /iPad|iPhone|iPod/.test(globalThis.navigator.platform))
    );
}

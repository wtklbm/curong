import isNavigator from '../constants/isNavigator';

/**
 * 当前的执行环境是不是 `iOS`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isIOS(): boolean {
    return (
        isNavigator() && // @ts-ignore
        (globalThis.navigator.userAgentData?.platform === 'iOS' ||
            (globalThis.navigator.platform.startsWith('Mac') &&
                globalThis.navigator.maxTouchPoints > 1) ||
            /iPad|iPhone|iPod/.test(globalThis.navigator.platform))
    );
}

import isNavigator from '../constants/isNavigator';

/**
 * 当前的执行环境是不是 `React Native`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isReactNative(): boolean {
    return isNavigator() && globalThis.navigator.product === 'ReactNative';
}

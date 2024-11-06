import isNavigator from '../constants/isNavigator';

/**
 * 当前的执行环境是不是 `Taro`
 *
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isTaro(): boolean {
    // https://github.com/NervJS/taro/blob/main/packages/taro-runtime/src/bom/navigator.ts
    return isNavigator() && globalThis.navigator.product === 'Taro';
}

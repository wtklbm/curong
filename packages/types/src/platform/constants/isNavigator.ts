import { isTypeofObject } from '../../object';

/**
 * 当前执行环境中是不是存在 `navigator` 对象
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @note 该方法使用了 `globalThis`，有关更多信息，请参见 `isGlobalThis` 方法
 */
export default function isNavigator(navigator = globalThis.navigator) {
    // 为什么不用 `Object.prototype.toString.call(navigator) === Navigator`
    // 只有浏览器是这个标签，其他的比如 `Node.js` 都是 `Object`
    return isTypeofObject(navigator);
}

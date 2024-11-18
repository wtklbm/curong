/**
 * 当前的执行环境是不是包含 `globalThis`
 *
 * @returns 是则返回 `true`，否则为 `false`
 * @note
 *  - 有关详细信息，请参考 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis)
 *  - 有关兼容性问题，请参考 [Can I Use](https://caniuse.com/mdn-javascript_builtins_globalthis)
 *  - 默认情况下，小程序代码中 [禁止访问 `globalThis` 和 `global` 等全局上下文对象](https://opendocs.alipay.com/mini/framework/implementation-detail#自定义%20Polyfill)，这可能会破坏 `core-js` 的正常工作
 * @polyfill
 *  - [通用 JavaScript 中令人恐惧的 globalThis polyfill](https://mathiasbynens.be/notes/globalthis)
 *  - [符合 ECMAScript 规范的 polyfill](https://github.com/es-shims/globalThis)
 *  - [兼容 IE8 及以上版本的 polyfill](https://github.com/ungap/global-this)
 *  - [一个小实现](https://github.com/sagi/globalThis/blob/master/index.js)
 *  - [一个小实现的 TS 版本](https://github.com/jasmith79/global-this/blob/master/src/global-this.ts)
 *  - [只需导入即可的 polyfill 库](https://github.com/atypiape/polyfill-global-this)
 *  - [Babel 插件中的实现](https://github.com/niksy/babel-plugin-transform-globalthis/blob/master/index.js)
 *  - [ECMAScript 提案中的实现](https://github.com/tc39/proposal-global/blob/master/polyfill.js)
 *  - [更多 Github 搜索](https://github.com/search?q=globalThis&type=repositories)
 */
export default function isGlobalThis(): boolean {
    return typeof globalThis === 'object' && globalThis !== null;
}

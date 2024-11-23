import { isMiniProgramWebView } from '@curong/types';

/**
 * 是不是在小程序的 `WebView` 中
 *
 * @throws 如果不是则会抛出类型异常
 * @note
 *
 * 该方法仅通过 `userAgent` 来验证，如需更严格的验证请提交 PR。
 *
 * 支持以下平台:
 *  - [微信](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html#相关接口-5): `userAgent` 中包含 `miniProgram`，`window.__wxjs_environment` 的值是 `miniprogram`
 *  - [QQ](https://q.qq.com/wiki/develop/miniprogram/component/open-ability/web-view.html#相关接口-5): `userAgent` 中包含 `miniProgram`，`window.__qqjs_environment` 的值是 `miniprogram`
 *  - [支付宝](https://opendocs.alipay.com/mini/component/web-view#属性说明): `userAgent` 中包含 `MiniProgram`
 *  - [抖音](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/open-capacity/web-view#环境判断示例): `userAgent` 中包含 `ToutiaoMicroApp`
 *  - [百度](https://smartprogram.baidu.com/docs/develop/function/opensmartprogram/#如何判断-h5-页面是否在小程序-web-view-打开): `userAgent` 中包含 `swan/`，`window.name` 包含 `webswan-`
 *  - [京东](https://mp-docs.jd.com/doc/dev/guide/2124): `userAgent` 中包含 `jdmp`
 *  - [钉钉](https://open.dingtalk.com/document/orgapp/web-view): `userAgent` 中包含 `dingtalk`
 */
export default function assertMiniProgramWebView(this: any) {
    if (!isMiniProgramWebView()) {
        throw new TypeError(
            '[assertMiniProgramWebView] 当前的执行环境不是小程序的 WebView',
            {
                cause: { this: this }
            }
        );
    }
}

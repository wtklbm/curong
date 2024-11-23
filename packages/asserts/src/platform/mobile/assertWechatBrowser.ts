import { isWechatBrowser } from '@curong/types';

/**
 * 当前的执行环境是不是微信的内置浏览器
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertWechatBrowser(this: any) {
    if (!isWechatBrowser()) {
        throw new TypeError(
            '[assertWechatBrowser] 当前的执行环境不是微信的内置浏览器',
            {
                cause: { this: this }
            }
        );
    }
}

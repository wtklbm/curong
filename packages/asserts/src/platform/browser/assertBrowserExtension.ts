import { isBrowserExtension } from '@curong/types';

/**
 * 当前的执行环境是不是浏览器扩展
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertBrowserExtension(this: any) {
    if (!isBrowserExtension()) {
        throw new TypeError(
            '[assertBrowserExtension] 当前的执行环境不是浏览器扩展',
            {
                cause: { this: this }
            }
        );
    }
}

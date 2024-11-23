import { isBrowser } from '@curong/types';

/**
 * 当前的执行环境是不是浏览器
 *
 * @param value 要验证的值
 * @param variableName 该值的变量名
 * @throws 如果不是则会抛出类型异常
 */
export default function assertBrowser(this: any) {
    if (!isBrowser()) {
        throw new TypeError('[assertBrowser] 当前的执行环境不是浏览器', {
            cause: { this: this }
        });
    }
}

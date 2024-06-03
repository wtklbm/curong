import isAsyncGeneratorFunction from './isAsyncGeneratorFunction';
import isSyncGeneratorFunction from './isSyncGeneratorFunction';

/**
 * 是不是一个同步或异步的 `Generator` 函数
 *
 * @param value 要验证的值
 * @returns 是则返回 `true`，否则为 `false`
 */
export default function isGeneratorFunction(value: unknown): value is Function {
    return isSyncGeneratorFunction(value) || isAsyncGeneratorFunction(value);
}

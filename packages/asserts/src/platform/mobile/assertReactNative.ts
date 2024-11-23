import { isReactNative } from '@curong/types';

/**
 * 当前的执行环境是不是 `React Native`
 *
 * @throws 如果不是则会抛出类型异常
 */
export default function assertReactNative(this: any) {
    if (!isReactNative()) {
        throw new TypeError(
            '[assertReactNative] 当前的执行环境不是 React Native',
            {
                cause: { this: this }
            }
        );
    }
}

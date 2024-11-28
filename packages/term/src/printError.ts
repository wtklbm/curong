import { isError } from '@curong/types';

import formatFromError from './formatFromError';
import print from './print';
import type { ForMatInfo } from './types';

/**
 * 在终端中打印一个 `Error` 对象
 *
 * @param error 要打印的 `Error` 对象
 * @example
 * ```typescript
 * printError(new Error);
 * ```
 */
export default function printError(error: Error): void;

/**
 * 在终端打印一段错误消息
 *
 * @param message 要打印的消息列表
 * @example
 * ```typescript
 * printError('抛出了一个错误，请处理');
 * ```
 */
export default function printError(...message: ForMatInfo['message'][]): void;

export default function printError(...data: any): void {
    if (isError(data[0])) {
        return console.log(formatFromError(data[0]));
    }

    return print('error', ...data);
}

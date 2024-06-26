import print from './print';
import type { ForMatInfo } from './types';

/**
 * 在终端打印一段警告消息
 *
 * @param message 要打印的消息列表
 */
export default function printWarn(...message: ForMatInfo['message'][]): void {
    return print('warn', ...message);
}

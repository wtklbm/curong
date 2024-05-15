import print from './print';
import type { ForMatInfo } from './types';

/**
 * 在终端打印一段文本消息
 *
 * @param message 要打印的消息列表
 */
export default function printInfo(...message: ForMatInfo['message'][]): void {
    return print('info', ...message);
}

import print from './print';

import { ForMatInfo } from './types/format';

/**
 * 在终端打印一段文本消息
 *
 * @param message 要打印的消息列表
 */
export default function printInfo(...message: ForMatInfo['message'][]): void {
    return print('info', ...message);
}

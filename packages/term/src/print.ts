import format from './format';
import { ForMatInfo } from './types/format';

/**
 * 在终端打印一段带有样式的消息
 *
 * @param message 要打印的消息列表
 */
export default function print(
    type: ForMatInfo['type'],
    ...message: ForMatInfo['message'][]
): void {
    return console.log(
        format(
            { title: message.join('\n  '), type, date: false, stack: false },
            { display: { title: true, dividers: false } }
        )
    );
}

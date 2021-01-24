import { createInterface } from 'readline';

/**
 * 从终端中读取用户输入的内容
 *
 * @param message 要显示给用户的消息
 * @returns 返回用户输入的内容
 */
export default function readByQuestion(message: string): Promise<string> {
    return new Promise(resolve => {
        const readable = createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readable.question(message, answer => {
            readable.close();
            resolve(answer.trim());
        });
    });
}

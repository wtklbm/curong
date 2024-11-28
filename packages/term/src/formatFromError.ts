import format from './format';

/**
 * 将 `Error` 对象格式为用于终端调试的文本信息
 *
 * @param error 要格式化的错误对象
 * @returns 返回格式好的字符串
 */
export default function formatFromError(error: Error): string {
    const { name, message, stack, cause } = error;
    return format({ name, message, data: cause, stack });
}

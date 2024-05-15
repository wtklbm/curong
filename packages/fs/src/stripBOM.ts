/**
 * 删除字节顺序标记 (UTF-8 BOM)，编码为 `0xFEFF` (EF BB BF)
 *
 * @param content 要使用的字符串
 * @returns 返回处理好的内容
 */
export default function stripBOM(content: string): string {
    return content.charCodeAt(0) === 0xfeff ? content.slice(1) : content;
}

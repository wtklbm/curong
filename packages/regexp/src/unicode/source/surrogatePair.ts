/**
 * 验证 `Unicode` 代理对 (`surrogate pair`) 的正则字符串
 *
 * 代理对是指在 UTF-16 编码中使用两个 16 位的代码单元来表示一个单一的 Unicode 字符。
 * 代理对通常用于表示超出基本多语言平面 (BMP) 的字符，例如某些表情符号和汉字。
 */
const surrogatePair = '(?:[\uD800-\uDBFF][\uDC00-\uDFFF])';

export default surrogatePair;

/** 验证 `base64` 的正则字符串 */
const base64 = '(?:(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?)';

export default base64;

import ipv4 from './ipv4';
import ipv6 from './ipv6';

/** 验证 `IP` 地址的正则字符串 */
const ip = `(?:${ipv4}|${ipv6})`;

export default ip;

/** 验证 `IPv4` 地址的正则字符串 */
// https://github.com/colinhacks/zod/blob/main/src/types.ts
const ipv4 =
    '(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])';

// https://github.com/OneUptime/oneuptime/blob/master/Common/Types/IP/IP.ts
// const ipv4 =
//     '(?:(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))';

// https://github.com/Saeris/graphql-scalars/blob/master/src/ipv4.ts
// const ipv4 =
//     '(?:(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])(?:\\/(?:\\d|[1-2]\\d|3[0-2]))?)';

export default ipv4;

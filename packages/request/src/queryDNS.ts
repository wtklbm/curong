import { isString, isNull, isEqual, isZero } from '@curong/types';

import { request } from './request';

import type { RequestOptions, QueryDNSResult } from './types';

/**
 * 查询主机地址所对应的 `DNS`
 *
 * @param hostname 要查询的主机地址
 * @returns 返回查询到的主机地址所对应的 `DNS` 对象
 * @example
 *
 * ```javascript
 * const ret = await queryDNS('github.com');
 *
 * // { 'github.com': ['13.250.177.223'] };
 * console.log(ret);
 * ```
 */
export default async function queryDNS(
    hostname: string | string[]
): Promise<QueryDNSResult> {
    if (isString(hostname)) {
        hostname = [hostname];
    }

    const address: QueryDNSResult = {};

    if (isZero(hostname.length)) {
        return address;
    }

    const requestOptions: RequestOptions = {
        // 使用腾讯
        hostname: '119.29.29.29',
        path: '/d',
        https: false,
        query: { dn: '' }
    };

    for (let i = 0, len = hostname.length; i < len; i++) {
        const host = hostname[i];
        address[host] = [];
        requestOptions.query!.dn = host;

        const ret = await request(requestOptions);

        if (isNull(ret.error) && isEqual(ret.response.statusCode, 200)) {
            address[host].push(...ret.data.toString().split(/;/));
        }
    }

    return address;
}

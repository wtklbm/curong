import { TextDecoder } from 'util';

import { format } from '@curong/term';
import { isNotEqual, isNull } from '@curong/types';

import { request } from '../request';
import type { publicIpResult } from './types';

/**
 * 获取本地公共的 `IP` 地址和城市信息
 *
 * @returns 返回获取到的公共 `IP` 地址和城市信息对象
 * @note 该方法使用了 `new Function`，如果用户禁用了 [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)，则导致代码异常
 * @throws
 * - 如果请求失败，则会抛出异常
 * - 如果响应的数据格式不正确，则会抛出异常
 * @example
 *
 * ```typescript
 * const ret = await publicIP();
 *
 * // { cip: '89.163.224.142', cid: 'DE', cname: 'GERMANY' }
 * console.log(ret);
 * ```
 */
export default async function publicIP(): Promise<publicIpResult> {
    const hostname = 'pv.sohu.com';
    const path = '/cityjson';
    const ret = await request({ hostname, path });

    if (!isNull(ret.error) || isNotEqual(ret.response.statusCode, 200)) {
        throw format({
            name: 'publicIP',
            message: '请求公共的IP地址失败',
            code: ret.response.statusCode,
            data: ret
        });
    }

    const data = new TextDecoder('gbk').decode(ret.data);

    if (!data.startsWith('var returnCitySN = {')) {
        throw format({
            name: 'publicIP',
            message: '从远程获取到的数据的格式不正确',
            data: ret.data
        });
    }

    const citySN = new Function(`${data}; return returnCitySN ?? {};`);
    const { cip: ip, cid: id, cname: name } = citySN();

    return { ip, city: { id, name } };
}

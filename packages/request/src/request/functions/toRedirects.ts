import type { IncomingMessage } from 'http';

import { toLowerCaseKey } from '@curong/object';
import { isNullOrUndefined } from '@curong/types';

import type { RequestOptions } from '../../types';

import request from '../request';

import { deleteOptionsAttr } from './options';

/**
 * 跳转至重定向请求
 *
 * @param locationUrl 要重定向的 URL 地址，可以是完整路径，也可以只包含路径地址
 * @param options 请求选项
 * @param config 拷贝的请求选项
 * @param response 响应对象
 * @returns 返回重定向之后的响应结果
 */
export default async function toRedirects(
    locationUrl: string,
    options: RequestOptions,
    config: RequestOptions,
    response: IncomingMessage
) {
    // 当进行重定向时，删除 URL 中已包含的重复部分
    // NOTE 用户名和密码是通过请求头的 `Authorization` 来传递的，代理的是 `Proxy-Authorization`
    deleteOptionsAttr(options, [
        'protocol',
        'hostname',
        'path',
        'port',
        'query',
        'https'
    ]);

    if (!isNullOrUndefined(options.headers)) {
        options.headers = toLowerCaseKey(options.headers);
    }

    // 优先使用请求头的 `Host`，因为 `config.hostname` 有可能是 IP 地址
    const originHost = config.headers?.host ?? config.hostname;

    // 如果不是完整链接地址，例如 `https://xxx.com/login`
    // 则可能重定向的地址只包含路径，比如 `/login`
    if (!/^https?:\/\//.test(locationUrl)) {
        // 如果路径前面没有 `/`，比如 `login`
        if (!locationUrl.startsWith('/')) {
            console.error(
                `[request] 您当前重定向的地址是不规范的 URL，${locationUrl}`
            );
            locationUrl = `/${locationUrl}`;
        }

        // 拼接成完整路径
        locationUrl = `${config.protocol}//${originHost}${locationUrl}`;
    }

    // 对请求头的处理
    try {
        // 如果当前请求的主机名与要重定向的主机名不同，则删除隐私数据
        if (new URL(locationUrl).hostname !== originHost) {
            deleteOptionsAttr(options, ['auth']);
            deleteOptionsAttr(options.headers, ['cookie', 'authorization']);
        }
    } catch {
        throw new TypeError(
            '[request] 重定向请求中给出的链接不是一个合法链接',
            {
                cause: {
                    locationUrl,
                    options,
                    config,
                    response
                }
            }
        );
    }

    // 浏览器会将 POST 请求的 301 和 301 重定向重写为 GET
    // https://tools.ietf.org/html/rfc7231%5C#section-6.4.2
    if (config.method === 'POST' && /^30[12]$/.test(`${response.statusCode}`)) {
        options.method = 'GET';
        deleteOptionsAttr(options.headers, ['content-length', 'content-type']);
    }

    return await request(locationUrl, options);
}

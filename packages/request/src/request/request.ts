import { request as HttpsRequest } from 'https';
import { IncomingMessage, request as HttpRequest } from 'http';
import { stringify, ParsedUrlQueryInput } from 'querystring';

import { format } from '@curong/term';
import { sleepRun } from '@curong/function';
import { toLowerCaseKey } from '@curong/object';
import {
    isFunctionHave,
    isStringHave,
    isObjectHave,
    isNull,
    isZero
} from '@curong/types';

import { commonHeaders } from './headers';
import { isGzipContent, unzipContent, contentTypeCallback } from './content';

import {
    RequestOptions,
    RequestHandler,
    RequestResult
} from '../types/request';

/**
 * 从远程连接获取响应的内容并返回 `Buffer`
 *
 * @param options 参数列表，默认为 `{}`
 *
 * - `hostname` 远程主机名(不包括 `https://`)，比如 `www.xxx.com`
 * - `path` 路径地址，比如 `/xxx/xxx?xx=xx&xx=xx#xx`
 * - `method` 请求方式
 * - `https` 是否使用更加安全的 `https` 发送请求
 * - `port` 端口号
 * - `query` 当前请求的查询字符串对象，会被转换为 `a=b&b=c` 的格式
 * - `body` 当前请求的请求体对象
 * - `delay` 延迟请求时间，单位 `毫秒`
 * - `timeout` 响应超时时间，单位 `毫秒`
 * - `headers` 请求头对象
 *    - `port` 端口号
 *    - `timeout` 响应头超时时间
 *    - `headers` 请求头
 *    - `...` 更多参数
 *
 * @param handlers 回调函数对象
 *
 * - `header` 接收到响应头之后的回调函数，方法签名为:
 *   `(res: IncomingMessage, options: RequestOptions) => true | void;`
 * - `data` 接收到响应体之后的回调函数，方法签名为:
 *   `( chunk: any, res: IncomingMessage, options: RequestOptions ) => true | void;`
 *
 * @throws
 *
 * - 如果 `hostname` 为空，则会抛出异常
 *
 * @example
 *
 * ```javascript
 * const requestOpts: RequestOptions = {
 *     hostname: 'baidu.com',
 *     path: '/',
 *     method: 'GET',
 *     https: true,
 *     query: {
 *         s: 'node.js'
 *     },
 *     headers: {
 *         'Cache-Control': 'no-cache'
 *     },
 *     timeout: 1e3
 * };
 * const ret = await request(requestOpts, {
 *     header(res, _options) {
 *         // 打开网页错误了
 *         if (!/^(2\d{2})|(30[24])$/.test(res.statusCode!.toString())) {
 *             // 返回 `true` 时会关闭连接
 *             return true;
 *         }
 *     },
 *     data(chunk, _res, _options) {
 *         console.log(chunk);
 *     }
 * });
 *
 * // {
 * //     config: {},
 * //     data: Buffer,
 * //     error: null,
 * //     response: IncomingMessage
 * // }
 * console.log(ret);
 * ```
 *
 * @todo
 *
 * - 支持跨域
 * - 支持 `Ajax` 和 `fetch`
 * - 删除 `querystring`，支持 `body` 参数嵌套
 * - 处理响应头，避免连接的状态挂起
 */
export default function request(
    options: RequestOptions,
    handlers: RequestHandler = {}
): Promise<RequestResult> {
    const { https = true, hostname, delay } = options ?? {};

    if (!isStringHave(hostname)) {
        throw format({
            name: 'request',
            message: '主机名错误',
            data: { options, handlers }
        });
    }

    /** 配置参数 */
    options = {
        // @ts-ignore
        hostname,
        path: '/',
        method: 'GET',
        timeout: 2147483647,
        // 如果 `https` 的安全证书不是合法的，则忽略证书验证
        rejectUnauthorized: false,
        ...options,
        headers: toLowerCaseKey({
            Host: hostname,
            Referer: `${https ? 'https' : 'http'}://${hostname}`,
            ...commonHeaders,
            ...options.headers
        })
    };

    if (isObjectHave(options.query)) {
        options.path += `?` + stringify(options.query);
    }

    let buffers: Buffer[] = [];
    const isHeaderFn = isFunctionHave(handlers.header);
    const isDataFn = isFunctionHave(handlers.data);
    const requestFn = https ? HttpsRequest : HttpRequest;
    const ht = contentTypeCallback(options);
    const getF = (resolve: any, reject: any) => {
        /** 发起网络请求 */
        const req = requestFn(options, (res: IncomingMessage) => {
            // 关闭当前当前响应
            const removeListeners = () => {
                req.emit('close');
                res.emit('close');
                req.removeAllListeners();
                res.removeAllListeners();
            };

            /** 创建返回的数据对象 */
            const returns = async (error?: Error) => {
                removeListeners();

                let data = Buffer.concat(buffers);

                if (isGzipContent(res)) {
                    data = await unzipContent(data).catch(error => {
                        throw format({
                            name: 'request',
                            message: 'gzip 解压失败',
                            data: { data, error }
                        });
                    });
                }

                const responseData: RequestResult = {
                    data,
                    response: res,
                    config: options,
                    error: error ?? null
                };

                // 清空缓存
                buffers.length = 0;

                return responseData;
            };

            /** 处理响应头 */
            if (isHeaderFn && handlers.header!(res, options)) {
                return resolve(returns());
            }

            /** 接收响应体 */
            res.on('data', (chunk: Buffer) => {
                if (isDataFn && handlers.data!(chunk, res, options)) {
                    return resolve(returns());
                }

                buffers.push(chunk);
            });

            res.on('end', () => resolve(returns()));
            res.on('error', e => reject(returns(e)));
        });

        const rejectF = (error: Error) => {
            req.emit('close');
            req.removeAllListeners();

            return resolve({ config: options, error });
        };

        req.on('error', e => reject(rejectF(e)));

        // 发送请求体
        do {
            const { body } = options;
            let buffer = null;

            if (isObjectHave(body)) {
                buffer = Buffer.from(ht(body as ParsedUrlQueryInput));
            } else if (isStringHave(body)) {
                buffer = Buffer.from(body);
            }

            if (isNull(buffer) || isZero(buffer.length)) {
                break;
            }

            if (!options.headers) {
                options.headers = {};
            }

            options.headers['content-length'] = buffer.length;
            req.write(buffer);
        } while (false);

        // 结束请求
        req.end();
    };

    return new Promise(async (resolve, reject) => {
        return await sleepRun(() => getF(resolve, reject), delay ?? 0);
    });
}

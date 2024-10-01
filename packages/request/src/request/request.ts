import { IncomingMessage, type ClientRequest } from 'http';

import { delayRun } from '@curong/function';
import { toLowerCaseKey } from '@curong/object';
import {
    isNull,
    isNullOrUndefined,
    isObjectFilled,
    isStringFilled
} from '@curong/types';
import { copy } from '@curong/util';

import type { RequestHandler, RequestOptions, RequestResult } from '../types';

import { handleBody } from './body';
import { pipeDecompressStream } from './content';
import { deleteOptionsAttr, optionsHandler } from './options';

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
 * - `maxRedirects` 最大重定向次数。默认为 `21`
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
 * ```typescript
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
    handlers?: RequestHandler
): Promise<RequestResult>;

/**
 * 从远程连接获取响应的内容并返回 `Buffer`
 *
 * @param url 要请求的 URL 字符串地址或 URL 对象
 * @param options 参数列表，默认为 `{}`
 *
 * - `method` 请求方式
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
 * @example
 *
 * ```typescript
 * const requestOpts: RequestOptions = {
 *     method: 'GET',
 *     // 更多参数会拼接到 URL 的末尾
 *     query: {
 *         s: 'node.js'
 *     },
 *     headers: {
 *         'Cache-Control': 'no-cache'
 *     },
 *     timeout: 1e3
 * };
 * const ret = await request('https://baidu.com/s?wd=1', requestOpts, {
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
    url: string | URL,
    options?: RequestOptions,
    handlers?: RequestHandler
): Promise<RequestResult>;

export default async function request(
    url: any,
    options: any = {},
    handlers: any = {}
): Promise<RequestResult> {
    if (isObjectFilled(url)) {
        handlers = options;
        options = url;
        url = undefined;
    }

    const config = copy(options);

    const requestFn = optionsHandler(url, config);
    const { body, delay, maxRedirects } = config;
    const bodyBuffer: any = await handleBody(body, config);
    deleteOptionsAttr(config, ['body', 'delay', 'maxRedirects']);
    let req: ClientRequest;

    const getF = (resolve: any, reject: any) => {
        /** 发起网络请求 */
        req = requestFn(config, (res: IncomingMessage) => {
            if (req.destroyed) {
                return;
            }

            // 自动跟随重定向。如果请求的 URL 被重定向到另一个 URL，则自动请求新的 URL
            const locationUrl = res.headers.location;

            if (
                // 如果请求头中包含 `location` 属性
                isStringFilled(locationUrl) &&
                // 最大重定向次数大于 `0`
                maxRedirects > 0 &&
                // 是 `300` 的请求头
                /^3\d{2}$/.test(`${res.statusCode}`)
            ) {
                // 销毁当前请求
                req.destroy();

                // 消耗一次重定向请求
                options.maxRedirects = maxRedirects - 1;

                // 对请求头的处理
                const redirectHost = new URL(locationUrl).hostname;

                // 当进行重定向时，删除 URL 中已包含的重复部分
                deleteOptionsAttr(options, [
                    'protocol',
                    'username',
                    'password',
                    'hostname',
                    'path',
                    'port',
                    'query',
                    'https'
                ]);

                if (!isNullOrUndefined(options.headers)) {
                    options.headers = toLowerCaseKey(options.headers);
                }

                // 如果当前请求的主机名与要重定向的主机名不同，则删除隐私数据
                if (!isNull(redirectHost) && redirectHost !== config.hostname) {
                    deleteOptionsAttr(options, ['auth']);
                    deleteOptionsAttr(options.headers, [
                        'cookie',
                        'authorization'
                    ]);
                }

                // 浏览器会将 POST 请求的 301 和 301 重定向重写为 GET
                // https://tools.ietf.org/html/rfc7231%5C#section-6.4.2
                if (
                    config.method === 'POST' &&
                    /^30[12]$/.test(`${res.statusCode}`)
                ) {
                    options.method = 'GET';
                    deleteOptionsAttr(options.headers, [
                        'content-length',
                        'content-type'
                    ]);
                }

                return resolve(request(locationUrl, options));
            }

            const buffers: Buffer[] = [];
            const serialStream = pipeDecompressStream(res);

            /** 创建返回的数据对象 */
            const returns = async (error?: Error) => {
                req.destroy();

                const data = Buffer.concat(buffers);
                const responseData: RequestResult = {
                    data,
                    status: res.statusCode,
                    statusText: res.statusMessage,
                    request: req,
                    response: res,
                    config,
                    error: error ?? null
                };

                // 清空缓存
                buffers.length = 0;

                return responseData;
            };

            /** 处理响应头 */
            if (handlers.header && handlers.header(res, config)) {
                return resolve(returns());
            }

            /** 接收响应体 */
            serialStream.on('data', (chunk: Buffer) => {
                if (handlers.data && handlers.data(chunk, res, config)) {
                    return resolve(returns());
                }

                buffers.push(chunk);
            });

            serialStream.on('end', () => resolve(returns()));
            serialStream.on('error', e => reject(returns(e)));
        });

        req.on('timeout', () => {
            // 当 `HTTP` 请求对象 (`http.IncomingMessage` 或 `http.ClientRequest)` 超时时，`timeout` 事件会被触发
            // 触发 `timeout` 事件后，默认情况下并不会自动销毁请求对象，也不会关闭连接
            // 超时事件只是告诉你请求已经超过了设定的时间限制，需要开发者手动决定如何处理
            // 如果你希望在超时后立即关闭连接并释放相关资源，需要手动调用 `req.destroy()` 来销毁请求对象
            req.destroy();

            reject(
                new Error(`[request] 当前请求已超时`, {
                    cause: {
                        request: req,
                        config
                    }
                })
            );
        });

        req.on('error', (error: any) => {
            reject(
                new Error('[request] 当前请求出错', {
                    cause: { request: req, config, error }
                })
            );
        });

        // 结束请求
        //
        // @note 这里不要用 `req.write()` 来发送请求体
        //  `req.write()` 异步的，有可能请求体还没有发送完，就走了 `req.end()`
        //  从而造成请求失败，或返回的结果非预期的值
        req.end(body ? bodyBuffer : undefined);
    };

    return await delayRun(delay ?? 0, () => {
        return new Promise((resolve, reject) => getF(resolve, reject));
    });
}

import { IncomingMessage, type ClientRequest } from 'http';

import { delayRun, retry, timeoutOr } from '@curong/function';
import { isObjectFilled, isStringFilled } from '@curong/types';
import { copy } from '@curong/util';

import type { RequestHandler, RequestOptions, RequestResult } from '../types';

import { handleBody } from './functions/body';
import { pipeDecompressStream } from './functions/content';
import { deleteOptionsAttr, optionsHandler } from './functions/options';
import toRedirects from './functions/toRedirects';

/**
 * 从远程连接获取响应的内容并返回 `Buffer`
 *
 * @param options 参数列表，默认为 `{}`
 *  - `hostname` 远程主机名(不包括 `https://`)，比如 `www.xxx.com`
 *  - `path` 路径地址，比如 `/xxx/xxx?xx=xx&xx=xx#xx`
 *  - `method` 请求方式
 *  - `https` 是否使用更加安全的 `https` 发送请求
 *  - `port` 端口号
 *  - `query` 当前请求的查询字符串对象，会被转换为 `a=b&b=c` 的格式
 *  - `body` 当前请求的请求体对象
 *  - `timeout` 连接超时时间，单位 `毫秒`
 *  - `maxTime` 最大请求时间，单位 `毫秒`。默认为 `2147483647`
 *  - `delay` 延迟请求时间，单位 `毫秒`。默认为 `0`
 *  - `maxRedirects` 最大重定向次数。默认为 `21`
 *  - `errorRetry` 当请求抛出错误时 (比如请求失败、请求超时等)，要重试的次数。默认为 `0`，即不重试
 *  - `headers` 请求头对象
 *    - `port` 端口号
 *    - `timeout` 响应头超时时间
 *    - `headers` 请求头
 *    - `...` 更多参数
 * @param handlers 回调函数对象
 *  - `header` 接收到响应头之后的回调函数，方法签名为:
 *    `(res: IncomingMessage, options: RequestOptions) => true | void;`
 *  - `data` 接收到响应体之后的回调函数，方法签名为:
 *    `( chunk: any, res: IncomingMessage, options: RequestOptions ) => true | void;`
 * @throws
 *  - 如果 `hostname` 为空，则会抛出异常
 * @note
 *  - 为了防止隐私泄漏，如果重定向的地址与当前域名不相同，则会删除 `auth`
 *  - 如果所重定向的地址传递了不规范的路径，则可能导致不预期的结果，需要在请求后自行验证结果是否符合预期
 * @example
 *
 * ### 常规请求
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
 * ### 发送代理请求
 *
 * - 将 `hostname` 设置为要代理的主机地址，例如 `127.0.0.1`
 * - `port` 可能也需要设置，例如 `1080`，默认为 `443`
 * - `https` 可能也需要设置，例如 `false`，默认为 `true`
 * - 将 `headers.host` 设置为真实的主机地址，例如 `translate.google.com`
 * - 支持操作系统环境变量，比如 `HTTP_PROXY`、`HTTPS_PROXY`、`NO_PROXY` ... 的方法:
 *   - 通过 [proxy-from-env](https://www.npmjs.com/package/proxy-from-env) 来获取代理地址
 *   - 通过 [proxy-agent](https://www.npmjs.com/package/proxy-agent) 来创建一个 `Agent`
 *
 * ```typescript
 * const config: RequestOptions = {
 *     hostname: '216.239.32.40',
 *     path: '/translate_a/t?client=dict-chrome-ex&sl=en&tl=zh&dt=t&q=I%20love%20you',
 *     headers: {
 *         Host: 'translate.google.com'
 *     },
 *     errorRetry: 3,
 *     maxTime: 6000,
 *     timeout: 3000
 * };
 *
 * const ret = await request(config).catch(e => {
 *     console.log(e);
 * });
 *
 * console.log(ret); // "['我爱你']"
 * ```
 *
 * @todo
 *  - 支持跨域
 *  - 支持 `Ajax` 和 `fetch`
 *  - 删除 `querystring`，支持 `body` 参数嵌套
 *  - 处理响应头，避免连接的状态挂起
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
 *  - `method` 请求方式
 *  - `query` 当前请求的查询字符串对象，会被转换为 `a=b&b=c` 的格式
 *  - `body` 当前请求的请求体对象
 *  - `timeout` 连接超时时间，单位 `毫秒`
 *  - `maxTime` 最大请求时间，单位 `毫秒`。默认为 `2147483647`
 *  - `delay` 延迟请求时间，单位 `毫秒`。默认为 `0`
 *  - `maxRedirects` 最大重定向次数。默认为 `21`
 *  - `errorRetry` 当请求抛出错误时 (比如请求失败、请求超时等)，要重试的次数。默认为 `0`，即不重试
 *  - `headers` 请求头对象
 *    - `port` 端口号
 *    - `timeout` 响应头超时时间
 *    - `headers` 请求头
 *    - `...` 更多参数
 * @param handlers 回调函数对象
 *  - `header` 接收到响应头之后的回调函数，方法签名为:
 *    `(res: IncomingMessage, options: RequestOptions) => true | void;`
 *  - `data` 接收到响应体之后的回调函数，方法签名为:
 *    `( chunk: any, res: IncomingMessage, options: RequestOptions ) => true | void;`
 * @throws
 *  - 如果 `hostname` 为空，则会抛出异常
 * @note
 *  - 为了防止隐私泄漏，如果重定向的地址与当前域名不相同，则会删除 `auth`
 *  - 如果所重定向的地址传递了不规范的路径，则可能导致不预期的结果，需要在请求后自行验证结果是否符合预期
 * @example
 *
 * ### 常规请求
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
 * ### 发送代理请求
 *
 * - 将 `hostname` 设置为要代理的主机地址，例如 `127.0.0.1`
 * - `port` 可能也需要设置，例如 `1080`，默认为 `443`
 * - `https` 可能也需要设置，例如 `false`，默认为 `true`
 * - 将 `headers.host` 设置为真实的主机地址，例如 `translate.google.com`
 * - 支持操作系统环境变量，比如 `HTTP_PROXY`、`HTTPS_PROXY`、`NO_PROXY` ... 的方法:
 *   - 通过 [proxy-from-env](https://www.npmjs.com/package/proxy-from-env) 来获取代理地址
 *   - 通过 [proxy-agent](https://www.npmjs.com/package/proxy-agent) 来创建一个 `Agent`
 *
 * ```typescript
 * const proxyUrl = 'https://216.239.32.40/translate_a/t?client=dict-chrome-ex&sl=en&tl=zh&dt=t&q=I%20love%20you';
 *
 * const config: RequestOptions = {
 *     headers: {
 *         Host: 'translate.google.com'
 *     },
 *     errorRetry: 3,
 *     maxTime: 6000,
 *     timeout: 3000
 * };
 *
 * const ret = await request(proxyUrl, config).catch(e => {
 *     console.log(e);
 * });
 *
 * console.log(ret); // "['我爱你']"
 * ```
 *
 * @todo
 *  - 支持跨域
 *  - 支持 `Ajax` 和 `fetch`
 *  - 删除 `querystring`，支持 `body` 参数嵌套
 *  - 处理响应头，避免连接的状态挂起
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
    const { body, delay, maxTime, maxRedirects, errorRetry } = config;
    const bodyBuffer: any = await handleBody(body, config);
    deleteOptionsAttr(config, [
        'body',
        'delay',
        'maxTime',
        'maxRedirects',
        'errorRetry'
    ]);
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

                return resolve(toRedirects(locationUrl, options, config, res));
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
            if (handlers.header?.(res, config)) {
                return resolve(returns());
            }

            /** 接收响应体 */
            serialStream.on('data', (chunk: Buffer) => {
                if (handlers.data?.(chunk, res, config)) {
                    return resolve(returns());
                }

                buffers.push(chunk);
            });

            /** 处理套接字错误 */
            serialStream.on('error', error => {
                reject(
                    new Error('[request] 套接字错误', {
                        cause: {
                            request: req,
                            config,
                            error
                        }
                    })
                );
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
                new Error(`[request] 请求已超时`, {
                    cause: {
                        request: req,
                        config
                    }
                })
            );
        });

        req.on('error', (error: any) => {
            reject(
                new Error('[request] 请求出错', {
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

    return retry(errorRetry ?? 0, () => {
        return delayRun(delay ?? 0, () => {
            return timeoutOr(
                maxTime ?? 2147483647,
                () => new Promise((resolve, reject) => getF(resolve, reject)),
                () => {
                    req.destroy();

                    return Promise.reject(
                        new Error('[request] 当前请求已超出最大请求时间', {
                            cause: { config }
                        })
                    );
                }
            );
        });
    });
}

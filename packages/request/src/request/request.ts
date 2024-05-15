import { IncomingMessage } from 'http';

import { copy } from '@curong/util';
import { sleepRun } from '@curong/function';
import { isObjectHave } from '@curong/types';

import { handleBody } from './body';
import { pipeDecompressStream } from './content';
import { deleteOptionsAttr, optionsHandler } from './options';

import type { RequestOptions, RequestHandler, RequestResult } from '../types';

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
 * ```javascript
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
    if (isObjectHave(url)) {
        handlers = options;
        options = url;
        url = undefined;
    }

    options = copy(options);

    const requestFn = optionsHandler(url, options);
    const { body, delay, timeout } = options;
    const bodyBuffer: any = await handleBody(body, options);
    deleteOptionsAttr(options, ['body', 'delay']);

    const getF = (resolve: any, reject: any) => {
        /** 发起网络请求 */
        const req = requestFn(options, (res: IncomingMessage) => {
            if (req.destroyed) {
                return;
            }

            const buffers: Buffer[] = [];
            const serialStream = pipeDecompressStream(res);

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

                const data = Buffer.concat(buffers);
                const responseData: RequestResult = {
                    data,
                    status: res.statusCode,
                    statusText: res.statusMessage,
                    request: req,
                    response: res,
                    config: options,
                    error: error ?? null
                };

                // 清空缓存
                buffers.length = 0;

                return responseData;
            };

            /** 处理响应头 */
            if (handlers.header && handlers.header!(res, options)) {
                return resolve(returns());
            }

            /** 接收响应体 */
            serialStream.on('data', (chunk: Buffer) => {
                if (handlers.data && handlers.data!(chunk, res, options)) {
                    return resolve(returns());
                }

                buffers.push(chunk);
            });

            serialStream.on('end', () => resolve(returns()));
            serialStream.on('error', e => reject(returns(e)));
        });

        req.setTimeout(timeout, () => {
            req.abort();

            reject({
                name: 'request',
                message: `当前请求已超时 ${timeout} ms`,
                request: req,
                config: options
            });
        });

        req.on('error', error => {
            req.emit('close');
            req.removeAllListeners();

            reject({ request: req, config: options, error });
        });

        // 结束请求
        //
        // @note 这里不要用 `req.write()` 来发送请求体
        //  `req.write()` 异步的，有可能请求体还没有发送完，就走了 `req.end()`
        //  从而造成请求失败，或返回的结果非预期的值
        req.end(body ? bodyBuffer : void 0);
    };

    return new Promise(async (resolve, reject) => {
        return await sleepRun(() => getF(resolve, reject), delay ?? 0);
    });
}

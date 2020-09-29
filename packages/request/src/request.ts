import { request as HttpsRequest } from 'https';
import { IncomingMessage, request as HttpRequest } from 'http';
import { stringify, ParsedUrlQueryInput } from 'querystring';

import { format } from '@curong/term';
import { sleepRun } from '@curong/function';
import {
    isFunctionHave,
    isStringHave,
    isObjectHave,
    isNumberHave,
    isNull
} from '@curong/types';

import { RequestOptions, RequestHandler, RequestResult } from './types/request';

/**
 * 从远程连接获取响应的内容并返回 `Buffer`
 *
 * @param options 参数列表
 *
 * - `hostname` 远程主机名(不包括 `https://`)，比如 `www.xxx.com`
 * - `path` 路径地址，比如 `/xxx/xxx?xx=xx&xx=xx#xx`
 * - `method` 请求方式
 * - `port` 端口号
 * - `query` 当前请求的查询字符串对象，会被转换为 `a=b&b=c` 的格式
 * - `body` 当前请求的请求体对象，会被转换为 `a=b&b=c` 的格式
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
 * @todo
 * - 支持跨域
 * - 支持 `Ajax` 和 `fetch`
 * - 删除 `querystring`，支持 `body` 参数嵌套
 * - 处理响应头，避免连接的状态挂起
 */
export default function request(
    options: RequestOptions,
    handlers: RequestHandler = {}
): Promise<RequestResult> {
    const { https = true, hostname, delay } = options || {};

    if (!isStringHave(hostname)) {
        throw format({
            name: 'request',
            message: '主机名错误',
            data: {
                options,
                handlers
            }
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
        headers: {
            dnt: 1,
            host: hostname,
            connection: 'keep-alive',
            cookie: '',
            referer: `${https ? 'https' : 'http'}://${hostname}`,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            'cache-control': 'max-age=0',
            'upgrade-insecure-requests': 1,
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'transfer-encoding': 'chunked',
            'x-requested-with': 'XMLHttpRequest',
            'user-agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
            accept:
                'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            ...options.headers
        }
    };

    if (isObjectHave(options.query)) {
        options.path += `?` + stringify(options.query);
    }

    let buffers: Buffer[] = [];
    const isHeaderFn = isFunctionHave(handlers.header);
    const isDataFn = isFunctionHave(handlers.data);
    const requestFn = https ? HttpsRequest : HttpRequest;
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
            const returns = (error?: Error) => {
                removeListeners();

                const responseData: RequestResult = {
                    data: Buffer.concat(buffers),
                    response: res,
                    config: options,
                    error: error || null
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
                buffer = Buffer.from(stringify(body as ParsedUrlQueryInput));
            } else if (isStringHave(body)) {
                buffer = Buffer.from(body);
            }

            if (isNull(buffer) || buffer.length === 0) {
                break;
            }

            if (!options.headers) {
                options.headers = {};
            }

            options.headers['Content-Length'] = buffer.length;
            req.write(buffer);
        } while (false);

        // 结束请求
        req.end();
    };

    return new Promise(async (resolve, reject) => {
        return await sleepRun(
            () => getF(resolve, reject),
            isNumberHave(delay) ? delay : 750
        );
    });
}

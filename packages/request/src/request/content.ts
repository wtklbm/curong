import { unzip as _unzip } from 'zlib';
import { IncomingMessage } from 'http';
import { stringify } from 'querystring';

import { RequestOptions } from '../types';

/** 是不是 `gzip` 格式的内容 */
export function isGzipContent(res: IncomingMessage) {
    return (res.headers['content-encoding'] ?? '').toLowerCase() === 'gzip';
}

/** 对 `gzip` 格式的内容进行解压 */
export function unzipContent(buffer: Buffer) {
    return new Promise<Buffer>((resolve, reject) => {
        _unzip(buffer, (e, data) => (e ? reject(e) : resolve(data)));
    });
}

/** 是不是表单类型的内容 */
export const isFormUrlencoded = (type: string) => {
    return type.includes('application/x-www-form-urlencoded');
};

/** 是不是 `json` 类型的内容 */
export const isJson = (type: string) => {
    return type.includes('application/json');
};

/**
 * 获取处理 `content-type` 的函数
 *
 * @param options 请求配置选项
 * @returns 返回处理 `content-type` 的函数
 */
export function contentTypeCallback(options: RequestOptions) {
    const contentType = (options.headers!['content-type'] ?? '') as string;

    let handleFn: (v: any) => any;

    if (isFormUrlencoded(contentType)) {
        handleFn = stringify;
    } else if (isJson(contentType)) {
        handleFn = JSON.stringify;
    } else {
        handleFn = v => v;
    }

    return handleFn;
}

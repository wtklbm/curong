import {
    isArrayBuffer,
    isBuffer,
    isTypeofObject,
    isUint8Array
} from '@curong/types';

import type { RequestOptions } from '../types';
import { contentTypeCallback } from './content';

export async function handleBody(
    body: RequestOptions['body'],
    options: RequestOptions
) {
    let bodyBuffer: any;

    if (body) {
        if (isArrayBuffer(body)) {
            bodyBuffer = new Uint8Array(body);
        } else if (isBuffer(body) || isUint8Array(body)) {
            bodyBuffer = body;
        } else if (isTypeofObject(body)) {
            bodyBuffer = await contentTypeCallback(options)(body);
        } else {
            bodyBuffer = String(body);
        }

        // 转换为 `Buffer`
        bodyBuffer = Buffer.from(bodyBuffer);

        // 默认情况下，`Content-Length` 的值的计算必须正确
        // 如果不想计算，可以使用 `Transfer-Encoding: “chunk”` 并修改请求逻辑来创建分块压缩的请求
        options.headers = options.headers ?? {};
        options.headers['content-length'] = bodyBuffer.length;
    }

    return bodyBuffer;
}

import { IncomingMessage } from 'http';
import { stringify } from 'querystring';
import { constants, createBrotliDecompress, createUnzip } from 'zlib';
import { finished, pipeline, Transform, TransformCallback } from 'stream';
import { isStringHave, isFormData } from '@curong/types';

import { objectToFormData, formDataToBuffer } from './formData';

import { RequestOptions } from '../types';

export function pipeDecompressStream(res: IncomingMessage): IncomingMessage {
    const encoding = (res.headers['content-encoding'] ?? '').toLowerCase();

    if (!isStringHave(encoding)) {
        return res;
    }

    // 删除不必要的头
    if (res.method === 'HEAD' || res.statusCode === 204) {
        delete res.headers['content-encoding'];
    }

    const streams: NodeJS.ReadableStream[] = [res];
    const zlibOptions = {
        flush: constants.Z_SYNC_FLUSH,
        finishFlush: constants.Z_SYNC_FLUSH
    };
    const AddDeflateHeaderStream = class extends Transform {
        __transform(
            chunk: any,
            _encoding: BufferEncoding,
            callback: TransformCallback
        ) {
            this.push(chunk);
            callback();
        }

        _transform(
            chunk: any,
            encoding: BufferEncoding,
            callback: TransformCallback
        ) {
            if (chunk.length !== 0) {
                this._transform = this.__transform;

                if (chunk[0] !== 0x78) {
                    const header = Buffer.alloc(2);
                    header[0] = 0x78;
                    header[1] = 0x9c;
                    this.push(header, encoding);
                }
            }

            this.__transform(chunk, encoding, callback);
        }
    };

    switch (encoding) {
        case 'gzip':
        case 'x-gzip':
        case 'compress':
        case 'x-compress':
            // 内容已经被完全解压，所以删除它
            delete res.headers['content-encoding'];
            streams.push(createUnzip(zlibOptions));
            break;

        case 'deflate':
            streams.push(new AddDeflateHeaderStream());
            streams.push(createUnzip(zlibOptions));
            delete res.headers['content-encoding'];
            break;

        case 'br':
            streams.push(
                createBrotliDecompress({
                    flush: constants.BROTLI_OPERATION_FLUSH,
                    finishFlush: constants.BROTLI_OPERATION_FLUSH
                })
            );
            delete res.headers['content-encoding'];
            break;
    }

    const responseStream =
        streams.length > 1 ? pipeline(streams, () => {}) : streams[0];
    const offListeners: () => void = finished(responseStream, () =>
        offListeners()
    );

    return responseStream as IncomingMessage;
}

/** 是不是表单类型的内容 */
const isFormUrlencodedType = (type: string) => {
    return type.includes('application/x-www-form-urlencoded');
};

/** 是不是 `json` 类型的内容 */
const isJsonType = (type: string) => {
    return type.includes('application/json');
};

/** 是不是 `formData` 类型的内容 */
const isFormDataType = (type: string) => {
    return type.includes('multipart/form-data');
};

/**
 * 获取处理 `content-type` 的函数
 *
 * @param options 请求配置选项
 * @returns 返回处理 `content-type` 的函数
 */
export function contentTypeCallback(options: RequestOptions) {
    const headers = options.headers;

    if (headers) {
        const contentType = (headers['content-type'] ??
            headers['Content-Type'] ??
            '') as string;

        if (isFormUrlencodedType(contentType)) {
            return stringify;
        }

        if (isJsonType(contentType)) {
            return JSON.stringify;
        }

        if (isFormDataType(contentType)) {
            return async (body: Record<PropertyKey, any> | FormData) => {
                if (!isFormData(body)) {
                    body = objectToFormData(body);
                }

                return await formDataToBuffer(body as FormData, headers => {
                    options.headers = { ...options.headers, ...headers };
                });
            };
        }
    }

    return (v: any) => v;
}

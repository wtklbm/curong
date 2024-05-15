import { ParsedUrlQueryInput } from 'querystring';
import { request as HttpRequest } from 'http';
import { request as HttpsRequest } from 'https';

import { format, printInfo } from '@curong/term';
import { toLowerCaseKey } from '@curong/object';
import {
    isObjectHave,
    isStringHave,
    isNullOrUndefined,
    isArguments,
    isTypeofObject,
    isArray,
    isDate,
    isObject
} from '@curong/types';

import { commonHeaders } from './headers';

import type { Methods, RequestOptions } from '../types';

const validationParameters = (args: Record<PropertyKey, any>) => {
    for (const [k, v] of Object.entries(args)) {
        if (isNullOrUndefined(v)) {
            throw format({
                name: 'validationParameters',
                message: `参数错误，${k} 不能为空`,
                data: { k }
            });
        }
    }
};

const joinUrlQuery = (url: string, params: Record<string | number, any>) => {
    url = url.trim();

    if (!params) {
        return url;
    }

    const parts: string[] = [];
    const forEach = (
        obj: Record<string | number, any>,
        fn: (value: any, index: string | number, type: any) => any
    ) => {
        if (isNullOrUndefined(obj)) {
            return;
        }

        const isArrayLike = isArray(obj) || isArguments(obj);

        if (!isTypeofObject(obj) && !isArrayLike) {
            obj = [obj];
        }

        if (isArrayLike) {
            for (let i = 0, l = obj.length; i < l; i++) {
                fn.call(null, obj[i], i, obj);
            }

            return;
        }

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    };

    // `query-string` 的拼接。拼接后的内容将以 `?` 传参的方式放在 URL 的末尾
    forEach(params, function (val, key) {
        if (isNullOrUndefined(val)) {
            return;
        }

        if (isArray(val)) {
            // 假设有一个数组 `a`，其值为 `[ 1, 2, 3 ]`：
            //  - `a=1&a=2&a=3`: 默认的拼接行为，和 `Node.js` 中的 `stringify` 方法的效果是一样的
            //  - `a[]=1&a[]=2&a[]=3`: 特殊拼接方式，并不是所有服务器都支持
            //  - 有关更多内容，可以看看名为 `querystring` 的第三方库
            // `a = [1, 2]` ==> `a[]=1&a[]=2`
            //key += '[]';
        }

        if (!isArray(val)) {
            val = [val];
        }

        const encode = (val: string | number) => {
            return encodeURIComponent(val)
                .replace(/%20/g, '+')
                .replace(/%24/g, '$')
                .replace(/%2C/gi, ',')
                .replace(/%3A/gi, ':')
                .replace(/%40/gi, '@')
                .replace(/%5B/gi, '[')
                .replace(/%5D/gi, ']');
        };

        forEach(val, function (v) {
            if (isDate(v)) {
                v = v.toISOString();
            } else if (isObject(v)) {
                v = JSON.stringify(v);
            }

            parts.push(encode(key) + '=' + encode(v));
        });
    });

    if (parts.length > 0) {
        url += (url.includes('?') ? '&' : '?') + parts.join('&');
    }

    return url;
};

const getPath = (path: string, query?: ParsedUrlQueryInput) => {
    path = path.trim();

    if (isObjectHave(query)) {
        path = joinUrlQuery(path, query);
    }

    return path;
};

export const deleteOptionsAttr = <T extends Record<PropertyKey, any>>(
    options: T,
    deleteKeys: Array<keyof T>
): void => {
    deleteKeys.forEach(key => Reflect.deleteProperty(options, key));
};

export const optionsHandler = (
    url: string | URL | undefined,
    options: RequestOptions = {}
) => {
    // 默认是 `GET` 请求
    // 进行大写转换，保证后续不会出现隐式问题
    options.method = (options.method ?? 'GET').toUpperCase() as Methods;

    // 永远不要超时
    options.timeout = options.timeout ?? 2147483647;

    // 如果 `https` 的安全证书不是合法的，则忽略证书验证
    options.rejectUnauthorized = options.rejectUnauthorized ?? false;

    // 添加通用请求头
    options.headers = toLowerCaseKey({ ...commonHeaders, ...options.headers });

    if (isStringHave(url)) {
        url = new URL(url);
    }

    if (url instanceof URL) {
        let { hostname, pathname: path, search, port, origin, protocol } = url;

        if (options.hostname) {
            printInfo(
                '[optionsHandler] 您传递了 hostname 选项，将替换 URL 中的 hostname 部分'
            );
        }

        if (options.path) {
            printInfo(
                '[optionsHandler] 您传递了 path 选项，将替换 URL 中的 path 部分'
            );
        }

        validationParameters({ hostname, path });
        options.hostname = options.hostname ?? hostname;
        options.path = getPath((options.path ?? path) + search, options.query);
        port && (options.port = +port);
        options.headers = toLowerCaseKey({
            Host: hostname,
            Origin: origin,
            Referer: origin, // 后面不要加 `/` 了
            ...options.headers
        });

        return protocol === 'https:' ? HttpsRequest : HttpRequest;
    }

    const { hostname, path = '/', https = true, query } = options;
    const origin = `${https ? 'https' : 'http'}://${hostname}`;

    deleteOptionsAttr(options, ['https', 'query']);
    validationParameters({ hostname, path });

    options.hostname = hostname;
    options.path = getPath(path!, query);
    options.headers = toLowerCaseKey({
        Host: hostname,
        Origin: origin,
        Referer: origin, // 后面不要加 `/` 了
        ...options.headers
    });

    return https ? HttpsRequest : HttpRequest;
};

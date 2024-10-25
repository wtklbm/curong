import { request as HttpRequest } from 'http';
import { request as HttpsRequest } from 'https';
import { ParsedUrlQueryInput } from 'querystring';

import { toLowerCaseKey } from '@curong/object';
import {
    hasOwnProperty,
    isArguments,
    isArray,
    isDate,
    isNullOrUndefined,
    isObject,
    isObjectFilled,
    isStringFilled,
    isTrue,
    isTypeofObject
} from '@curong/types';

import type { Methods, RequestOptions } from '../types';

import { commonHeaders } from './headers';

const validationParameters = (args: Record<PropertyKey, any>) => {
    for (const [k, v] of Object.entries(args)) {
        if (isNullOrUndefined(v)) {
            throw new TypeError(`[validationParameters] 参数 ${k} 不能为空`, {
                cause: { args }
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
            if (hasOwnProperty(obj, key)) {
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

const getPath = (path?: string, query?: ParsedUrlQueryInput) => {
    if (!isStringFilled(path)) {
        return '/';
    }

    path = path.trim();

    if (isObjectFilled(query)) {
        path = joinUrlQuery(path, query);
    }

    return path;
};

export const deleteOptionsAttr = <T extends Record<PropertyKey, any>>(
    options: T | undefined | null,
    deleteKeys: Array<keyof T>
): void => {
    if (!isNullOrUndefined(options)) {
        deleteKeys.forEach(key => Reflect.deleteProperty(options, key));
    }
};

/**
 * 进行数据整合，根据选项替换 URL 中的内容
 *
 * @param baseUrl 基本的 URL
 * @param options 请求选项
 */
const urlToParams = (baseUrl: string, options: RequestOptions) => {
    let urlParams;

    try {
        urlParams = new URL(baseUrl);
    } catch {
        throw new TypeError(
            `[urlToParams] baseUrl 不是一个合法链接: ${baseUrl}`
        );
    }

    const {
        protocol,
        username,
        password,
        hostname,
        pathname: path,
        port,
        search
    } = urlParams;

    options.https ??= protocol === 'https:';
    options.hostname ??= hostname;
    options.path = options.query // 如果传递空对象也是 `true`
        ? getPath(options.path ?? path, options.query)
        : getPath((options.path ?? path) + search);
    Reflect.deleteProperty(options, 'query'); // 删除它，防止后续重复操作
    options.port ??= port ? +port : undefined;
    options.auth ??=
        username && password ? `${username}:${password}` : undefined;
};

export const optionsHandler = (
    baseUrl: string | URL | undefined,
    options: RequestOptions = {}
) => {
    // 默认是 `GET` 请求
    // 进行大写转换，保证后续不会出现隐式问题
    options.method = (options.method ?? 'GET').toUpperCase() as Methods;

    // 设置最大重定向次数
    options.maxRedirects = options.maxRedirects ?? 21;

    // 如果 `https` 的安全证书不是合法的，则忽略证书验证
    options.rejectUnauthorized = options.rejectUnauthorized ?? false;

    // 添加通用请求头
    options.headers = toLowerCaseKey({ ...commonHeaders, ...options.headers });

    if (isStringFilled(baseUrl)) {
        urlToParams(baseUrl, options);
    }

    const { hostname, path = '/', https = true, query } = options;
    // `hostname` 有可能是 IP 地址，这时候就要看看 `options.headers.host` 有没有值了
    const protocol = https ? 'https:' : 'http:';
    const origin = `${protocol}//${options.headers.host ?? hostname}`;

    deleteOptionsAttr(options, ['https', 'query']);
    validationParameters({ hostname, path });

    options.protocol = protocol;
    options.path = getPath(path, query);
    options.headers.host ??= hostname;
    options.headers.origin ??= origin;
    // 可包含完整的 URL 路径（包括协议、主机名、端口、路径等），后面不要加 `/` 了
    options.headers.referer ??= origin;

    return isTrue(https) ? HttpsRequest : HttpRequest;
};

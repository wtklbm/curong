import { RequestOptions as _RequestOptions } from 'https';
import { ClientRequest, IncomingMessage } from 'http';
import { ParsedUrlQueryInput } from 'querystring';

/** 请求方法 */
export type Methods =
    | 'get'
    | 'GET'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'delete'
    | 'DELETE'
    | 'head'
    | 'HEAD'
    | 'patch'
    | 'PATCH'
    | 'options'
    | 'OPTIONS'
    | 'trace'
    | 'TRACE'
    | 'connect'
    | 'CONNECT'
    | 'link'
    | 'LINK'
    | 'unlink'
    | 'UNLINK';

/** 配置参数 */
export type RequestOptions = _RequestOptions & {
    /** 是否使用更加安全的 `https` 发送请求 */
    https?: boolean;

    /** 主机地址 */
    hostname?: string;

    /** 主机路径 */
    path?: string;

    /** 响应超时时间，单位 `毫秒` */
    timeout?: number;

    /** 请求头字段 */
    headers?: _RequestOptions['headers'];

    /** 请求方法 */
    method?: Methods;

    /** 端口号 */
    port?: number;

    /** 当前请求的查询字符串对象，会被追加到 URL 的末尾 */
    query?: ParsedUrlQueryInput;

    /** 当前请求的请求体对象 */
    body?: ParsedUrlQueryInput | string;

    /** 延迟请求时间，单位 `毫秒` */
    delay?: number;
};

/** 返回结果 */
export type RequestResult = {
    /* 服务器响应的 HTTP 状态代码 */
    status?: number;

    /* 服务器响应的 HTTP 状态消息 */
    statusText?: string;

    /** 响应的数据 */
    data: Buffer;

    /** 请求对象实例 */
    request: ClientRequest;

    /** 响应对象实例 */
    response: IncomingMessage;

    /** 当前响应的配置对象 */
    config: RequestOptions;

    /** 响应失败的原因 */
    error: Error | null;
};

/** 回调函数对象 */
export type RequestHandler = {
    /**
     * 接收到响应头之后的回调函数
     *
     * 1. 判断 `res.statusCode` 状态码是不是以2开头的数字，或者是不是 `302` 或 `304`
     *
     *  ```javascript
     *  // 打开网页错误了
     *  if (!/^(2\d{2})|(30[24])$/.test(statusCode.toString())) {
     *      // 返回 `true` 时会关闭连接
     *      return true;
     *  }
     *  ```
     *
     * 2. 将 `res.headers['set-cookie']` 中的数据持久化为新的 `cookie` 对象
     *
     * @returns 如果返回了 `true`， 那么就意味着遇到了 `404` 或者其他情况，可以关闭连接了。
     * 如果没有返回值那么就会继续请求响应体直到连接关闭为止。
     */
    header?: (res: IncomingMessage, options: RequestOptions) => true | void;

    /**
     * 接收到响应体之后的回调函数
     *
     * 1. 通过 `/; /g` 正则截取 `res.headers['content-type']`，
     *    得到截取的结果后根据 `mime` 和 `encoding` 编码，使用 `iconv.decode` 进行文本的转义。
     *
     *  ```javascript
     *  // 验证 `encoding` 编码，使用 `res.headers['content-type']` 截取。
     *  // 在使用属性之前需要先验证一下该属性是否存在。
     *  if (res.headers['content-type']) {
     *      // 也有可能不存在 `; `
     *      if (res.headers['content-type'].includes('; ')) {
     *          const [ mime, encoding ] = res.headers['content-type'];
     *          console.log(mime, encoding);
     *      } else {
     *          // ...
     *      }
     *  }
     *
     *  // 如果找不到 `content-type` 属性，则使用下面的正则验证网页内容中的 `<meta>` 标签。
     *  const typeReg = /<meta[^>]*?charset=["' ]*([^"'> ]+)["' ]*[^>]*?>/i;
     *  ```
     *
     * 2. 可以进行一些其他的处理
     *
     * @returns 如果返回了 `true`， 那么就意味着只需要从远程中获取一部分数据，可以关闭连接了。
     * 如果没有返回值那么就会继续请求响应体直到连接关闭为止。
     */
    data?: (
        chunk: any,
        res: IncomingMessage,
        options: RequestOptions
    ) => true | void;
};

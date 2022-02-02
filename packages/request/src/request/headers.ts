/** 公共请求头对象 */
export const commonHeaders = {
    Connection: 'keep-alive',
    DNT: 1,
    Pragma: 'no-cache',
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    Accept: 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': 1,
    'Transfer-Encoding': 'chunked',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36'
};

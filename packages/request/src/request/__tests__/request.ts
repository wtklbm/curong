import { request } from '..';

describe('@curong/request/createWithNull', () => {
    test('测试1', async () => {
        const data = (await request({ hostname: 'baidu.com' })).data.toString();
        expect(data.includes('百度一下')).toBe(true);
    });

    test('测试2', async () => {
        let data = (
            await request(
                {
                    hostname: 'baidu.com'
                },
                {
                    header(res, options) {
                        expect(res.statusCode).toBe(200);
                        expect(options.headers?.host).toBe('baidu.com');
                        expect(options.headers?.origin).toBe(
                            'http://baidu.com'
                        );
                        expect(options.headers?.referer).toBe(
                            'http://baidu.com'
                        );
                    },
                    data(_chunk, _res, _options) {}
                }
            )
        ).data.toString();
        expect(data.includes('百度一下')).toBe(true);
    });

    test('测试3', async () => {
        // 没有重定向
        let data = (
            await request('https://baidu.com', { maxRedirects: 0 })
        ).data.toString();
        expect(data.includes('302 Found')).toBe(true);

        // 自动重定向
        data = (await request('http://baidu.com/')).data.toString();
        expect(data.includes('百度一下')).toBe(true);

        data = (await request('https://baidu.com/')).data.toString();
        expect(data.includes('百度一下')).toBe(true);

        // 301 和 302 的 POST 请求
        data = (
            await request('https://baidu.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'json',
                    'Content-Length': '122'
                }
            })
        ).data.toString();
        expect(data.includes('百度一下')).toBe(true);

        // 删除隐私数据
        data = (
            await request('https://baidu.com/', {
                headers: {
                    Cookie: 'xxx',
                    Authorization: 'xxx'
                }
            })
        ).data.toString();
        expect(data.includes('百度一下')).toBe(true);
    });

    test('测试4', async () => {
        const req = async (delay?: number) => {
            const oldTime = Date.now();
            await request('https://www.baidu.com/', { delay });
            return Date.now() - oldTime > (delay ?? 0);
        };

        const ret = await Promise.all([
            req(),
            req(0),
            req(100),
            req(500),
            req(1000),
            req(1500),
            req(2000)
        ]);

        expect(ret.every(v => v === true)).toBe(true);
    });

    test('测试5', async () => {
        const req = async (timeout: number) => {
            const oldTime = Date.now();
            await request('https://www.baiduabc.com/', { timeout }).catch(
                (e: Error) => {
                    expect(e.message.includes('超时')).toBe(true);
                }
            );
            return Date.now() - oldTime < timeout + 500;
        };

        const ret = await Promise.all([
            req(100),
            req(500),
            req(1000),
            req(1500),
            req(2000)
        ]);

        expect(ret.every(v => v === true)).toBe(true);
    });

    test('测试6', async () => {
        const httpPing = async () => {
            const pingResult = await request({
                hostname: '216.239.32.40',
                path: '/translate_a/t?client=dict-chrome-ex&sl=en&tl=zh&dt=t&q=I%20love%20you',
                headers: {
                    Host: 'translate.google.com'
                },
                timeout: 3500
            }).catch(e => {
                return { status: -1, data: '' };
            });

            if (pingResult.status === -1) {
                return false;
            }

            const data = pingResult.data.toString();

            return data.includes('我爱你');
        };

        expect(await httpPing()).toBe(true);
    });
});

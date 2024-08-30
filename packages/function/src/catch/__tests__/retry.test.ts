import { retry } from '..';

describe('@curong/function/retry', () => {
    test('基本任务执行', async () => {
        const task = jest.fn().mockResolvedValue('success');
        const result = await retry(3, task);
        expect(result).toBe('success');
        expect(task).toHaveBeenCalledTimes(1);
    });

    test('任务失败后的重试机制', async () => {
        let attempt = 0;
        const task = jest.fn().mockImplementation(() => {
            attempt++;
            if (attempt < 3) throw new Error('failed');
            return 'success';
        });

        const result = await retry(3, task);
        expect(result).toBe('success');
        expect(task).toHaveBeenCalledTimes(3);
    });

    test('重试回调 onProgressRetry', async () => {
        const task = jest.fn().mockRejectedValue(new Error('failed'));
        const onProgressRetry = jest.fn(() => true);

        await retry(3, task, { onProgressRetry });
        expect(onProgressRetry).toHaveBeenCalledTimes(1);
    });

    test('错误处理 onError', async () => {
        const task = jest.fn().mockRejectedValue(new Error('failed'));
        const onError = jest.fn().mockReturnValue('fallback');

        const result = await retry(3, task, { onError });
        expect(result).toBe('fallback');
        expect(onError).toHaveBeenCalled();
    });

    test('等待时间 retryWait 固定时间', async () => {
        const task = jest.fn().mockRejectedValue(new Error('failed'));
        const delay = jest.spyOn(global, 'setTimeout');

        try {
            await retry(3, task, { retryWait: 100 });
        } catch (e) {
            expect(e).toBeDefined();
        }

        expect(delay).toHaveBeenCalledTimes(3);
        expect(delay).toHaveBeenCalledWith(expect.any(Function), 100);
        delay.mockRestore();
    });

    test('等待时间 retryWait 范围时间', async () => {
        const task = jest.fn().mockRejectedValue(new Error('failed'));
        const delay = jest.spyOn(global, 'setTimeout');

        try {
            await retry(3, task, { retryWait: { start: 100, end: 200 } });
        } catch (e) {
            expect(e).toBeDefined();
        }

        expect(delay).toHaveBeenCalledTimes(3);
        const waitTimes = delay.mock.calls.map(call => call[1]);
        waitTimes.forEach(waitTime => {
            expect(waitTime).toBeGreaterThanOrEqual(100);
            expect(waitTime).toBeLessThanOrEqual(200);
        });
        delay.mockRestore();
    });

    test('重试次数耗尽后抛出 AggregateError', async () => {
        const task = jest.fn().mockRejectedValue(new Error('failed'));

        // @ts-ignore
        await expect(retry(3, task)).rejects.toThrow(AggregateError);
    });

    test('测试 onError 返回值', async () => {
        const ret = await retry(
            3,
            () => {
                throw 'xxx';
            },
            {
                onError(e) {
                    return 'ok';
                },
                onProgressRetry() {
                    return true;
                }
            }
        );

        expect(ret).toBe('ok');
    });
});

import { retryWithCondition } from '..';

describe('@curong/function/retryWithCondition', () => {
    test('测试1', async () => {
        const task = () => (Math.random() > 0.5 ? '成功' : '失败');
        const condition = (result: string) => result === '成功';
        const result = await retryWithCondition(task, condition, {
            maxRetries: 5
        });
        expect(result).toBe('成功');
    });

    test('测试2', async () => {
        let i = 0;
        const getNumber = () => i++;
        expect(
            await retryWithCondition(
                () => getNumber(),
                num => num === 10,
                {
                    retryWait: 0
                }
            )
        ).toBe(10);
    });

    test('测试3', async () => {
        let i = 0;
        const getNumberAsync = async () => i++;
        expect(
            await retryWithCondition(
                () => getNumberAsync(),
                async num => num === 10,
                {
                    retryWait: 0
                }
            )
        ).toBe(10);
    });

    test('测试4', async () => {
        let i = 0;
        const getNumberAsync = async () => i++;
        await expect(
            retryWithCondition(
                () => getNumberAsync(),
                num => num === 10,
                {
                    retryWait: 1,
                    maxRetries: 5
                }
            )
        ).rejects.toBeDefined();
        expect(i).toBe(6);
    });

    test('测试5', async () => {
        let i = 0;
        const getNumberAsync = async () => i++;
        await expect(
            retryWithCondition(
                () => getNumberAsync(),
                num => num === 10,
                {
                    retryWait: -1,
                }
            )
        ).rejects.toBeDefined();
        expect(i).toBe(0);
    });

    test('测试6', async () => {
        let i = 0;
        const getNumberAsync = async () => i++;
        await expect(
            retryWithCondition(
                () => getNumberAsync(),
                num => num === 10,
                {
                    maxRetries: -5
                }
            )
        ).rejects.toBeDefined();
        expect(i).toBe(0);
    });
});

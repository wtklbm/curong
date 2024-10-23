import { cancelExec } from '..';

const fn = (a: number, b: number) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(a + b), 100);
    });
};

describe('@curong/function/cancelExec', () => {
    test('测试1', async () => {
        const [promise] = cancelExec(fn, 2, 3);

        const result = await promise;
        expect(result).toBe(5);
    });

    test('测试2', async () => {
        const [promise, abort] = cancelExec(fn, 2, 3);

        setTimeout(() => {
            abort('被终止');
        }, 50);

        const result = await promise;
        expect(result).toBe('被终止');
    });

    test('测试3', async () => {
        const [promise, abort] = cancelExec(fn, 2, 3);

        setTimeout(() => {
            abort(Promise.resolve('中止后的结果'));
        }, 50);

        const result = await promise;
        expect(result).toBe('中止后的结果');
    });

    test('测试4', async () => {
        const [promise, abort] = cancelExec(fn, 2, 3);

        setTimeout(() => {
            abort();
        }, 50);

        const result = await promise;
        expect(result).toBeUndefined();
    });

    test('测试5', async () => {
        const [promise, abort] = cancelExec(fn, 2, 3);

        setTimeout(() => {
            abort((...args: [number, number]) => {
                return `终止时传递的参数: ${args.join(', ')}`;
            });
        }, 50);

        const result = await promise;
        expect(result).toBe('终止时传递的参数: 2, 3');
    });
});

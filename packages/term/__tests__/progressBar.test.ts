import { ProgressBar } from '../src';

describe('@curong/term/progressBar', () => {
    test('测试1', async () => {
        jest.setTimeout(30e3);
        function delay() {
            return new Promise(resolve => {
                setTimeout(() => resolve(), 200);
            });
        }

        const bar1 = new ProgressBar({ total: 30 });
        console.log('正在加载进度条...');

        for (let i = 0, len = 30; i < len; i++) {
            bar1.pushWrite(`进度: ${1}`);
            await delay();

            bar1.write(`当前进度结束!`);
            await delay();
        }

        bar1.end();

        console.log('进度条执行完成');
    });

    test('测试2', async () => {
        jest.setTimeout(30e3);
        function delay() {
            return new Promise(resolve => {
                setTimeout(() => resolve(), 200);
            });
        }

        const bar1 = new ProgressBar({ total: 30 });
        console.log('正在加载进度条...');

        for (let i = 0, len = 30; i < len; i++) {
            bar1.pushWrite(`进度: ${1}`);
            if (i === 2) {
                bar1.end();
                break;
            }

            await delay();

            bar1.write(`当前进度结束!`);
            await delay();
        }

        console.log('进度条执行完成');
    });

    test('测试3', async () => {
        jest.setTimeout(30e3);
        function delay() {
            return new Promise(resolve => {
                setTimeout(() => resolve(), 200);
            });
        }

        const bar1 = new ProgressBar();
        console.log('正在加载进度条...');

        for (let i = 0, len = 30; i < len; i++) {
            bar1.pushWrite(`进度: ${1}`);
            if (i === 2) {
                bar1.end();
                break;
            }
            await delay();
        }

        console.log('进度条执行完成');
    });
});

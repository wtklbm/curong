import { format } from '../src';

describe('@curong/term/format', () => {
    test('测试1', () => {
        let ret = format({
            type: 'info',
            title: '这是标题',
            message: '这是信息',
            code: 500,
            data: {
                a: 1,
                b: {
                    c: 'xxx'
                },
                d: ['xxx'],
                e: new Date('2020-01-01')
            },
            date: false,
            stack: false
        });

        expect(ret).toBe(
            "\n\u001b[38;5;15;48;5;2m INFO \u001b[39;49m \u001b[38;5;2m这是标题\u001b[39m \n-------------------------------------------------------------------------------- \n\u001b[38;5;15;48;5;6m 消息 \u001b[39;49m 这是信息 \n\u001b[38;5;15;48;5;6m 代码 \u001b[39;49m \u001b[33m500\u001b[39m \n\u001b[38;5;15;48;5;6m 数据 \u001b[39;49m {\n  a: \u001b[33m1\u001b[39m,\n  b: {\n    c: \u001b[32m'xxx'\u001b[39m\n  },\n  d: [\n    \u001b[32m'xxx'\u001b[39m,\n    [length]: \u001b[33m1\u001b[39m\n  ],\n  e: \u001b[35m2020-01-01T00:00:00.000Z\u001b[39m\n} \n-------------------------------------------------------------------------------- \n"
        );
    });

    test('测试2', async () => {
        let ret = format(
            {
                type: 'info',
                title: '这是标题',
                message: '这是信息',
                code: 500,
                data: {
                    a: 1,
                    b: {
                        c: 'xxx'
                    },
                    d: ['xxx'],
                    e: new Date('2020-01-01')
                },
                date: false,
                stack: false
            },
            {
                display: {
                    dividers: false,
                    title: false
                }
            }
        );

        expect(ret).toBe(
            "\n\u001b[38;5;15;48;5;6m 消息 \u001b[39;49m 这是信息 \n\u001b[38;5;15;48;5;6m 代码 \u001b[39;49m \u001b[33m500\u001b[39m \n\u001b[38;5;15;48;5;6m 数据 \u001b[39;49m {\n  a: \u001b[33m1\u001b[39m,\n  b: {\n    c: \u001b[32m'xxx'\u001b[39m\n  },\n  d: [\n    \u001b[32m'xxx'\u001b[39m,\n    [length]: \u001b[33m1\u001b[39m\n  ],\n  e: \u001b[35m2020-01-01T00:00:00.000Z\u001b[39m\n} \n"
        );
    });

    test('测试3', async () => {
        let ret = format(
            {
                type: 'info',
                title: '这是标题',
                message: '这是信息',
                code: 500,
                data: {
                    a: 1,
                    b: {
                        c: 'xxx'
                    },
                    d: ['xxx'],
                    e: new Date('2020-01-01')
                },
                date: false,
                stack: false
            },
            {
                display: {
                    title: true,
                    dividers: true
                }
            }
        );

        expect(ret).toBe(
            "\n\u001b[38;5;15;48;5;2m INFO \u001b[39;49m \u001b[38;5;2m这是标题\u001b[39m \n-------------------------------------------------------------------------------- \n\u001b[38;5;15;48;5;6m 消息 \u001b[39;49m 这是信息 \n\u001b[38;5;15;48;5;6m 代码 \u001b[39;49m \u001b[33m500\u001b[39m \n\u001b[38;5;15;48;5;6m 数据 \u001b[39;49m {\n  a: \u001b[33m1\u001b[39m,\n  b: {\n    c: \u001b[32m'xxx'\u001b[39m\n  },\n  d: [\n    \u001b[32m'xxx'\u001b[39m,\n    [length]: \u001b[33m1\u001b[39m\n  ],\n  e: \u001b[35m2020-01-01T00:00:00.000Z\u001b[39m\n} \n-------------------------------------------------------------------------------- \n"
        );
    });
});

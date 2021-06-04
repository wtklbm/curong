import { splitByBytes } from '../src';

describe('@curong/string/splitByBytes', () => {
    test('测试1', () => {
        const v = '中华人民共和国中央人民政府';
        const ret = splitByBytes(v, 6);
        expect(ret).toEqual([
            '中华',
            '人民',
            '共和',
            '国中',
            '央人',
            '民政',
            '府'
        ]);
    });

    test('测试2', () => {
        const v = '中华人民共和国中央人民政府';
        expect(() => splitByBytes(v, 0)).toThrow();
    });
});

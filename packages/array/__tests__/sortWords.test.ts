import { sortWords } from '../src';

describe('@curong/string/sortWords', () => {
    test('测试1', () => {
        const value = ['中', 'this', '国', 'is', 'test', 'a'];
        const ret1 = sortWords(value);
        expect(ret1).toEqual(['国', '中', 'a', 'is', 'test', 'this']);

        const ret2 = sortWords(value, true);
        expect(ret2).toEqual(['this', 'test', 'is', 'a', '中', '国']);
    });
});

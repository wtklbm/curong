import { sortWords } from '../src';

describe('@curong/string/sortWords', () => {
    test('测试1', () => {
        const value = ['中', 'this', '国', 'is', 'test', 'a'];
        const ret = sortWords(value);
        expect(ret).toEqual(['国', '中', 'a', 'is', 'test', 'this']);
    });
});

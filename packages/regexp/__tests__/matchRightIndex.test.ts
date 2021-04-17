import { matchNextIndex } from '../src';

describe('@curong/regexp/matchNextIndex', () => {
    test('测试1', () => {
        const r = /\d+/g;
        const v = 'hello123world';
        expect(matchNextIndex(r.exec(v)!)).toBe(8);
    });
});

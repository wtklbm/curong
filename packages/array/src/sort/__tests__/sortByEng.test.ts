import { sortByEng } from '..';

describe('@curong/string/sortByEng', () => {
    test('测试1', () => {
        const value = ['ae', 'aa', 'ac', 'cg', 'do', 'gj', 'bl'];
        const ret1 = sortByEng(value);
        expect(ret1).toEqual(['aa', 'ac', 'ae', 'bl', 'cg', 'do', 'gj']);

        const ret2 = sortByEng(value, true);
        expect(ret2).toEqual(['gj', 'do', 'cg', 'bl', 'ae', 'ac', 'aa']);
    });
});

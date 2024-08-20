import { sortByEngInitials } from '..';

describe('@curong/string/sortByEngInitials', () => {
    test('测试1', () => {
        const value = ['ae', 'aa', 'ac', 'cg', 'do', 'gj', 'bl'];
        const ret1 = sortByEngInitials(value);
        expect(ret1).toEqual(['ae', 'aa', 'ac', 'bl', 'cg', 'do', 'gj']);

        const ret2 = sortByEngInitials(value, true);
        expect(ret2).toEqual(['gj', 'do', 'cg', 'bl', 'ae', 'aa', 'ac']);
    });
});

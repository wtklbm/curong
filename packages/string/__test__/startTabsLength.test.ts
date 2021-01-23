import { startTabsLength } from '../src';

describe('@curong/string/startTabsLength', () => {
    test('测试1', () => {
        expect(startTabsLength('+')).toBe(0);
        expect(startTabsLength('\t+')).toBe(1);
    });
});

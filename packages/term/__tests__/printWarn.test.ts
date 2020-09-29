import { printWarn } from '../src';

describe('@curong/term/printWarn', () => {
    test('测试1', () => {
        expect(printWarn('xxx')).toBe(undefined);
    });
});

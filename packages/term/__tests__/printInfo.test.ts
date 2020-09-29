import { printInfo } from '../src';

describe('@curong/term/printInfo', () => {
    test('测试1', () => {
        expect(printInfo('xxx')).toBe(undefined);
    });
});

import { printError } from '../src';

describe('@curong/term/printError', () => {
    test('测试1', () => {
        expect(printError('xxx')).toBe(undefined);
    });
});

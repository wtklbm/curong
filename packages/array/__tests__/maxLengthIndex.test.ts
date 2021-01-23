import { maxLengthIndex } from '../src';

describe('@curong/array/maxLengthIndex', () => {
    test('测试1', () => {
        expect(maxLengthIndex([])).toBe(null);
        expect(maxLengthIndex(['test'])).toBe(0);
    });

    test('测试2', () => {
        const lines = ['hello.', 'this is a test.', 'very match.'];
        expect(maxLengthIndex(lines)).toBe(1);
    });
});

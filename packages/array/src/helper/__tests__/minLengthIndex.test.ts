import { minLengthIndex } from '..';

describe('@curong/array/maxLengthIndex', () => {
    test('测试1', () => {
        expect(minLengthIndex([])).toBe(null);
        expect(minLengthIndex(['test'])).toBe(0);
    });

    test('测试2', () => {
        const lines = ['hello.', 'this is a test.', 'very match.'];
        expect(minLengthIndex(lines)).toBe(0);
    });
});

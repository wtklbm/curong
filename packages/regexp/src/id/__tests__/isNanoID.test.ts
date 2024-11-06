import { isNanoID } from '..';

describe('@curong/regexp/isNanoID', () => {
    test('测试1', () => {
        expect(isNanoID('')).toBe(false);
        expect(isNanoID('abc123_-xyz4567890')).toBe(false);
        expect(isNanoID('this-is-not-a-nanoid')).toBe(false);
        expect(isNanoID('1234567890123456789012')).toBe(false);
        expect(isNanoID('V1StGXR8_Z5jdHi6B5c8')).toBe(false);
    });

    test('测试2', () => {
        expect(isNanoID('V1StGXR8_Z5jadHi6B5c8')).toBe(true);
    });
});

import { surrogatePair } from '..';

describe('@curong/regexp/surrogatePair', () => {
    const isSurrogatePair = (v: string) =>
        new RegExp(`^${surrogatePair}$`).test(v);

    test('测试1', () => {
        expect(isSurrogatePair('\uD800')).toBe(false);
        expect(isSurrogatePair('\uDC00')).toBe(false);
        expect(isSurrogatePair('Hello')).toBe(false);
        expect(isSurrogatePair('')).toBe(false);
        expect(isSurrogatePair('\uDD1E\uD834')).toBe(false);
        expect(isSurrogatePair('A')).toBe(false);
        expect(isSurrogatePair('No surrogate pair here!')).toBe(false);
    });

    test('测试2', () => {
        expect(isSurrogatePair('😊')).toBe(true);
        expect(isSurrogatePair('\uD834\uDD1E')).toBe(true);
        expect(isSurrogatePair('\uD83D\uDE00')).toBe(true); // (😃)
        expect(isSurrogatePair('\uD83D\uDE03')).toBe(true); // (😃)
    });
});

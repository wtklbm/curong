import { isPort } from '..';

describe('@curong/regexp/isPort', () => {
    test('测试1', () => {
        expect(isPort(-1)).toBe(false);
        expect(isPort(' 8080 ')).toBe(false);
        expect(isPort('-1')).toBe(false);
        expect(isPort('8080.5')).toBe(false);
        expect(isPort('abc')).toBe(false);
        expect(isPort(65536)).toBe(false);
        expect(isPort(8080.5)).toBe(false);
    });

    test('测试2', () => {
        expect(isPort(8080)).toBe(true);
        expect(isPort('8080')).toBe(true);
        expect(isPort(0)).toBe(true);
        expect(isPort(65535)).toBe(true);
    });
});

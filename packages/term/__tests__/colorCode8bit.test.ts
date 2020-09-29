import { colorCode8bit } from '../src';

describe('@curong/term/colorCode8bit', () => {
    test('测试1', () => {
        // @ts-ignore
        expect(() => colorCode8bit('xxx')).toThrow();
        expect(() => colorCode8bit(-1)).toThrow();
        expect(() => colorCode8bit(1.1)).toThrow();
        expect(() => colorCode8bit(256)).toThrow();
    });

    test('测试2', () => {
        let ret = colorCode8bit(1);

        expect(Object.keys(ret).length).toBe(2);
        expect(ret.foreground).toBe('38;5;1');
        expect(ret.background).toBe('48;5;1');
    });

    test('测试3', () => {
        let ret = colorCode8bit(23);

        expect(Object.keys(ret).length).toBe(2);
        expect(ret.foreground).toBe('38;5;23');
        expect(ret.background).toBe('48;5;23');
    });
});

import { colorCode24bit } from '../src';

describe('@curong/term/colorCode24bit', () => {
    test('测试1', () => {
        expect(() => colorCode24bit([-1, 0, 0])).toThrow();
        expect(() => colorCode24bit([0, 0, 1.1])).toThrow();
        expect(() => colorCode24bit([0, 256, 0])).toThrow();
    });

    test('测试2', () => {
        let ret = colorCode24bit([0, 0, 1]);

        expect(Object.keys(ret).length).toBe(2);
        expect(ret.foreground).toBe('38;2;0;0;1');
        expect(ret.background).toBe('48;2;0;0;1');
    });

    test('测试3', () => {
        let ret = colorCode24bit([128, 136, 255]);

        expect(Object.keys(ret).length).toBe(2);
        expect(ret.foreground).toBe('38;2;128;136;255');
        expect(ret.background).toBe('48;2;128;136;255');
    });
});

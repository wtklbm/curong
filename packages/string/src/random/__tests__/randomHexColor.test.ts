import { randomHexColor } from '..';

describe('@curong/string/randomHexColor', () => {
    const hexColorRegex = /^#[0-9A-F]{6}$/;

    test('普通模式下返回有效的颜色', () => {
        for (let i = 0; i < 100; i++) {
            const color = randomHexColor();
            expect(hexColorRegex.test(color)).toBe(true);
        }
    });

    test('安全模式下返回有效的颜色', () => {
        for (let i = 0; i < 100; i++) {
            const color = randomHexColor(true);
            expect(hexColorRegex.test(color)).toBe(true);
        }
    });

    test('普通模式下返回颜色的随机性', () => {
        const colors = new Set<string>();
        for (let i = 0; i < 1000; i++) {
            colors.add(randomHexColor());
        }
        expect(colors.size).toBeGreaterThan(1);
    });

    test('安全模式下返回颜色的随机性', () => {
        const colors = new Set<string>();
        for (let i = 0; i < 1000; i++) {
            colors.add(randomHexColor(true));
        }
        expect(colors.size).toBeGreaterThan(1);
    });

    test('普通模式下的逻辑正确性', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.5);
        const color = randomHexColor();
        expect(color).toBe('#800000');
        jest.restoreAllMocks();
    });
});

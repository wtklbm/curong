import { randomLower } from '..';

describe('@curong/string/randomLower', () => {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';

    test('普通模式下返回有效的小写字母', () => {
        for (let i = 0; i < 100; i++) {
            const letter = randomLower();
            expect(lowerCaseLetters.includes(letter)).toBe(true);
        }
    });

    test('安全模式下返回有效的小写字母', () => {
        for (let i = 0; i < 100; i++) {
            const letter = randomLower(true);
            expect(lowerCaseLetters.includes(letter)).toBe(true);
        }
    });

    test('普通模式下返回字母的随机性', () => {
        const letters = new Set<string>();
        for (let i = 0; i < 1000; i++) {
            letters.add(randomLower());
        }
        expect(letters.size).toBeGreaterThan(1);
    });

    test('安全模式下返回字母的随机性', () => {
        const letters = new Set<string>();
        for (let i = 0; i < 1000; i++) {
            letters.add(randomLower(true));
        }
        expect(letters.size).toBeGreaterThan(1);
    });

    test('普通模式下的逻辑正确性', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.5);
        const letter = randomLower();
        expect(letter).toBe('n');
        jest.restoreAllMocks();
    });
});

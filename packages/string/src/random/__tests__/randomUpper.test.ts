import { randomUpper } from '..';

describe('@curong/string/randomUpper', () => {
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    test('普通模式下返回有效的大写字母', () => {
        for (let i = 0; i < 100; i++) {
            const letter = randomUpper();
            expect(upperCaseLetters.includes(letter)).toBe(true);
        }
    });

    test('安全模式下返回有效的大写字母', () => {
        for (let i = 0; i < 100; i++) {
            const letter = randomUpper(true);
            expect(upperCaseLetters.includes(letter)).toBe(true);
        }
    });

    test('普通模式下返回字母的随机性', () => {
        const letters = new Set<string>();
        for (let i = 0; i < 1000; i++) {
            letters.add(randomUpper());
        }
        expect(letters.size).toBeGreaterThan(1);
    });

    test('安全模式下返回字母的随机性', () => {
        const letters = new Set<string>();
        for (let i = 0; i < 1000; i++) {
            letters.add(randomUpper(true));
        }
        expect(letters.size).toBeGreaterThan(1);
    });

    test('普通模式下的逻辑正确性', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.5);
        const letter = randomUpper();
        expect(letter).toBe('N');
        jest.restoreAllMocks();
    });
});

import { randomBoolean } from '..';

describe('@curong/string/randomBoolean', () => {
    test('普通模式下返回布尔值', () => {
        for (let i = 0; i < 100; i++) {
            const result = randomBoolean();
            expect(typeof result).toBe('boolean');
        }
    });

    test('安全模式下返回布尔值', () => {
        for (let i = 0; i < 100; i++) {
            const result = randomBoolean(true);
            expect(typeof result).toBe('boolean');
        }
    });

    test('普通模式下返回 true 和 false 的概率', () => {
        let trueCount = 0;
        let falseCount = 0;
        for (let i = 0; i < 10000; i++) {
            const result = randomBoolean();
            result ? trueCount++ : falseCount++;
        }
        expect(trueCount).toBeGreaterThan(0);
        expect(falseCount).toBeGreaterThan(0);
    });

    test('安全模式下返回 true 和 false 的概率', () => {
        let trueCount = 0;
        let falseCount = 0;
        for (let i = 0; i < 10000; i++) {
            const result = randomBoolean(true);
            result ? trueCount++ : falseCount++;
        }
        expect(trueCount).toBeGreaterThan(0);
        expect(falseCount).toBeGreaterThan(0);
    });

    test('普通模式下的逻辑正确性', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.2);
        expect(randomBoolean()).toBe(true);

        jest.spyOn(Math, 'random').mockReturnValue(0.8);
        expect(randomBoolean()).toBe(true);

        jest.spyOn(Math, 'random').mockReturnValue(0.5);
        expect(randomBoolean()).toBe(false);

        jest.restoreAllMocks();
    });
});

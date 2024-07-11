import evaluateInt from '../evaluateInt';

describe('@curong/function/evaluateInt', () => {
    test('测试1', () => {
        expect(evaluateInt(0)).toBe(0);
        expect(evaluateInt(-1)).toBe(-1);
        expect(() => evaluateInt(NaN)).toThrow();
        expect(() => evaluateInt(Infinity)).toThrow();
        expect(() => evaluateInt(-Infinity)).toThrow();
        expect(() => evaluateInt(1.1)).toThrow();
        expect(() => evaluateInt(-1.1)).toThrow();
        expect(() => evaluateInt(Number.MAX_VALUE)).toThrow();
        expect(() => evaluateInt(-Number.MAX_VALUE)).toThrow();
        expect(evaluateInt(Number.MAX_SAFE_INTEGER)).toBe(
            Number.MAX_SAFE_INTEGER
        );
    });

    test('测试2', () => {
        expect(evaluateInt(() => 10)).toBe(10);
        expect(evaluateInt(() => ({ start: 0, end: 10 }))).toBeTruthy();
        expect(evaluateInt(() => [{ start: 0, end: 10 }, 20, 30])).toBeTruthy();
    });

    test('测试3', () => {
        expect(evaluateInt([10])).toBe(10);
        expect(evaluateInt([10, 20, 30])).toBeTruthy();
        expect(evaluateInt([10, 20, 30, { start: 0, end: 10 }])).toBeTruthy();

        expect(evaluateInt(() => [10])).toBe(10);
        expect(evaluateInt(() => [10, 20, 30])).toBeTruthy();
        expect(
            evaluateInt(() => [10, 20, 30, { start: 0, end: 10 }])
        ).toBeTruthy();
    });

    test('测试4', () => {
        expect(evaluateInt({ start: 0 })).toBe(0);
        expect(evaluateInt({ end: 10 })).toBeTruthy();
        expect(evaluateInt({ start: 0, end: 10 })).toBeTruthy();
        expect(evaluateInt({ start: 10, end: 10 })).toBeTruthy();
        expect(evaluateInt({ start: -10, end: 10 })).toBeTruthy();
        expect(evaluateInt({ start: 10, end: -10 })).toBeTruthy();
        expect(() => evaluateInt({ start: NaN, end: 10 })).toThrow();
        expect(() => evaluateInt({ start: 10, end: Infinity })).toThrow();
        expect(() => evaluateInt({ start: Infinity, end: Infinity })).toThrow();
        expect(() => evaluateInt({ start: Infinity, end: NaN })).toThrow();
        expect(() => evaluateInt({ start: NaN, end: Infinity })).toThrow();
        expect(() => evaluateInt({ start: NaN, end: NaN })).toThrow();
        expect(() => evaluateInt({ start: 0, end: NaN })).toThrow();
        expect(evaluateInt({ start: 0, end: 10 })).toBeTruthy();
        expect(evaluateInt(() => ({ start: 0, end: 10 }))).toBeTruthy();
    });

    test('测试5', () => {
        expect(evaluateInt('1')).toBe(1);
        expect(evaluateInt('1000')).toBe(1000);
        expect(() => evaluateInt('NaN')).toThrow();
        expect(() => evaluateInt('xxx')).toBeTruthy();
    });

    test('测试5', () => {
        // @ts-ignore
        expect(() => evaluateInt(10n)).toThrow();
        // @ts-ignore
        expect(() => evaluateInt(null)).toThrow();
        // @ts-ignore
        expect(() => evaluateInt(undefined)).toThrow();
        // @ts-ignore
        expect(() => evaluateInt(Symbol(1))).toThrow();
    });
});

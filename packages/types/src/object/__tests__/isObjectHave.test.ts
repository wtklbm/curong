import { isObjectHave } from '..';

describe('@curong/types/isObjectHave', () => {
    test('测试1', () => {
        expect(isObjectHave(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isObjectHave({})).toBe(false);
        expect(isObjectHave({ a: 1 })).toBe(true);

        const obj = Object.assign(Object.create(null), {
            a: 0,
            [Symbol.iterator]: () => {}
        });
        Object.defineProperties(obj, {
            property1: { enumerable: true, value: 1 },
            property2: { enumerable: false, value: 2 }
        });
        expect(isObjectHave(obj)).toBe(true);
        expect(isObjectHave(obj, 0)).toBe(true);
        expect(isObjectHave(obj, 1)).toBe(true);
        expect(isObjectHave(obj, 2)).toBe(true);
        expect(isObjectHave(obj, 3)).toBe(true);
    });

    test('测试3', () => {
        expect(isObjectHave(null)).toBe(false);
    });
});

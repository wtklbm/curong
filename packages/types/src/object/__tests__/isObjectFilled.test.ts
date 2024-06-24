import { isObjectFilled } from '..';

describe('@curong/types/isObjectFilled', () => {
    test('测试1', () => {
        expect(isObjectFilled(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isObjectFilled({})).toBe(false);
        expect(isObjectFilled({ a: 1 })).toBe(true);

        const obj = Object.assign(Object.create(null), {
            a: 0,
            [Symbol.iterator]: () => {}
        });
        Object.defineProperties(obj, {
            property1: { enumerable: true, value: 1 },
            property2: { enumerable: false, value: 2 }
        });
        expect(isObjectFilled(obj)).toBe(true);
        expect(isObjectFilled(obj, 0)).toBe(true);
        expect(isObjectFilled(obj, 1)).toBe(true);
        expect(isObjectFilled(obj, 2)).toBe(true);
        expect(isObjectFilled(obj, 3)).toBe(true);
    });

    test('测试3', () => {
        expect(isObjectFilled(null)).toBe(false);
    });
});

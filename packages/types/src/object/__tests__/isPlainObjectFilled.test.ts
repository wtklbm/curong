import { isPlainObjectFilled } from '..';

describe('@curong/types/isPlainObjectFilled', () => {
    test('测试1', () => {
        expect(isPlainObjectFilled({})).toBe(false);
    });

    test('测试2', () => {
        expect(isPlainObjectFilled({ key: 'value' })).toBe(true);

        const obj = { a: 0, [Symbol.iterator]: () => {} };
        Object.defineProperties(obj, {
            property1: { enumerable: true, value: 1 },
            property2: { enumerable: false, value: 2 }
        });
        expect(isPlainObjectFilled(obj)).toBe(true);
        expect(isPlainObjectFilled(obj, 0)).toBe(true);
        expect(isPlainObjectFilled(obj, 1)).toBe(true);
        expect(isPlainObjectFilled(obj, 2)).toBe(true);
        expect(isPlainObjectFilled(obj, 3)).toBe(true);
    });
});

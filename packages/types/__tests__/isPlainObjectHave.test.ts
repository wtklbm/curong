import { isPlainObjectHave } from '../src';

describe('@curong/types/isPlainObjectHave', () => {
    test('测试1', () => {
        expect(isPlainObjectHave({})).toBe(false);
    });

    test('测试2', () => {
        expect(isPlainObjectHave({ key: 'value' })).toBe(true);

        const obj = { a: 0, [Symbol.iterator]: () => {} };
        Object.defineProperties(obj, {
            property1: { enumerable: true, value: 1 },
            property2: { enumerable: false, value: 2 }
        });
        expect(isPlainObjectHave(obj)).toBe(true);
        expect(isPlainObjectHave(obj, 0)).toBe(true);
        expect(isPlainObjectHave(obj, 1)).toBe(true);
        expect(isPlainObjectHave(obj, 2)).toBe(true);
        expect(isPlainObjectHave(obj, 3)).toBe(true);
    });
});

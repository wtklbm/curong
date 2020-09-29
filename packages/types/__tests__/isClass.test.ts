import { isClass } from '../src';

describe('@curong/types/isClass', () => {
    test('测试1', () => {
        function test1() {}
        expect(isClass(new Function(''))).toBe(false);
        expect(isClass(test1)).toBe(false);
    });

    test('测试2', () => {
        class a {}
        expect(isClass(a)).toBe(true);
    });
});

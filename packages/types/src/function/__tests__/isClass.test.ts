import { isClass } from '..';

describe('@curong/types/isClass', () => {
    test('测试1', () => {
        function test1() {}
        expect(isClass(new Function(''))).toBe(false);
        expect(isClass(test1)).toBe(false);
        expect(isClass(123)).toBe(false);
        expect(isClass(() => {})).toBe(false);
        expect(isClass(function () {})).toBe(false);
        expect(isClass(function hello() {})).toBe(false);
        expect(isClass(new Function())).toBe(false);
        expect(isClass(new (class Hello {})())).toBe(false);
    });

    test('测试2', () => {
        class a {}
        expect(isClass(a)).toBe(true);
        expect(isClass(class Hello {})).toBe(true);
    });
});

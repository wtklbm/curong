import { isNumberObject } from '../src';

describe('@curong/types/isNumberObject', () => {
    test('测试1', () => {
        expect(isNumberObject(0)).toBe(false);
    });

    test('测试2', () => {
        expect(isNumberObject(new Number(1))).toBe(true);
    });
});

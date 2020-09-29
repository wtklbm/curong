import { isObjectLike } from '../src';

describe('@curong/types/isObjectLike', () => {
    test('测试1', () => {
        expect(isObjectLike(12)).toBe(false);
    });

    test('测试2', () => {
        expect(isObjectLike(/\d+/)).toBe(false);
        expect(isObjectLike(Object.create({}))).toBe(true);
    });

    test('测试3', () => {
        expect(isObjectLike(null)).toBe(false);
    });
});

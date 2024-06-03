import { isPromise } from '..';

describe('@curong/types/isPromise', () => {
    test('测试1', () => {
        expect(isPromise({})).toBe(false);
    });

    test('测试2', () => {
        expect(isPromise(new Promise(() => {}))).toBe(true);
    });
});

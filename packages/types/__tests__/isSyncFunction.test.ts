import { isSyncFunction } from '../src';

describe('@curong/types/isSyncFunction', () => {
    test('测试1', () => {
        async function test() {}
        expect(isSyncFunction(test)).toBe(false);
    });

    test('测试2', () => {
        expect(isSyncFunction(new Function())).toBe(true);
    });
});

import { isGenerator } from '../src';

describe('@curong/types/isGenerator', () => {
    test('测试1', () => {
        expect(isGenerator(new Function())).toBe(false);
    });

    test('测试2', () => {
        function* test() {}
        expect(isGenerator(test())).toBe(true);
    });
});

import { isGeneratorFunction } from '../src';

describe('@curong/types/isGeneratorFunction', () => {
    test('测试1', () => {
        expect(isGeneratorFunction(new Function())).toBe(false);
    });

    test('测试2', () => {
        function* test() {}
        expect(isGeneratorFunction(test)).toBe(true);
    });
});

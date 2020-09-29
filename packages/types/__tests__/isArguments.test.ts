import { isArguments } from '../src';

describe('@curong/types/isArguments', () => {
    test('测试1', () => {
        expect(isArguments({})).toBe(false);
    });

    test('测试2', () => {
        function test() {
            expect(isArguments(arguments)).toBe(true);
        }

        test();
    });
});

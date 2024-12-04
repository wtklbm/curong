import { currying } from '..';

describe('@curong/function/currying', () => {
    test('测试1', () => {
        const c = currying((a: string, b: string, c: string) => a + b + c);

        expect(c('1')('2')('3')).toBe('123');
        expect(c('1', '2', '3')).toBe('123');
    });

    test('测试2', () => {
        const c = currying(() => 10);

        expect(c()).toBe(10);
    });
});

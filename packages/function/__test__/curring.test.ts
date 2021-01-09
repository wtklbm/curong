import { curring } from '../src';

describe('@curong/function/curring', () => {
    test('测试1', () => {
        let c = curring((a: string, b: string, c: string) => a + b + c);

        expect(c('1')('2')('3')).toBe('123');
    });

    test('测试2', () => {
        let c = curring(() => 10);

        expect(c()).toBe(10);
    });
});

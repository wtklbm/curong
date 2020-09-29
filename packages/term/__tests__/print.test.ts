import print from '../src/print';

describe('@curong/term/print', () => {
    test('测试1', () => {});

    test('测试2', () => {
        expect(print('error', 'xxx')).toBe(undefined);
        expect(print('info', 'xxx')).toBe(undefined);
        expect(print('warn', 'xxx')).toBe(undefined);
    });
});

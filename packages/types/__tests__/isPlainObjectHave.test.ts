import { isPlainObjectHave } from '../src';

describe('@curong/types/isPlainObjectHave', () => {
    test('测试1', () => {
        expect(isPlainObjectHave({})).toBe(false);
    });

    test('测试2', () => {
        expect(isPlainObjectHave({ key: 'value' })).toBe(true);
    });
});

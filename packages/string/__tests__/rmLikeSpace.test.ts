import { rmLikeSpace } from '../src';

describe('@curong/string/rmLikeSpace', () => {
    test('测试1', () => {
        expect(rmLikeSpace(`\u00A0\u00A0x\u00A0xx\u00A0\u00A0`)).toBe('x xx');
    });
});

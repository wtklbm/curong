import { before } from '../src';

describe('@curong/function/before', () => {
    test('测试1', () => {
        let b = before(() => console.log('两数相加的结果为：'));

        expect(b(() => 1 + 2)).toBe(3);
        expect(b(() => 2 + 2)).toBe(4);
    });
});

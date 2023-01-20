import { isDeno } from '../src';

describe('@curong/types/isDeno', () => {
    test('测试1', () => {
        expect(isDeno()).toBe(false);
    });
});

import { maxCallStackSize } from '../src';

describe('@curong/util/maxCallStackSize', () => {
    test('测试1', () => {
        expect(maxCallStackSize()).toBeTruthy();
    });
});

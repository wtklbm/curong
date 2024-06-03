import { isNodejs } from '..';

describe('@curong/types/isNodejs', () => {
    test('测试1', () => {
        expect(isNodejs()).toBe(true);
    });
});

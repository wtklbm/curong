import { isBrowser } from '..';

describe('@curong/types/isBrowser', () => {
    test('测试1', () => {
        expect(isBrowser()).toBe(false);
    });
});

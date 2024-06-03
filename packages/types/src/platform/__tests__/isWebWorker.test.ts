import { isWebWorker } from '..';

describe('@curong/types/isWebWorker', () => {
    test('测试1', () => {
        expect(isWebWorker()).toBe(false);
    });
});

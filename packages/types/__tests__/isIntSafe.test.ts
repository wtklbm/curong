import { isIntSafe } from '../src';

describe('@curong/types/isIntSafe', () => {
    test('测试1', () => {
        expect(isIntSafe(12.8)).toBe(false);
    });

    test('测试2', () => {
        expect(isIntSafe(22123412412434)).toBe(true);
    });

    test('测试3', () => {
        expect(isIntSafe([1])).toBe(false);
    });
});

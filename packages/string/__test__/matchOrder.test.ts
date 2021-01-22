import { matchOrder } from '../src';

describe('@curong/string/matchOrder', () => {
    test('测试1', () => {
        expect(matchOrder('xxx', [])).toBe(null);
    });

    test('测试2', () => {
        expect(matchOrder('wt12tool', [/\d+/, /\w+/])).toBeTruthy();
        expect(matchOrder('wt12tool', [/xxx/, /\w+/])).toBeTruthy();
    });
});

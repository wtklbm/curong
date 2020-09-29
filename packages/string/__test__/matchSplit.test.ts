// @ts-nocheck
import { matchSplit } from '../src';

describe('@curong/string/matchSplit', () => {
    test('测试1', () => {
        expect(matchSplit(123, 223)).toStrictEqual([]);
        expect(matchSplit('xxx', null)).toStrictEqual([]);
        expect(matchSplit('wt12tool', /xxx/)).toStrictEqual([]);
    });

    test('测试2', () => {
        expect(matchSplit('wt12tool', /\d+/)).toStrictEqual([
            'wt',
            '12',
            'tool'
        ]);
    });
});

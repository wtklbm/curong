import { subSpaces } from '../src';

describe('@curong/string/subSpaces', () => {
    test('测试1', () => {
        expect(subSpaces('有100本书。', /\d+/)).toBe('有 100 本书。')
    });

    test('测试1', () => {
        expect(subSpaces('有100本书。', /\d+/, v => '`' + v + '`')).toBe('有 `100` 本书。')
    });
});

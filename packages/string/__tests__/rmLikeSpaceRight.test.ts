import { rmLikeSpaceRight } from '../src';

describe('@curong/string/rmLikeSpaceRight', () => {
    test('测试1', () => {
        expect(rmLikeSpaceRight(`\u3000\u3000x\u3000xx\u3000\u3000`)).toBe(
            '\u3000\u3000x\u3000xx'
        );
    });
});

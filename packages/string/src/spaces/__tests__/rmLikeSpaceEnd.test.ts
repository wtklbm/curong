import { rmLikeSpaceEnd } from '..';

describe('@curong/string/rmLikeSpaceEnd', () => {
    test('测试1', () => {
        expect(rmLikeSpaceEnd(`\u3000\u3000x\u3000xx\u3000\u3000`)).toBe(
            '\u3000\u3000x\u3000xx'
        );
    });
});

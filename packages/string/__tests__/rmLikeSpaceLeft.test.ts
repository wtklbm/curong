import { rmLikeSpaceLeft } from '../src';

describe('@curong/string/rmLikeSpaceLeft', () => {
    test('测试1', () => {
        expect(rmLikeSpaceLeft(`\u3000\u3000x\u3000xx\u3000\u3000`)).toBe(
            'x\u3000xx\u3000\u3000'
        );
    });
});

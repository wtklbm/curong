import { rmLikeSpaceStart } from '../src';

describe('@curong/string/rmLikeSpaceStart', () => {
    test('测试1', () => {
        expect(rmLikeSpaceStart(`\u3000\u3000x\u3000xx\u3000\u3000`)).toBe(
            'x\u3000xx\u3000\u3000'
        );
    });
});

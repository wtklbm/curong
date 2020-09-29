import { halfWidth } from '../src';

describe('@curong/string/halfWidth', () => {
    test('测试1', () => {
        expect(halfWidth('\u3000')).toEqual(' ');

        expect(
            halfWidth('\uff50\uff50中\u3000中\uff51\uff43中\uff40。')
        ).toEqual('pp中 中qc中`。');
    });
});

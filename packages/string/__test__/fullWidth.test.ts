import { fullWidth } from '../src';

describe('@curong/string/fullWidth', () => {
    test('测试1', () => {
        expect(fullWidth(' ')).toEqual('\u3000');

        expect(fullWidth('pp中 中qc中`。')).toEqual(
            '\uff50\uff50中\u3000中\uff51\uff43中\uff40。'
        );
    });
});

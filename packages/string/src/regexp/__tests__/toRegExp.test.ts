import { toRegExp } from '..';

describe('@curong/string/toRegExp', () => {
    test('测试1', () => {
        expect(toRegExp('xx\\xx', 'g')).toStrictEqual(/xx\\xx/g);
        expect(toRegExp('+', 'g')).toStrictEqual(/\+/g);
        expect(toRegExp('\\d+', 'g')).toStrictEqual(/\\d\+/g);
    });
});

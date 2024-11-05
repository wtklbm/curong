import { isChinaIdCard } from '../src';

describe('@curong/regexp/isChinaIdCard', () => {
    test('测试1', () => {
        for (const value of [
            '2000',
            '190101881101231',
            '110101881301231',
            '110101198811214398',
            '11010119881101331a',
            '469001399208187005',
            '46900119925818180x',
            '530627199508918277',
            '110106100001019457',
            '140425900001017773'
        ]) {
            expect(isChinaIdCard(value)).toBe(false);
        }
    });

    test('测试2', () => {
        for (const value of [
            '110101198811014398',
            '11010119881101331X',
            '469001199208187005',
            '46900119920818180x'
        ]) {
            expect(isChinaIdCard(value)).toBe(true);
        }
    });
});

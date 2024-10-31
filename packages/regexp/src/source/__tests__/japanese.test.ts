import { japanese } from '..';

describe('@curong/regexp/japanese', () => {
    test('测试1', () => {
        const r = new RegExp(japanese);
        const s: string[] = [
            '\u3000Ａｚ０９ぁんァン一龠々谢ひらがなコン',
            'ァン一ｧﾝﾞﾟ一コン一ｺｻｼｽｾｿﾀ一'
        ];
        expect(s.every(v => v.split('').every(c => r.test(c)))).toBe(true);
    });
});

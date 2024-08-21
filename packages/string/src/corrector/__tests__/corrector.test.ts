import { corrector } from '..';

describe('Corrector', () => {
    test('测试', () => {
        expect(corrector('    ')).toEqual('');

        expect(
            corrector('中xxx', { toHalfWith: true, enhanceRule: false })
        ).toEqual('中 xxx');
        expect(
            corrector('中xxx', { toHalfWith: true, enhanceRule: true })
        ).toEqual('中 xxx');
        expect(
            corrector('中xxx', { toHalfWith: false, enhanceRule: false })
        ).toEqual('中 xxx');
        expect(
            corrector('中xxx', { toHalfWith: false, enhanceRule: true })
        ).toEqual('中 xxx');
    });

    test('测试数字和字母', () => {
        expect(corrector('中xxx')).toEqual('中 xxx');
        expect(corrector('xxx中')).toEqual('xxx 中');
        expect(corrector('中000')).toEqual('中 000');
        expect(corrector('000中')).toEqual('000 中');
        expect(corrector('xxx中000')).toEqual('xxx 中 000');
        expect(corrector('xxx 中 000')).toEqual('xxx 中 000');
    });

    test('测试中日韩兼容表意文字', () => {
        expect(corrector('xxx念000')).toEqual('xxx 念 000');
        expect(corrector('xxx 念 000')).toEqual('xxx 念 000');
    });

    test('测试 $ % ^', () => {
        expect(corrector('中$中')).toEqual('中 $ 中');
        expect(corrector('中 $ 中')).toEqual('中 $ 中');
        expect(corrector('中$100中')).toEqual('中 $100 中');
        expect(corrector('中%中')).toEqual('中 % 中');
        expect(corrector('中 % 中')).toEqual('中 % 中');
        expect(corrector('中100%中')).toEqual('中 100% 中');
        expect(corrector('中00%中、0%中、0%中')).toEqual(
            '中 00% 中、0% 中、0% 中'
        );
        expect(corrector('中^中')).toEqual('中 ^ 中');
        expect(corrector('中 ^ 中')).toEqual('中 ^ 中');
        expect(corrector("中x's中0中10%xxx中10中！")).toEqual(
            "中 x's 中 0 中 10% xxx 中 10 中！"
        );
    });

    test('测试 + - * /', () => {
        expect(corrector('中+中')).toEqual('中 + 中');
        expect(corrector('中 + 中')).toEqual('中 + 中');
        expect(corrector('xxx+xxx')).toEqual('xxx+xxx');
        expect(corrector('xxx+中')).toEqual('xxx + 中');

        expect(corrector('xxx++中')).toEqual('xxx++ 中');
        expect(corrector('xxx ++中')).toEqual('xxx++ 中');
        expect(corrector('xxx--中')).toEqual('xxx-- 中');
        expect(corrector('xxx --中')).toEqual('xxx-- 中');

        expect(corrector('中++xxx')).toEqual('中 ++xxx');
        expect(corrector('中++ xxx')).toEqual('中 ++xxx');
        expect(corrector('中--xxx')).toEqual('中 --xxx');
        expect(corrector('中-- xxx')).toEqual('中 --xxx');

        expect(corrector('xxx*中')).toEqual('xxx* 中');
        expect(corrector('xxx**中')).toEqual('xxx** 中');
        expect(corrector('中*xxx')).toEqual('中 *xxx');
        expect(corrector('中*xxx*中')).toEqual('中 *xxx* 中');
        expect(corrector('中**xxx**中')).toEqual('中 **xxx** 中');

        expect(corrector('中+xxx')).toEqual('中 + xxx');
        expect(corrector('中A+B中')).toEqual('中 A+B 中');
        expect(corrector('中C++中')).toEqual('中 C++ 中');
        expect(corrector('中-中')).toEqual('中 - 中');
        expect(corrector('中 - 中')).toEqual('中 - 中');
        expect(corrector('xxx-xxx')).toEqual('xxx-xxx');
        expect(corrector('xxx-中')).toEqual('xxx - 中');
        expect(corrector('中-xxx')).toEqual('中 - xxx');
        expect(corrector('中A-B中')).toEqual('中 A-B 中');
        expect(corrector('中- 中')).toEqual('中 - 中');
        expect(corrector('中*中')).toEqual('中 * 中');
        expect(corrector('中 * 中')).toEqual('中 * 中');
        expect(corrector('中* 中')).toEqual('中 * 中');
        expect(corrector('中 *中')).toEqual('中 * 中');
        expect(corrector('xxx*xxx')).toEqual('xxx*xxx');
        expect(corrector('xxx*中')).toEqual('xxx* 中');
        expect(corrector('中A*B中')).toEqual('中 A*B 中');
        expect(corrector('中/中')).toEqual('中 / 中');
        expect(corrector('中 / 中')).toEqual('中 / 中');
        expect(corrector('xxx/xxx')).toEqual('xxx/xxx');
        expect(corrector('xxx/中')).toEqual('xxx / 中');
        expect(corrector('中/xxx')).toEqual('中 /xxx');
        expect(corrector('xxx/中/xxx')).toEqual('xxx / 中 /xxx');
        expect(corrector('中A/B中')).toEqual('中 A/B 中');
        expect(corrector('0000-01-01(中) / 0000-01-01(中) / 中')).toEqual(
            '0000-01-01 (中) / 0000-01-01 (中) / 中'
        );
        expect(corrector('/home/中/root中Linux中')).toEqual(
            '/home/ 中 /root 中 Linux 中'
        );
        expect(corrector('中cat中od中/dev/random中/dev/xxx中')).toEqual(
            '中 cat 中 od 中 /dev/random 中 /dev/xxx 中'
        );
    });

    test('测试 _', () => {
        expect(corrector('中_中')).toEqual('中_中');
        expect(corrector('中 _ 中')).toEqual('中 _ 中');
        expect(corrector('xxx_xxx')).toEqual('xxx_xxx');
        expect(corrector('xxx _ xxx')).toEqual('xxx_xxx');
        expect(corrector('中_xxx_。')).toEqual('中 _xxx_。');
        expect(corrector('中__xxx__。')).toEqual('中 __xxx__。');

        expect(corrector('中_xxx_中')).toEqual('中 _xxx_ 中');
        expect(corrector('中__xxx__中')).toEqual('中 __xxx__ 中');
    });

    test('测试 =', () => {
        expect(corrector('中=中')).toEqual('中 = 中');
        expect(corrector('中 = 中')).toEqual('中 = 中');
        expect(corrector('xxx=xxx')).toEqual('xxx=xxx');
        expect(corrector('xxx=中')).toEqual('xxx = 中');
        expect(corrector('中=xxx')).toEqual('中 = xxx');
        expect(corrector('中A=B中')).toEqual('中 A=B 中');

        // `Markdown` 中的 `==xxx==`
        expect(corrector('xxx==中')).toEqual('xxx== 中');
        expect(corrector('xxx== 中')).toEqual('xxx== 中');
        expect(corrector('xxx == 中')).toEqual('xxx == 中');
        expect(corrector('中==xxx==中')).toEqual('中 ==xxx== 中');

        expect(corrector('xxx===中')).toEqual('xxx === 中');
        expect(corrector('xxx=== 中')).toEqual('xxx === 中');
        expect(corrector('xxx === 中')).toEqual('xxx === 中');
    });

    test('测试 & |', () => {
        expect(corrector('中&中')).toEqual('中 & 中');
        expect(corrector('中 & 中')).toEqual('中 & 中');
        expect(corrector('xxx&xxx')).toEqual('xxx&xxx');
        expect(corrector('xxx&中')).toEqual('xxx & 中');
        expect(corrector('中&xxx')).toEqual('中 & xxx');
        expect(corrector('中A&B中')).toEqual('中 A&B 中');
        expect(corrector('中|中')).toEqual('中 | 中');
        expect(corrector('中 | 中')).toEqual('中 | 中');
        expect(corrector('xxx|xxx')).toEqual('xxx|xxx');
        expect(corrector('xxx|中')).toEqual('xxx | 中');
        expect(corrector('中|xxx')).toEqual('中 | xxx');
        expect(corrector('中A|B中')).toEqual('中 A|B 中');
    });

    test('测试 \\', () => {
        expect(corrector('中\\中')).toEqual('中 \\ 中');
        expect(corrector('中 \\ 中')).toEqual('中 \\ 中');
    });

    test('测试 <>', () => {
        expect(corrector('中<中')).toEqual('中 < 中');
        expect(corrector('中 < 中')).toEqual('中 < 中');
        expect(corrector('xxx<xxx')).toEqual('xxx<xxx');
        expect(corrector('xxx<中')).toEqual('xxx < 中');
        expect(corrector('中<xxx')).toEqual('中 < xxx');
        expect(corrector('中A<B中')).toEqual('中 A<B 中');
        expect(corrector('中>中')).toEqual('中 > 中');
        expect(corrector('中 > 中')).toEqual('中 > 中');
        expect(corrector('xxx>xxx')).toEqual('xxx>xxx');
        expect(corrector('xxx>中')).toEqual('xxx > 中');
        expect(corrector('中>xxx')).toEqual('中 > xxx');
        expect(corrector('中D>0中')).toEqual('中 D>0 中');
    });

    test('测试 @ #', () => {
        expect(corrector('中@xxx中')).toEqual('中 @xxx 中');
        expect(corrector('中@中 中')).toEqual('中 @中，中');
        expect(corrector('中#中')).toEqual('中 #中');
        expect(corrector('中C#中')).toEqual('中 C# 中');
        expect(corrector('中#H0G0中')).toEqual('中 #H0G0 中');
        expect(corrector('中 #中 中')).toEqual('中 #中，中');
        expect(corrector('中#中 中')).toEqual('中 #中，中');
        expect(corrector('中#中 #中 中')).toEqual('中 #中 #中，中');
    });

    test('测试 ...', () => {
        expect(corrector('中…中')).toEqual('中… 中');
        expect(corrector('中……中')).toEqual('中…… 中');
        expect(corrector('中...中')).toEqual('中... 中');
        expect(corrector('中..中')).toEqual('中.. 中');
    });

    test('测试 ~', () => {
        expect(corrector('中~中')).toEqual('中～中');
        expect(corrector('中 ~ 中')).toEqual('中～中');
        expect(corrector('中~ 中')).toEqual('中～中');
        expect(corrector('中 ~中')).toEqual('中～中');

        expect(corrector('xxx~中')).toEqual('xxx~ 中');
        expect(corrector('xxx~~中')).toEqual('xxx~~ 中');
        expect(corrector('中~xxx~中')).toEqual('中 ~xxx~ 中');
        expect(corrector('中~~xxx~~中')).toEqual('中 ~~xxx~~ 中');
    });

    test('测试 ;', () => {
        expect(corrector('中:中')).toEqual('中：中');
        expect(corrector('中 : 中')).toEqual('中：中');
        expect(corrector('中: 中')).toEqual('中：中');
        expect(corrector('中 :中')).toEqual('中：中');
        expect(corrector('中:000')).toEqual('中：000');
        expect(corrector('中:)中')).toEqual('中：) 中');
        expect(corrector('中:Xxx中')).toEqual('中：Xxx 中');
        expect(corrector('中: xxx中')).toEqual('中：xxx 中');
        expect(corrector('中;中')).toEqual('中；中');
        expect(corrector('中 ; 中')).toEqual('中；中');
        expect(corrector('中; 中')).toEqual('中；中');
        expect(corrector('中 ;中')).toEqual('中；中');
    });

    test('测试 , .', () => {
        expect(corrector('中,中')).toEqual('中，中');
        expect(corrector('中 , 中')).toEqual('中，中');
        expect(corrector('中, 中')).toEqual('中，中');
        expect(corrector('中 ,中')).toEqual('中，中');
        expect(corrector('中,')).toEqual('中，');
        expect(corrector('中, ')).toEqual('中，');
        expect(corrector('中.中')).toEqual('中。中');
        expect(corrector('中 . 中')).toEqual('中。中');
        expect(corrector('中. 中')).toEqual('中。中');
        expect(corrector('中 .中')).toEqual('中。中');
        expect(corrector('中.jpg 中')).toEqual('中.jpg 中');
    });

    test('测试 ! ?', () => {
        expect(corrector('中!中')).toEqual('中！中');
        expect(corrector('中 ! 中')).toEqual('中！中');
        expect(corrector('中! 中')).toEqual('中！中');
        expect(corrector('中 !中')).toEqual('中！中');
        expect(corrector('中?中')).toEqual('中？中');
        expect(corrector('中 ? 中')).toEqual('中？中');
        expect(corrector('中? 中')).toEqual('中？中');
        expect(corrector('中 ?中')).toEqual('中？中');
        expect(corrector('中，中xxx中? 0.0中')).toEqual(
            '中，中 xxx 中？0.0 中'
        );
    });

    test('测试 ·', () => {
        expect(corrector('中•中')).toEqual('中・中');
        expect(corrector('中•R•R•中')).toEqual('中・R・R・中');
        expect(corrector('M•中•中')).toEqual('M・中・中');
        expect(corrector('中‧中')).toEqual('中・中');
        expect(corrector('中‧R‧R‧中')).toEqual('中・R・R・中');
        expect(corrector('M‧中‧中')).toEqual('M・中・中');
        expect(corrector('中·中')).toEqual('中・中');
        expect(corrector('中·R·R·中')).toEqual('中・R・R・中');
        expect(corrector('M·中·中')).toEqual('M・中・中');
    });

    test('测试 < >', () => {
        expect(corrector('中<中000中>中')).toEqual('中 <中 000 中> 中');
        expect(corrector('中<中000>中')).toEqual('中 <中 000> 中');
        expect(corrector('中<000中>中')).toEqual('中 <000 中> 中');
        expect(corrector('中<中000> tail')).toEqual('中 <中 000> tail');
        expect(corrector('xxx <中000中>中')).toEqual('xxx <中 000 中> 中');
        expect(corrector('xxx <中000中> tail')).toEqual('xxx <中 000 中> tail');
    });

    test('测试 ( ) [ ] { }', () => {
        expect(corrector('中(中000中)中')).toEqual('中 (中 000 中) 中');
        expect(corrector('中(中000)中')).toEqual('中 (中 000) 中');
        expect(corrector('中(000中)中')).toEqual('中 (000 中) 中');
        expect(corrector('中(中000) tail')).toEqual('中 (中 000) tail');
        expect(corrector('xxx (中000中)中')).toEqual('xxx (中 000 中) 中');
        expect(corrector('xxx (中000中) tail')).toEqual('xxx (中 000 中) tail');
        expect(corrector('(xxx xxx "xxx")')).toEqual('(xxx xxx "xxx")');
        expect(corrector("xxx: (000, 'xxx')")).toEqual("xxx: (000, 'xxx')");
        expect(corrector('中(1404)')).toEqual('中 (1404)');
        expect(corrector('xxx(中)中xxx(中)中')).toEqual(
            'xxx (中) 中 xxx (中) 中'
        );
        expect(corrector('中[中000中]中')).toEqual('中 [中 000 中] 中');
        expect(corrector('中[中000]中')).toEqual('中 [中 000] 中');
        expect(corrector('中[000中]中')).toEqual('中 [000 中] 中');
        expect(corrector('中[中000] tail')).toEqual('中 [中 000] tail');
        expect(corrector('xxx [中000中]中')).toEqual('xxx [中 000 中] 中');
        expect(corrector('xxx [中000中] tail')).toEqual('xxx [中 000 中] tail');
        expect(corrector('中{中000中}中')).toEqual('中 {中 000 中} 中');
        expect(corrector('中{中000}中')).toEqual('中 {中 000} 中');
        expect(corrector('中{000中}中')).toEqual('中 {000 中} 中');
        expect(corrector('中{中000} tail')).toEqual('中 {中 000} tail');
        expect(corrector('xxx {中000中}中')).toEqual('xxx {中 000 中} 中');
        expect(corrector('xxx {中000中} tail')).toEqual('xxx {中 000 中} tail');
    });

    test('测试 “', () => {
        expect(corrector('中`中`中')).toEqual('中 `中` 中');
        expect(corrector("xxx x's 'xxx' xxx?")).toEqual("xxx x's 'xxx' xxx?");
        expect(corrector("中 xxx 中's xxx.")).toEqual("中 xxx 中's xxx.");
        expect(corrector("中，中'A' ~ 'Z'中")).toEqual("中，中 'A' ~ 'Z' 中");
        expect(corrector('中"中000中"中')).toEqual('中 "中 000 中" 中');
        expect(corrector('中"中000"中')).toEqual('中 "中 000" 中');
        expect(corrector('中"000中"中')).toEqual('中 "000 中" 中');
        expect(corrector('中"中000" tail')).toEqual('中 "中 000" tail');
        expect(corrector('xxx "中000中"中')).toEqual('xxx "中 000 中" 中');
        expect(corrector('xxx "中000中" tail')).toEqual('xxx "中 000 中" tail');
        expect(corrector('中“中000中”中')).toEqual('中 “中 000 中” 中');
        expect(corrector('中“中”xxx，中')).toEqual('中 “中” xxx，中');
        expect(corrector('中״中״中')).toEqual('中 ״中״ 中');
        expect(corrector('中xxx“中”中')).toEqual('中 xxx “中” 中');
        expect(corrector('【xxx中】“中”xxx中《中4》中')).toEqual(
            '【xxx 中】“中” xxx 中《中 4》中'
        );
    });

    test('测试 ##', () => {
        expect(corrector('中#H0G0#中')).toEqual('中 #H0G0# 中');
        expect(corrector('中#中#中')).toEqual('中 #中# 中');
    });

    test('测试特殊字符', () => {
        expect(corrector('xxx⻁000')).toEqual('xxx ⻁ 000');
        expect(corrector('xxx ⻁ 000')).toEqual('xxx ⻁ 000');
        expect(corrector('中ⅷ中')).toEqual('中 ⅷ 中');
        expect(corrector('中 ⅷ 中')).toEqual('中 ⅷ 中');
        expect(corrector('xxxボ000')).toEqual('xxx ボ 000');
        expect(corrector('xxx ボ 000')).toEqual('xxx ボ 000');
        expect(corrector('xxㄓ000')).toEqual('xx ㄓ 000');
        expect(corrector('xxx ㄓ 000')).toEqual('xxx ㄓ 000');
        expect(corrector('xxx㈝000')).toEqual('xxx ㈝ 000');
        expect(corrector('xxx ㈝ 000')).toEqual('xxx ㈝ 000');
        expect(corrector('xxx㗩000')).toEqual('xxx 㗩 000');
        expect(corrector('xxx 㗩 000')).toEqual('xxx 㗩 000');
        expect(corrector('xxxぜ000')).toEqual('xxx ぜ 000');
        expect(corrector('xxx ぜ 000')).toEqual('xxx ぜ 000');
        expect(corrector('xxx⼝000')).toEqual('xxx ⼝ 000');
        expect(corrector('xxx ⼝ 000')).toEqual('xxx ⼝ 000');
        expect(corrector('中©中')).toEqual('中 © 中');
        expect(corrector('中 © 中')).toEqual('中 © 中');
        expect(corrector('中Σ中')).toEqual('中 Σ 中');
        expect(corrector('中 Σ 中')).toEqual('中 Σ 中');
        expect(corrector('中θ，中φ')).toEqual('中 θ，中 φ');
    });

    test('测试 %', () => {
        expect(corrector('100%中')).toEqual('100% 中');
        expect(corrector('中66.32%中')).toEqual('中 66.32% 中');
    });

    test('测试逗号', () => {
        expect(corrector('中,中')).toEqual('中，中');
        expect(corrector('中, 中')).toEqual('中，中');
        expect(corrector('中,  中')).toEqual('中，中');
        expect(corrector('中 中')).toEqual('中，中');
        expect(corrector('中  中')).toEqual('中，中');
        expect(corrector('中   中')).toEqual('中，中');
    });
});

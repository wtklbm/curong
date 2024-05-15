import { chkPunctuation, han, punctuation } from '../src/source';

describe('@curong/regexp/source/han', () => {
    test('测试带标点的中文字符1', () => {
        let chReg = new RegExp(`^(${han}|${chkPunctuation}| )*$`);
        const res = chReg.test('中国，我爱你！');
        expect(res).toBe(true);
    });

    test('测试带标点的中文字符2', () => {
        let chReg = new RegExp(`^(${han}| )*$`);
        const res = chReg.test('abcdefghigklmn,.~`<>/?:"()*&^%$#@!');
        expect(res).toBe(false);
    });

    test('测试带标点的中文字符3', () => {
        let chReg = new RegExp(`^(${han}| )*$`);
        const res = chReg.test(
            '？！，、；：“”‘（ ）《 》〈 〉【 】『 』「 」﹃ ﹄〔 〕…—～﹏'
        );
        expect(res).toBe(false);
    });
});

describe('@curong/regexp/source/chkPunctuation', () => {
    test('测试中日韩标点1', () => {
        let chReg = new RegExp(`^(${chkPunctuation}| )*$`);
        const res = chReg.test(
            '？！，、；：“”‘（ ）《 》〈 〉【 】『 』「 」﹃ ﹄〔 〕…—～﹏'
        );
        expect(res).toBe(true);
    });

    test('测试中日韩标点2', () => {
        let chReg = new RegExp(`^(${chkPunctuation}| )*$`);
        const res = chReg.test(',.~`<>/?:"()*&^%$#@!');
        expect(res).toBe(false);
    });

    test('测试标点', () => {
        let chReg = new RegExp(`^(${punctuation}| )*$`);
        const res = chReg.test(
            '？！，、；：“”‘（ ）《 》〈 〉【 】『 』「 」﹃ ﹄〔 〕…—～﹏,.~`<>/?:"()*&^%$#@!'
        );
        expect(res).toBe(true);
    });
});

describe('@curong/regexp/source/punctuation', () => {
    test('测试标点', () => {
        let chReg = new RegExp(`^(${punctuation}| )*$`);
        const res = chReg.test(
            '？！，、；：“”‘（ ）《 》〈 〉【 】『 』「 」﹃ ﹄〔 〕…—～﹏,.~`<>/?:"()*&^%$#@!'
        );
        expect(res).toBe(true);
    });
});

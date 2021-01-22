import { colorNameCode8bit } from '../src';

describe('@curong/term/colorNameCode8bit', () => {
    test('测试1', () => {
        let ret = colorNameCode8bit('red');

        expect(Object.keys(ret).length).toBe(2);
        expect(ret.foreground).toBe('38;5;1');
        expect(ret.background).toBe('48;5;1');

        // console.log(
        //     `\u001B[${ret?.foreground}m`,
        //     `\u001B[${ret?.background}m`,
        //     '你好，世界!',
        //     `\u001B[49m`,
        //     'Yes! I do!',
        //     `\u001B[39m`,
        //     'Good!'
        // );
    });
});

import { colorNameCode24bit } from '../src';

describe('@curong/term/colorNameCode24bit', () => {
    test('测试1', () => {
        // @ts-ignore
        expect(() => colorNameCode24bit('xxx')).toThrow();
    });

    test('测试2', () => {
        let ret = colorNameCode24bit('red');

        expect(Object.keys(ret).length).toBe(2);
        expect(ret.foreground).toBe('38;2;222;56;43');
        expect(ret.background).toBe('48;2;222;56;43');

        ret = colorNameCode24bit('red', 'CMD');

        expect(Object.keys(ret).length).toBe(2);
        expect(ret.foreground).toBe('38;2;128;0;0');
        expect(ret.background).toBe('48;2;128;0;0');

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

import { colorNameCode3bit } from '../src';

describe('@curong/term/colorNameCode3bit', () => {
    test('测试1', () => {
        // @ts-ignore
        expect(() => colorNameCode3bit()).toThrow();
        // @ts-ignore
        expect(() => colorNameCode3bit('xxx')).toThrow();
    });

    test('测试2', () => {
        let ret = colorNameCode3bit('red');

        expect(Object.keys(ret).length).toBe(2);
        expect(ret.foreground).toBe('31');
        expect(ret.background).toBe('41');
    });

    test('测试2', () => {
        let ret = colorNameCode3bit('lightred');

        expect(Object.keys(ret).length).toBe(2);
        expect(ret.foreground).toBe('91');
        expect(ret.background).toBe('101');

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

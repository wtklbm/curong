import { isEmail } from '../src';

describe('@curong/regexp/isEmail', () => {
    test('测试1', () => {
        expect(isEmail('xx@xx@xx.com')).toBe(false);
        expect(isEmail('xx.\\xx@xx.com')).toBe(false);
        expect(isEmail('xx. \\xx@xx.com')).toBe(false);
        expect(isEmail('xx./xx@xx.com')).toBe(true);
        expect(isEmail('x212$x./xx@xx.com')).toBe(true);
        expect(isEmail('!xxx!xxx%x@xx.com')).toBe(true);
        expect(isEmail('00@xx.com.cn')).toBe(true);
        expect(isEmail('xx@33.com')).toBe(true);
        expect(isEmail('xx.100@xx.com')).toBe(true);
        expect(isEmail('xx-33@xx.com')).toBe(true);
        expect(isEmail('__p/gbhn21.xxx@xxx.co')).toBe(true);
    });

    test('测试2', () => {
        expect(isEmail('xx@xx.co')).toBe(true);
        expect(isEmail('x@x.xx')).toBe(true);
        expect(isEmail('z@xx.co')).toBe(true);
        expect(isEmail('xx@x.cc')).toBe(true);
        expect(isEmail('xx@xx.xx')).toBe(true);
        expect(isEmail('xx@[0.0.0.0]')).toBe(true);
        expect(isEmail('a@xxxxxxx.cxo')).toBe(true);
        expect(isEmail('x-@-x.co')).toBe(false);
    });

    test('测试3', () => {
        expect(isEmail('x'.repeat(64) + '@xx.xx')).toBe(true);
        expect(isEmail('x'.repeat(65) + '@xx.xx')).toBe(false);
        expect(isEmail('xx.xx@' + 'x'.repeat(64) + '.xx')).toBe(true);
        expect(isEmail('xx.xx@' + 'x'.repeat(65) + '.xx')).toBe(false);
        expect(
            isEmail('xx.xx@' + 'x'.repeat(64) + '.' + 'x'.repeat(64) + '.xx')
        ).toBe(true);
        expect(
            isEmail('xx.xx@' + 'x'.repeat(65) + '.' + 'x'.repeat(65) + '.xx')
        ).toBe(false);
        expect(
            isEmail('xx.xx@' + 'x'.repeat(65) + 'x'.repeat(65) + '.xx')
        ).toBe(false);
    });
});

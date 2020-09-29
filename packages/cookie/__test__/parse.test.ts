// @ts-nocheck
import { parse } from '../src';

const cookie =
    'htVD_2132_saltkey=UrzaeSMmA; htVD_2132_lastvisit=15797202730; htVD_2132_connect_is_bind=0; htVD_2132_smile=1D1';

function decode(value: any) {
    return value + 1;
}

describe('@curong/cookie/parse', () => {
    test('没有参数时', () => {
        const cookieObj = parse(cookie);

        expect(cookieObj).toEqual({
            htVD_2132_saltkey: 'UrzaeSMmA',
            htVD_2132_lastvisit: '15797202730',
            htVD_2132_connect_is_bind: '0',
            htVD_2132_smile: '1D1'
        });
    });

    test('带参数时', () => {
        const cookieObj = parse(cookie, decode);

        expect(cookieObj).toEqual({
            htVD_2132_saltkey: 'UrzaeSMmA1',
            htVD_2132_lastvisit: '157972027301',
            htVD_2132_connect_is_bind: '01',
            htVD_2132_smile: '1D11'
        });
    });

    test('没有分号时', () => {
        const cookie = 'htVD_2132_saltkey=UrzaeSMmA';
        const cookieObj = parse(cookie, decode);

        expect(cookieObj).toEqual({
            htVD_2132_saltkey: 'UrzaeSMmA1'
        });
    });

    test('不是 cookie 时', () => {
        const cookie = 'htVD_2132_saltkeyUrzaeSMmA';
        expect(() => parse(cookie, decode)).toThrowError();
    });

    test('包含双引号', () => {
        const cookie = 'htVD_2132_saltkey="UrzaeSMmA";';
        expect(parse(cookie)).toEqual({
            htVD_2132_saltkey: 'UrzaeSMmA'
        });
    });

    test('decode 返回的不是字符串', () => {
        const cookie = 'htVD_2132_saltkey="UrzaeSMmA";';
        const decode = (_value: any) => {
            return null;
        };

        expect(() => parse(cookie, decode)).toThrowError();
    });

    test('包含回车', () => {
        const cookie = 'a=1;\nb=2';
        expect(parse(cookie)).toEqual({
            a: '1',
            b: '2'
        });
    });
});

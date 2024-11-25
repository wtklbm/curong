import {
    decodeEntity,
    decodeEntityByName,
    decodeEntityByPoint,
    encodeEntityToName,
    encodeEntityToPoint
} from '..';

describe('@curong/string/htmlEntity', () => {
    test('测试1', () => {
        expect(decodeEntity('&#38;')).toEqual('&');
        expect(decodeEntity('&38; &#34;')).toEqual('&38; "');
        expect(decodeEntity('&#34;')).toEqual('"');
        expect(decodeEntity('#34; &#38;')).toEqual('#34; &');
        expect(decodeEntity('&amp;')).toEqual('&');
        expect(decodeEntity('&quot;')).toEqual('"');
    });

    test('测试2', () => {
        expect(decodeEntityByName('&amp;')).toEqual('&');
        expect(decodeEntityByName('&amp')).toEqual('&amp');
        expect(decodeEntityByName('&#38;')).toEqual('&#38;');
        expect(decodeEntityByName('&lt;')).toEqual('<');
        expect(decodeEntityByName('&gt;')).toEqual('>');
    });

    test('测试3', () => {
        expect(decodeEntityByPoint('&#38;')).toEqual('&');
        expect(decodeEntityByPoint('&#38')).toEqual('&#38');
        expect(decodeEntityByPoint('&amp;')).toEqual('&amp;');
    });

    test('测试4', () => {
        expect(encodeEntityToName('&')).toEqual('&amp;');
    });

    test('测试5', () => {
        expect(encodeEntityToPoint('&')).toEqual('&#38;');
    });
});

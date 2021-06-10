import { toCascadeKeys } from '../src';

describe('@curong/object/toCascadeKeys', () => {
    test('测试1', () => {
        let ret = toCascadeKeys('key[0].value');
        expect(ret).toEqual(['key', 0, 'value']);

        ret = toCascadeKeys('.key[0].value');
        expect(ret).toEqual(['key', 0, 'value']);

        ret = toCascadeKeys('.key[0]["value"]');
        expect(ret).toEqual(['key', 0, 'value']);

        ret = toCascadeKeys('.key[0].["value"]');
        expect(ret).toEqual(['key', 0, 'value']);

        ret = toCascadeKeys('key[0].["value"]');
        expect(ret).toEqual(['key', 0, 'value']);
    });

    test('测试2', () => {
        const o = { value: 'origin' };

        let ret = toCascadeKeys('.key[0][value]', o);
        expect(ret).toEqual(['key', 0, 'origin']);

        ret = toCascadeKeys('.key[0].[value]', o);
        expect(ret).toEqual(['key', 0, 'origin']);

        ret = toCascadeKeys('key[0].[value]', o);
        expect(ret).toEqual(['key', 0, 'origin']);
    });

    test('测试3', () => {
        let ret = toCascadeKeys('a.b.c.d');
        expect(ret).toEqual(['a', 'b', 'c', 'd']);

        ret = toCascadeKeys('a.b.c[10]');
        expect(ret).toEqual(['a', 'b', 'c', 10]);

        ret = toCascadeKeys('.a.b.c[10]');
        expect(ret).toEqual(['a', 'b', 'c', 10]);

        ret = toCascadeKeys('a.b[10].c');
        expect(ret).toEqual(['a', 'b', 10, 'c']);

        ret = toCascadeKeys('a[10].b.c');
        expect(ret).toEqual(['a', 10, 'b', 'c']);

        ret = toCascadeKeys('[10]a.b.c');
        expect(ret).toEqual([10, 'a', 'b', 'c']);
    });
});

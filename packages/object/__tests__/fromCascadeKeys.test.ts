import { fromCascadeKeys } from '../src';

describe('@curong/object/fromCascadeKeys', () => {
    const o = { startDot: true };

    test('测试1', () => {
        let ret = fromCascadeKeys(['key', 0, 'value']);
        expect(ret).toEqual('key[0].value');

        ret = fromCascadeKeys(['key', 0, 'value'], o);
        expect(ret).toEqual('.key[0].value');
    });

    test('测试2', () => {
        const v = 'value';

        let ret = fromCascadeKeys(['key', 0, v]);
        expect(ret).toEqual('key[0].value');

        ret = fromCascadeKeys(['key', 0, v], o);
        expect(ret).toEqual('.key[0].value');

        ret = fromCascadeKeys([]);
        expect(ret).toEqual('');

        ret = fromCascadeKeys([0]);
        expect(ret).toEqual('[0]');

        ret = fromCascadeKeys([0], o);
        expect(ret).toEqual('[0]');

        ret = fromCascadeKeys(['value']);
        expect(ret).toEqual('value');

        ret = fromCascadeKeys(['value'], o);
        expect(ret).toEqual('.value');
    });

    test('测试3', () => {
        let ret = fromCascadeKeys(['a', 'b', 'c', 'd']);
        expect(ret).toEqual('a.b.c.d');

        ret = fromCascadeKeys(['a', 'b', 'c', 'd'], o);
        expect(ret).toEqual('.a.b.c.d');

        ret = fromCascadeKeys(['a', 'b', 'c', 10], o);
        expect(ret).toEqual('.a.b.c[10]');

        ret = fromCascadeKeys(['a', 'b', 10, 'c'], o);
        expect(ret).toEqual('.a.b[10].c');

        ret = fromCascadeKeys(['a', 10, 'b', 'c'], o);
        expect(ret).toEqual('.a[10].b.c');

        ret = fromCascadeKeys([10, 'a', 'b', 'c'], o);
        expect(ret).toEqual('[10].a.b.c');

        ret = fromCascadeKeys(['a', 'b', 'c', 'd']);
        expect(ret).toEqual('a.b.c.d');

        ret = fromCascadeKeys(['a', 'b', 'c', 10]);
        expect(ret).toEqual('a.b.c[10]');

        ret = fromCascadeKeys(['a', 'b', 10, 'c']);
        expect(ret).toEqual('a.b[10].c');

        ret = fromCascadeKeys(['a', 10, 'b', 'c']);
        expect(ret).toEqual('a[10].b.c');

        ret = fromCascadeKeys([10, 'a', 'b', 'c']);
        expect(ret).toEqual('[10].a.b.c');
    });
});

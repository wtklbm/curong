import { bindInside } from '..';

describe('@curong/string/bindInside', () => {
    test('测试1', () => {
        const v = 'the [`crate`] is <[`crate`]> very {`crate`} good.';
        const ret = bindInside(v, v => v.replace('crate', 'pkg'));
        expect(ret).toBe('the [`pkg`] is <[`pkg`]> very {`pkg`} good.');
    });

    test('测试2', () => {
        const v = 'the [`\\[crate\\]`] is very good.';
        let ret = bindInside(v, { escape: true }, v =>
            v.replace('crate', 'pkg')
        );
        expect(ret).toBe('the [`\\[pkg\\]`] is very good.');

        ret = bindInside(v, { escape: true }, v => v.replace('the', 'pkg'));
        expect(ret).toBe(v);

        ret = bindInside(v, { escape: true }, v => v.replace('good', 'crate'));
        expect(ret).toBe(v);

        ret = bindInside(v, { escape: true }, v => v.replace('very', 'crate'));
        expect(ret).toBe(v);
    });

    test('测试3', () => {
        const v = `this is (value (test. xxx\\). yes. xx).`;
        let ret = bindInside(v, v => v.replace('test', 'xxx'));
        expect(ret).toBe(`this is (value (xxx. xxx\\). yes. xx).`);
        ret = bindInside(v, v => v.replace('value', 'xxx'));
        expect(ret).toBe(`this is (xxx (test. xxx\\). yes. xx).`);
        ret = bindInside(v, v => v.replace('this', 'xxx'));
        expect(ret).toBe(`this is (value (test. xxx\\). yes. xx).`);
    });

    test('测试4', () => {
        const v = `th's is 'value \\'test. xxx'. yes. xx'.`;
        let ret = bindInside(v, { escape: true }, v =>
            v.replace('value', 'pkg')
        );
        expect(ret).toBe(`th's is 'pkg \\'test. xxx'. yes. xx'.`);
        ret = bindInside(v, { escape: true }, v => v.replace('th', 'pkg'));
        expect(ret).toBe(`th's is 'value \\'test. xxx'. yes. xx'.`);
        ret = bindInside(v, { escape: true }, v => v.replace('xxx', 'pkg'));
        expect(ret).toBe(`th's is 'value \\'test. pkg'. yes. xx'.`);
        ret = bindInside(v, { escape: true }, v => v.replace('yes', 'pkg'));
        expect(ret).toBe(`th's is 'value \\'test. xxx'. yes. xx'.`);
    });

    test('测试5', () => {
        const v = `th's is 'value \\'test. xxx'. yes. xx'.`;

        let ret = bindInside(v, { escape: true }, v =>
            v.replace('is', 'very very')
        );
        expect(ret).toBe(v);

        ret = bindInside(v, { escape: true }, v => v.replace('value', 'pkg'));
        expect(ret).toBe(`th's is 'pkg \\'test. xxx'. yes. xx'.`);
        ret = bindInside(v, { escape: true }, v => v.replace('xxx', 'pkg'));
        expect(ret).toBe(`th's is 'value \\'test. pkg'. yes. xx'.`);
        ret = bindInside(v, { escape: true }, v => v.replace('test', 'pkg'));
        expect(ret).toBe(`th's is 'value \\'pkg. xxx'. yes. xx'.`);
        ret = bindInside(v, { escape: true }, v => v.replace('xx', 'pkg'));
        expect(ret).toBe(`th's is 'value \\'test. pkgx'. yes. xx'.`);
    });

    test('测试6', () => {
        const v = '[`crate`](http://good/crate) is very good.';
        let ret = bindInside(v, v => v.replace('crate', 'xxx'));
        expect(ret).toBe('[`xxx`](http://good/crate) is very good.');

        ret = bindInside(v, v => v.replace('is', 'xxx'));
        expect(ret).toBe('[`crate`](http://good/crate) is very good.');

        ret = bindInside(v, v => v.replace('very', 'xxx'));
        expect(ret).toBe('[`crate`](http://good/crate) is very good.');

        ret = bindInside(v, v => v.replace('good', 'xxx'));
        expect(ret).toBe('[`crate`](http://xxx/crate) is very good.');
    });
});

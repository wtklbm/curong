import { bindInside } from '../src';

describe('@curong/string/bindOutside', () => {
    test('测试1', () => {
        const v = 'the [`crate`] is <[`crate`]> very {`crate`} good.';
        const ret = bindInside(v, v => v.replace('crate', 'pkg'));
        expect(ret).toBe('the [`pkg`] is <[`pkg`]> very {`pkg`} good.');
    });

    test('测试2', () => {
        const v = 'the [`\\[crate`] is very good.';
        const ret = bindInside(v, { escape: true }, v =>
            v.replace('crate', 'pkg')
        );
        expect(ret).toBe('the [`\\[pkg`] is very good.');
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
        ret = bindInside(v, { escape: true }, v =>
            v.replace('th', 'pkg')
        );
        expect(ret).toBe(`th's is 'value \\'test. xxx'. yes. xx'.`);
        ret = bindInside(v, { escape: true }, v =>
            v.replace('xxx', 'pkg')
        );
        expect(ret).toBe(`th's is 'value \\'test. pkg'. yes. xx'.`);
        ret = bindInside(v, { escape: true }, v =>
            v.replace('yes', 'pkg')
        );
        expect(ret).toBe(`th's is 'value \\'test. xxx'. yes. xx'.`);
    });
});

import { bindOutside } from '../src';

describe('@curong/string/bindOutside', () => {
    test('测试1', () => {
        const v = 'the [`crate`] is very good.';
        const ret = bindOutside(v, v => v.replace('very', 'very very'));
        expect(ret).toBe('the [`crate`] is very very good.');
    });

    test('测试2', () => {
        const v = 'the [`crate`] is very good.';
        const ret = bindOutside(v, { escape: true }, v =>
            v.replace('very', 'very very')
        );
        expect(ret).toBe('the [`crate`] is very very good.');
    });

    test('测试2', () => {
        const v = 'the [`\\[crate`] is very good.';
        let ret = bindOutside(v, { escape: true }, v =>
            v.replace('crate', 'very very')
        );
        expect(ret).toBe('the [`\\[crate`] is very good.');
        ret = bindOutside(v, { escape: true }, v =>
            v.replace('the', 'very')
        );
        expect(ret).toBe('very [`\\[crate`] is very good.');
        ret = bindOutside(v, { escape: true }, v =>
            v.replace('is', 'very')
        );
        expect(ret).toBe('the [`\\[crate`] very very good.');
        ret = bindOutside(v, { escape: true }, v =>
            v.replace('crate', 'very')
        );
        expect(ret).toBe('the [`\\[crate`] is very good.');
    });

    test('测试3', () => {
        const v = `this is (value (test. xxx\\). yes. xx).`;
        let ret = bindOutside(v, v => v.replace('very', 'very very'));
        expect(ret).toBe(`this is (value (test. xxx\\). yes. xx).`);
        ret = bindOutside(v, v => v.replace('test', 'xxx'));
        expect(ret).toBe(v);
        ret = bindOutside(v, v => v.replace('value', 'xxx'));
        expect(ret).toBe(v);
        ret = bindOutside(v, v => v.replace('this', 'xxx'));
        expect(ret).toBe(`xxx is (value (test. xxx\\). yes. xx).`);
    });

    test('测试4', () => {
        const v = `th's is 'value \\'test. xxx'. yes. xx'.`;
        let ret = bindOutside(v, { escape: true }, v =>
            v.replace('is', 'very very')
        );
        expect(ret).toBe(`th's very very 'value \\'test. xxx'. yes. xx'.`);
        ret = bindOutside(v, { escape: true }, v =>
            v.replace('value', 'pkg')
        );
        expect(ret).toBe(v);
        ret = bindOutside(v, { escape: true }, v =>
            v.replace('th', 'pkg')
        );
        expect(ret).toBe(`pkg's is 'value \\'test. xxx'. yes. xx'.`);
        ret = bindOutside(v, { escape: true }, v =>
            v.replace('xxx', 'pkg')
        );
        expect(ret).toBe(v);
        ret = bindOutside(v, { escape: true }, v =>
            v.replace('yes', 'pkg')
        );
        expect(ret).toBe(`th's is 'value \\'test. xxx'. pkg. xx'.`);
    });
});

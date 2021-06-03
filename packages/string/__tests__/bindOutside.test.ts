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

    test('测试3', () => {
        const v = `this is (value (test. xxx\\). yes. xx).`;
        const ret = bindOutside(v, v => v.replace('very', 'very very'));
        expect(ret).toBe(`this is (value (test. xxx\\). yes. xx).`);
    });

    test('测试4', () => {
        const v = `th's is 'value \\'test. xxx'. yes. xx'.`;
        const ret = bindOutside(v, { escape: true }, v =>
            v.replace('very', 'very very')
        );
        expect(ret).toBe(`th's is 'value \\'test. xxx'. yes. xx'.`);
    });
});

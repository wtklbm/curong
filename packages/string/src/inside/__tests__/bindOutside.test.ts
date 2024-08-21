import { bindOutside } from '..';

describe('@curong/string/bindOutside', () => {
    test('测试1', () => {
        const v = 'the [`crate`] is very good.';
        let ret = bindOutside(v, v => v.replace('very', 'very very'));
        expect(ret).toBe('the [`crate`] is very very good.');

        ret = bindOutside(v, v => v.replace('the', 'xxx'));
        expect(ret).toBe('xxx [`crate`] is very good.');

        ret = bindOutside(v, v => v.replace('crate', 'xxx'));
        expect(ret).toBe('the [`crate`] is very good.');

        ret = bindOutside(v, v => v.replace('is', 'xxx'));
        expect(ret).toBe('the [`crate`] xxx very good.');

        ret = bindOutside(v, v => v.replace('very', 'xxx'));
        expect(ret).toBe('the [`crate`] is xxx good.');

        ret = bindOutside(v, v => v.replace('good', 'xxx'));
        expect(ret).toBe('the [`crate`] is very xxx.');
    });

    test('测试2', () => {
        const v = 'the [`crate`] is very good.';
        let ret = bindOutside(v, { escape: true }, v =>
            v.replace('very', 'very very')
        );
        expect(ret).toBe('the [`crate`] is very very good.');

        ret = bindOutside(v, v => v.replace('the', 'xxx'));
        expect(ret).toBe('xxx [`crate`] is very good.');

        ret = bindOutside(v, v => v.replace('crate', 'xxx'));
        expect(ret).toBe('the [`crate`] is very good.');

        ret = bindOutside(v, v => v.replace('is', 'xxx'));
        expect(ret).toBe('the [`crate`] xxx very good.');

        ret = bindOutside(v, v => v.replace('very', 'xxx'));
        expect(ret).toBe('the [`crate`] is xxx good.');

        ret = bindOutside(v, v => v.replace('good', 'xxx'));
        expect(ret).toBe('the [`crate`] is very xxx.');
    });

    test('测试3', () => {
        const v = 'the [`[crate`] is very good.';
        let ret = bindOutside(v, { escape: true }, v =>
            v.replace('the', 'very')
        );
        expect(ret).toBe('very [`[crate`] is very good.');
        ret = bindOutside(v, { escape: true }, v => v.replace('is', 'very'));
        expect(ret).toBe('the [`[crate`] very very good.');
        ret = bindOutside(v, { escape: true }, v => v.replace('crate', 'very'));

        // NOTE 因为这个字符串中包含未闭合的 `[]`，所以结果可能不太准确
        expect(ret).toBe('the [`[very`] is very good.');

        ret = bindOutside(v, { escape: true }, v =>
            v.replace('crate', 'very very')
        );

        // NOTE 因为这个字符串中包含未闭合的 `[]`，所以结果可能不太准确
        expect(ret).toBe('the [`[very very`] is very good.');
    });

    test('测试4', () => {
        const v = `this is (value (test. xxx\\). yes. xx).`;
        let ret = bindOutside(v, v => v.replace('very', 'very very'));
        expect(ret).toBe(`this is (value (test. xxx\\). yes. xx).`);

        ret = bindOutside(v, v => v.replace('this', 'xxx'));
        expect(ret).toBe(`xxx is (value (test. xxx\\). yes. xx).`);

        ret = bindOutside(v, v => v.replace(' is ', ' xxx '));
        expect(ret).toBe(`this xxx (value (test. xxx\\). yes. xx).`);

        ret = bindOutside(v, v => v.replace('value', 'xxx'));
        expect(ret).toBe(`this is (value (test. xxx\\). yes. xx).`);

        ret = bindOutside(v, v => v.replace('test', 'xxx'));
        expect(ret).toBe(`this is (value (test. xxx\\). yes. xx).`);

        ret = bindOutside(v, v => v.replace('yes', 'xxx'));
        expect(ret).toBe(`this is (value (test. xxx\\). yes. xx).`);

        ret = bindOutside(v, v => v.replace('xx', 'xxx'));
        expect(ret).toBe(`this is (value (test. xxx\\). yes. xx).`);
    });

    test('测试5', () => {
        const v = `th's is 'value \\'test. xxx'. yes. xx'.`;
        let ret = bindOutside(v, { escape: true }, v =>
            v.replace('is', 'very very')
        );
        expect(ret).toBe(`th's very very 'value \\'test. xxx'. yes. xx'.`);
        ret = bindOutside(v, { escape: true }, v => v.replace('value', 'pkg'));
        expect(ret).toBe(v);
        ret = bindOutside(v, { escape: true }, v => v.replace('th', 'pkg'));
        expect(ret).toBe(`pkg's is 'value \\'test. xxx'. yes. xx'.`);
        ret = bindOutside(v, { escape: true }, v => v.replace('xxx', 'pkg'));
        expect(ret).toBe(v);
        ret = bindOutside(v, { escape: true }, v => v.replace('yes', 'pkg'));
        expect(ret).toBe(`th's is 'value \\'test. xxx'. pkg. xx'.`);
    });

    test('测试6', () => {
        const v = `this is a test. (value (test)? yes)`;
        let ret = bindOutside(v, { escape: true }, v => {
            return v.replace('test', 'xxx');
        });
        expect(ret).toBe(`this is a xxx. (value (test)? yes)`);

        ret = bindOutside(v, { escape: true }, v => v.replace('this', 'xxx'));
        expect(ret).toBe(`xxx is a test. (value (test)? yes)`);

        ret = bindOutside(v, { escape: true }, v => v.replace(' is ', ' xxx '));
        expect(ret).toBe(`this xxx a test. (value (test)? yes)`);

        ret = bindOutside(v, { escape: true }, v => v.replace('a', 'xxx'));
        expect(ret).toBe(`this is xxx test. (value (test)? yes)`);

        ret = bindOutside(v, { escape: true }, v => v.replace('test', 'xxx'));
        expect(ret).toBe(`this is a xxx. (value (test)? yes)`);

        ret = bindOutside(v, { escape: true }, v => v.replace('value', 'xxx'));
        expect(ret).toBe(`this is a test. (value (test)? yes)`);

        ret = bindOutside(v, { escape: true }, v => v.replace('yes', 'xxx'));
        expect(ret).toBe(`this is a test. (value (test)? yes)`);

        ret = bindOutside(v, { escape: true }, v => v.replace('?', 'xxx'));
        expect(ret).toBe(`this is a test. (value (test)? yes)`);
    });

    test('测试7', () => {
        const v = 'the [[`crate`]] is very good.';

        let ret = bindOutside(v, { escape: true }, v =>
            v.replace('the', 'xxx')
        );
        expect(ret).toBe('xxx [[`crate`]] is very good.');

        ret = bindOutside(v, { escape: true }, v => v.replace('crate', 'xxx'));
        expect(ret).toBe('the [[`crate`]] is very good.');

        ret = bindOutside(v, { escape: true }, v => v.replace('is', 'xxx'));
        expect(ret).toBe('the [[`crate`]] xxx very good.');

        ret = bindOutside(v, { escape: true }, v => v.replace('very', 'xxx'));
        expect(ret).toBe('the [[`crate`]] is xxx good.');

        ret = bindOutside(v, { escape: true }, v => v.replace('good', 'xxx'));
        expect(ret).toBe('the [[`crate`]] is very xxx.');
    });

    test('测试8', () => {
        const v = '\\[`crate`\\] is very good.';
        let ret = bindOutside(v, v => v.replace('crate', 'xxx'));
        expect(ret).toBe('\\[`crate`\\] is very good.');

        ret = bindOutside(v, v => v.replace('is', 'xxx'));
        expect(ret).toBe('\\[`crate`\\] xxx very good.');

        ret = bindOutside(v, v => v.replace('very', 'xxx'));
        expect(ret).toBe('\\[`crate`\\] is xxx good.');

        ret = bindOutside(v, v => v.replace('good', 'xxx'));
        expect(ret).toBe('\\[`crate`\\] is very xxx.');
    });

    test('测试9', () => {
        const v = '[`crate`](http://good/crate) is very good.';
        let ret = bindOutside(v, v => v.replace('crate', 'xxx'));
        expect(ret).toBe('[`crate`](http://good/crate) is very good.');

        ret = bindOutside(v, v => v.replace('is', 'xxx'));
        expect(ret).toBe('[`crate`](http://good/crate) xxx very good.');

        ret = bindOutside(v, v => v.replace('very', 'xxx'));
        expect(ret).toBe('[`crate`](http://good/crate) is xxx good.');

        ret = bindOutside(v, v => v.replace('good', 'xxx'));
        expect(ret).toBe('[`crate`](http://good/crate) is very xxx.');
    });
});

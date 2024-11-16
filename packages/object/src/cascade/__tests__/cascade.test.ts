import { cascade } from '..';

describe('@curong/object/cascade', () => {
    const o = { key: [{ value: 'this is a test.' }] };

    test('测试1', () => {
        let ret = cascade(o, 'key[0].value');
        expect(ret).toBe('this is a test.');

        ret = cascade(o, '.key[0].value');
        expect(ret).toBe('this is a test.');

        ret = cascade(o, '.key[0]["value"]');
        expect(ret).toBe('this is a test.');

        ret = cascade(o, '.key[0].["value"]');
        expect(ret).toBe('this is a test.');

        ret = cascade(o, 'key[0].["value"]');
        expect(ret).toBe('this is a test.');
    });

    test('测试2', () => {
        expect(cascade(o, 'key[1].value1')).toBe(undefined);

        try {
            cascade(o, 'key[1].value');
        } catch (e) {
            expect(e).toThrowError();
        }
    });

    test('测试3', () => {
        const o = void 0;

        // @ts-ignore
        expect(cascade(o, 'key[1].value', null, false)).toBe(undefined);
    });

    test('测试4', () => {
        let obj = {
            foo: {
                bar: ['baz', 'bux'],
                fux: 5,
                '00N40000002S5U0': 1,
                N40000002S5U0: 2,
                'FE43-D880-21AE': 3
            }
        };

        const getter = (k: string) => cascade(obj, k);
        expect(getter('foo.fux')).toBe(5);
        expect(getter('foo.bar')).toEqual(['baz', 'bux']);
        expect(getter('foo.bar[1]')).toBe('bux');
        expect(getter('["foo"]["bar"][1]')).toBe('bux');

        expect(getter('foo.gih.df[0]')).toBeUndefined();
        expect(getter('["fr"]["bzr"][1]')).toBeUndefined();

        expect(getter('foo["00N40000002S5U0"]')).toBe(1);
        expect(getter('foo.00N40000002S5U0')).toBe(1);
        expect(getter('foo["N40000002S5U0"]')).toBe(2);
        expect(getter('foo.N40000002S5U0')).toBe(2);
        expect(getter('foo["FE43-D880-21AE"]')).toBe(3);
        expect(getter('foo.FE43-D880-21AE')).toBe(3);
    });
});

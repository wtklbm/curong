import { cascade } from '../src';

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
});

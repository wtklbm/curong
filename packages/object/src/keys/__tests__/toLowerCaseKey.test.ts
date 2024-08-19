import { toLowerCaseKey } from '..';

describe('@curong/object/toLowerCaseKey', () => {
    test('测试1', () => {
        const ret = toLowerCaseKey({ name: 1, NAME: 2 });
        expect(ret).toEqual({ name: 2 });
    });

    test('测试2', () => {
        const ret = toLowerCaseKey({ name: 1, NAME: 2 }, false);
        expect(ret).toEqual({ name: 1 });
    });

    test('测试3', () => {
        const v = Symbol('v');
        const ret = toLowerCaseKey(
            { name: 1, NAME: 2, 1: true, [v]: 'v' },
            false
        );
        expect(ret).toEqual({ name: 1, 1: true, [v]: 'v' });
    });
});

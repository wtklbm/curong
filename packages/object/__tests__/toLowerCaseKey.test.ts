import { toLowerCaseKey } from '../src';

describe('@curong/object/toLowerCaseKey', () => {
    test('测试1', () => {
        let ret = toLowerCaseKey({ name: 1, NAME: 2 });
        expect(ret).toEqual({ name: 2 });
    });

    test('测试2', () => {
        let ret = toLowerCaseKey({ name: 1, NAME: 2 }, false);
        expect(ret).toEqual({ name: 1 });
    });
});

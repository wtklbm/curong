import { values } from '..';

describe('values', () => {
    let obj: any, symbolKey: any;

    beforeEach(() => {
        symbolKey = Symbol('symbolKey');
        obj = {
            a: 1,
            b: 2,
            c: 3,
            [symbolKey]: 'symbolValue',
            get d() {
                return 4;
            }
        };
    });

    it('测试1', () => {
        // @ts-ignore
        expect(() => values(obj, 4)).toThrow(TypeError);
        // @ts-ignore
        expect(() => values(obj, -1)).toThrow(TypeError);
    });

    it('测试2', () => {
        expect(values({})).toEqual([]);
        expect(values([])).toEqual([]);
    });

    it('测试3', () => {
        expect(values(obj)).toEqual([1, 2, 3, 4]);
        expect(values(obj, 1)).toEqual([1, 2, 3, 4]);
        expect(values(obj, 2)).toEqual(['symbolValue']);
        expect(values(obj, 3)).toEqual([1, 2, 3, 4, 'symbolValue']);
    });

    it('测试4', () => {
        const arrayLike = { 0: 'a', 1: 'b', length: 2 };
        expect(values(arrayLike)).toEqual(['a', 'b', 2]);
    });

    it('测试5', () => {
        const result = values({ length: 0 });
        expect(result).toEqual([0]);
    });

    it('测试6', () => {
        const nonEnumObj = Object.create(null, {
            a: { value: 1, enumerable: false },
            b: { value: 2, enumerable: false }
        });
        const result = values(nonEnumObj, 1);
        expect(result).toEqual([1, 2]);
    });

    it('测试7', () => {
        const symbolOnlyObj = { [symbolKey]: 'symbolValue' };
        expect(values(symbolOnlyObj, 2)).toEqual(['symbolValue']);
    });

    it('测试8', () => {
        const mixedObj = { a: 1, [symbolKey]: 'symbolValue' };
        expect(values(mixedObj, 3)).toEqual([1, 'symbolValue']);
    });
});

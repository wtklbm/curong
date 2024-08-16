import { constructorName } from '../src';

describe('@curong/object/constructorName', () => {
    test('测试1', () => {
        expect(constructorName(null)).toEqual(null);
        expect(constructorName(undefined)).toEqual(null);
    });

    test('测试2', () => {
        expect(constructorName(true)).toEqual('Boolean');
        expect(constructorName(false)).toEqual('Boolean');
        expect(constructorName(0)).toEqual('Number');
        expect(constructorName(-0)).toEqual('Number');
        expect(constructorName(0.5)).toEqual('Number');
        expect(constructorName(-0.5)).toEqual('Number');
        expect(constructorName(10n)).toEqual('BigInt');
        expect(constructorName(BigInt(-10))).toEqual('BigInt');
        expect(constructorName(Symbol())).toEqual('Symbol');
        expect(constructorName(Symbol('hey'))).toEqual('Symbol');
        expect(constructorName([[]])).toEqual('Array');
        expect(constructorName({})).toEqual('Object');

        expect(constructorName(Boolean)).toEqual('Function');
        expect(constructorName(new Boolean())).toEqual('Boolean');

        expect(constructorName(Number)).toEqual('Function');
        expect(constructorName(new Number())).toEqual('Number');

        expect(constructorName(Function)).toEqual('Function');
        expect(constructorName(new Function())).toEqual('Function');

        expect(constructorName(Object())).toEqual('Object');
        expect(constructorName(new Object())).toEqual('Object');

        expect(constructorName({ constructorName: 'foo' })).toEqual('Object');
        expect(constructorName({})).toEqual('Object');
        expect(constructorName({ hey: 'hello' })).toEqual('Object');
        expect(constructorName({ hey: ['hello'] })).toEqual('Object');
    });
});

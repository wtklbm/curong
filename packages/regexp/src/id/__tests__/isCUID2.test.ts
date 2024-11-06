import { isCUID2 } from '..';

describe('@curong/regexp/isCUID2', () => {
    test('测试1', () => {
        expect(isCUID2('')).toBe(false);
        expect(isCUID2('w#@%^')).toBe(false);
        expect(isCUID2('this-is-not-a-cuid2')).toBe(false);
        expect(isCUID2('c0g1z8g0g00000000000000000Z')).toBe(false);
        expect(isCUID2('o2dyrcKf0vbqhftBcx8ex7r8')).toBe(false);
        expect(isCUID2('1vx6pa5rqog2tqdztxaa0xgw')).toBe(false);
    });

    test('测试2', () => {
        expect(isCUID2('c0g1z8g0g00000000000000000')).toBe(true);
        expect(isCUID2('tz4a98xxat96iws9zmbrgj3a')).toBe(true);
        expect(isCUID2('o2dyrckf0vbqhftbcx8ex7r8')).toBe(true);
        expect(isCUID2('pj17j4wheabtydu00x2yuo8s')).toBe(true);
        expect(isCUID2('vkydd2qpoediyioixyeh8zyo')).toBe(true);
        expect(isCUID2('ja3j1arc87i80ys1zxk8iyiv')).toBe(true);
        expect(isCUID2('pbe6zw7wikj83vv5knjk1wx8')).toBe(true);
    });
});

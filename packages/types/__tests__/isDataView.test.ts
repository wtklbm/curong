import { isDataView } from '../src';

describe('@curong/types/isDataView', () => {
    test('测试1', () => {
        expect(isDataView(new Buffer(''))).toBe(false);
    });

    test('测试2', () => {
        expect(isDataView(new DataView(new ArrayBuffer(1)))).toBe(true);
    });
});

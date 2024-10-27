import { isArrowFunctionArray } from '..';

describe('@curong/types/isArrowFunctionArray', () => {
    test('测试1', () => {
        expect(isArrowFunctionArray([() => {}, () => {}])).toBe(true);
        expect(isArrowFunctionArray([function () {}, () => {}])).toBe(false);
        expect(isArrowFunctionArray([function () {}, function () {}])).toBe(
            false
        );
        expect(isArrowFunctionArray([async () => {}, () => {}])).toBe(true);
        expect(isArrowFunctionArray([function () {}, async () => {}])).toBe(
            false
        );
        expect(
            isArrowFunctionArray([function () {}, async function () {}])
        ).toBe(false);
    });
});

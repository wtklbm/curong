import { isPromiseLike } from '../src';

describe('@curong/types/isPromiseLike', () => {
    test('测试1', () => {
        for (const value of [
            '',
            null,
            undefined,
            1,
            /dd/,
            {},
            [],
            async () => 1,
            () => 1,
            Map
        ]) {
            expect(isPromiseLike(value)).toBeFalsy();
        }
    });

    test('测试2', () => {
        function fn() {}
        fn.then = (resolve: Function, reject: Function) => {};

        for (const value of [
            { then: () => 1 },
            Promise.resolve(),
            (async () => true)(),
            fn
        ]) {
            expect(isPromiseLike(value)).toBeTruthy();
        }
    });
});

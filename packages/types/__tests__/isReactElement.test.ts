import { isReactElement } from '../src';

describe('@curong/types/isReactElement', () => {
    test('测试1', () => {
        const ele = { $$typeof: Symbol.for('react.element') };
        expect(isReactElement(ele)).toBe(true);
    });

    test('测试2', () => {
        // @ts-ignore
        Symbol.for = null;
        expect(isReactElement({ $$typeof: 60103 })).toBe(true);
    });
});

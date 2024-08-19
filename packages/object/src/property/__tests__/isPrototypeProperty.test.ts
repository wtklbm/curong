import { isPrototypeProperty } from '..';

describe('@curong/object/isPrototypeProperty', () => {
    test('测试1', () => {
        class Arr extends Array {
            constructor() {
                super();
            }

            private sortBy() {}

            static sortByKey() {}
        }

        const arr = new Arr();
        expect(isPrototypeProperty(arr, 'slice')).toBe(true);
        expect(isPrototypeProperty(arr, 'sortBy')).toBe(true);
        expect(isPrototypeProperty(arr, 'sortByKey')).toBe(false);
    });
});

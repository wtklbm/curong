import { createWithNull } from '../src';

describe('@curong/object/createWithNull', () => {
    test('测试1', () => {
        const obj = createWithNull({
            a: {
                get() {
                    return 1;
                }
            }
        });

        expect(obj.__proto__).toBe(undefined);
        expect(obj.a).toBe(1);
    });

    test('测试2', () => {
        const obj = createWithNull();

        expect(obj.__proto__).toBe(undefined);
    });
});

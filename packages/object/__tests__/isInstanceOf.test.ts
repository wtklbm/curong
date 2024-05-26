import { isInstanceOf } from '../src';

class MyClass {}
class AnotherClass {}

describe('@curong/object/isInstanceOf', () => {
    test('测试1', () => {
        const myInstance = new MyClass();
        expect(isInstanceOf(myInstance, MyClass)).toBe(true);
    });

    test('测试2', () => {
        const notMyInstance = {};
        expect(isInstanceOf(notMyInstance, MyClass)).toBe(false);
    });

    test('测试3', () => {
        expect(isInstanceOf(null, MyClass)).toBe(false);
        expect(isInstanceOf(undefined, MyClass)).toBe(false);
    });

    test('测试4', () => {
        const anotherInstance = new AnotherClass();
        expect(isInstanceOf(anotherInstance, MyClass)).toBe(false);
    });

    test('测试5', () => {
        class SubClass extends MyClass {}
        const subInstance = new SubClass();
        expect(isInstanceOf(subInstance, SubClass)).toBe(true);
        expect(isInstanceOf(subInstance, MyClass)).toBe(false);
    });

    test('测试6', () => {
        expect(isInstanceOf(42, MyClass)).toBe(false);
        expect(isInstanceOf('测试', MyClass)).toBe(false);
        expect(isInstanceOf(true, MyClass)).toBe(false);
        expect(isInstanceOf(Symbol('测试'), MyClass)).toBe(false);
        expect(isInstanceOf(() => {}, MyClass)).toBe(false);
    });
});

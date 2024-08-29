// @ts-nocheck

import { singletonClass } from '..';

let MyClass;

beforeEach(() => {
    // 假设有一个简单的类作为示例
    MyClass = class MyClass {
        private value: number;
        private name: string = 'MyClass';

        constructor(value: number) {
            this.value = value;
        }

        private getValue() {
            return this.value;
        }
    };
});

describe('singletonClass 单元测试', () => {
    test('确保返回单例实例', () => {
        const SingletonMyClass = singletonClass(MyClass);

        // 实例化两次，但应返回同一个实例
        const instance1 = new SingletonMyClass(10);
        const instance2 = new SingletonMyClass(20);

        expect(instance1).toBe(instance2);
    });

    test('确保实例化参数被传递到构造函数', () => {
        const SingletonMyClass = singletonClass(MyClass);

        const instance = new SingletonMyClass(30);

        expect(instance.getValue()).toBe(30);
        expect(instance.getValue()).toBe(30);
        expect(instance.getValue()).toBe(30);
    });

    test('确保对原始类的其他方法也可用', () => {
        const SingletonMyClass = singletonClass(MyClass);

        const instance = new SingletonMyClass(40);
        console.log(instance);

        expect(instance.getValue()).toBe(40);
        expect(instance.getValue()).toBe(40);
        expect(instance.getValue()).toBe(40);

        // 测试其他方法是否可用
        expect(instance instanceof MyClass).toBe(true);
        expect(instance.hasOwnProperty('getValue')).toBe(false);
        expect(MyClass.prototype.hasOwnProperty('getValue')).toBe(true);
        expect(instance.hasOwnProperty('name')).toBe(true);
    });
});

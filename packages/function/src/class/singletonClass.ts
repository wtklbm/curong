import type { Class } from '@curong/types';

const CLASS_SINGLETON_KEY = Symbol.for('[[SINGLETON]]');

export type SingletonClass<T extends Class> = T & {
    [CLASS_SINGLETON_KEY]: InstanceType<T>;
};

/**
 * 创建一个类的单例模式代理，确保该类在应用中只能被实例化一次
 *
 * 该函数用于将类包装为单例模式，防止该类被实例化多次。即使尝试多次实例化该类，都会返回同一个实例。
 *
 * @param classTarget 需要应用单例模式的类
 * @returns 返回该类的单例代理，当该类被实例化时，将确保只返回同一个实例
 * @example
 *
 * ```typescript
 * class MyClass {
 *   constructor(public value: number) {}
 * }
 *
 * const SingletonMyClass = singletonClass(MyClass);
 *
 * const instance1 = new SingletonMyClass(1);
 * const instance2 = new SingletonMyClass(2);
 *
 * console.log(instance1 === instance2); // true，两个实例是相同的
 * console.log(instance1.value); // 1，第二次实例化时不会修改实例的值
 * ```
 */
export default function singletonClass<T extends Class>(classTarget: T) {
    return new Proxy(classTarget, {
        construct(target: SingletonClass<T>, argumentsList, newTarget) {
            if (target.prototype !== newTarget.prototype) {
                return Reflect.construct(target, argumentsList, newTarget);
            }

            if (!target[CLASS_SINGLETON_KEY]) {
                target[CLASS_SINGLETON_KEY] = Reflect.construct(
                    target,
                    argumentsList,
                    newTarget
                );
            }

            return target[CLASS_SINGLETON_KEY];
        }
    });
}

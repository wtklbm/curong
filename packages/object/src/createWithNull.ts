import { ObjectType } from './types/objectType';

/**
 * 创建一个纯对象，该对象的原型是 `null`
 *
 * @returns 返回一个纯对象
 */
export default function createWithNull(): ObjectType {
    return Object.create(null);
}

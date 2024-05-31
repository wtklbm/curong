/** 获取对象的 `key` 的函数数组 */
const GET_KEYS_FUNCTIONS = [
    Object.keys,
    Object.getOwnPropertyNames,
    Object.getOwnPropertySymbols,
    Reflect.ownKeys
];

export default GET_KEYS_FUNCTIONS;

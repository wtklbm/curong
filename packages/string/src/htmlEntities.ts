// https://zh.wikipedia.org/wiki/XML与HTML字符实体引用列表
// NOTE: `HTML` 实体名称是大小写敏感的
import htmlEntities from './assets/htmlEntities.json';

const initObject = () => Object.create(null);

const nameValueMap = htmlEntities.reduce((memo, entity) => {
    memo[entity.name] = entity.value;
    return memo;
}, initObject());

const pointValueMap = htmlEntities.reduce((memo, entity) => {
    memo[entity.point] = entity.value;
    return memo;
}, initObject());

const valueNamePointMap = htmlEntities.reduce((memo, entity) => {
    memo[entity.value] = { name: entity.name, point: entity.point };
    return memo;
}, initObject());

/** 验证实体名称的正则表达式 */
const nR = new RegExp(`&(${htmlEntities.map(h => h.name).join('|')});`, 'g');

/** 验证实体编号的正则表达式 */
const pR = new RegExp(`&#(${htmlEntities.map(h => h.point).join('|')});`, 'g');

/** 验证实体字符的正则表达式 */
const vR = new RegExp(`(${htmlEntities.map(h => h.value).join('|')})`, 'g');

/**
 * 解码包含 `HTML` 实体名称 (`&name;`) 的字符串
 *
 * @param str 要解码的字符串
 * @returns 返回解码的字符串
 */
export function decodeEntityByName(str: string): string {
    return str.replace(nR, (_, name) => nameValueMap[name]);
}

/**
 * 解码包含 `HTML` 实体编号 (`&#point;`) 的字符串
 *
 * @param str 要解码的字符串
 * @returns 返回解码的字符串
 */
export function decodeEntityByPoint(str: string): string {
    return str.replace(pR, (_, point) => pointValueMap[point]);
}

/**
 * 解码包含 `HTML` 实体名称 (`&name;`) 和实体编号 (`&#point;`) 的字符串
 *
 * @param str 要解码的字符串
 * @returns 返回解码的字符串
 */
export function decodeEntity(value: string): string {
    return decodeEntityByName(decodeEntityByPoint(value));
}

/**
 * 将字符串中的特殊字符编码为 `HTML` 实体名称 (`&name;`)
 *
 * @param str 要编码的字符串
 * @returns 返回编码的字符串
 */
export function encodeEntityToName(str: string): string {
    return str.replace(vR, (_, value) => {
        return `&${valueNamePointMap[value].name};`;
    });
}

/**
 * 将字符串中的特殊字符编码为 `HTML` 实体编号 (`&#point;`)
 *
 * @param str 要编码的字符串
 * @returns 返回编码的字符串
 */
export function encodeEntityToPoint(str: string): string {
    return str.replace(vR, (_, value) => {
        return `&#${valueNamePointMap[value].point};`;
    });
}

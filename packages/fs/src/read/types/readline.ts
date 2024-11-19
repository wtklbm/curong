/**
 * 行读取器的回调函数
 *
 * @param value 读取到的每一行的数据
 * @param done 迭代是否完成，是否已经达到内容的末尾
 * @returns 返回值为 `void`
 */
export type ReadlineCallback = (value: string, done: boolean) => void;

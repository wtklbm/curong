/**
 * 基于流的行读取器的回调函数
 *
 * @param input 读取到的每一行的数据
 * @returns 返回值为 `void`
 */
export type ReadlineStreamCallback = (input: string) => void;

/** 类的类型定义 */
export interface Class<T = unknown> {
    new (...args: any[]): T;
}

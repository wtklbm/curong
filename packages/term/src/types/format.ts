import { InspectOptions } from 'util';

export type ForMatInfo = {
    /**
     * @param type 消息的类型，默认为 `error`
     *
     * - `error` 默认值
     * - `info` 消息
     * - `warn` 警告
     */
    type?: 'error' | 'info' | 'warn';

    /** 标题信息 */
    title?: string;

    /** 函数的名字，也可以是其他的值 */
    name?: string;

    /** 数字代码，也可以自己定义 */
    code?: number | string;

    /** 要打印的消息 */
    message?: any;

    /** 要打印的数据 */
    data?: any;

    /** 是否显示堆栈记录(除了 `type` 为 `error` 外) */
    stack?: boolean;

    /** 是否显示日期 */
    date?: boolean;
};

export type ForMatOptions = InspectOptions & {
    display?: {
        /** 是否显示标题 */
        title?: boolean;

        /** 是否显示标题下面的分割线 */
        dividers?: boolean;
    };
};

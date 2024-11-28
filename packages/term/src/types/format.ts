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

    /**
     * 是否显示堆栈记录(除了 `type` 为 `error` 外)
     *
     * - 如果为 `true`，则显示一个新创建的调用栈
     * - 如果为 `false`，则不显示调用栈
     * - 如果为 `undefined` 且错误的类型为 `error`，则会自动显示一个新创建的调用栈
     * - 如果为字符串，则将其视为调用栈字符串，并进行展示
     */
    stack?: boolean | string;

    /** 是否显示日期，默认为 `true` */
    date?: boolean;
};

export type ForMatOptions = InspectOptions & {
    display?: {
        /** 是否显示标题，默认为 `true` */
        title?: boolean;

        /** 是否显示标题下面的分割线，默认为 `true` */
        dividers?: boolean;
    };
};

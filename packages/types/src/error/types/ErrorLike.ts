/** 类错误对象的类型 */
export type ErrorLike = {
    /** 错误的类型名称 */
    name: string;

    /** 人类可读的错误信息 */
    message: string;

    /** 错误所抛出的执行调用栈 */
    stack: string;

    /**
     * 指示错误的具体原因，反映在 [`cause`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) 属性中。
     * 当捕获并重新抛出带有更具体或有用的错误消息的错误时，可以使用此属性传递原始错误。
     */
    cause?: any;
};

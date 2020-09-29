export type Task = {
    /** 映像名称 */
    imageName: string;

    /** PID */
    pid: string;

    /** 内存占用，单位(`KB`) */
    memusage: string;

    /** 会话 */
    session: {
        /** 会话名称 */
        name: string;

        /** 会话编号 */
        id: string;
    };
};

export type WindowsTaskListResult = Task[];

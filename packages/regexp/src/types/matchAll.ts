export interface RegExpExecOrigin extends RegExpExecArray {
    0: string;
    input: string;
    index: number;
    groups: {
        [key: string]: string;
    };
    length: number;
}

export type ExecMatch = string | RegExpExecOrigin;

export type ExecAllCallBack = (
    match: RegExpExecArray | string
) => ExecMatch | void;

export type ExecAllResult = ExecMatch[];

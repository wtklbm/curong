export interface RegExpExecOrigin extends RegExpExecArray {
    0: string;
    input: string;
    index: number;
    groups: {
        [key: string]: string;
    };
    length: number;
}

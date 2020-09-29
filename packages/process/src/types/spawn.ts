import { ChildProcess } from 'child_process';

export type SpawnResult = {
    pid: number;
    output: Array<string>;
    stdout: string;
    stderr: string;
    status: number | null;
    child: ChildProcess;
};

import { ExecOptions as _ExecOptions } from 'child_process';

export type ExecOptions = _ExecOptions & {
    encoding?: BufferEncoding | 'buffer';
};

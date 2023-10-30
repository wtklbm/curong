import { SpawnOptions as _SpawnOptions } from 'child_process';

export type OpenOptions = Partial<
    _SpawnOptions & {
        /**
         * 自定义命令，通过哪个命令来打开内容
         *
         * 在不同的系统上，默认执行的命令也是不同的：
         *  - `Windows`: start
         *  - `Linux`: xdg-open
         *  - `macOS`: open
         */
        command?: string;
    }
>;

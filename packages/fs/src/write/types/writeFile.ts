export type WriteFileOptions = {
    /** 当目录不存在时，是否自动创建目录，然后在从该目录下写文件, 默认为 `true` */
    isMkdir?: boolean;

    /** 文件的编码，默认为 `utf8` */
    encoding?: BufferEncoding;

    /** 权限，默认为 `0o755` */
    mode?: number;

    /** 读写文件标识符，默认为 `w+` */
    flag?: string;
};

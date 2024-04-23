export type ReadFileOptions = {
    /** 文件的编码，默认 `utf8` */
    encoding?: BufferEncoding;

    /** 标识，默认 `r+` */
    flag?: string;

    /** 权限，默认为 `0o755` */
    mode?: number;
};

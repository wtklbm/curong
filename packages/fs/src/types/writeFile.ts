export type WriteFileOptions = {
    /** 当目录不存在时，是否自动创建目录，然后在从该目录下写文件, 默认为 `true` */
    isMkdir?: boolean;

    /** 是否把对象和数组进行序列化，序列化之后会将数据转换为 `JSON` 格式，默认为 `true` */
    isFormat?: boolean;

    /** 文件的编码，默认为 `utf8` */
    encoding?: BufferEncoding;

    /** 权限，默认为 `0o777` */
    mode?: number;

    /** 读写文件标识符，默认为 `w+` */
    flag?: string;
};

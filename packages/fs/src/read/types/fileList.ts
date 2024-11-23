export type FileListOptions = {
    /**
     * 是否只获取一层深度的数据，默认为 `false`
     *
     * 仅仅读取当前的文件夹下的所有内容，相当于readdir方法，不进行文件夹的深度遍历
     */
    depthOnce?: boolean;
};
